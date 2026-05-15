terraform {
  required_version = ">= 1.6.0"

  required_providers {
    railway = {
      source  = "terraform-community-providers/railway"
      version = "~> 0.3"
    }
    neon = {
      source  = "kislerdm/neon"
      version = "~> 0.2"
    }
    upstash = {
      source  = "upstash/upstash"
      version = "~> 1.4"
    }
  }

  # Store state remotely so team members share the same state
  # Comment this out on first run, uncomment after Railway is set up
  # backend "s3" {
  #   bucket = "sqlai-terraform-state"
  #   key    = "prod/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

# ── Providers ───────────────────────────────────────────────────

provider "railway" {
  token = var.railway_api_token
}

provider "neon" {
  api_key = var.neon_api_key
}

provider "upstash" {
  email   = var.upstash_email
  api_key = var.upstash_api_key
}

# ── Neon Postgres ────────────────────────────────────────────────

resource "neon_project" "sqlai" {
  name      = "${var.project_name}-db"
  region_id = "aws-us-east-1"
}

resource "neon_database" "sqlai" {
  project_id = neon_project.sqlai.id
  branch_id  = neon_project.sqlai.default_branch_id
  name       = "sqlai"
  owner_name = "sqlai_owner"
}

# ── Upstash Redis ────────────────────────────────────────────────

resource "upstash_redis_database" "sqlai" {
  database_name = "${var.project_name}-cache"
  region        = "us-east-1"
  tls           = true

  # Free tier — 10,000 commands/day
  # Upgrade to pay-as-you-go for production scale
}

# ── Railway App ──────────────────────────────────────────────────

resource "railway_service" "sqlai_backend" {
  project_id = var.railway_project_id
  name       = "${var.project_name}-backend"

  source = {
    repo   = "aishwaryaKurakula/sql-ai"
    branch = "main"
  }
}

resource "railway_variable" "env_vars" {
  for_each = {
    NODE_ENV                   = "production"
    PORT                       = "3000"
    DATABASE_URL               = neon_project.sqlai.connection_uri
    UPSTASH_REDIS_REST_URL     = upstash_redis_database.sqlai.rest_url
    UPSTASH_REDIS_REST_TOKEN   = upstash_redis_database.sqlai.rest_token
  }

  project_id  = var.railway_project_id
  service_id  = railway_service.sqlai_backend.id
  name        = each.key
  value       = each.value
}