import { initI18n } from "@shared/lib/i18n";
import { initTheme } from "@shared/lib/theme";
import { mountApp } from "./App";

initTheme();
initI18n();
mountApp("#app");