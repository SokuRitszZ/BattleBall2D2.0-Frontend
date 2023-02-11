import { useEffect, useRef, useState } from "react";

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
      // console.log(msg); //
      const { event, data } = msg;
      emit(event, data);
    };
    ws.onopen = () => console.log("open");
    ws.onclose = () => console.log("close");
    ws.onerror = (err) => console.log("error", err);
    setSocket(ws);
    emit("open");
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

  function emit(event: string, ...data: any) {
    const list = refEvents.current.get(event) || [];
    list.forEach((fn) => fn(...data));
  }

  function close() {
    if (!refSocket.current) return ;
    if ([WebSocket.CLOSING, WebSocket.CLOSED].includes(refSocket.current.readyState)) return ;
    refSocket.current.close();
  }

  function send(event: string, data: any) {
    if (!refSocket.current) return;
    if (refSocket.current.readyState !== WebSocket.OPEN) return ;
    if (typeof data === "string") refSocket.current.send(data);
    else refSocket.current.send(JSON.stringify({ event, data }));
  }

  function clearAll() {
    if (!refSocket.current) return ;
    const keys = [...refEvents.current.keys()];
    keys.forEach(k => refEvents.current.set(k, []));
  }

  return {
    connect,
    on,
    off,
    clear,
    emit,
    send,
    close,
    clearAll,
  };
}

export default useSocket;
