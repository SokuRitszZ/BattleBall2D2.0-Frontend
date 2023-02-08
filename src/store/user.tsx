import { createContext } from "react";

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

type typePromiseVoid<P> = (p: P) => Promise<void>;

type typeParamRegister = {
  name: string;
  password: string;
  confirmedPassword: string;
};

type typeParamLogin = {
  name: string;
  password: string;
};

const userInit: typeAuthUser = {
  id: "0",
  name: "Raul",
  avatar: "https://sdfsdf.dev/100x100.png",
  status: "not logging",
  token: "",
};

type typeUserStore = {
  user: typeAuthUser;
  setUser: (user: typeAuthUser) => void;
  loginAuto: () => Promise<void>;
  register: typePromiseVoid<typeParamRegister>;
  login: typePromiseVoid<typeParamLogin>;
  logout: () => Promise<void>;
};

const storeInit: typeUserStore = {
  user: { ...userInit },
  loginAuto: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  register: function (p: typeParamRegister): Promise<void> {
    throw new Error("Function not implemented.");
  },
  login: function (p: typeParamLogin): Promise<void> {
    throw new Error("Function not implemented.");
  },
  setUser: function (user: typeAuthUser): void {
    throw new Error("Function not implemented.");
  },
  logout: function (): Promise<void> {
    throw new Error("Function not implemented.");
  }
};

export const UserStore = createContext<typeUserStore>(storeInit);
