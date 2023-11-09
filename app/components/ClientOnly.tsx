"use client";
import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

//this component will work as wrapper of every component to avoid
//hydration error
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
