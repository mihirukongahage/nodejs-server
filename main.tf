terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
    region = var.AWS_REGION
    access_key = var.AWS_ACCESS_KEY
    secret_key = var.AWS_SECRET_KEY
}

resource "aws_db_instance" "personal_notes_manager" {
  engine                  = "mysql"
  engine_version          = "8.0.28"
  db_name                 = var.db_name
  username                = var.username
  password                = var.password
  instance_class          = "db.t2.micro"
  storage_type            = "gp2"   
  allocated_storage       = 20
  max_allocated_storage   = 50
  publicly_accessible     = true  
}