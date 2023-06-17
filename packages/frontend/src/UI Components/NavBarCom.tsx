import TitleText from './TitleText';
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: ReactNode;
  text: string;
  locate: string;
};

export default function NavBarCom(props: Props) {
    console.log(props.locate)
    const NavbarStates = {
        textDecoration: 'none',
        color: 'black',
    };
    return (
        <div>
            <NavLink to={props.locate} 
                className="flex justify-left items-center"
                style={({ isActive, isPending }) => {
                    return {
                        backgroundColor: isActive ? "" : "white",
                        borderRadius: "5px",
                        textDecoration: 'none',
                        color: 'black'
                    }}}
                >    
                {props.children}
                <TitleText text={props.text}/>
            </NavLink>
        </div>
    )
}