import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const DashboardPage = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
  }, []);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
