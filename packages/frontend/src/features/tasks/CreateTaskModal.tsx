import toast from "react-hot-toast";

import { DatePicker, Form, Input, Checkbox, Select, Button } from "antd";
import { useGoalsQuery } from "../../api/goals.query";
import { useTaskCreation } from "../../api/tasks.query";

import SmallCaps from "../../components/SmallCaps";
import RightPanel from "../../components/RightPanel";

export default function CreateTaskPanel() {
  const [form] = Form.useForm();

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

  const createTaskMutation = useTaskCreation();

  const formSubmissionHandler = () => {
    try {
      form.validateFields().then((values) => {
        createTaskMutation.mutate(values);
        toast.success("Successfully created task!");
        form.resetFields();
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
            />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline">
            <DatePicker bordered={false} className="px-0" />
          </Form.Item>
          <Form.Item name="isCompleted" label="Completed">
            <Checkbox />
          </Form.Item>
        </div>

            <Button type="primary" htmlType="submit" className="my-2">
              Submit
            </Button>

      </Form>
    </RightPanel>
  );
}
