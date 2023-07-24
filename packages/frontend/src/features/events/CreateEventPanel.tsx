import toast from "react-hot-toast";

import { DatePicker, Form, Input, Button, Space } from "antd";
import { useTaskCreation } from "../../api/tasks.query";
import { PanelContext } from "../../context/PanelContext";
import { useContext } from "react";

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
          <Form.Item name="startTime" label="Start" rules={[{ required: true }]}>
            <DatePicker showTime bordered={false} className="px-0" />
          </Form.Item>
          <Form.Item name="endTime" label="End" rules={[{ required: true }]}>
            <DatePicker showTime bordered={false} className="px-0" />
          </Form.Item>
        </div>
      </Form>
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
