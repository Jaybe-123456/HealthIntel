variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "database_password" {
  description = "Master password for Postgres"
  type        = string
  sensitive   = true
}
