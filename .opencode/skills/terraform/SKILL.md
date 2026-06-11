---
name: terraform
description: Terraform and Infrastructure as Code practices for cloud infrastructure management
license: MIT
compatibility: opencode
---

## terraform

### State Management
- Store state remotely (S3 + DynamoDB, GCS, Azure Storage, Terraform Cloud)
- NEVER commit `terraform.tfstate` or `terraform.tfstate.backup` to git
- Use state locking to prevent concurrent modifications
- Tag state files with workspace/environment names
- State migration: `terraform state mv`, `terraform state rm`, `terraform import`
- Sensitive data in state: use `sensitive = true` and encrypt state storage

### Modules
- Encapsulate related resources into reusable modules
- Follow the standard structure: `main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`
- Use `source` to reference local paths, Git repos, or the Terraform Registry
- Pin module versions via Git tags or registry versions
- Keep modules focused: one infrastructure concern per module
- Document module inputs and outputs with descriptions

### Workspaces
- Use workspaces to manage multiple environments (dev, staging, prod)
- Each workspace has its own state file and variable values
- Avoid workspaces for strongly isolated environments; use separate directories/stacks instead
- Workspace names as part of resource naming conventions
- Workspace-specific variables via `terraform.workspace` interpolation

### Providers
| Provider | Use Case |
|----------|----------|
| AWS | EC2, S3, RDS, Lambda, VPC, IAM, EKS |
| GCP | GCE, GCS, Cloud SQL, GKE, IAM |
| Azure | VMs, Blob Storage, SQL DB, AKS, RBAC |
| Kubernetes | Deployments, Services, Namespaces, ConfigMaps |
| Helm | Deploy Helm charts |
| Random | Generate unique IDs, passwords, pet names |

### Remote State
- Configure backend in `terraform { backend "s3" { ... } }` or similar
- DynamoDB table for state locking on S3 backend
- GCS backend uses object versioning for state history
- Partial configuration allows backend values to be passed during `init`
- Access remote state from other configs using `terraform_remote_state` data source

### CI/CD Integration
- Plan stage: `terraform plan -out=tfplan` in PRs
- Apply stage: `terraform apply tfplan` on merge to main
- Use `terraform fmt -check` and `tflint` in CI for code quality
- `terraform validate` for syntax and structural checks
- `checkov` or `tfsec` for security scanning in CI pipeline
- Atlantis or Terraform Cloud for automated plan/apply workflows

### Testing
- `terraform validate` for syntax and attribute checking
- `terraform plan` as dry-run to preview changes
- `terratest` (Go) for integration testing of infrastructure
- `kitchen-terraform` for InSpec-based compliance testing
- Test in isolated environments before applying to prod

### Secrets Management
- Use `sensitive = true` on variables and outputs
- Store secrets in HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager
- Retrieve secrets via data sources (`aws_secretsmanager_secret_version`)
- Avoid hardcoding secrets in `*.tfvars` files
- Use `terraform.tfvars` with `.gitignore` for local-only secrets

### Best Practices
- Use consistent naming conventions (`{project}-{env}-{resource}-{suffix}`)
- Tag all resources with `Name`, `Environment`, `ManagedBy`, `Owner`
- Keep resource blocks under 100 lines; refactor into modules when larger
- Pin provider versions in `required_providers` block
- Use `for_each` and `count` instead of duplicating resource blocks
- Prefer `remote-exec` and `user_data` over inline scripts
- Use `lifecycle` hooks: `create_before_destroy`, `prevent_destroy`

### Terragrunt
- Wrapper around Terraform for DRY configurations
- Use Terragrunt to manage remote state config centrally
- Keep provider configs in a single `provider.tf` per root module
- `terraform` blocks in Terragrunt for backend and remote state inheritance
- Use `dependency` blocks to reference outputs from other Terragrunt modules
