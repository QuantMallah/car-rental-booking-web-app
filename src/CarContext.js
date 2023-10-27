import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Car = createContext();

const CarContext = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);


  return (
    <Car.Provider
      value={{
        alert,
        setAlert,
        user,
      }}
    >
      {children}
    </Car.Provider>
  );
};

export default CarContext;

export const CarState = () => {
  return useContext(Car);
};