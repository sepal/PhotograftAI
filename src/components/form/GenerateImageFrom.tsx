import { useRef } from "react";
import { ProcessButton, ProcessingState } from "../formElements/ProcessButton";
import TextArea from "../formElements/TextArea";
import { Dropdown } from "../formElements/Dropdown";
import { getStyleNames } from "@/lib/sdxl/styles";
import { Tab, Tabs } from "../formElements/Tabs";

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

  const styles: [string, string][] = getStyleNames().map((name) => [
    name,
    name,
  ]);

  return (
    <form className="flex flex-col my-4" onSubmit={handleSubmit}>
      <Tabs>
        <Tab label="Text to image">
          <TextArea
            placeholder="A golden hour sky..."
            ref={promptRef}
            disabled={state == ProcessingState.Processing}
          />
        </Tab>
        <Tab label="Style">
          <Dropdown values={styles} />
        </Tab>
      </Tabs>

      <ProcessButton state={state}>Generate</ProcessButton>
    </form>
  );
};

export default GenerateImageForm;
