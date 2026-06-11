---
name: firebase-firestore
description: Firebase and Firestore expertise covering security rules, NoSQL data modeling, real-time listeners, batched writes, transactions, indexes, subcollections, Functions, and authentication
license: MIT
compatibility: opencode
---

## firebase-firestore

### Security Rules
- `match /databases/{database}/documents` — root scope
- Granular read/write/delete rules per collection/document
- Validate data shape with `request.resource.data`
- Use `request.auth` for auth-based access control
- Test rules in Firebase Emulator Suite

### NoSQL Data Modeling for Firestore
- **Denormalize** for read performance — duplicate data across documents
- **Subcollections** — group related data under a parent document (max 1MB per doc)
- **Collections, not joins** — model for access patterns
- Avoid deeply nested data in a single document
- Document references vs subcollections: references for loose coupling, subcollections for strong parent-child

### Real-Time Listeners
- `onSnapshot()` for real-time updates
- Detach listeners when component unmounts to avoid leaks
- `SnapshotOptions` with `{ includeMetadataChanges: true }` for cache awareness
- Use `source: 'server'` / `source: 'cache'` to control data source

### Batched Writes & Transactions
- **Batched writes** — up to 500 operations, atomic but not transactional
- **Transactions** — for read-modify-write patterns (counters, balance updates)
- Transaction retry on concurrent modification
- Avoid transactions on documents that are updated frequently (high contention)

### Indexes
- Firestore requires composite indexes for multi-field queries
- Automatic single-field indexes; manual composite index creation
- Index exemption for fields that don't need indexing
- `IN` and `array-contains-any` queries need special index handling
- Index management via `firebase.json` or Firebase Console

### Firebase Functions & Auth
- **Callable functions** — `onCall()` for authenticated, CORS-aware HTTPS
- **Background functions** — `onDocumentWritten/Created/Updated/Deleted`
- Multi-region deployment for latency reduction
- Auth triggers: `onCreate`, `onDelete` for user lifecycle hooks
- Custom claims for role-based access (`admin`, `premium`, etc.)
