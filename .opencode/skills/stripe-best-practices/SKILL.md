---
name: stripe-best-practices
description: Stripe integration best practices for payments, subscriptions, webhooks, and testing
license: MIT
compatibility: opencode
---

## stripe-best-practices

### Checkout
- Use Stripe Checkout (hosted page) for PCI-compliant payment collection
- Pass `client_reference_id` to link checkout to internal records
- Set `mode: "payment"`, `"setup"`, or `"subscription"` as appropriate
- Configure `success_url` and `cancel_url` with session ID tracking
- Pre-fill customer email when available for better conversion
- Test with Stripe test mode and test card numbers

### PaymentIntents
- Use PaymentIntents API for custom payment flows
- Handle `requires_action` for 3D Secure authentication
- Confirm payment on server-side after client collects payment method
- Use `off_session: true` for recurring payments with saved methods
- Set `setup_future_usage` to save payment methods for later

### Webhooks
- Verify webhook signatures with `stripe.webhooks.constructEvent`
- Respond with `200 OK` quickly (within timeout); process async
- Use idempotency keys to prevent duplicate processing
- Handle retries: webhooks may be delivered multiple times
- Key event types: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`
- Log webhook receipts for debugging; dead-letter unprocessable events

### Idempotency & Retry
- Stripe idempotency keys (`Idempotency-Key` header) prevent duplicate charges
- Generate unique keys per operation (UUID v4)
- Store processed idempotency keys in DB with TTL
- Retry on network errors with exponential backoff
- Do not retry on `card_declined` or `authentication_required` without user action

### Subscription Management
- Use Stripe Billing for subscription lifecycle
- Define products and prices in Stripe Dashboard or via API
- Handle `invoice.payment_failed` → dunning (Stripe's built-in dunning or custom)
- Use `customer.subscription.updated` to sync status changes
- Offer multiple billing intervals (monthly, yearly with discount)

### Customer Portal
- Redirect users to Stripe Customer Portal for self-service
- Configure portal settings in Dashboard (plans, payment methods, invoices)
- Link: `https://billing.stripe.com/session/<session_id>` or via API
- Allows users to update payment method, switch plans, view invoices

### Refunds
- Full or partial refunds via API or Dashboard
- Refunds take 5-10 business days to appear on customer statement
- Can refund up to 120 days after charge (longer for disputes)
- Do not refund if dispute is pending; handle via dispute process

### Dispute Handling
- Respond within Stripe's deadline (typically 7-21 days)
- Submit evidence: receipts, shipping info, customer communication
- Use Stripe's dispute dashboard or API
- High dispute ratio can result in account holds or termination
- Automate dispute response with evidence submission rules

### Testing
| Scenario | Test Card / Action |
|----------|-------------------|
| Success | `4242 4242 4242 4242` |
| Decline | `4000 0000 0000 0002` |
| 3D Secure | `4000 0025 0000 3155` |
| Insufficient funds | `4000 0000 0000 9995` |
| Expired card | `4000 0000 0000 0069` |
| Test webhooks | Stripe CLI: `stripe trigger invoice.paid` |

### Async Payment Flows
- Payment methods like bank transfers (ACH, BACS) require async confirmation
- Use `payment_intent.processing` and `payment_intent.succeeded` webhooks
- Show pending status to users; update on confirmation
- Set `payment_method_options` for async payment method types
- Handle timeouts: notify user if payment not confirmed within window
