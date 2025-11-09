resource "aws_db_subnet_group" "this" {
  name       = "${var.identifier}-subnet-group"
  subnet_ids = var.subnet_ids
}

resource "aws_security_group" "this" {
  name        = "${var.identifier}-rds-sg"
  description = "Allow ingress from EKS nodes"
  vpc_id      = var.vpc_id
}

resource "aws_db_instance" "this" {
  identifier              = var.identifier
  engine                  = "postgres"
  engine_version          = "15"
  instance_class          = "db.r6g.large"
  allocated_storage       = 50
  db_name                 = var.database_name
  username                = var.master_username
  password                = var.master_password
  skip_final_snapshot     = true
  backup_retention_period = 7
  storage_encrypted       = true
  db_subnet_group_name    = aws_db_subnet_group.this.name
  vpc_security_group_ids  = [aws_security_group.this.id]
  publicly_accessible     = false
}
