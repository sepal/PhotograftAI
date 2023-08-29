import { Point } from "../sam";

export function drawPoint(context: CanvasRenderingContext2D, point: Point) {
  const radius = 10;
  context.beginPath();
  context.arc(point[0], point[1], radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#6366F1";
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = "#3a3b8a";
  context.stroke();
  context.closePath;
}
