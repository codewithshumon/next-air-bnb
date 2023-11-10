"use client";

import { Toaster } from "react-hot-toast";

//we are using TosterProvide insted of only Toaster
//Cause Toaster need to use useEffect. so we need a client parent comoponent
const ToasterProvider = () => {
  return <Toaster />;
};

export default ToasterProvider;
