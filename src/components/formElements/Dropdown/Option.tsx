import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  value: any;
  onSelect?: (value: any) => void;
}

const Option = ({ children, value, onSelect }: Props) => (
  <li
    className="m-2 hover:bg-blue-600 hover:text-white px-2 py-1"
    onMouseDown={onSelect ? () => onSelect(value) : undefined}
  >
    {children}
  </li>
);

export default Option;
