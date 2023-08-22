import { InferenceSession, Tensor, env } from "onnxruntime-web";
import { useEffect, useState } from "react";
/* @ts-ignore */
import npyjs from "npyjs";
import { maskToImage } from "../image";
import { Points, getMask, initSAM, loadNpyTensor, prepModelData } from "../sam";

const MODEL_PATH = "/_next/static/chunks/pages/sam_vit_h_4b8939_quant.onnx";

env.wasm.wasmPaths = "/_next/static/chunks/pages/";

export default function useMask(
  embeddingsPath: string,
  imageWidth: number,
  imageHeight: number,
  scale: number
) {
  const [model, setModel] = useState<InferenceSession | null>(null);
  const [embeddings, setEmbeddings] = useState<Tensor | null>(null);
  const [points, setPoints] = useState<Points>([]);
  const [mask, setMask] = useState<HTMLImageElement | null>(null);

  // Initialize the SAM model.
  useEffect(() => {
    Promise.resolve(initSAM().then((model) => setModel(model)));
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
    if (!model || !embeddings || points.length == 0) {
      return;
    }

    Promise.resolve(
      getMask(model, embeddings, points, imageWidth, imageHeight, scale).then(
        (mask) => {
          setMask(mask);
        }
      )
    );
  }, [points]);

  return [mask, setPoints] as const;
}
