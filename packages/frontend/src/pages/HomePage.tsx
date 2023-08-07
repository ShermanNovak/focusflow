import toast from "react-hot-toast";

import { useState, KeyboardEvent } from "react";
import { Input, Form } from "antd";
import { useEventsQuery, useTaskCreation } from "../api/tasks.query";
import { useFilePicker } from "use-file-picker";
import { useImageQuery } from "../api/image.query";
import { axiosImageInstance } from "../api/axios";
import { useHighlightCreation } from "../api/highlight.query";
import { useHighlightQuery } from "../api/highlight.query";

import SmallCaps from "../components/SmallCaps";

export default function HomePage() {
  const createTaskMutation = useTaskCreation();
  const [taskForm] = Form.useForm();
  const createHighlightMutation = useHighlightCreation();
  const [highlightForm] = Form.useForm();

  const createTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        taskForm.validateFields().then((values) => {
          createTaskMutation.mutate({ ...values, type: "task" });
          toast.success("Successfully created task!");
        });
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  };

  const createHighlightHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        highlightForm.validateFields().then((values) => {
          createHighlightMutation.mutate(values);
          toast.success("Successfully created highlight!");
        });
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  }
  const { data: highlightData, isLoading: highlightIsLoading } = useHighlightQuery(); // fetching data from prev highlight entry 

  
  const { data: eventsData } = useEventsQuery();

  const { data: imageData } = useImageQuery();

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    onFilesSuccessfulySelected: ({ plainFiles }) => {
      try {
        const formData = new FormData();
        formData.append("actualFile", plainFiles[0]);
        console.log(plainFiles[0]);
        axiosImageInstance
          .post("uploadfile", formData)
          .then(function (response: any) {
            //handle success
            console.log(response);
          });
        toast.success("Successfully uploaded image");
      } catch (e: any) {
        console.log(e.message);
      }
    },
  });

  const [showSpotifyModal, setShowSpotifyModal] = useState(false);

  // to get name from user context
  return (
    <div className="p-8 w-full">
      <span className="text-xl text-black font-bold">
        Good morning, Antonio
      </span>
      <div className="pt-3 grid grid-cols-2 gap-4">
        <div>
          <div className="flex gap-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                clipRule="evenodd"
              />
            </svg>
            <SmallCaps text="WHAT IS YOUR HIGHLIGHT OF THE DAY?" />
          </div>
          {highlightIsLoading && <h6>Fetching Higlight Entry...</h6>}
          {!highlightIsLoading && (
          <Form 
            form={highlightForm}
            initialValues={highlightData}
            >
            <Form.Item name="content">
              <Input className="bg-pale-yellow" onKeyDown={createHighlightHandler}/>
            </Form.Item>
          </Form>
          )}
          <SmallCaps text="HERE IS YOUR SCHEDULE FOR TODAY 💪" />
            {eventsData && eventsData.map((event: any) => (
              event.title
            ))}
          <div>
            {!imageData && filesContent.length < 1 && (
              <button
                onClick={() => {
                  openFileSelector();
                }}
                className="w-72 border-none drop-shadow px-9 py-7 gap-y-2 rounded flex flex-col items-center bg-stone-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path
                    fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold">Add Your Photo of the Day</span>
                <span>
                  Embrace and cherish the fleeting beauty of precious moments.
                </span>
              </button>
            )}
            {filesContent.length > 0 && (
              <img
                alt={filesContent[0].name}
                src={filesContent[0].content}
                className="rounded w-72 drop-shadow"
                onClick={() => {
                  openFileSelector();
                }}
              ></img>
            )}
            {(imageData && filesContent.length < 1) && (
              <img
                alt="photo_of_the_day"
                src={imageData.url}
                className="rounded w-72 drop-shadow"
                onClick={() => {
                  openFileSelector();
                }}
              ></img>
            )}
          </div>
        </div>
        <div>
          <Form form={taskForm}>
            <div className="flex gap-x-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
              <SmallCaps text="CREATE NEW TASKS HERE!" />
            </div>
            <Form.Item name="title">
              <Input className="bg-pale-purple" onKeyDown={createTaskHandler} />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

//   return (
//     <>
//       {showTaskModal && <TaskModal />}
//       {showTaskPanel && <TaskPanel />}
//       <SpotifyCard showModal={setShowSpotifyModal} />
//       <SpotifyModal open={showSpotifyModal} showModal={setShowSpotifyModal} />
//     </>
//   );
// }
