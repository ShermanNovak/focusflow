import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RightPanel({ children }: Props) {
  return (
    <div className="fixed lg:max-w-lg w-screen top-0 right-0 bg-bluish-grey h-screen">
      <div className="p-8">
      {children}
      </div>
    </div>
  );
}
