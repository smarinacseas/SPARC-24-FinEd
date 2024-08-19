import React, { createContext, useState, useContext } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [unlockStatus, setUnlockStatus] = useState({
    module1: true,
    module2: false,
    module3: false,
    module4: false,
    module5: false,
    module6: false,
    module7: false,
  });

  return (
    <ProgressContext.Provider value={{ unlockStatus, setUnlockStatus }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);