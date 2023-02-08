import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function useSocket() {
  const refEvents = useRef<Map<string, Function[]>>(
    new Map<string, Function[]>()
  );

  // 实时更新socket
  const [socket, setSocket] = useState<WebSocket>();
  const refSocket = useRef<WebSocket>();

  useEffect(() => {
    refSocket.current = socket;
  }, [socket]);

  function connect(url: string) {
    if (refSocket.current && refSocket.current.readyState === WebSocket.OPEN) return ;
    const ws = new WebSocket(url);
    ws.onmessage = (message) => {
      const msg = JSON.parse(message.data);
      const { event, data } = msg;
      emit(event, data);
    };
    ws.onopen = () => console.log("open");
    ws.onclose = () => console.log("close");
    ws.onerror = (err) => console.log("error", err);
    setSocket(ws);
  }

  function on(event: string, callback: Function) {
    const list = refEvents.current.get(event) || [];
    list.push(callback);
    refEvents.current.set(event, list);
  }

  function off(event: string) {
    refEvents.current.set(event, []);
  }

  function clear() {
    refEvents.current = new Map<string, Function[]>();
  }

  function emit(event: string, data: any) {
    const list = refEvents.current.get(event) || [];
    list.forEach((fn) => fn(data));
  }

  function close() {
    if (!refSocket.current) return ;
    if (WebSocket.CLOSED) return ;
    refSocket.current.close();
  }

  function sendMessage(event: string, data: any) {
    if (!refSocket.current) return;
    refSocket.current.send(JSON.stringify({ event, data }));
  }

  return {
    connect,
    on,
    off,
    clear,
    emit,
    sendMessage,
    close,
  };
}

export default useSocket;
