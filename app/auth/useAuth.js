
import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (user) => {
    setUser(user);
    authStorage.storeUserIdInCache(user);
  };

  const logOut = async () => {
   // await Auth.signOut();
    setUser(null);
   await authStorage.removeCachedUserId();
  };

  const getLogedInUsser = async() =>{
   const user = await authStorage.getCachedUserId();
   setUser(user);
   return user;
  }


 

  return { user, logIn, logOut,getLogedInUsser };
};
