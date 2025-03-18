"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { getAllProblems } from "../db/dbActions";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
  allProblems: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allProblems, setAllProblems] = useState([]);
  const value = {
    currentUser,
    setCurrentUser,
    allProblems,
  };

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await getAllProblems();
      setAllProblems(problems);
    };

    fetchProblems();

    const unsubscribe = onAuthStateChangedListener((user) =>
      setCurrentUser(user)
    );
    return unsubscribe;
  }, [currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
