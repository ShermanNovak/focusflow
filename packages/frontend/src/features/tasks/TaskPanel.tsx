import { DatePicker, Form, Input, Checkbox, Select } from "antd";
import { CameraFilled } from "@ant-design/icons";
import SmallCaps from "../../UI Components/SmallCaps";
import RightPanel from "../../UI Components/RightPanel";
import DashedButton from "../../UI Components/DashedButton";
import useTextInput from "../../hooks/use-text-input";
import { useGoalsQuery } from '../../api/goals.query';

// add modal useState in homepage
// add mode useState in props

export default function TaskPanel() {
  const { value: nameValue, valueChangeHandler: nameChangeHandler } =
    useTextInput();
  const {
    value: descriptionValue,
    valueChangeHandler: descriptionChangeHandler,
  } = useTextInput();

  const { data: goals } = useGoalsQuery();
  let selectOptions: { value: string; label: string }[] = [];
  
  if (Array.isArray(goals)) {
    selectOptions = goals.map((goal) => ({
      value: goal._id,
      label: goal.title
    }))
  }

  return (
    <RightPanel>
      <Form labelAlign="left" labelCol={{ span: 5 }}>
        <Input
          className="text-xl p-0 text-black font-bold pb-4 inline"
          placeholder="Add a task..."
          bordered={false}
          onChange={nameChangeHandler}
          value={nameValue}
        />
        <Form.Item>
          <SmallCaps text="description" />
          <Input
            className="p-0 inline-block"
            placeholder="Add a description..."
            bordered={false}
            onChange={descriptionChangeHandler}
            value={descriptionValue}
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
            <DatePicker bordered={false} className="px-0"/>
          </Form.Item>
          <Form.Item name="completed" label="Completed">
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
    </RightPanel>
  );
}
