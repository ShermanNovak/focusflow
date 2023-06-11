import { DatePicker, Form, Input, Checkbox } from "antd";
import { CameraFilled } from "@ant-design/icons";
import SmallCaps from "../../UI Components/SmallCaps";
import RightPanel from "../../UI Components/RightPanel";
import DashedButton from "../../UI Components/DashedButton";
import useTextInput from "../../hooks/use-text-input";
import { useEffect } from "react";

export default function TaskPanel() {
  const {
    value: nameValue,
    valueChangeHandler: nameChangeHandler,
    hasChanged: nameHasChanged,
    setHasChangedToFalse: setNameHasChangedToFalse,
  } = useTextInput();
  const {
    value: descriptionValue,
    valueChangeHandler: descriptionChangeHandler,
    hasChanged: descriptionHasChanged,
    setHasChangedToFalse: setDescriptionHasChangedToFalse,
  } = useTextInput();

  useEffect(() => {
    setNameHasChangedToFalse();
    setDescriptionHasChangedToFalse();
  }, [
    nameHasChanged,
    descriptionHasChanged,
  ]);

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
          </Form.Item>
          <Form.Item>
            <label>Deadline</label>
            <DatePicker bordered={false} />
          </Form.Item>
          <Form.Item>
            <label>Completed</label>
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
