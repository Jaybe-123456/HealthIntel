terraform {
  required_version = ">= 1.5.0"
  backend "s3" {}
}

provider "aws" {
  region = var.region
}

module "network" {
  source = "../../modules/network"
  name   = "auralforge-dev"
  cidr   = "10.10.0.0/16"
}

module "eks" {
  source          = "../../modules/eks"
  cluster_name    = "auralforge-dev"
  vpc_id          = module.network.vpc_id
  private_subnets = module.network.private_subnets
  public_subnets  = module.network.public_subnets
}

module "rds" {
  source           = "../../modules/rds"
  identifier       = "auralforge-dev"
  vpc_id           = module.network.vpc_id
  subnet_ids       = module.network.private_subnets
  database_name    = "auralforge"
  master_username  = "auralforge"
  master_password  = var.database_password
}
