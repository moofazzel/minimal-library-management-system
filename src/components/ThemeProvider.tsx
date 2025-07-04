import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <div className="light">{children}</div>;
};

export default ThemeProvider;
