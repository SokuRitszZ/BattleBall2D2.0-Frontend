import Container from "@/components/Container";
import { SocketStore } from "@/store/socket";
import { UserStore } from "@/store/user";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { mode, ws } from "@/config.json";

type typeLink = {
  to: string;
  content: string;
};

function LobbyView() {
  const { user } = useContext(UserStore);
  const socket = useContext(SocketStore);
  const loc = useLocation();

  useEffect(() => {
    socket.connect(`${ws[mode]}`);
  }, []);
  
  useEffect(() => {
    if (loc.pathname === "/" || loc.pathname === "/account") {
      socket.close();
    }
  }, [loc.pathname]);

  const links: typeLink[] = [
    { to: "/lobby", content: "单人游戏", },
    { to: "/lobby", content: "多人游戏", },
    { to: "/settings", content: "账号设置", },
    { to: "/account", content: "退出大厅", },
    { to: "/lobby", content: "公共聊天", },
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
