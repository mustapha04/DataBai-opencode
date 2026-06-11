---
name: aws-serverless
description: AWS serverless stack covering Lambda, API Gateway, DynamoDB, SQS, SNS, EventBridge, Step Functions, cold starts, IAM, monitoring, and best practices
license: MIT
compatibility: opencode
---

## aws-serverless

### Core Services

| Service | Role |
|---------|------|
| Lambda | Compute – stateless function execution |
| API Gateway | HTTP API / REST API – request routing, auth, throttling |
| DynamoDB | NoSQL DB – key-value + document, single-digit ms latency |
| SQS | Message queue – decoupling, buffering, DLQ |
| SNS | Pub/sub – fan-out notifications |
| EventBridge | Event bus – routing events between services |
| Step Functions | Workflow orchestration – state machine for multi-step processes |

### Lambda Best Practices

- **Cold starts**: Minimize by keeping deployment package small (< 3 MB), use SnapStart for Java/Python, provisioned concurrency for latency-sensitive paths
- **Timeout**: Set realistically (max 15 min); prefer Step Functions for long-running jobs
- **Memory**: 128 MB – 10 GB; doubling memory also doubles CPU allocation
- **Environment variables**: Store config; use Parameter Store / Secrets Manager for secrets
- **Idempotency**: Use idempotency keys for SQS-triggered Lambdas to handle duplicates

### API Gateway

- **REST API** vs **HTTP API**: HTTP API is cheaper, simpler; REST API offers more features (WAF, API keys, usage plans)
- **Lambda proxy integration**: Full request/response passthrough
- **Throttling**: Per-route rate limits + burst limits
- **Authorizers**: Cognito, Lambda authorizer (custom JWT), IAM
- **CORS**: Configure per-route; handle OPTIONS preflight

### DynamoDB

- **Single-table design**: Store multiple entity types in one table using partition + sort key patterns
- **Query vs Scan**: Always prefer Query with key condition; avoid Scan on production tables
- **GSI/LSI**: Global secondary indexes for alternative access patterns
- **DAX**: In-memory cache layer for hot data
- **TTL**: Auto-expire old records (sessions, events)

### Async Messaging

- **SQS**: Lambda event source polls queue; enable batch window, partial batch responses
- **DLQ**: Configure on SQS or Lambda for failed messages
- **SNS → SQS**: Fan-out pattern for multi-subscriber events
- **EventBridge**: Content filtering, schema registry, archived replay

### IAM

- **Least privilege**: Scope policies to specific resources and actions
- **Lambda execution role**: Grant only what the function needs (DynamoDB GetItem, SQS SendMessage)
- **Resource-based policies**: Cross-account access for S3, SNS, SQS
- **Access Analyzer**: Validate policies against best practices

### Monitoring

- **CloudWatch Logs**: Structured JSON logging with correlation ID
- **CloudWatch Metrics**: Custom metrics for business KPIs (orders processed, errors)
- **X-Ray**: Trace requests across Lambda → DynamoDB → SQS → Lambda chain
- **Lambda Powertools**: TypeScript/Python/Java utilities for logging, tracing, metrics
