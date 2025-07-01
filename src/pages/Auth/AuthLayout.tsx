import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="border-red w-full min-h-screen bg-white-10">{children}</div>
  );
};

export default AuthLayout;
