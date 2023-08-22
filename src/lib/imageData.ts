// RGBA Color type.
export type RGBA = [number, number, number, number];

function maskDataToImage(
  data: number[],
  width: number,
  height: number,
  color: RGBA
) {
  const image = new Uint8ClampedArray(4 * width * height).fill(0);

  for (let i = 0; i < data.length; i++) {
    if (data[i] > 0.0) {
      image[4 * i + 0] = color[0];
      image[4 * i + 1] = color[1];
      image[4 * i + 2] = color[2];
      image[4 * i + 3] = color[3];
    }
  }

  return new ImageData(image, width, height);
}

function imageDataToImage(data: ImageData): HTMLImageElement {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = data.width;
  canvas.height = data.height;
  ctx?.putImageData(data, 0, 0);
  const image = new Image();
  image.src = canvas.toDataURL();
  return image;
}

export function imageToBlob(image: HTMLImageElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    ctx.drawImage(image, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to convert image to blob"));
        return;
      }
      resolve(blob);
    });
  });
}

export function maskToImage(
  input: any,
  width: number,
  height: number
): HTMLImageElement {
  const color: RGBA = [0, 114, 189, 120];
  return imageDataToImage(maskDataToImage(input, width, height, color));
}
