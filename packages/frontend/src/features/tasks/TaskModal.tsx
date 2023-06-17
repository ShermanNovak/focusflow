import { Modal, Form, Input, Select, DatePicker, Checkbox, Button } from "antd";
import { useGoalsQuery } from "../../api/goals.query";
import { useTaskCreation } from "../../api/tasks.query";
import toast from "react-hot-toast";

export default function TaskModal() {
  const [form] = Form.useForm();
  const createTaskMutation = useTaskCreation();

  const { data: goals } = useGoalsQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(goals)) {
    selectOptions = goals.map((goal) => ({
      value: goal._id,
      label: goal.title,
    }));
  }

  const formSubmissionHandler = () => {
    try {
      form.validateFields().then((values) => {
        createTaskMutation.mutate(values);
        toast.success("Successfully created!");
        form.resetFields();
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <Modal title="Create Task" open={true} footer={null}>
      <Form
        className="pt-4"
        labelAlign="left"
        labelCol={{ span: 5 }}
        form={form}
        onFinish={formSubmissionHandler}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Goal" name="goal">
          <Select
            showSearch
            placeholder="Select a goal"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={selectOptions}
          />
        </Form.Item>
        <Form.Item label="Deadline" name="deadline">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Completed" name="isCompleted">
          <Checkbox />
        </Form.Item>
        <Form.Item>
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
