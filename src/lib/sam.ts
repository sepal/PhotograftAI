import { InferenceSession, Tensor, env } from "onnxruntime-web";
import npyjs from "npyjs";
import { maskToImage } from "./image";

const MODEL_PATH = "/_next/static/chunks/pages/sam_vit_h_4b8939_quant.onnx";

env.wasm.wasmPaths = "/_next/static/chunks/pages/";

export type Point = [number, number];
export type Points = Point[];

export function prepModelData(
  points: Points,
  embeddings: Tensor,
  width: number,
  height: number,
  scale: number
) {
  const pointsLen = points.length;
  let pointCoords = new Float32Array(2 * (pointsLen + 1));
  let pointLabels = new Float32Array(pointsLen + 1);
  let pointCoordsTensor;
  let pointLabelsTensor;

  const imageSizeTensor = new Tensor("float32", [height, width]);

  // There is no previous mask, so default to an empty tensor
  const maskInput = new Tensor(
    "float32",
    new Float32Array(256 * 256),
    [1, 1, 256, 256]
  );

  const hasMaskInput = new Tensor("float32", [0]);

  points.forEach((point, index) => {
    pointCoords[2 * index] = point[0] * scale;
    pointCoords[2 * index + 1] = point[1] * scale;
    pointLabels[index] = 1;
  });

  pointCoords[2 * pointsLen] = 0.0;
  pointCoords[2 * pointsLen + 1] = 0.0;
  pointLabels[pointsLen] = -1.0;

  console.log(pointLabels);

  pointCoordsTensor = new Tensor("float32", pointCoords, [
    1,
    points.length + 1,
    2,
  ]);

  pointLabelsTensor = new Tensor("float32", pointLabels, [
    1,
    points.length + 1,
  ]);

  return {
    image_embeddings: embeddings,
    point_coords: pointCoordsTensor,
    point_labels: pointLabelsTensor,
    orig_im_size: imageSizeTensor,
    mask_input: maskInput,
    has_mask_input: hasMaskInput,
  };
}

export async function initSAM() {
  const model = await InferenceSession.create(MODEL_PATH);
  return model;
}

export async function loadNpyTensor(tensorPath: string) {
  let np = new npyjs();
  const npArray = await np.load(tensorPath);
  const tensor = new Tensor("float32", npArray.data, npArray.shape);

  return tensor;
}

export async function getMask(
  model: InferenceSession,
  embeddings: Tensor,
  points: Points,
  imageWidth: number,
  imageHeight: number,
  scale: number
) {
  const modelData = prepModelData(
    points,
    embeddings,
    imageWidth,
    imageHeight,
    scale
  );
  const result = await model.run(modelData);
  const output = result[model.outputNames[0]];

  const image = maskToImage(output.data, output.dims[2], output.dims[3]);
  return image;
}
