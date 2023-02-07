import getInfoApi from "@/api/user/get_info";
import loginApi from "@/api/user/login";
import registerApi from "@/api/user/register";
import { useEffect, useRef, useState } from "react";

type typeUser = {
  id: string;
  name: string;
  avatar: string;
};

type typeStatus = "not logging" | "logging in" | "logged in";

type typeAuthUser = typeUser & {
  status: typeStatus;
  token: string;
};

const userInit: typeAuthUser = {
  id: "0",
  name: "",
  avatar: "",
  status: "not logging",
  token: "",
};

function useUser() {
  const [user, setUser] = useState<typeAuthUser>({...userInit});

  const refUser = useRef<typeAuthUser>({...userInit});

  useEffect(() => {
    refUser.current = user;
  }, [user]);

  function setState(status: typeStatus) {
    if (!refUser.current) return ;
    setUser({
      ...refUser.current,
      status,
    });
  }

  function setToken(token: string) {
    if (!refUser.current) return ;
    setUser({
      ...refUser.current,
      token,
    });
  }
  
  function login(loginService: {name: string, password: string}) {
    setState("logging in");
    loginApi(loginService)
      .then((data: any) => {
        setToken(data.token);
        return getInfoApi(data.token);
      })
      .then((data: typeUser) => {
        setUser({
          ...refUser.current,
          ...data,
          status: "logged in",
        });
      })
      .catch(() => {
        setState("not logging");
      });
  }

  function register(registerService: {name: string, password: string, confirmedPassword: string}) {
    setState("logging in");
    registerApi(registerService)
      .then((data: any) => {
        setToken(data.token);
        return getInfoApi(data.token);
      })
      .then((data: typeUser) => {
        setUser({
          ...refUser.current,
          ...data,
          status: "logged in",
        });
      })
      .catch(() => {
        setState("not logging");
      });
  }

  return {
    user,
    login,
    register,
  };
}

export default useUser;
