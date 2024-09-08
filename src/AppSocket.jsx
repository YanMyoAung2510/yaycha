import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useApp } from "./useApp";
import { queryClient } from "./ThemedApp";

const AppSocket = () => {
  const { auth } = useApp();
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    import.meta.env.VITE_WS
  );

  useEffect(() => {
    if (auth && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        token: localStorage.getItem("token"),
      });
      console.log("WS: connection ready & token sent");
      console.log("this is ready state" + readyState);
    }
  }, [readyState, auth, sendJsonMessage]);

  useEffect(() => {
    console.log("WS: new message received");
    if (lastJsonMessage && lastJsonMessage.event) {
      queryClient.invalidateQueries(lastJsonMessage.event);
    }
  }, [lastJsonMessage]);
  return <></>;
};

export default AppSocket;
