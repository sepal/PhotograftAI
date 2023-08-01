import { HTMLProps } from "react";
import { Spinner } from "../icons/spinner";

export enum ProcessingState {
  Idle,
  Processing,
  Done,
}

interface Props extends HTMLProps<HTMLButtonElement> {
  primary?: boolean;
  state?: ProcessingState;
  children: React.ReactNode;
}

export const ProcessButton = ({ primary = true, state = ProcessingState.Idle, children, ...props }: Props) => {
  let classes = `px-2 py-1 my-2 rounded-md border bg-indigo-500 text-white`

  if (primary) {
    classes += " bg-indigo-500 text-white"
  } else {
    classes += " bg-slate-500"
  }

  classes += " " + props.className;



  return (
    <button
      className={classes}
      disabled={state !== ProcessingState.Idle}
      type="submit"
    >
      {state !== ProcessingState.Idle && <Spinner />}{" "}
      {state === ProcessingState.Idle ? children : "Processing..."}
    </button>
  )
}