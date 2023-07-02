import React from "react";
import TitleText from "./TitleText";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: ReactNode;
  text: string;
  locate: string;
};

export default function NavBarCom(props: Props) {
  return (
    <NavLink
      to={props.locate}
      className="flex justify-left items-center gap-x-3 -ms-4 ps-4 h-9 no-underline text-black"
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? "" : "white",
          borderRadius: isActive ? "" : "5px",
        };
      }}
    >
      {props.children}
      <TitleText text={props.text} />
    </NavLink>
  );
}
