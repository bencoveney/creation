import { PropsWithChildren, createContext, useContext } from "react";
import { NewLanguage } from "../../language/names";

const Context = createContext<NewLanguage | null>(null);

export function LanguageContext({
  children,
  defaultLanguage,
}: { defaultLanguage: NewLanguage } & PropsWithChildren) {
  return (
    <Context.Provider value={defaultLanguage}>{children}</Context.Provider>
  );
}

export function useLanguage() {
  const language = useContext(Context);
  if (!language) {
    throw new Error("Whoops");
  }
  return language;
}
