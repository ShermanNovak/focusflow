interface InputProps {
    text: string;
  }
  
  export default function TitleText(props: InputProps) {
    return (
      <span className="text-sm pb-4 ml-2">
        {props.text}
      </span>
    );
  }