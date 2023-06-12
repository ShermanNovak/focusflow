interface InputProps {
  text: string;
}

export default function SmallCaps(props: InputProps) {
  return (
    <label className="font-ubuntu text-xs uppercase block py-2">
      {props.text}
    </label>
  );
}
