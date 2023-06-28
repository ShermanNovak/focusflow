import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  boldText: string;
  text: string;
};

export default function DashedButton(props: Props) {
  return (
    <div className="flex flex-row items-center gap-8 border-dashed rounded-lg px-8 py-3 my-3">
      {props.children}
      <div className="flex flex-col items-start gap-1 font-sans">
        <span className="font-bold">
          {props.boldText}
        </span>
        <span>{props.text}</span>
      </div>
    </div>
  );
}
