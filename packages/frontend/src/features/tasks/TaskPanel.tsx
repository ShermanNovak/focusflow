import { DatePicker, Form, Input, Checkbox, Select } from "antd";
import { CameraFilled } from "@ant-design/icons";
import SmallCaps from "../../components/SmallCaps";
import RightPanel from "../../components/RightPanel";
import DashedButton from "../../components/DashedButton";
import { useGoalsQuery } from "../../api/goals.query";
import { useTaskQuery } from "../../api/tasks.query";
import dayjs from 'dayjs';

const task_id = "6489a5f876aaaa339b7cfbf4";

export default function TaskPanel() {
  const [form] = Form.useForm();
  const { data: taskData, isLoading: taskIsLoading } = useTaskQuery(task_id);

  const { data: goals } = useGoalsQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(goals)) {
    selectOptions = goals.map((goal) => ({
      value: goal._id,
      label: goal.title,
    }));
  }

  return (
    <RightPanel>
      {taskIsLoading && <h2>Loading</h2>}
      {!taskIsLoading && (
        <Form
          labelAlign="left"
          labelCol={{ span: 5 }}
          form={form}
          initialValues={{...taskData[0], deadline: dayjs(taskData[0].deadline)}}
        >
          <Form.Item name="title">
            <Input
              className="text-xl p-0 text-black font-bold inline"
              placeholder="Add a task..."
              bordered={false}
            />
          </Form.Item>
          <SmallCaps text="description" />
          <Form.Item name="description">
            <Input
              className="p-0 inline-block"
              placeholder="Add a description..."
              bordered={false}
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
              />
            </Form.Item>
            <Form.Item name="deadline" label="Deadline">
              <DatePicker bordered={false} className="px-0" />
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
        </Form>
      )}
    </RightPanel>
  );
}
