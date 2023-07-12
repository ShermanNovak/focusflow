import TitleText from "./TitleText";
import { MouseEventHandler, ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: ReactNode;
  text: string;
  locate?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  state?: boolean;
};

export default function NavBarCom(props: Props) {
  return (
    <NavLink
      to={props.locate || ""}
      className="flex justify-left items-center gap-x-3 -ms-4 ps-4 h-9 no-underline text-black"
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? "white" : "",
          borderRadius: isActive ? "5px" : "",
        };
      }}
      onClick={props.onClick}
      end
    >
      {props.children}
      <TitleText text={props.text} />
    </NavLink>
  );
}
