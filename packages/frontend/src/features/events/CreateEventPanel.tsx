import toast from "react-hot-toast";

import { DatePicker, Form, Input, Button, Space } from "antd";
import { useTaskCreation } from "../../api/tasks.query";
import { PanelContext } from "../../context/PanelContext";
import { useContext } from "react";
import DashedButton from "../../components/DashedButton";
import { CameraFilled } from "@ant-design/icons";

import SmallCaps from "../../components/SmallCaps";
import RightPanel from "../../components/RightPanel";

export default function CreateEventPanel() {
  const [form] = Form.useForm();

  const createTaskMutation = useTaskCreation();

  const formSubmissionHandler = () => {
    try {
      form.validateFields().then((values) => {
        console.log(values);
        createTaskMutation.mutate({ ...values, type: "event" });
        toast.success("Successfully created task!");
        form.resetFields();
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
            rules={[{ required: true }]}
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
            rules={[{ required: true }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name=""
            label="Google Meet: "
            className="mb-1"
            rules={[{ required: true }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name=""
            label="Guests: "
            className="mb-1"
            rules={[{ required: true }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name=""
            label="Repeat: "
            className="mb-1"
            rules={[{ required: true }]}
          >
            <Input size="small" />
          </Form.Item>
        </div>
      </Form>
      <div className="mx-auto my-auto">
        <DashedButton
          boldText="Snap a photo to commerate your event."
          text="What picture best represents the event?"
        >
          <CameraFilled className="text-2xl" />
        </DashedButton>
      </div>
      <Space>
        <Button type="primary" htmlType="submit" className="my-2">
          Submit
        </Button>
        <Button type="default" onClick={panelContext.closeCreateEventPanel}>
          Close
        </Button>
      </Space>
    </RightPanel>
  );
}
