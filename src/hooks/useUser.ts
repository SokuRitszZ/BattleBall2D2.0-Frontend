import getInfoApi from "@/api/user/get_info";
import loginApi from "@/api/user/login";
import registerApi from "@/api/user/register";
import { useEffect, useMemo, useRef, useState } from "react";

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
  name: "Raul",
  avatar: "https://sdfsdf.dev/100x100.png",
  status: "not logging",
  token: "",
};

function useUser() {
  const [user, setUser] = useState<typeAuthUser>({ ...userInit });
  const refUser = useRef<typeAuthUser>({ ...userInit });

  function setState(status: typeStatus) {
    if (!refUser.current) return;
    setUser({
      ...refUser.current,
      status,
    });
  }

  function setToken(token: string) {
    if (!refUser.current) return;
    localStorage.setItem('token', token);
    setUser({
      ...refUser.current,
      token,
    });
  }

  // 自动更新拿到最新 user 数据
  useEffect(() => {
    refUser.current = user;
  }, [user]);

  // 打开自动登录
  const getToken = useMemo(() => {
    setToken(localStorage.getItem("token") || "");
    return user.token;
  }, [user.token]);

  async function loginAuto() {
    if (!getToken) return;
    setState("logging in");
    getInfoApi()
      .then((data: any) => {
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

  // 登录
  async function login(loginService: { name: string; password: string }) {
    try {
      setState("logging in");
      const { token } = await loginApi(loginService) as any;
      setToken(token);
      const userGet: typeUser = await getInfoApi() as any;
      setUser({
        ...refUser.current,
        ...userGet,
        status: "logged in",
      });
    } catch (e) {
      setState("not logging");
    }
  }

  async function logout() {
    setToken("");
    setState("not logging");
  }

  // 注册
  async function register(registerService: {
    name: string;
    password: string;
    confirmedPassword: string;
  }) {
    try {
      setState("logging in");
      const { token } = await registerApi(registerService) as any;
      setToken(token);
      const userGet: typeUser = await getInfoApi() as any;
      setUser({
        ...refUser.current,
        ...userGet,
        status: "logged in",
      });
    } catch (e) {
      alert((e as Error).message);
      setState("not logging");
    }
  }

  return {
    user,
    setUser,
    login,
    register,
    loginAuto,
    logout,
  };
}

export default useUser;
