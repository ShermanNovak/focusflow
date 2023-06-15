import TitleText from './TitleText';
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  text: string;
};

export default function NavBarCom(props: Props) {
    return (
        <div className='flex justify-left'>
            {props.children}
            <TitleText text={props.text}/>
        </div>
    )
}