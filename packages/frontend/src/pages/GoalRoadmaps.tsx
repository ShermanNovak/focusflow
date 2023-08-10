import toast from "react-hot-toast";

import {
  useGoalsQuery,
  useGoalCreation,
  useGoalDelete,
} from "../api/goals.query";
import { useTasksForGoalQuery } from "../api/tasks.query";
import {
  Form,
  Input,
  List,
  Select,
  Checkbox,
  Modal,
  Progress,
  Spin,
} from "antd";
import { KeyboardEvent, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";

import SmallCaps from "../components/SmallCaps";
import PageTitle from "../components/PageTitle";

export default function GoalRoadmaps() {
  const createGoalMutation = useGoalCreation();
  const [goalForm] = Form.useForm();

  const createGoalHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        goalForm.validateFields().then((values) => {
          createGoalMutation.mutate(values);
          toast.success("Successfully created goal!");
        });
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  };

  const { data: goalsData, isLoading: goalsAreLoading } = useGoalsQuery();
  const [selectedGoal, setSelectedGoal] = useState();
  const { data: tasksData } = useTasksForGoalQuery(selectedGoal || "");

  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(goalsData)) {
    selectOptions = goalsData.map((goal) => ({
      value: goal._id,
      label: goal.title,
    }));
  }

  const { confirm } = Modal;
  const [deleteGoal, setDeleteGoal] = useState(selectedGoal || "");
  const deleteGoalMutation = useGoalDelete(deleteGoal);

  const filteredTasks = tasksData?.filter((task: any) => {
    return task.isCompleted;
  });

  return (
    <div className="p-8 w-full">
      <PageTitle text="Goal Roadmaps" />
      <div className="flex gap-x-1 items-center mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
        <SmallCaps text="CREATE NEW GOALS HERE!" />
      </div>
      <Form form={goalForm}>
        <Form.Item name="title">
          <Input className="bg-pale-purple" onKeyDown={createGoalHandler} />
        </Form.Item>
      </Form>
      <SmallCaps text="TRACK THE PROGRESS OF YOUR GOALS ✏️" />
      <Form.Item name="goal" label="Goal">
        <Select
          showSearch
          placeholder="Select a goal to view"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={selectOptions}
          allowClear={true}
          onChange={(value) => {
            setSelectedGoal(value);
          }}
          defaultValue={selectedGoal}
        />
      </Form.Item>
      <List
        bordered
        dataSource={tasksData}
        renderItem={(task: any) => (
          <List.Item className="py-2" key={task._id}>
            <Checkbox checked={task.isCompleted}>{task.title}</Checkbox>
          </List.Item>
        )}
      />
      <Progress percent={(100 * filteredTasks?.length) / tasksData?.length} />
      <div className="pt-4">
        <SmallCaps text="MANAGE MY GOALS" />
        {goalsAreLoading && (
          <div className="grid place-content-center">
            <Spin />
          </div>
        )}
        {!goalsAreLoading && (
          <List
            bordered
            dataSource={goalsData}
            renderItem={(goal: any) => (
              <List.Item className="py-2 relative" key={goal._id}>
                {goal.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute right-5"
                  onClick={() => {
                    setDeleteGoal(goal._id);
                    confirm({
                      title: `Delete ${goal.title}`,
                      icon: (
                        <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />
                      ),
                      content:
                        "Are you sure you want to delete this goal? This action cannot be undone. Deleting the task will remove it permanently from the system.",
                      okText: "Confirm",
                      onOk() {
                        deleteGoalMutation.mutate(goal._id);
                        toast.success("Successfully deleted task");
                      },
                      onCancel() {
                        console.log("Cancel");
                      },
                    });
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}
