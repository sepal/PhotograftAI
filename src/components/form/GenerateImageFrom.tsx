import { useRef } from "react";
import { ProcessButton, ProcessingState } from "../formElements/ProcessButton";
import TextArea from "../formElements/TextArea";

interface GenerateImageFormProps {
  onSubmit: (prompt: string) => void;
  state: ProcessingState;
}

const GenerateImageForm = ({ onSubmit, state }: GenerateImageFormProps) => {
  const promptRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(promptRef.current?.value || "");
  };

  return (
    <form className="flex flex-col my-4" onSubmit={handleSubmit}>
      <TextArea
        placeholder="A golden hour sky..."
        ref={promptRef}
        disabled={state == ProcessingState.Processing}
      />
      <ProcessButton state={state}>Generate</ProcessButton>
    </form>
  );
};

export default GenerateImageForm;
