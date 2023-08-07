// interface InputProps {
//   text: string;
// }

// export default function SmallCaps(props: InputProps) {
//   return (
//     <label className="font-ubuntu text-xs uppercase block py-2">
//       {props.text}
//     </label>
//   );
// }

interface SmallCapsProps {
  text: string;
  className?: string; // Optional className prop
}

export default function SmallCaps(props: SmallCapsProps) {
  const { text, className } = props;

  // Combine the base class name with the additional className if provided
  const combinedClassName = `font-ubuntu text-xs uppercase block py-2 ${className}`;

  return (
    <label className={combinedClassName}>
      {text}
    </label>
  );
}
