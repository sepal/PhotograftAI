import { ReactNode, useRef, useState } from "react";
import Option from "./Option";

interface Props {
  values: [[string, ReactNode]];
}

const Dropdown = ({ values }: Props) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [filter, setFilter] = useState<RegExp | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (value: any) => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
    setShowList(false);
  };

  const handleSearch = () => {
    if (!inputRef.current) {
      return;
    }

    if (inputRef.current.value.length == 0) {
      setFilter(null);
    }

    const value = inputRef.current.value;
    const regex = new RegExp(`${value}.+`, "gi");
    setFilter(regex);
  };

  const list = values
    .filter(([value, _]) => {
      if (!filter) {
        return true;
      }

      return value.match(filter) != null;
    })
    .map(([value, element], i) => (
      <Option key={i} value={value} onSelect={handleSelect}>
        {element}
      </Option>
    ));

  return (
    <div className="w-80 relative">
      <input
        type="text"
        className="border-2 rounded w-full px-2 py-1"
        ref={inputRef}
        onFocus={() => setShowList(true)}
        onBlur={() => setShowList(false)}
        onChange={handleSearch}
      />
      {showList && (
        <ul className="flex flex-col max-h-40 cursor-pointer overflow-y-scroll absolute z-10 bg-white w-full">
          {list}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
