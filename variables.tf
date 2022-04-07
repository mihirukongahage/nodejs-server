# AWS CONFIGS
variable "AWS_REGION" {
  description = "AWS region"
  type        = string
  sensitive   = true
}
variable "AWS_ACCESS_KEY" {
  description = "AWS access key"
  type        = string
  sensitive   = true
}
variable "AWS_SECRET_KEY" {
  description = "AWS secret key"
  type        = string
  sensitive   = true
}


# DATABASE CONFIGS
variable "username" {
  description = "database username"
  type        = string
  sensitive   = true
}
variable "password" {
  description = "database password"
  type        = string
  sensitive   = true
}