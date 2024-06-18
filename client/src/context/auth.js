import {useState,useContext,useEffect,createContext} from 'react';
import axios from 'axios';
const AuthConext=createContext();
const AuthProvider=({children})=>{
    const [auth,setAuth]= useState({
        user:null,
        token:""
    });
    axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
    return (<AuthConext.Provider value={[auth,setAuth]}>
       {children}
    </AuthConext.Provider>
    )
}
const useAuth=()=>useContext(AuthConext);
export {useAuth, AuthProvider};
