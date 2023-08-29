import { Point, Points } from "../sam";

export function is_within_radius(point: Point, points: Points, radius: number) {
  return points.filter((p) => {
    const distance = Math.sqrt((p[0] - point[0]) ** 2 + (p[1] - point[1]) ** 2);

    return distance > radius;
  });
}
