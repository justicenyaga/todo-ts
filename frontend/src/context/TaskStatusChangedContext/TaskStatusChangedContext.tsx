import React, {
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  useState,
} from "react";

export const TaskStatusChangedContext = createContext({
  updated: false,
  toggle: () => {},
});

export const TaskStatusChangedContextProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [updated, setUpdated] = useState<boolean>(false);

  function toggleHandler() {
    setUpdated(!updated);
  }

  return (
    <TaskStatusChangedContext.Provider
      value={{ updated, toggle: toggleHandler }}
    >
      {children}
    </TaskStatusChangedContext.Provider>
  );
};
