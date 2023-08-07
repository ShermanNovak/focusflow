import toast from "react-hot-toast";

import { DatePicker, Form, Input, Button, Space } from "antd";
import { useTaskCreation } from "../../api/tasks.query";
import { useContext, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { axiosImageInstance } from "../../api/axios";
import { CameraFilled } from "@ant-design/icons";
import { PanelContext } from "../../context/PanelContext";

import SmallCaps from "../../components/SmallCaps";
import RightPanel from "../../components/RightPanel";

export default function CreateEventPanel() {
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

  const panelContext = useContext(PanelContext);

  const [form] = Form.useForm();

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
            type: "event",
            imageURL: `https://storage.cloud.google.com/task_photos/${user_id}/${filesContent[0].name}`,
          });
        } else {
          createTaskMutation.mutate({ ...values, type: "event" });
        }
        toast.success("Successfully created task!");
        form.resetFields();
        panelContext.closeCreateEventPanel();
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

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
            placeholder="Add an event..."
            bordered={false}
          />
        </Form.Item>
        <SmallCaps text="description" className="-mt-4" /> {/* xl:mt-0 */}
        <Form.Item name="description">
          <Input.TextArea
            autoSize
            className="-ms-2 ps-2 hover:bg-hover-blue"
            placeholder="Add a description..."
            bordered={false}
          />
        </Form.Item>
        <SmallCaps text="details" className="-mt-4" /> {/* xl:mt-0 */}
        <div className="bg-white rounded-lg px-4 py-1 mb-4">
          <Form.Item
            name="goalName"
            label="Goal:"
            className="mb-1"
          >
            <Input size="small" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="startTime"
              label="Start"
              className="mb-1"
              rules={[{ required: true }]}
            >
              <DatePicker showTime bordered={false} className="px-0" />
            </Form.Item>
            <Form.Item
              name="endTime"
              label="End"
              className="mb-1"
              rules={[{ required: true }]}
            >
              <DatePicker showTime bordered={false} className="px-0" />
            </Form.Item>
          </div>
          <Form.Item
            name=""
            label="Location: "
            className="mb-1"
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name=""
            label="Google Meet: "
            className="mb-1"
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name=""
            label="Guests: "
            className="mb-1"
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name=""
            label="Repeat: "
            className="mb-1"
          >
            <Input size="small" />
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
          <Button type="default" onClick={panelContext.closeCreateEventPanel}>
            Close
          </Button>
        </Space>
      </Form>
    </RightPanel>
  );
}
