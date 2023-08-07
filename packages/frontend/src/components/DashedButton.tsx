import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  boldText: string;
  text: string;
  onclick: Function;
};

export default function DashedButton(props: Props) {
  return (
    <button className="flex flex-row items-center gap-8 border-dashed rounded-lg px-8 py-3 my-3" onClick={() => onclick}>
      {props.children}
      <div className="flex flex-col items-start gap-1 font-sans">
        <span className="font-bold">
          {props.boldText}
        </span>
        <span>{props.text}</span>
      </div>
    </button>
  );
}
