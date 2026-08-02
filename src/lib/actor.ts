/**
 * Actor resolution (docs/engineering/auth.md, ADR-024, ADR-025).
 * Every Server Action resolves one of these; learner_id never comes from client input.
 */
export type Actor = { kind: "registered"; userId: string } | { kind: "guest"; anonymousId: string };

/** Stable identifier for rate-limit buckets and logging (kind-prefixed, never logged raw at info). */
export function actorKey(actor: Actor): string {
  return actor.kind === "registered" ? `u:${actor.userId}` : `g:${actor.anonymousId}`;
}
