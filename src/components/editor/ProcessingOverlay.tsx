import Spinner from "../icons/Spinner";

interface Props {
  text: string;
}

const ProcessingOverlay = ({ text }: Props) => {
  return (
    <div className="absolute flex justify-center items-center w-full h-full top-0  text-white bg-black/60">
      <div className="text-center">
        <Spinner size="2rem" color="bg-slate-300" /> {text}
      </div>
    </div>
  );
};

export default ProcessingOverlay;
