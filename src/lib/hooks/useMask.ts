import { InferenceSession, Tensor, env } from "onnxruntime-web";
import { useEffect, useState } from "react";
/* @ts-ignore */
import npyjs from "npyjs";

const MODEL_PATH = "/_next/static/chunks/pages/sam_vit_h_4b8939_quant.onnx";

env.wasm.wasmPaths = "/_next/static/chunks/pages/";

export type Point = [number, number];
export type Points = Point[];

function prepModelData(
  points: Points,
  embeddings: Tensor,
  width: number,
  height: number
) {
  let pointCoords = new Float32Array(2 * (points.length + 1));
  let pointLabels = new Float32Array(points.length + 1);
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
    pointCoords[2 * index] = point[0];
    pointCoords[2 * index + 1] = point[1];
    pointLabels[index] = 1;
  });

  pointCoords[2 * pointCoords.length] = 0.0;
  pointCoords[2 * pointCoords.length + 1] = 0.0;
  pointLabels[pointCoords.length] = -1.0;

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

export default function useMask(
  embeddingsPath: string,
  imageWidth: number,
  imageHeight: number
) {
  const [model, setModel] = useState<InferenceSession | null>(null);
  const [embeddings, setEmbeddings] = useState<Tensor | null>(null);
  const [points, setPoints] = useState<Points>([]);

  // Initializes the SAM model.
  const initModel = async () => {
    try {
      const model = await InferenceSession.create(MODEL_PATH);
      setModel(model);
    } catch (e) {
      console.error("Error while load SAM model:\n" + e);
    }
  };

  // Load a tensor file.
  const loadNpyTensor = async (tensorPath: string) => {
    let np = new npyjs();
    const npArray = await np.load(tensorPath);
    const tensor = new Tensor("float32", npArray.data, npArray.shape);

    return tensor;
  };

  // Runs the prediction.
  const runPrediction = async () => {
    try {
      if (!model || !embeddings || points.length == 0) {
        return;
      }

      const modelData = prepModelData(
        points,
        embeddings,
        imageWidth,
        imageHeight
      );
      const result = await model.run(modelData);
      const output = result[model.outputNames[0]];

      console.log(output);
    } catch (e) {
      console.error("Error while trying to run prediction:\n" + e);
    }
  };

  // Initialize the SAM model.
  useEffect(() => {
    initModel();
  }, []);

  // Load the embeddings tensor file.
  useEffect(() => {
    if (!embeddingsPath) return;
    Promise.resolve(loadNpyTensor(embeddingsPath)).then((tensor) =>
      setEmbeddings(tensor)
    );
  }, [embeddingsPath]);

  // Run the predictions.
  useEffect(() => {
    runPrediction();
  }, [points]);

  return [setPoints];
}
