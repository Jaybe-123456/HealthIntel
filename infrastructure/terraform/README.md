# Terraform Infrastructure

- `modules/network`: VPC, subnets, and connectivity
- `modules/eks`: EKS cluster with system and GPU node groups
- `modules/rds`: PostgreSQL database with subnet grouping and encryption
- `environments/dev`: Example environment wiring modules together

Usage:

```bash
cd infrastructure/terraform/environments/dev
terraform init -backend-config="bucket=auralforge-tfstate" -backend-config="key=dev/terraform.tfstate" -backend-config="region=us-east-1"
terraform plan -var="database_password=super-secret"
```

