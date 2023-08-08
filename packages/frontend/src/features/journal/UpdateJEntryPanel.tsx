import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  useJEntryQuery,
  useJournalEntryDelete,
  useJournalEntryUpdate,
} from "../../api/jentry.query";
import { CameraFilled } from "@ant-design/icons";
import { Form, Input, Space, Button, Modal } from "antd";
import { PanelContext } from "../../context/PanelContext";
import { useContext } from "react";
import { axiosImageInstance } from "../../api/axios";
import { useFilePicker } from "use-file-picker";

import RightPanel from "../../components/RightPanel";

export default function UpdateJournalPanel() {
  const queryClient = useQueryClient();
  const panelContext = useContext(PanelContext);

  const date = new Date().toJSON(); // today's date
  const todayDate = date.slice(0, 10);
  const { data: jentrydata, isLoading: jentryIsLoading } = useJEntryQuery(todayDate); // fetching data from prev journal entry
  const user_id = "647c9b22146a622abdd08fbb";
  console.log(jentrydata._id)
  const updateJEntryMutation = useJournalEntryUpdate(jentrydata._id);
  
  const [form] = Form.useForm(); // use the form in the journal i.e. title and body

  const blurHandler = async () => {
    const updatedData = form.getFieldsValue();
    try {
      await updateJEntryMutation.mutateAsync(updatedData);
      // refresh data to update ui
      queryClient.invalidateQueries(['jentries', todayDate]);
      toast.success('Journal Entry updated successfully.');
    } catch (error) {
      // error handling
      console.error(error);
      toast.error('An error occurred while updating the Journal Entry.');
    }
  };

  const deleteJEntryMutation = useJournalEntryDelete(jentrydata._id);
  const { confirm } = Modal;

  const deleteJEntryHandler = () => {
    confirm({
      title: `Delete Journal Title: ${jentrydata.title}`,
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      content:
        "Are you sure you want to delete this Journal Entry? This action cannot be undone. Deleting a Journal Entry will remove it permanently from the system",
      okText: "Confirm",
      onOk() {
        deleteJEntryMutation.mutate(jentrydata._id);
        toast.success("Successfully deleted Journal Entry.");
        window.location.reload();
      },
      onCancel() {
        console.log("Cancelled Journal Entry Deletion.");
      },
    });
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // months are zero-based, so we add 1
  const year = currentDate.getFullYear();
  const dayOfWeek = currentDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

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
          .post("journal", formData)
          .then(function (response: any) {
            //handle success
            console.log(response);
          });
        updateJEntryMutation.mutate({
          imageURL: `https://storage.cloud.google.com/journal_images/${user_id}/${plainFiles[0].name}`,
        });
        toast.success("Successfully uploaded image");
      } catch (e: any) {
        console.log(e.message);
      }
    },
  });

  return (
    <RightPanel>
      <div className="absolute w-full left-0 h-1/4 top-0 bg-white flex">
        {(!jentrydata || !jentrydata.imageURL) && filesContent.length < 1 && (
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
        {jentrydata && jentrydata.imageURL && filesContent.length < 1 && (
          <img
            alt="journal entry"
            src={jentrydata.imageURL}
            className="rounded object-cover w-full drop-shadow"
            onClick={() => {
              openFileSelector();
            }}
          />
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
