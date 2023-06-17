import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RightPanel({ children }: Props) {
  return (
    <div className="max-w-lg md:w-full bg-bluish-grey absolute right-0 h-screen p-8">
      {children}
    </div>
  );
}
