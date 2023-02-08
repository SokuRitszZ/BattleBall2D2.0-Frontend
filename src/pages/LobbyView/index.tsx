import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserStore } from "./../../store/user";

type typeLink = {
  to: string;
  content: string;
};

function LobbyView() {
  const userStore = useContext(UserStore);

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
      to: "/lobby",
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
    <div className="w-screen h-screen min-w-[1200px] min-h-[800px] flex justify-center items-center">
      <div className="w-[400px] h-[500px] bg-slate-400 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2">
        {links.map((l) => (
          <Link key={l.content} to={l.to}>
            <button className="px-3 py-2 bg-gray-500 hover:bg-slate-600 text-4xl text-gray-300 rounded-xl active:ring-2 ring-slate-700">
              {l.content}
            </button>
          </Link>
          )
        )}
      </div>
    </div>
  );
}

type typePropsLink = {
  to: string;
  children: any;
};

export default LobbyView;
