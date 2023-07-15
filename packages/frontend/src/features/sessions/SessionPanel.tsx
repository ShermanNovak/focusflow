import toast from "react-hot-toast";

import { PanelContext } from "../../context/PanelContext";
import { Button, Space, Select, Form, Input, Segmented } from "antd";
import { useState, useEffect, useRef, useContext } from "react";
import { useTasksQuery } from "../../api/tasks.query";
import { useSessionCreation } from "../../api/sessions.query";

import RightPanel from "../../components/RightPanel";
import SmallCaps from "../../components/SmallCaps";

/*

focus mode:
1. edit duration -> sets focus minutes + focus seconds
2. start session -> sets deadline, starts countdown
3. end session -> switch mode from focus to break, set minutes and seconds accordingly + creates session in DB

break mode:
1. edit duration -> sets break minutes + break seconds
2. start session -> sets deadline, starts countdown
3. end session -> switch mode from break to focus, set minutes and seconds accordingly

*/

export default function SessionPanel() {
  const { data: tasks } = useTasksQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(tasks)) {
    selectOptions = tasks.map((task) => ({
      value: task._id,
      label: task.title,
    }));
  }

  const createSessionMutation = useSessionCreation();

  const panelContext = useContext(PanelContext);

  const [focusMinutes, setDurationMinutes] = useState(25);
  const [focusSeconds, setDurationSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [minutes, setMinutes] = useState(focusMinutes);
  const [seconds, setSeconds] = useState(focusSeconds);

  const [deadline, setDeadline] = useState(
    new Date(new Date().getTime() + focusMinutes * 60000 + focusSeconds * 1000)
  );

  const [timerIsActive, setTimerIsActive] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [focusOrBreakMode, setFocusOrBreakMode] = useState("Focus");
  const [selectedTask, setSelectedTask] = useState(undefined);

  const intervalRef = useRef<NodeJS.Timer | undefined>();

  function startTimerHandler() {
    let totalFocusDuration = focusMinutes * 60000 + focusSeconds * 1000;

    if (focusOrBreakMode === "Focus")
      setDeadline(new Date(new Date().getTime() + totalFocusDuration));
    if (focusOrBreakMode === "Break")
      setDeadline(new Date(new Date().getTime() + totalFocusDuration));

    setTimerIsActive(true);
  }

  function resetMinutesAndSeconds() {
    if (focusOrBreakMode === "Focus") {
      setFocusOrBreakMode("Break");
      setMinutes(breakMinutes);
      setSeconds(breakSeconds);
    }

    if (focusOrBreakMode === "Break") {
      setFocusOrBreakMode("Focus");
      setMinutes(focusMinutes);
      setSeconds(focusSeconds);
    }
  }

  function createSession() {
    let totalFocusDuration = focusMinutes * 60000 + focusSeconds * 1000;
    try {
      createSessionMutation.mutate({
        duration: totalFocusDuration - (deadline.valueOf() - Date.now()),
        startTime: new Date(deadline.valueOf() - totalFocusDuration),
        endTime: new Date(),
        task: selectedTask,
      });
      toast.success("Session recorded!");
    } catch (e: any) {
      console.log(e.message);
    }
  }

  function stopTimerHandler() {
    setTimerIsActive(false);
    clearInterval(intervalRef.current);
    resetMinutesAndSeconds();
    createSession();
  }

  function calculateTimeToDeadline() {
    let timeDifference = deadline.valueOf() - Date.now();
    setMinutes(Math.max(Math.floor((timeDifference / 1000 / 60) % 60), 0));
    setSeconds(Math.max(Math.floor((timeDifference / 1000) % 60), 0));

    if (timeDifference < 0) {
      clearInterval(intervalRef.current);
      setTimerIsActive(false);
      createSession();
    }
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

      if (focusOrBreakMode === "Focus")
        setDurationMinutes(parseInt(values.minutes, 10));
      if (focusOrBreakMode === "Break")
        setBreakMinutes(parseInt(values.minutes, 10));
    }
    if (values.seconds !== undefined) {
      setSeconds(parseInt(values.seconds, 10));

      if (focusOrBreakMode === "Focus")
        setDurationSeconds(parseInt(values.seconds, 10));
      if (focusOrBreakMode === "Break")
        setBreakSeconds(parseInt(values.seconds, 10));
    }
  }

  return (
    <RightPanel>
      {editMode && (
        <Form className="flex items-center" onFinish={editDurationHandler}>
          <Form.Item label="minutes" name="minutes">
            <Input
              bordered={false}
              defaultValue={
                focusOrBreakMode === "Focus"
                  ? focusMinutes.toString().padStart(2, "0")
                  : breakMinutes.toString().padStart(2, "0")
              }
              className="text-5xl"
            ></Input>
          </Form.Item>
          <span className="text-5xl">:</span>
          <Form.Item label="seconds" name="seconds">
            <Input
              bordered={false}
              defaultValue={
                focusOrBreakMode === "Focus"
                  ? focusSeconds.toString().padStart(2, "0")
                  : breakSeconds.toString().padStart(2, "0")
              }
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
          {focusOrBreakMode === "Focus" && (
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
                disabled={timerIsActive}
                onChange={(e) => setSelectedTask(e)}
                allowClear={true}
              />
            </Form.Item>
          )}
          <Space>
            <Segmented
              options={["Focus", "Break"]}
              value={focusOrBreakMode}
              onChange={(e) => {
                setFocusOrBreakMode(e.toString());
                resetMinutesAndSeconds();
              }}
              disabled={timerIsActive}
            />
            {!timerIsActive && (
              <>
                <Button className="bg-navbar-green" onClick={startTimerHandler}>
                  Start session
                </Button>
                <Button type="default" onClick={panelContext.closeSessionPanel}>
                  Close
                </Button>
              </>
            )}
            {timerIsActive && (
              <Button className="bg-navbar-green" onClick={stopTimerHandler}>
                End session
              </Button>
            )}
          </Space>
        </>
      )}
    </RightPanel>
  );
}
