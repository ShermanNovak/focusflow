import { Modal, Form, Input, Select, DatePicker, Checkbox } from "antd";
import { useGoalsQuery } from "../../api/goals.query";
import useTextInput from "../../hooks/use-text-input";

import { useTaskMutation } from "../../api/tasks.query";

export default function TaskModal() {
  const [form] = Form.useForm();
  const createTaskMutation = useTaskMutation();

  const { data: goals } = useGoalsQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(goals)) {
    selectOptions = goals.map((goal) => ({
      value: goal._id,
      label: goal.title,
    }));
  }

  const { value: nameValue, valueChangeHandler: nameChangeHandler } =
    useTextInput();
  const {
    value: descriptionValue,
    valueChangeHandler: descriptionChangeHandler,
  } = useTextInput();

  const formSubmissionHandler = () => {
    form.validateFields().then((values) => {
        createTaskMutation.mutate(values);
    });
    form.resetFields();
  };

  return (
    <Modal
      title="Create Task"
      open={true}
      okText="Submit"
      onOk={formSubmissionHandler}
      confirmLoading={createTaskMutation.isLoading}
    >
      <Form
        className="pt-4"
        labelAlign="left"
        labelCol={{ span: 5 }}
        form={form}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input onChange={nameChangeHandler} value={nameValue} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input onChange={descriptionChangeHandler} value={descriptionValue} />
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
        <Form.Item label="Completed" name="completed">
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
}
