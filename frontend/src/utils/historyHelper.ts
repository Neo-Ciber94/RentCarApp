import { History } from "history";
import { BaseRoutes } from "src/layout";

export function goToProfile(history: History) {
  history.push(BaseRoutes.profile.path, BaseRoutes.profile.name);
}

export function goToBrands(history: History) {
  history.push(BaseRoutes.brands.path, BaseRoutes.brands.name);
}
