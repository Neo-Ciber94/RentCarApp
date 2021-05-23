import { ROUTINE_INVERVAL } from "src/config";
import { UserSession } from "src/entities";

async function deleteExpiredSessions() {
  const result = await UserSession.createQueryBuilder()
    .delete()
    .where(":now > expiresAt", { now: Date.now() })
    .execute();

  if (result.affected && result.affected > 0) {
    console.log(`Deleted ${result.affected} expired sessions`);
  }
}

export function startDeleteExpiredSessionsRoutine() {
  console.log("Starting 'delete expired sessions' routine...");
  setInterval(deleteExpiredSessions, ROUTINE_INVERVAL);
}
