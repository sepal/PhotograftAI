import { Point } from "@/lib/sam";
import { forwardRef, useEffect } from "react";

interface CanvasProps {
  onPointClick?: (point: Point) => void;
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ onPointClick: onSetPoint = () => {} }: CanvasProps, ref) => {
    const handleClick = (
      e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
      if (ref && typeof ref !== "function" && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const widthRation = ref.current.width / ref.current.clientWidth;
        const heightRatio = ref.current.height / ref.current.clientHeight;
        if (!rect) return;
        const x = (e.clientX - rect.left) * widthRation;
        const y = (e.clientY - rect.top) * heightRatio;
        const point: Point = [x, y];
        onSetPoint(point);
      }
    };

    return (
      <canvas
        ref={ref}
        width="512px"
        height="512px"
        className="m-auto w-full"
        onClick={handleClick}
      />
    );
  }
);

export default Canvas;
