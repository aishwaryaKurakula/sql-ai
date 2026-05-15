variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "sqlai"
}

variable "railway_api_token" {
  description = "Railway API token — get from railway.app/account/tokens"
  type        = string
  sensitive   = true
}

variable "railway_project_id" {
  description = "Railway project ID — get from railway.app dashboard"
  type        = string
}

variable "neon_api_key" {
  description = "Neon API key — get from console.neon.tech/app/settings/api-keys"
  type        = string
  sensitive   = true
}

variable "upstash_email" {
  description = "Upstash account email"
  type        = string
}

variable "upstash_api_key" {
  description = "Upstash API key — get from console.upstash.com"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "Deployment region"
  type        = string
  default     = "us-east-1"
}