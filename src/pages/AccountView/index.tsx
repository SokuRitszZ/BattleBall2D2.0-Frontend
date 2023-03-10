import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserStore } from "@/store/user";
import Container from './../../components/Container';
import { SocketStore } from "@/store/socket";

function AccountView() {
  const $inputName = useRef<HTMLInputElement>(null);
  const $inputPassword = useRef<HTMLInputElement>(null);
  const $inputConfirmedPassword = useRef<HTMLInputElement>(null);

  const { user, login, register, loginAuto, logout } = useContext(UserStore);
  const { close } = useContext(SocketStore);

  // 自动登录
  useEffect(() => {
    loginAuto();
    close();
  }, []);

  function getForm() {
    if (
      !$inputName.current ||
      !$inputPassword.current ||
      !$inputConfirmedPassword.current
    )
      return null;
    return {
      name: $inputName.current.value,
      password: $inputPassword.current.value,
      confirmedPassword: $inputConfirmedPassword.current.value,
    };
  }

  function handleRegister() {
    const form = getForm();
    if (!form) return;
    register(form);
  }

  function handleLogin() {
    const form = getForm();
    if (!form) return;
    login(form);
  }

  function viewForm() {
    return (
      <div className="text-gray-600">
        <label htmlFor="name">用户名</label>
        <input
          ref={$inputName}
          className="px-3 w-full h-[40px] rounded-md mb-5"
          type="text"
          id="name"
        />
        <label htmlFor="password">密码</label>
        <input
          ref={$inputPassword}
          className="px-3 w-full h-[40px] rounded-md mb-5"
          type="password"
          id="password"
        />
        <label htmlFor="confirmed-password">确认密码</label>
        <input
          ref={$inputConfirmedPassword}
          className="px-3 w-full h-[40px] rounded-md"
          type="password"
          id="confirmed-password"
        />
        <div className="w-full grid grid-cols-2 gap-2 mt-6">
          <Button onClick={handleRegister}>注册</Button>
          <Button onClick={handleLogin}>登录</Button>
        </div>
      </div>
    );
  }

  function viewLogging() {
    return (
      <div className="text-5xl w-full h-full flex justify-center items-center">
        Logging in...
      </div>
    );
  }

  function viewLoggedIn() {
    return (
      <>
        <div className="w-full h-full flex justify-center items-center text-center">
          <div>
            <div className="text-4xl text-gray-600">欢迎您! {user.name}</div>
            <img
              className="mt-4 m-auto rounded-lg shadow-lg"
              src={user.avatar}
              alt="avatar"
            />
            <div className="flex gap-2 justify-center">
              <Link to="/lobby">
                <button className="bg-slate-500 text-white px-3 py-2 mt-5 rounded-md hover:bg-slate-600 active:ring-2 ring-slate-700"> 进入大厅 </button>
              </Link>
              <button onClick={logout} className="bg-slate-500 text-white px-3 py-2 mt-5 rounded-md hover:bg-slate-600 active:ring-2 ring-slate-700"> 退出账号 </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Container>
      <div className="bg-gray-200 w-[400px] h-[330px] rounded-md shadow-md p-3">
        {(user.status === "not logging" && viewForm()) ||
          (user.status === "logging in" && viewLogging()) ||
          (user.status === "logged in" && viewLoggedIn())}
      </div>
    </Container>
  );
}

export default AccountView;

function Button(props: any) {
  return (
    <button
      {...props}
      className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 active:ring-2 ring-gray-500"
    >
      {props.children}
    </button>
  );
}
