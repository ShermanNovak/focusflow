import { Button, Space, Select, Form, Input } from "antd";
import RightPanel from "../../components/RightPanel";
import { useState, useEffect, useRef } from "react";
import { useTasksQuery } from "../../api/tasks.query";
import SmallCaps from "../../components/SmallCaps";

export default function SessionPanel() {
  const { data: tasks } = useTasksQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(tasks)) {
    selectOptions = tasks.map((task) => ({
      value: task._id,
      label: task.title,
    }));
  }

  // duration state - input
  // current time - starts from duration and counts down
  // calculate time to deadline
  // stop - stop counting down, freeze time + reset (set current time to duration), send to db
  // pause - stop counting down, freeze time
  // continue - count down

  const [durationMinutes, setDurationMinutes] = useState(25);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [deadline, setDeadline] = useState(
    new Date(
      new Date().getTime() + durationMinutes * 60000 + durationSeconds * 1000
    )
  );
  const [minutes, setMinutes] = useState(durationMinutes);
  const [seconds, setSeconds] = useState(durationSeconds);

  const [timerIsActive, setTimerIsActive] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timer | undefined>();

  function startTimerHandler() {
    setMinutes(durationMinutes);
    setSeconds(durationSeconds);
    setDeadline(
      new Date(
        new Date().getTime() + durationMinutes * 60000 + durationSeconds * 1000
      )
    );
    setTimerIsActive(true);
  }

  function stopTimerHandler() {
    setTimerIsActive(false);
    clearInterval(intervalRef.current);
  }

  function calculateTimeToDeadline() {
    let timeDifference = deadline.valueOf() - Date.now();
    setMinutes(Math.floor((timeDifference / 1000 / 60) % 60));
    setSeconds(Math.floor((timeDifference / 1000) % 60));
  }

  useEffect(() => {
    if (timerIsActive)
      intervalRef.current = setInterval(() => calculateTimeToDeadline(), 1000);

    return () => clearInterval(intervalRef.current);
  }, [timerIsActive]);

  function editDurationHandler(values: any) {
    setEditMode(false);
    if (values.minutes !== undefined) {
      setMinutes(parseInt(values.minutes, 10));
      setDurationMinutes(parseInt(values.minutes, 10));
    }
    if (values.seconds !== undefined) {
      setSeconds(parseInt(values.seconds, 10));
      setDurationSeconds(parseInt(values.seconds, 10));
    }
    setDeadline(
      new Date(
        new Date().getTime() + durationMinutes * 60000 + durationSeconds * 1000
      )
    );
  }

  return (
    <RightPanel>
      {editMode && (
        <Form className="flex items-center" onFinish={editDurationHandler}>
          <Form.Item label="minutes" name="minutes">
            <Input
              bordered={false}
              defaultValue={durationMinutes.toString().padStart(2, "0")}
              className="text-5xl"
            ></Input>
          </Form.Item>
          <span className="text-5xl">:</span>
          <Form.Item label="seconds" name="seconds">
            <Input
              bordered={false}
              defaultValue={durationSeconds.toString().padStart(2, "0")}
              className="text-5xl"
            ></Input>
          </Form.Item>
          <Button type="default" htmlType="submit">
            Confirm
          </Button>
        </Form>
      )}
      {!editMode && (
        <>
          <div className="flex items-center justify-between">
            <div className="text-5xl">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
              onClick={() => {
                setEditMode(true);
              }}
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
          </div>
          <Form.Item className="mt-5">
            <SmallCaps text="I AM WORKING ON... 🧑‍🎓" />
            <Select
              showSearch
              placeholder="Select a task"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={selectOptions}
            />
          </Form.Item>
        </>
      )}
      <Space>
        {!timerIsActive && !editMode && (
          <Button className="bg-navbar-green" onClick={startTimerHandler}>
            Start session
          </Button>
        )}
        {timerIsActive && !editMode && (
          <>
            <Button className="bg-navbar-green" onClick={stopTimerHandler}>
              End session
            </Button>
          </>
        )}
      </Space>
    </RightPanel>
  );
}
