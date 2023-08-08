import dayjs from "dayjs";
import toast from "react-hot-toast";

import { DatePicker, Form, Input, Select, Modal, Button, Space, Spin} from "antd";
import {
  useTaskQuery,
  useTaskUpdate,
  useTaskDelete,
} from "../../api/tasks.query";
import { useGoalsQuery } from "../../api/goals.query";
import { CameraFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { useContext } from "react";
import { PanelContext } from "../../context/PanelContext";
import { useFilePicker } from "use-file-picker";
import { axiosImageInstance } from "../../api/axios";

import SmallCaps from "../../components/SmallCaps";
import RightPanel from "../../components/RightPanel";

export default function UpdateEventPanel() {
  const user_id = "647c9b22146a622abdd08fbb";
  const [form] = Form.useForm();
  const panelContext = useContext(PanelContext);
  const updateTaskMutation = useTaskUpdate(panelContext.currentEvent);
  const blurHandler = () => {
    const updatedData = form.getFieldsValue();
    updateTaskMutation.mutate(updatedData);
  };

  const deleteTaskMutation = useTaskDelete(panelContext.currentEvent);

  const { data: eventData, isLoading: eventIsLoading } = useTaskQuery(panelContext.currentEvent);

  const { data: goals } = useGoalsQuery();
  let selectOptions: { value: string; label: string }[] = [];

  if (Array.isArray(goals)) {
    selectOptions = goals.map((goal) => ({
      value: goal._id,
      label: goal.title,
    }));
  }

  const { confirm } = Modal;
  const deleteEventHandler = () => {
    confirm({
      title: `Delete ${eventData.title}`,
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      content:
        "Are you sure you want to delete this event? This action cannot be undone. Deleting the task will remove it permanently from the system.",
      okText: "Confirm",
      onOk() {
        deleteTaskMutation.mutate(panelContext.currentEvent);
        toast.success("Successfully deleted task");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    onFilesSuccessfulySelected: ({ plainFiles }) => {
      try {
        const formData = new FormData();
        formData.append("actualFile", plainFiles[0]);
        axiosImageInstance
          .post("task", formData)
          .then(function (response: any) {
            //handle success
            console.log(response);
          });
        updateTaskMutation.mutate({
          imageURL: `https://storage.cloud.google.com/task_photos/${user_id}/${plainFiles[0].name}`,
        });
        toast.success("Successfully uploaded image");
      } catch (e: any) {
        console.log(e.message);
      }
    },
  });

  return (
    <RightPanel>
      {eventIsLoading && <div className="h-screen grid place-content-center"><Spin /></div>}
      {!eventIsLoading && (
        <Form
          labelAlign="left"
          labelCol={{ span: 5 }}
          form={form}
          initialValues={{
            ...eventData,
            startTime: dayjs(eventData.startTime),
            endTime: dayjs(eventData.endTime),
          }}
        >
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input.TextArea
              autoSize
              className="text-xl -ms-2 ps-2 text-black font-bold hover:bg-hover-blue"
              placeholder="Add an event..."
              bordered={false}
              onBlur={blurHandler}
            />
          </Form.Item>
          <SmallCaps text="description" className="-mt-4" /> {/* xl:mt-0 */}
          <Form.Item name="description">
            <Input.TextArea
              autoSize
              className="-ms-2 ps-2 hover:bg-hover-blue"
              placeholder="Add a description..."
              bordered={false}
              onBlur={blurHandler}
            />
          </Form.Item>
          <SmallCaps text="details" className="-mt-4" /> {/* xl:mt-0 */}
          <div className="bg-white rounded-lg px-4 py-1 mb-4">
            <Form.Item
              name="startTime"
              label="Start"
              className="mb-1"
              rules={[{ required: true }]}
            >
              <DatePicker
                showTime
                bordered={false}
                className="px-0"
                onBlur={blurHandler}
              />
            </Form.Item>
            <Form.Item
              name="endTime"
              label="End"
              className="mb-1"
              rules={[{ required: true }]}
            >
              <DatePicker
                showTime
                bordered={false}
                className="px-0"
                onBlur={blurHandler}
              />
            </Form.Item>
            <Form.Item name="goal" label="Goal" className="my-1">
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
                allowClear={true}
                onBlur={blurHandler}
              />
            </Form.Item>
            <Form.Item name="location" label="Location" className="mb-1">
              <Input size="small" onBlur={blurHandler} />
            </Form.Item>
            <Form.Item name="googleMeet" label="Google Meet" className="mb-1">
              <Input size="small" onBlur={blurHandler} />
            </Form.Item>
            <Form.Item name="guests" label="Guests" className="mb-1">
              <Input size="small" onBlur={blurHandler} />
            </Form.Item>
          </div>
          {!eventData.imageURL && filesContent.length < 1 && (
            <button
              className="flex flex-row items-center gap-8 border-dashed rounded-lg px-8 py-3 my-3 bg-inherit"
              onClick={() => {
                openFileSelector();
              }}
            >
              <CameraFilled className="text-2xl" />
              <div className="flex flex-col items-start gap-1 font-sans">
                <span className="font-bold">
                  Snap a photo to commemorate your event
                </span>
                <span>How did your event go?</span>
              </div>
            </button>
          )}
          {eventData && eventData.imageURL && filesContent.length < 1 && (
            <img
              alt="event"
              src={eventData.imageURL}
              className="block py-5 rounded h-52 drop-shadow"
              onClick={() => {
                openFileSelector();
              }}
            />
          )}
          {filesContent.length > 0 && (
            <img
              alt={filesContent[0].name}
              src={filesContent[0].content}
              className="rounded py-2 block h-52 drop-shadow"
              onClick={() => {
                openFileSelector();
              }}
            ></img>
          )}
          <Space>
            <Button type="primary" danger onClick={deleteEventHandler}>
              Delete
            </Button>
            <Button type="default" onClick={panelContext.closeUpdateEventPanel}>
              Close
            </Button>
          </Space>
        </Form>
      )}
    </RightPanel>
  );
}
