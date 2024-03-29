import toast from "react-hot-toast";
import { useJournalEntryCreation } from "../../api/jentry.query";
import { CameraFilled } from "@ant-design/icons";
import { Form, Input, Space, Button } from "antd";
import { PanelContext } from "../../context/PanelContext";
import { useContext, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { axiosImageInstance } from "../../api/axios";

import RightPanel from "../../components/RightPanel";

export default function JournalPanel() {
  const user_id = "647c9b22146a622abdd08fbb";
  const [fileData, setFileData] = useState<File | null>(null);

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    onFilesSuccessfulySelected: ({ plainFiles }) => {
      setFileData(plainFiles[0]);
    },
  });

  const [form] = Form.useForm(); // use the form in the journal i.e. title and body
  const createJEntryMutation = useJournalEntryCreation(); // use the mutation to create a new journal entry

  const formSubmissionHandler = () => {
    try {
      form.validateFields().then((values) => {
        if (fileData) {
          const formData = new FormData();
          formData.append("actualFile", fileData);
          axiosImageInstance
            .post("/journal", formData)
            .then(function (response: any) {
              //handle success
              console.log(response);
            });
          createJEntryMutation.mutate({
            ...values,
            imageURL: `https://storage.cloud.google.com/journal_images/${user_id}/${filesContent[0].name}`,
          });
        } else {
          createJEntryMutation.mutate(values);
        }
        toast.success("Successful entry!");
        form.resetFields();
        panelContext.closeCreateJEntryPanel();
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const year = currentDate.getFullYear();
  const dayOfWeek = currentDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  const panelContext = useContext(PanelContext);

  return (
    <RightPanel>
      <div className="absolute w-full left-0 h-1/4 top-0 bg-white flex">
        {filesContent.length < 1 && (
          <div className="mx-auto my-auto">
            <button
              className="flex flex-row items-center gap-8 border-dashed rounded-lg px-8 py-3 my-3 bg-inherit"
              onClick={() => {
                openFileSelector();
              }}
            >
              <CameraFilled className="text-2xl" />
              <div className="flex flex-col items-start gap-1 font-sans">
                <span className="font-bold">Add a photo to your journal</span>
                <span>What picture best represents your day?</span>
              </div>
            </button>
          </div>
        )}
        {filesContent.length > 0 && (
          <img
            alt={filesContent[0].name}
            src={filesContent[0].content}
            className="rounded object-cover w-full drop-shadow"
            onClick={() => {
              openFileSelector();
            }}
          ></img>
        )}
      </div>
      <div className="absolute h-3/4 bottom-0">
        <div className="flex">
          <h3 className="mr-3 font-semibold">
            {day} · {month} · {year}
          </h3>
          <h3 className="font-semibold">|</h3>
          <h3 className="ml-3 font-semibold">{dayOfWeek}</h3>
        </div>
        <Form labelAlign="left" form={form} onFinish={formSubmissionHandler}>
          <Form.Item
            name="title"
            rules={[{ required: true }]}
            style={{ marginBottom: "10px", marginTop: "-5px" }}
          >
            <Input.TextArea
              autoSize
              className="text-xl -ms-2 ps-2 text-black font-bold"
              placeholder="Insert Title Here"
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            name="content"
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Input.TextArea
              style={{ width: 550, resize: "none", marginTop: "-5px" }}
              autoSize={{ minRows: 2, maxRows: 7 }}
              className="text-xl -ms-2 ps-2 text-black font-normal"
              placeholder="Insert Description Here"
              bordered={false}
            />
          </Form.Item>
          <Space>
            <Button
              type="primary"
              style={{ background: "primary", borderColor: "" }}
              htmlType="submit"
              className="my-2"
            >
              Submit
            </Button>
            <Button
              type="default"
              onClick={panelContext.closeCreateJEntryPanel}
            >
              Close
            </Button>
          </Space>
        </Form>
      </div>
    </RightPanel>
  );
}
