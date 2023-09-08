import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

interface Props {
  onClick: () => void;
}

const DropButton = ({ onClick }: Props) => (
  <button
    className="flex items-center absolute top-0 right-0 bottom-0 px-2"
    onClick={onClick}
  >
    <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
  </button>
);

export default DropButton;
