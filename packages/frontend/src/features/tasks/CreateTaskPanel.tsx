import toast from "react-hot-toast";

import { DatePicker, Form, Input, Checkbox, Select, Button, Space } from "antd";
import { useGoalsQuery } from "../../api/goals.query";
import { useTaskCreation } from "../../api/tasks.query";
import { PanelContext } from "../../context/PanelContext";
import { useContext, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { axiosImageInstance } from "../../api/axios";
import { CameraFilled } from "@ant-design/icons";

import SmallCaps from "../../components/SmallCaps";
import RightPanel from "../../components/RightPanel";

export default function CreateTaskPanel() {
  const user_id = "647c9b22146a622abdd08fbb";
  const [fileData, setFileData] = useState<File | null>(null);

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    onFilesSuccessfulySelected: ({ plainFiles }) => {
      setFileData(plainFiles[0]);
    },
  });

  const [form] = Form.useForm();

  const { data: goals } = useGoalsQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(goals)) {
    selectOptions = goals.map((goal) => ({
      value: goal._id,
      label: goal.title,
    }));
  }

  const createTaskMutation = useTaskCreation();

  const formSubmissionHandler = () => {
    try {
      form.validateFields().then((values) => {
        if (fileData) {
          const formData = new FormData();
          formData.append("actualFile", fileData);
          axiosImageInstance
            .post("/task", formData)
            .then(function (response: any) {
              //handle success
              console.log(response);
            });
          createTaskMutation.mutate({
            ...values,
            imageURL: `https://storage.cloud.google.com/task_photos/${user_id}/${filesContent[0].name}`,
          });
        } else {
          createTaskMutation.mutate({ ...values, type: "task" });
        }
        toast.success("Successfully created task!");
        form.resetFields();
        panelContext.closeCreateTaskPanel();
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const panelContext = useContext(PanelContext);

  return (
    <RightPanel>
      <Form
        labelAlign="left"
        labelCol={{ span: 5 }}
        form={form}
        onFinish={formSubmissionHandler}
      >
        <Form.Item name="title" rules={[{ required: true }]}>
          <Input.TextArea
            autoSize
            className="text-xl -ms-2 ps-2 text-black font-bold hover:bg-hover-blue"
            placeholder="Add a task..."
            bordered={false}
          />
        </Form.Item>
        <SmallCaps text="description" />
        <Form.Item name="description">
          <Input.TextArea
            autoSize
            className="-ms-2 ps-2 hover:bg-hover-blue"
            placeholder="Add a description..."
            bordered={false}
          />
        </Form.Item>
        <SmallCaps text="details" />
        <div className="bg-white rounded-lg p-4 mb-4">
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
              allowClear={true}
            />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline">
            <DatePicker showTime bordered={false} className="px-0" />
          </Form.Item>
          <Form.Item name="isCompleted" label="Completed">
            <Checkbox />
          </Form.Item>
        </div>
        {filesContent.length < 1 && (
          <div className="mx-auto my-auto">
            <button
              className="flex flex-row items-center gap-8 border-dashed rounded-lg px-8 py-3 my-3 bg-inherit"
              onClick={() => {
                openFileSelector();
              }}
            >
              <CameraFilled className="text-2xl" />
              <div className="flex flex-col items-start gap-1 font-sans">
                <span className="font-bold">Add a photo to your journal</span>
                <span>What picture best represents your day?</span>
              </div>
            </button>
          </div>
        )}
        {filesContent.length > 0 && (
          <img
            alt={filesContent[0].name}
            src={filesContent[0].content}
            className="py-2 block h-52 rounded drop-shadow"
            onClick={() => {
              openFileSelector();
            }}
          ></img>
        )}
        <Space>
          <Button type="primary" htmlType="submit" className="my-2">
            Submit
          </Button>
          <Button type="default" onClick={panelContext.closeCreateTaskPanel}>
            Close
          </Button>
        </Space>
      </Form>
    </RightPanel>
  );
}
