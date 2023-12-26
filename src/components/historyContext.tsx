import { PropsWithChildren, createContext, useContext } from "react";
import { History } from "../history";

const Context = createContext<History | null>(null);

export function HistoryContext({
  children,
  history,
}: { history: History } & PropsWithChildren) {
  return <Context.Provider value={history}>{children}</Context.Provider>;
}

export function useHistory() {
  const history = useContext(Context);
  if (!history) {
    throw new Error("Whoops");
  }
  return history;
}
