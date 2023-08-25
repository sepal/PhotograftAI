import { forwardRef } from "react";

interface TextAreaProps {
  placeholder?: string;
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder = "", className = "", ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className={`border my-2 p-1 border-slate-500 rounded ${className}`}
        placeholder={placeholder}
      />
    );
  }
);

export default TextArea;
