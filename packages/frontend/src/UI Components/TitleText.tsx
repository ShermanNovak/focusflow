interface InputProps {
    text: string;
  }
  
  export default function TitleText(props: InputProps) {
    return (
      <span className="text-sm pb-4 block ml-2">
        {props.text}
      </span>
    );
  }