interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onClick?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}

const Canvas = ({ canvasRef, onClick = () => {} }: CanvasProps) => (
  <canvas
    ref={canvasRef}
    width="512px"
    height="512px"
    className="m-auto w-full"
  />
);

export default Canvas;
