import RightPanel from "./RightPanel";
import DashedButton from "./DashedButton";
import { CameraFilled } from "@ant-design/icons";

export default function JournalPanel() {
    return (
        <RightPanel>
            <div className="absolute w-full h-209 top-1 bg-white">
                <div>
                    <DashedButton
                        boldText="Add your Photo of the Day"
                        text="What picture best represents your day?"
                    >
                    <CameraFilled className="text-2xl" />
                    </DashedButton>
                </div>
            </div>
            <div>

            </div>
        </RightPanel>
    )
}