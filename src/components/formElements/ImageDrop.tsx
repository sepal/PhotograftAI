import { CloudArrowUpIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRef, useState } from "react";

interface ImageDropProps {
  onDrop: (file: File) => void;
  disabled?: boolean;
}

export const ImageDrop = ({ onDrop, disabled = false }: ImageDropProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleClick = () => {
    if (!ref.current) return;

    if (disabled) return;
    ref.current.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files || []);
      setSelectedFile(files[0]);
      onDrop(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    setSelectedFile(files[0]);
    onDrop(files[0]);
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const classes = [
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "w-full",
    "h-full",
    "text-center",
    "border-2",
    "border-dashed",
    "rounded-md",
    disabled ? "" : "cursor-pointer",
    disabled ? "border-slate-400" : "border-indigo-500",
    disabled ? "text-slate-400" : "text-indigo-500",
  ];

  return (
    <div
      className={classes.join(" ")}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
    >
      {!selectedFile && (
        <>
          <CloudArrowUpIcon className="w-16 h-16 m-5" />
          <p className="my-5">
            <b>Click to select</b> or drag and drop an image.
          </p>
        </>
      )}
      <div className="flex flex-col items-center justify-center">
        {selectedFile && (
          <div className="flex flex-col items-center justify-center m-5">
            <Image
              src={URL.createObjectURL(selectedFile)}
              width={200}
              height={200}
              alt="Image to be uploaded"
            />
            <p className="m-2">
              <b>Click again</b> to change the image
            </p>
          </div>
        )}
        <input
          type="file"
          name="file"
          ref={ref}
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
