import toast from "react-hot-toast";
import { useJournalEntryCreation } from "../api/jentry.query";

import RightPanel from "./RightPanel";
import DashedButton from "./DashedButton";
import { CameraFilled } from "@ant-design/icons";
import {Form, Input, Space, Button} from "antd";
import { PanelContext } from "../context/PanelContext";
import { useContext } from "react";


export default function JournalPanel() {
    const [form] = Form.useForm(); // use the form in the journal i.e. title and body
    // const { data: JournalEntry } = useJEntryQuery(); // fetching data from prev journal entry (dont need for creation?), CURRENTLY RETURNS VOID
    const createJEntryMutation = useJournalEntryCreation(); // use the mutation to create a new journal entry

    const formSubmissionHandler = () => {
        try {
            form.validateFields().then((values) => {
            console.log(values)
            createJEntryMutation.mutate(values);
            toast.success("Successful entry!");
            form.resetFields();
        });
        } catch (e: any) {
        console.log(e.message);
        }
    };

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const year = currentDate.getFullYear();
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    
    const panelContext = useContext(PanelContext);

    return (
        <RightPanel>
            <div className="absolute w-full left-0 h-1/4 top-0 bg-white flex">
                <div className="mx-auto my-auto">
                    <DashedButton
                        boldText="Add your Photo of the Day"
                        text="What picture best represents your day?"
                    >
                    <CameraFilled className="text-2xl" />
                    </DashedButton>
                </div>
            </div>
            <div className="absolute h-3/4 bottom-0">
                <div className="flex">
                    <h3 className="mr-3 font-semibold">{day} · {month} · {year}</h3>
                    <h3 className="font-semibold">|</h3>
                    <h3 className="ml-3 font-semibold">{dayOfWeek}</h3>
                </div> 
                <Form
                    labelAlign="left"
                    form={form}
                    onFinish={formSubmissionHandler}>
                    <Form.Item name="title" rules={[{ required: true }]} style={{ marginBottom: "10px", marginTop:"-5px" }}>
                        <Input.TextArea
                            autoSize
                            className="text-xl -ms-2 ps-2 text-black font-bold"
                            placeholder="Insert Title Here"
                            bordered={false}
                        />
                    </Form.Item>
                    <Form.Item name="content" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        <Input.TextArea
                            style={{ width: 550, resize: "none", marginTop: "-5px"}}
                            autoSize={{ minRows: 2, maxRows: 7 }}
                            className="text-xl -ms-2 ps-2 text-black font-normal"
                            placeholder="Journal Entry"
                            bordered={false}
                        />
                    </Form.Item>
                    <Space>
                        <Button type="primary" style={{ background: "grey", borderColor: "" }} htmlType="submit" className="my-2">
                            Submit
                        </Button>
                        <Button type="default" onClick={panelContext.closeCreateJEntryPanel}>
                            Close
                        </Button>
                    </Space>
                </Form>
            </div>
        </RightPanel>
    )
}