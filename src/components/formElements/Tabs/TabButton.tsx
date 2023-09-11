import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onSelect: () => void;
}

const TabButton = ({ children, onSelect }: Props) => (
  <button
    onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();

      onSelect();
    }}
    className="bg-slate-600 p-2 text-white rounded-full"
  >
    {children}
  </button>
);

export { TabButton };
