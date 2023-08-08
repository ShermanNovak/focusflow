interface InputProps {
  text: string;
}

export default function PageTitle(props: InputProps) {
  return <span className="text-xl text-black font-bold pr-5">{props.text}</span>;
}
