import { PropsWithChildren, createContext, useContext } from "react";
import { Language } from "../../language";

const Context = createContext<Language | null>(null);

export function LanguageContext({
  children,
  defaultLanguage,
}: { defaultLanguage: Language } & PropsWithChildren) {
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
