"use client";

import { useGetMeQuery } from "@/redux/features/auth/authApi";

const AuthInitializer = ({ children }) => {
  useGetMeQuery();

  return children;
};

export default AuthInitializer;