# Security Specification for SmartTools Hub

## Data Invariants
1. A User document can only be created/modified by the authenticated user whose `uid` matches the document ID.
2. ToolHistory documents can only be created/read/deleted by the owner of the parent User document.
3. Users cannot update their own `uid` or `createdAt` fields once set.
4. History items are immutable once created (only create/delete allowed, no updates).

## The Dirty Dozen Payloads
1. **Identity Theft**: Creating a User doc with a different UID in data than the path.
2. **Profile Hijack**: Updating another user's language preference.
3. **Ghost Writes**: Writing to history without an authenticated session.
4. **Data Poisoning**: Injecting 1MB string into the language field.
5. **Cross-User Leak**: Authenticated User A reading User B's history.
6. **Immutable Breach**: Attempting to change `createdAt` on a user profile.
7. **Admin Spoofing**: Trying to set `isAdmin: true` (even though not explicitly used, rules should block it).
8. **Shadow Field Injection**: Adding `isVerified: true` to a profile during update.
9. **History Tampering**: Updating an existing history record to change the output value.
10. **Path Injection**: Using a 2KB string as a `userId`.
11. **Type Mismatch**: Sending an array as the `language` field.
12. **System Impersonation**: Setting `systemNote` field (if it existed) from client.

## Test Runner (Logic Overview)
The `firestore.rules` will be validated against these payloads.
- `allow create/update` for User: Must check `request.auth.uid == userId`.
- `allow create/read/delete` for History: Must check `request.auth.uid == userId` and relational integrity.
