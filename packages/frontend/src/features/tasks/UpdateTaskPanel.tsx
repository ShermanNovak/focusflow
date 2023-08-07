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
import { axiosImageInstance } from "../../api/axios";
import { useFilePicker } from "use-file-picker";

import SmallCaps from "../../components/SmallCaps";
import RightPanel from "../../components/RightPanel";

export default function UpdateTaskPanel() {
  const user_id = "647c9b22146a622abdd08fbb";
  const panelContext = useContext(PanelContext);

  const [form] = Form.useForm();
  const { data: taskData, isLoading: taskIsLoading } = useTaskQuery(
    panelContext.currentTask
  );

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

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    onFilesSuccessfulySelected: ({ plainFiles }) => {
      try {
        const formData = new FormData();
        formData.append("actualFile", plainFiles[0]);
        axiosImageInstance
          .post("task", formData)
          .then(function (response: any) {
            //handle success
            console.log(response);
          });
        updateTaskMutation.mutate({
          imageURL: `https://storage.cloud.google.com/task_photos/${user_id}/${plainFiles[0].name}`,
        });
        toast.success("Successfully uploaded image");
      } catch (e: any) {
        console.log(e.message);
      }
    },
  });

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

          {!taskData.imageURL && filesContent.length < 1 && (
            <button
              className="flex flex-row items-center gap-8 border-dashed rounded-lg px-8 py-3 my-3 bg-inherit"
              onClick={() => {
                openFileSelector();
              }}
            >
              <CameraFilled className="text-2xl" />
              <div className="flex flex-col items-start gap-1 font-sans">
                <span className="font-bold">
                  Mark the completion of your task
                </span>
                <span>Photograph your task completion with a snap.</span>
              </div>
            </button>
          )}
          {taskData && taskData.imageURL && filesContent.length < 1 && (
            <img
              alt="task"
              src={taskData.imageURL}
              className="block py-5 rounded h-52 drop-shadow"
              onClick={() => {
                openFileSelector();
              }}
            />
          )}
          {filesContent.length > 0 && (
            <img
              alt={filesContent[0].name}
              src={filesContent[0].content}
              className="rounded py-2 block h-52 drop-shadow"
              onClick={() => {
                openFileSelector();
              }}
            ></img>
          )}

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
