import { DatePicker, Form, Input, Checkbox, Select } from "antd";
import { CameraFilled } from "@ant-design/icons";
import SmallCaps from "../../UI Components/SmallCaps";
import RightPanel from "../../UI Components/RightPanel";
import DashedButton from "../../UI Components/DashedButton";
import useTextInput from "../../hooks/use-text-input";
/* import { useTaskQuery } from "../../api/tasks.query"; */

import axios from 'axios';

export default function TaskPanel() {
  const { value: nameValue, valueChangeHandler: nameChangeHandler } =
    useTextInput();
  const {
    value: descriptionValue,
    valueChangeHandler: descriptionChangeHandler,
  } = useTextInput();

  axios.get(`http://localhost:3001/api/users/login`, {
    data: {
      email: "user@gmail.com",
      password: "Il0v3chickenrice!"
    }
  }).then((res) => console.log(res));

/*   const task_id = "64809f7fc580d7c4ff1ddb44";
  const { data: task_data, isLoading } = useTaskQuery(task_id);
  console.log(task_data); */

  return (
    <RightPanel>
      <Form>
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
          <Form.Item>
            <label>Goals</label>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              className=""
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <label>Deadline</label>
            <DatePicker bordered={false} />
          </Form.Item>
          <Form.Item>
            <label>Completed</label>
            <Checkbox className="px-4" />
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
