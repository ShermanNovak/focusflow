import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RightPanel({ children }: Props) {
  return (
    <div className="w-[36rem] bg-bluish-gray absolute right-0 h-full p-8">
      {children}
    </div>
  );
}
