import ReactSlider, { ReactSliderProps } from "react-slider";

const HorizontalSlider = <T extends number | readonly number[]>(
  _props: ReactSliderProps<T>
) => {
  const thumbClasses = [
    "h-full",
    "aspect-square",
    "rounded-full",
    "bg-indigo-500",
    "text-xs",
    "text-white",
    "flex",
    "items-center",
    "justify-center",
    "cursor-grab",
  ];

  const trackClasses = [
    "h-1/4 top-1/2 -translate-y-1/4",
    "rounded-full",
    "bg-slate-200",
  ];

  const markClasses = [
    "top-1/2 -translate-y-1/2",
    "w-5 h-5",
    "rounded-full bg-indigo-500",
  ];

  return (
    <ReactSlider
      {..._props}
      renderThumb={(props, state) => (
        <div {...props} className={thumbClasses.join(" ")}>
          {state.valueNow}
        </div>
      )}
      renderTrack={(props, state) => (
        <div {...props} className={trackClasses.join(" ")}></div>
      )}
      renderMark={(props) => (
        <div {...props} className={markClasses.join(" ")}></div>
      )}
    />
  );
};

export default HorizontalSlider;
