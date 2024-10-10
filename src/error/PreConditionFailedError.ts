export function preConditionFailed(name: string): never {
  const error = new Error(name + " precondition failed");
  (error as any).status = 412;
  throw error;
}
