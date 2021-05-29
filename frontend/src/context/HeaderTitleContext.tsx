import { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

interface HeaderTitleProps {
  title: string | null;
  setTitle: (newTitle: string | null) => void;
}

const titleReducer = (_: string | null, newTitle: string | null) => newTitle;

export const HeaderTitleContext = createContext({} as HeaderTitleProps);

export const HeaderTitleProvider: React.FC = ({ children }) => {
  const [state, dispacher] = useReducer(titleReducer, null);

  return (
    <HeaderTitleContext.Provider value={{ title: state, setTitle: dispacher }}>
      {children}
    </HeaderTitleContext.Provider>
  );
};

export function useHeaderTitle() {
  const context = useContext(HeaderTitleContext);

  return context.title;
}

export function useNewHeaderTitle(newTitle: string) {
  const context = useContext(HeaderTitleContext);

  useEffect(() => {
    if (newTitle) {
      context.setTitle(newTitle);
    }

    return () => {
      context.setTitle(null);
    };
  }, [context, newTitle]);
}
