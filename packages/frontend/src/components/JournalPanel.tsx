import RightPanel from "./RightPanel";
import DashedButton from "./DashedButton";
import { CameraFilled } from "@ant-design/icons";
import { DatePicker, Form, Input, Checkbox, Select, Button } from "antd";

export default function JournalPanel() {
    const [form] = Form.useForm();
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const year = currentDate.getFullYear();
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();


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
                        labelCol={{ span: 5}}
                        form={form}>
                        <Form.Item name="journalTitle" rules={[{ required: true }]}>
                            <Input.TextArea
                                autoSize
                                className="text-xl -ms-2 ps-2 text-black font-bold"
                                placeholder="Insert Title Here"
                                bordered={false}
                            />
                        </Form.Item>
                        <Form.Item name="journalBody">
                            <Input.TextArea
                                    autoSize={{ minRows: 3}}
                                    className="text-xl -ms-2 ps-2 text-black font-normal"
                                    placeholder="Journal Entry"
                                    bordered={false}
                            />
                        </Form.Item>
                    </Form>
                </div>
        </RightPanel>
    )
}