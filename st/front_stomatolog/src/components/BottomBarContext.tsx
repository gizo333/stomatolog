import React, { createContext, useContext } from 'react';

interface BottomBarContextProps {
  onButtonClick: (buttonIndex: number) => void;
}

const BottomBarContext = createContext<BottomBarContextProps | undefined>(undefined);

interface BottomBarProviderProps {
  children: React.ReactNode;
}

export const BottomBarProvider: React.FC<BottomBarProviderProps> = ({ children }) => {
  const handleButtonClick = (buttonIndex: number) => {
    console.log(`Button ${buttonIndex + 1} clicked`);
  };

  return (
    <BottomBarContext.Provider value={{ onButtonClick: handleButtonClick }}>
      {children}
    </BottomBarContext.Provider>
  );
};

export const useBottomBar = () => {
  const context = useContext(BottomBarContext);
  if (!context) {
    throw new Error('useBottomBar must be used within a BottomBarProvider');
  }
  return context;
};
