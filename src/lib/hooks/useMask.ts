import { InferenceSession, Tensor, env } from "onnxruntime-web";
import { useEffect, useState } from "react";
import { Points, getMask, initSAM, loadNpyTensor, prepModelData } from "../sam";

export default function useMask(
  imageId: string,
  imageWidth: number,
  imageHeight: number,
  scale: number
) {
  const [model, setModel] = useState<InferenceSession | null>(null);
  const [embeddings, setEmbeddings] = useState<Tensor | null>(null);
  const [points, setPoints] = useState<Points>([]);
  const [mask, setMask] = useState<Tensor | null>(null);

  const embeddingsPath = `/api/image/${imageId}/embeddings`;

  // Initialize the SAM model.
  useEffect(() => {
    initSAM()
      .then((model) => setModel(model))
      .catch(console.error);
  }, []);

  // Load the embeddings tensor file.
  useEffect(() => {
    if (!embeddingsPath) return;
    loadNpyTensor(embeddingsPath)
      .then((tensor) => setEmbeddings(tensor))
      .catch(console.error);
  }, [embeddingsPath]);

  // Run the predictions.
  useEffect(() => {
    if (!model || !embeddings) {
      return;
    }

    if (points.length == 0) {
      setMask(null);
      return;
    }

    getMask(model, embeddings, points, imageWidth, imageHeight, scale)
      .then((mask) => {
        setMask(mask);
      })
      .catch(console.error);
  }, [points]);

  return [mask, points, setPoints] as const;
}
