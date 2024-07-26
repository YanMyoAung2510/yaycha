import { useContext } from "react";
import { AppContext } from "./ThemedApp";

export function useApp() {
  return useContext(AppContext);
}
