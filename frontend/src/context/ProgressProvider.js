import React, { createContext, useState } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [unlockStatus, setUnlockStatus] = useState({
    module1: true,
    module2: false,
    module3: false,
    module4: false,
    module5: false,
    module6: false,
  });

  return (
    <ProgressContext.Provider value={{ unlockStatus, setUnlockStatus }}>
      {children}
    </ProgressContext.Provider>
  );
}

export default ProgressContext;