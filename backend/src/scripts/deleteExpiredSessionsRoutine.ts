import { ROUTINE_INVERVAL } from "src/config";
import { UserSession } from "src/entities";
import { Logger } from "src/loggers/logger";

async function deleteExpiredSessions() {
  const result = await UserSession.createQueryBuilder()
    .delete()
    .where(":now > expiresAt", { now: Date.now() })
    .execute();

  if (result.affected && result.affected > 0) {
    Logger.info(`Deleted ${result.affected} expired sessions`);
  }
}

export function startDeleteExpiredSessionsRoutine() {
  Logger.info("Starting 'delete expired sessions' routine...");
  setInterval(deleteExpiredSessions, ROUTINE_INVERVAL);
}
