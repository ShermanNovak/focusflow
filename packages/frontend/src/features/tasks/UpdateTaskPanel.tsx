import dayjs from "dayjs";
import toast from "react-hot-toast";

import {
  DatePicker,
  Form,
  Input,
  Checkbox,
  Select,
  Button,
  Modal,
  Space,
} from "antd";
import { CameraFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { useGoalsQuery } from "../../api/goals.query";
import {
  useTaskQuery,
  useTaskUpdate,
  useTaskDelete,
} from "../../api/tasks.query";
import { useContext } from "react";
import { PanelContext } from "../../context/PanelContext";

import SmallCaps from "../../components/SmallCaps";
import RightPanel from "../../components/RightPanel";
import DashedButton from "../../components/DashedButton";

export default function UpdateTaskPanel() {
  const panelContext = useContext(PanelContext);

  const [form] = Form.useForm();
  const { data: taskData, isLoading: taskIsLoading } = useTaskQuery(panelContext.currentTask);

  const { data: goals } = useGoalsQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(goals)) {
    selectOptions = goals.map((goal) => ({
      value: goal._id,
      label: goal.title,
    }));
  }

  const updateTaskMutation = useTaskUpdate(panelContext.currentTask);

  const blurHandler = () => {
    const updatedData = form.getFieldsValue();
    updateTaskMutation.mutate(updatedData);
  };

  const deleteTaskMutation = useTaskDelete(panelContext.currentTask);
  const { confirm } = Modal;

  const deleteTaskHandler = () => {
    confirm({
      title: `Delete ${taskData[0].title}`,
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      content:
        "Are you sure you want to delete this task? This action cannot be undone. Deleting the task will remove it permanently from the system",
      okText: "Confirm",
      onOk() {
        deleteTaskMutation.mutate(panelContext.currentTask);
        toast.success("Successfully deleted task");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  console.log(panelContext.currentTask)
  return (
    <RightPanel>
      {taskIsLoading && <h2>Loading</h2>}
      {!taskIsLoading && (
        <Form
          labelAlign="left"
          labelCol={{ span: 5 }}
          form={form}
          initialValues={{
            ...taskData,
            deadline: dayjs(taskData.deadline),
          }}
        >
          <Form.Item name="title">
            <Input.TextArea
              autoSize
              className="text-xl -ms-2 ps-2 text-black font-bold hover:bg-hover-blue"
              placeholder="Add a task..."
              bordered={false}
              onBlur={blurHandler}
            />
          </Form.Item>
          <SmallCaps text="description" />
          <Form.Item name="description">
            <Input.TextArea
              autoSize
              className="-ms-2 ps-2 hover:bg-hover-blue"
              placeholder="Add a description..."
              bordered={false}
              onBlur={blurHandler}
            />
          </Form.Item>
          <SmallCaps text="details" />
          <div className="bg-white rounded-lg p-4">
            <Form.Item name="goal" label="Goal">
              <Select
                showSearch
                placeholder="Select a goal"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={selectOptions}
                onBlur={blurHandler}
                allowClear={true}
              />
            </Form.Item>
            <Form.Item name="deadline" label="Deadline">
              <DatePicker
                showTime
                bordered={false}
                className="px-0"
                onBlur={blurHandler}
              />
            </Form.Item>
            <Form.Item name="isCompleted" label="Completed">
              <Checkbox />
            </Form.Item>
          </div>

          <DashedButton
            boldText="Snap a photo to mark the completion of your task"
            text="Feel motivated and inspired by visually documenting your progress"
          >
            <CameraFilled className="text-2xl" />
          </DashedButton>

          <Space>
            <Button type="primary" danger onClick={deleteTaskHandler}>
              Delete
            </Button>
            <Button type="default" onClick={panelContext.closeCreateTaskPanel}>
              Close
            </Button>
          </Space>
        </Form>
      )}
    </RightPanel>
  );
}
