// JobContext.js
import React, { createContext, useContext, useState } from "react";

const JobContext = createContext();

export function useJobContext() {
  return useContext(JobContext);
}

export function JobProvider({ children }) {
  const [jobList, setJoblist] = useState([
    { name: "", pri: "", render: false },
  ]);

  return (
    <JobContext.Provider value={{ jobList, setJoblist }}>
      {children}
    </JobContext.Provider>
  );
}
