import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserStore } from "./../../store/user";
import Container from './../../components/Container';

type typeLink = {
  to: string;
  content: string;
};

function LobbyView() {
  const {user} = useContext(UserStore);

  const links: typeLink[] = [
    {
      to: "/lobby",
      content: "单人游戏",
    },
    {
      to: "/lobby",
      content: "多人游戏",
    },
    {
      to: "/settings",
      content: "账号设置",
    },
    {
      to: "/lobby",
      content: "退出账号",
    },
    {
      to: "/lobby",
      content: "公共聊天",
    },
  ];

  return (
    <Container>
      <div className="w-[400px] p-10 bg-slate-400 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2">
        <img className="shadow-xl rounded-full" src={user.avatar} alt="avatar" />
        <div className="text-5xl mb-10">{user.name}</div>
        {links.map((l) => (
          <Link key={l.content} to={l.to}>
            <button className="px-3 py-2 bg-gray-500 hover:bg-slate-600 text-4xl text-gray-300 rounded-xl active:ring-2 ring-slate-700">
              {l.content}
            </button>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default LobbyView;
