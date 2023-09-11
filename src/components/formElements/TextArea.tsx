import { forwardRef } from "react";

interface TextAreaProps {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder = "", className = "", disabled = false, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className={`border my-2 p-1 border-slate-500 rounded w-full ${className}`}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }
);

export default TextArea;
