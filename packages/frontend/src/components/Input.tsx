// reference: https://tailwindui.com/components/application-ui/forms/input-groups

interface InputProps {
  label: string;
  placeholder: string;
}

export default function Input(props: InputProps) {
  return (
    <div>
      <label
        htmlFor={props.label}
        className="font-ubuntu text-xs uppercase block py-2"
      >
        {props.label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          name={props.label}
          id={props.label}
          className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}
