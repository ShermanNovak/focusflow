import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  heading: string;
  text: string;
};

export default function Card(props: Props) {
    return (
        <div>
            <div className = 'flex justify-center'>{props.children}</div>
            <div className = 'flex justify-center'> {props.heading} </div>
            <div className = 'flex justify-center'> {props.text} </div>
        </div>
    )
}