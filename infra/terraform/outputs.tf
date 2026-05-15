output "api_url" {
  description = "Railway backend public URL"
  value       = "https://${railway_service.sqlai_backend.id}.railway.app"
}

output "database_url" {
  description = "Neon Postgres connection string"
  value       = neon_project.sqlai.connection_uri
  sensitive   = true
}

output "redis_rest_url" {
  description = "Upstash Redis REST URL"
  value       = upstash_redis_database.sqlai.rest_url
}

output "redis_rest_token" {
  description = "Upstash Redis REST token"
  value       = upstash_redis_database.sqlai.rest_token
  sensitive   = true
}

output "neon_project_id" {
  description = "Neon project ID for dashboard reference"
  value       = neon_project.sqlai.id
}