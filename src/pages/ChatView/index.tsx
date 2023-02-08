import Container from "@/components/Container";
import { useNavigate } from 'react-router-dom';

function ChatView() {
  const nav = useNavigate();

  return (
    <Container>
      <div className="w-[500px] h-[700px] bg-slate-400 p-5 rounded-xl">
        <div className="text-2xl bg-slate-500 rounded-md text-center relative p-1">
          <button onClick={() => nav(-1)} className="absolute left-1 bg-slate-600 hover:bg-slate-700 text-gray-300 active:ring-2 ring-slate-800 px-2 rounded-md">&lt;返回</button>
          聊天室
        </div>
        <div className="row-span-8 h-[580px] bg-slate-100 rounded-md mt-2">
        
        </div>
        <div className="h-[30px] grid grid-cols-6 gap-2 mt-3">
          <input className="px-3 col-span-5 rounded-md" type="text" />
          <button className="text-gray-200 text-xl col-span-1 bg-slate-500 hover:bg-slate-600 active:ring-2 ring-slate-700 rounded-md">发送</button>
        </div>
      </div>
    </Container>
  )
}

export default ChatView;