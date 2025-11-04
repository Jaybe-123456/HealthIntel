module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "~> 20.0"
  cluster_name    = var.cluster_name
  cluster_version = "1.29"
  vpc_id          = var.vpc_id
  subnet_ids      = concat(var.private_subnets, var.public_subnets)

  eks_managed_node_group_defaults = {
    disk_size      = 50
    instance_types = ["m6a.xlarge"]
  }

  eks_managed_node_groups = {
    system = {
      min_size     = 2
      max_size     = 5
      desired_size = 3
      instance_types = ["m6i.large"]
    }
    gpu = {
      min_size     = 0
      max_size     = 10
      desired_size = 0
      instance_types = ["g5.2xlarge"]
      taints = [{
        key    = "nvidia.com/gpu"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
    }
  }
}
