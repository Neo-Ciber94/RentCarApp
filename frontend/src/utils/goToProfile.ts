import { History } from "history";
import { Routes } from "src/layout";

export function goToProfile(history: History) {
  history.push(Routes.profile.path, Routes.profile.name);
}
