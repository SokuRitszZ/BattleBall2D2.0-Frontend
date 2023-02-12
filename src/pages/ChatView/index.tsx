import Container from "@/components/Container";
import { useNavigate } from 'react-router-dom';
import { SocketStore } from '@/store/socket';
import { useContext, useEffect, useRef, useState } from "react";

function ChatView() {
  const nav = useNavigate();
  const socket = useContext(SocketStore);
  const $input = useRef<HTMLInputElement>(null);
  const $divMsgs = useRef<HTMLDivElement>(null);
  
  const [msgs, setMsgs] = useState<any[]>([]);
  const refMsgs = useRef<any[]>([]);
  useEffect(() => {
    refMsgs.current = msgs;
    $divMsgs.current &&
      $divMsgs.current.scrollTo({ top: $divMsgs.current.scrollHeight });
  }, [msgs]);

  useEffect(() => {
    socket.on("chat:new", (data: any) => {
      setMsgs(() => [...refMsgs.current, data]);
    });
    socket.on("chat:join", (data: any) => {
      setMsgs(() => [...refMsgs.current, data]);
    });
    socket.on("chat:exit", (data: any) => {
      setMsgs(() => [...refMsgs.current, data]);
    });
    socket.on("chat:load", (data: any) => {
      setMsgs(() => [...data.msgs]);
    });
    socket.send("chat:join", {});
    return () => {
      socket.off("chat:new");
      socket.off("chat:join");
      socket.off("chat:exit");
      socket.off("chat:load");
      socket.send("chat:exit", {});
    }
  }, []);
  
  function send() {
    if (!$input.current) return ;
    const text = $input.current.value.trim();
    if (!text) return ;
    $input.current.value = "";
    socket.send("chat:new", {
      msg: text,
    });
  }

  function renderMsg(m: any) {
    return (
      <>
        <img
          className="w-[50px] h-[50px] rounded-full"
          src={m.sender.avatar}
          alt="avatar"
        />
        <div>
          <div className="">{m.sender.name}</div>
          {m.msg && (
            <div className="rounded-lg rounded-tl-none bg-slate-400 p-2 break-all w-fit">
              {m.msg}
            </div>
          )}
        </div>
      </>
    );
  }
  
  function renderJoin(m: any) {
    return <div className="text-center w-full">{m.sender.name}加入了</div>;
  }

  function renderExit(m: any) {
    return <div className="text-center w-full">{m.sender.name}退出了</div>;
  }

  function domMsgs() {
    return msgs.map((m) => (
      <div key={m.id} className="flex flex-nowrap items-start gap-2 mt-2">
        {m.join && renderJoin(m)}
        {m.msg && renderMsg(m)}
        {m.exit && renderExit(m)}
      </div>
    ));
  }

  function handleKey(e: any) {
    if (e.key === "Enter") 
      send();
  }
  
  return (
    <Container>
      <div className="w-[500px] h-[700px] bg-slate-400 p-2 rounded-xl">
        <div className="text-2xl rounded-md text-center relative p-1">
          <button onClick={() => nav(-1)} className="absolute left-1 bg-slate-600 hover:bg-slate-700 text-gray-300 active:ring-2 ring-slate-800 px-2 rounded-md">&lt;返回</button>
          聊天室
        </div>
        <div ref={$divMsgs} className="row-span-8 h-[580px] bg-slate-100 rounded-md mt-2 overflow-y-scroll p-3 scroll-smooth">
          {domMsgs()}
        </div>
        <div className="h-[40px] grid grid-cols-6 gap-2 mt-3">
          <input onKeyUp={handleKey} ref={$input} className="px-3 col-span-5 rounded-md" type="text" />
          <button onClick={send} className="text-gray-200 text-xl col-span-1 bg-slate-500 hover:bg-slate-600 active:ring-2 ring-slate-700 rounded-md">发送</button>
        </div>
      </div>
    </Container>
  );
}

export default ChatView;