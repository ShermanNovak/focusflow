import { Button, Space, Select, Form } from "antd";
import RightPanel from "../../components/RightPanel";
import { useState, useEffect, useRef } from "react";
import { useTasksQuery } from "../../api/tasks.query";

export default function SessionPanel() {
  const { data: tasks } = useTasksQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(tasks)) {
    selectOptions = tasks.map((task) => ({
      value: task._id,
      label: task.title,
    }));
  }

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [duration, setDuration] = useState(25 * 60);
  const [deadline, setDeadline] = useState("2023-09-21");
  const [timerIsActive, setTimerIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timer | undefined>();

  function stopTimerHandler() {
    setTimerIsActive(false);
    setHours(0);
    setMinutes(0);
    clearInterval(intervalRef.current);
  }

  function calculateTimeToDeadline() {
    const time = Date.parse(deadline) - Date.now();

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => calculateTimeToDeadline(), 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <RightPanel>
      <div className="text-5xl">
        {hours}:{minutes}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
      </svg>

      <Form.Item>
        <Select
          showSearch
          placeholder="Select a task"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={selectOptions}
        />
      </Form.Item>
      <Space>
        {!timerIsActive && (
          <Button
            className="bg-navbar-green"
            onClick={() => {
              setTimerIsActive(true);
            }}
          >
            Start session
          </Button>
        )}
        {timerIsActive && (
          <Button className="bg-navbar-green" onClick={stopTimerHandler}>
            Stop session
          </Button>
        )}
      </Space>
    </RightPanel>
  );
}
