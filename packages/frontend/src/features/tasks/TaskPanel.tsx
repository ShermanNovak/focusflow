import { DatePicker, Form, Input, Checkbox, Select, Button, Modal } from "antd";
import { CameraFilled, ExclamationCircleFilled } from "@ant-design/icons";
import SmallCaps from "../../components/SmallCaps";
import RightPanel from "../../components/RightPanel";
import DashedButton from "../../components/DashedButton";
import { useGoalsQuery } from "../../api/goals.query";
import {
  useTaskQuery,
  useTaskUpdate,
  useTaskDelete,
} from "../../api/tasks.query";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const task_id = "647df86e7bbd7311caed7d7d";

export default function TaskPanel() {
  const [form] = Form.useForm();
  const {
    data: taskData,
    isLoading: taskIsLoading,
    isError: taskHasError,
    error: taskError,
  } = useTaskQuery(task_id);

  if (taskHasError) {
    let error = taskError as Error;
    toast.error(error.message);
  }

  const {
    data: goals,
    isError: goalsHasError,
    error: goalsError,
  } = useGoalsQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (goalsHasError) {
    let error = goalsError as Error;
    toast.error(error.message);
  }

  if (Array.isArray(goals)) {
    selectOptions = goals.map((goal) => ({
      value: goal._id,
      label: goal.title,
    }));
  }

  const updateTaskMutation = useTaskUpdate(task_id);

  const blurHandler = () => {
    const updatedData = form.getFieldsValue();
    updateTaskMutation.mutate(updatedData);
  };

  const deleteTaskMutation = useTaskDelete(task_id);
  const { confirm } = Modal;

  const deleteTaskHandler = () => {
    confirm({
      title: `Delete ${taskData[0].title}`,
      icon: <ExclamationCircleFilled style={{ color: '#ff4d4f' }}/>,
      content:
        "Are you sure you want to delete this task? This action cannot be undone. Deleting the task will remove it permanently from the system",
      okText: "Confirm",
      onOk() {
        deleteTaskMutation.mutate(task_id);
        toast.success('Successfully deleted task')
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <RightPanel>
      {taskIsLoading && <h2>Loading</h2>}
      {!taskIsLoading && (
        <Form
          labelAlign="left"
          labelCol={{ span: 5 }}
          form={form}
          initialValues={{
            ...taskData[0],
            deadline: dayjs(taskData[0].deadline),
          }}
        >
          <Form.Item name="title">
            <Input.TextArea
              autoSize
              className="text-xl text-black font-bold hover:bg-hover-blue"
              placeholder="Add a task..."
              bordered={false}
              onBlur={blurHandler}
            />
          </Form.Item>
          <SmallCaps text="description" />
          <Form.Item name="description">
            <Input.TextArea
              autoSize
              className="hover:bg-hover-blue"
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
              />
            </Form.Item>
            <Form.Item name="deadline" label="Deadline">
              <DatePicker
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
          <Button type="primary" danger onClick={deleteTaskHandler}>
            Delete
          </Button>
        </Form>
      )}
    </RightPanel>
  );
}
