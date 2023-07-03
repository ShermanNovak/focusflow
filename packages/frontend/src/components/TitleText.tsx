interface InputProps {
    text: string;
  }
  
  export default function TitleText(props: InputProps) {
    return (
      <span className="text-sm">
        {props.text}
      </span>
    );
  }