import { History } from "history";
import { Routes } from "src/layout";

export function goToProfile(history: History) {
  history.push(Routes.profile.path, Routes.profile.name);
}

export function goToBrands(history: History) {
  history.push(Routes.brands.path, Routes.brands.name);
}
