import { Button, Space } from "antd";
import RightPanel from "../../components/RightPanel";
import { useState } from "react";

export default function SessionPanel() {
  const [timer, setTimer] = useState('00:00:00');
  return (
    <RightPanel>
      <div>{timer}</div>
      <Space>
        <Button className="bg-navbar-green">Start</Button>
        <Button className="bg-navbar-green">Stop</Button>
      </Space>
    </RightPanel>
  );
}
