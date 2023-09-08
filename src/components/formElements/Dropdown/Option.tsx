import { CheckIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  value: any;
  onSelect?: (value: any) => void;
  selected?: boolean;
}

const Option = ({ children, value, onSelect, selected = false }: Props) => (
  <li
    className="flex justify-between m-2 hover:bg-blue-600 hover:text-white px-2 py-1"
    onMouseDown={onSelect ? () => onSelect(value) : undefined}
  >
    {children}{" "}
    {selected && <CheckIcon className="h-6 w-auto hover:text-white" />}
  </li>
);

export default Option;
