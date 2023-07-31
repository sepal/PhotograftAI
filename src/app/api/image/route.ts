import { getReplicateClient } from "@/lib/replicate";
import { getAppDomain } from "@/lib/url";
import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const xata = getXataClient();
  const replicate = getReplicateClient();

  const data = await req.formData();

  const images = [];
  for (const [key, value] of Array.from(data.entries())) {
    const isFile = typeof value == "object";
    if (isFile) {
      const blob = value as Blob;
      const filename = blob.name;
      const record = await xata.db.Images.create({
        file: {
          name: filename,
          signedUrlTimeout: 60 * 5,
          mediaType: blob.type,
          base64Content: await blob
            .arrayBuffer()
            .then((buffer) => Buffer.from(buffer).toString("base64")),
        },
      });

      const fileRecord = await xata.db.Images.read(record.id, [
        "file.mediaType",
        "file.signedUrl",
      ]);

      const webHookUrl = `${getAppDomain()}/api/image/${record.id}/embedding`;
      const imageUrl = fileRecord!.file!.signedUrl;

      await replicate.predictions.create({
        version:
          "6169e3d14e9d16d2efd9caf122c94cc4aa916ccef7ae2f85afc930a874beffd9",
        input: {
          image: imageUrl,
        },
        webhook: webHookUrl,
        webhook_events_filter: ["completed"],
      });

      images.push(record.id);
    }
  }

  // const replicate = getReplicateClient();

  // const prediction = await replicate.predictions.create({
  //   version: "3fa62720f6c98d30b37d8ba1cc2a25051579ad41addc535a47dc0bceaefaf507",
  //   input: {
  //     image: imageUrl,
  //   },
  //   webhook: url,
  //   webhook_events_filter: ["completed"],
  // });

  // console.log(prediction);

  return NextResponse.json({
    success: true,
    images,
  });
}
