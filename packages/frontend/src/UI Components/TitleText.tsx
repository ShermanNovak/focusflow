interface InputProps {
    text: string;
  }
  
  export default function TitleText(props: InputProps) {
    return (
      <span className="text-xl pb-4 block">
        {props.text}
      </span>
    );
  }