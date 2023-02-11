import Container from "@/components/Container";
import useCurrency from "@/hooks/useCurrency";
import { typeUser, UserStore } from "@/store/user";
import { useContext, useEffect, useRef } from 'react';
import { SocketStore } from '@/store/socket';
import { useNavigate } from "react-router-dom";

type typeUserOK = typeUser & {
  ok?: boolean;
};

function ReadyView() {
  const [users, setUsers, refUsers] = useCurrency<typeUserOK[]>([]);
  const socket = useContext(SocketStore);
  const $input = useRef<HTMLInputElement>(null);
  const { user } = useContext(UserStore);
  const nav = useNavigate();
  let started = false;

  useEffect(() => {
    socket.on("game:join", (data: any) => {
      if (!$input.current) return ;
      $input.current.value = data.id;
      setUsers(data.room);
    });
    socket.on("game:exit", (data: any) => {
      if (!refUsers.current) return ;
      setUsers(refUsers.current.filter(u => u.id !== data.idUser));
    });
    socket.on("game:ok", (data: any) => {
      setUsers((users) => {
        const index = users.findIndex(u => u.id === data.id);
        if (index !== -1) users[index].ok = data.ok;
        return [...users];
      });
    });
    socket.on("game:start", (data: any) => {
      started = true;
      nav("/game_multi");
    });
    return () => {
      if (!started) socket.send("game:exit", {});
      socket.off("game:join");
      socket.off("game:exit");
      socket.off("game:ok");
      socket.off("game:start");
    }
  }, []);

  function join() {
    if (!$input.current) return ;
    socket.send("game:join", {
      id: $input.current.value,
    });
  }

  function domUser(u: typeUserOK) {
    return (
      <div onClick={() => toggleOk(u)}
        key={u.id}
        className={[
          "p-2 flex rounded-md gap-2 transition cursor-pointer hover:bg-teal-200 active:ring-2 ring-black",
          u.ok ? "bg-green-400" : "bg-slate-200",
        ].join(" ")}
      >
        <img
          className="w-[40px] h-[40px] rounded-md"
          src={u.avatar}
          alt="avatar"
        />
        <div className="flex items-center">{u.name}</div>
      </div>
    );
  }

  function toggleOk(u: typeUserOK) {
    u.id === user.id && socket.send("game:ok", {});
  }

  return (
    <Container>
      <div className="flex flex-col w-[400px] h-[400px] bg-slate-400 p-5 rounded-xl gap-2">
        <div className="w-full text-3xl font-bold text-center">多人游戏</div>
        <div className="flex relative justify-end items-center">
          <input
            ref={$input}
            placeholder="房间号（留空代表随机加入）"
            type="text"
            className="rounded-md px-2 w-full h-[30px]"
          />
          <button onClick={join} className="text-sm right-1 absolute px-2 rounded-md bg-slate-500 hover:bg-slate-600 active:ring-2 ring-black text-white">
            加入
          </button>
        </div>
        <div className="flex-grow bg-slate-300 rounded-md flex flex-col overflow-y-scroll gap-2 p-2">
          {users.map(domUser)}
        </div>
      </div>
    </Container>
  );
}

export default ReadyView;