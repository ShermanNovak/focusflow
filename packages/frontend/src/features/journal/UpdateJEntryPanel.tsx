import toast from "react-hot-toast";
import { ExclamationCircleFilled } from "@ant-design/icons";

import {
  useJEntryQuery,
  useJournalEntryDelete,
  useJournalEntryUpdate,
} from "../../api/jentry.query";

import RightPanel from "../../components/RightPanel";
import DashedButton from "../../components/DashedButton";
import { CameraFilled } from "@ant-design/icons";
import { Form, Input, Space, Button, Modal } from "antd";
import { PanelContext } from "../../context/PanelContext";
import { useContext } from "react";

export default function UpdateJournalPanel() {
    const [form] = Form.useForm(); // use the form in the journal i.e. title and body
    const journalentry_id = "64c8afa2bb7974ea233d5137"; // journal entry hardcoded id
    const { data: jentrydata, isLoading: jentryIsLoading } = useJEntryQuery(journalentry_id); // fetching data from prev journal entry 
    // console.log(jentrydata);
    const updateJEntryMutation = useJournalEntryUpdate(journalentry_id); // use the mutation to update journal entry

  const blurHandler = () => {
    const updatedData = form.getFieldsValue();
    console.log("newdata", updatedData);
    updateJEntryMutation.mutate(updatedData);
  };

  const deleteJEntryMutation = useJournalEntryDelete(journalentry_id);
  const { confirm } = Modal;

  const deleteJEntryHandler = () => {
    confirm({
      title: `Delete Journal Title: ${jentrydata.title}`,
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      content:
        "Are you sure you want to delete this Journal Entry? This action cannot be undone. Deleting a Journal Entry will remove it permanently from the system",
      okText: "Confirm",
      onOk() {
        deleteJEntryMutation.mutate(journalentry_id);
        toast.success("Successfully deleted Journal Entry.");
      },
      onCancel() {
        console.log("Cancelled Journal Entry Deletion.");
      },
    });
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const year = currentDate.getFullYear();
  const dayOfWeek = currentDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  const panelContext = useContext(PanelContext);
  console.log("jentrydata:", jentrydata);

  return (
    <RightPanel>
      <div className="absolute w-full left-0 h-1/4 top-0 bg-white flex">
        {(!jentrydata || !jentrydata.imageURL) && (
          <div className="mx-auto my-auto">
            <DashedButton
              boldText="Add your Photo of the Day"
              text="What picture best represents your day?"
            >
              <CameraFilled className="text-2xl" />
            </DashedButton>
          </div>
        )}
        {jentrydata && jentrydata.imageURL && (
          <img
            alt="photo_of_the_day"
            src={jentrydata.imageURL}
          />
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
        {jentryIsLoading && <h2>Fetching Journal Entry...</h2>}{" "}
        {/* if data is loading, will show "loading" on the screen */}
        {!jentryIsLoading && (
          <Form labelAlign="left" form={form} initialValues={jentrydata}>
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
                onBlur={blurHandler}
              />
            </Form.Item>
            <Form.Item
              name="content"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Input.TextArea
                style={{ width: 550, resize: "none", marginTop: "-5px" }}
                autoSize={{ minRows: 2, maxRows: 7 }}
                className="text-xl -ms-2 ps-2 text-black font-normal"
                placeholder="Journal Entry"
                bordered={false}
                onBlur={blurHandler}
              />
            </Form.Item>
            <Space>
              <Button type="primary" danger onClick={deleteJEntryHandler}>
                Delete
              </Button>
              <Button
                type="default"
                onClick={panelContext.closeUpdateJEntryPanel}
              >
                Close
              </Button>
            </Space>
          </Form>
        )}
      </div>
    </RightPanel>
  );
}
