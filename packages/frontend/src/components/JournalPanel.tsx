import RightPanel from "./RightPanel";
import DashedButton from "./DashedButton";
import { CameraFilled } from "@ant-design/icons";

export default function JournalPanel() {
    return (
        <RightPanel>
            <div>
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
                        <h3 className="mr-3 font-semibold">13 · 06 · 23</h3>
                        <h3 className="font-semibold">|</h3>
                        <h3 className="ml-3 font-semibold">TUESDAY</h3>
                    </div> 
                    <h3 className="mt-0 font-medium">Insert Title</h3> 
                    <h3 className="font-normal">Journal Body</h3>
                </div>
            </div>
        </RightPanel>
    )
}