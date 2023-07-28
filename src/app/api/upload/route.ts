import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const xata = getXataClient();

  const data = await req.formData();

  const uploadIds = [];
  for (const [key, value] of Array.from(data.entries())) {
    const isFile = typeof value == "object";
    if (isFile) {
      const blob = value as Blob;
      const filename = blob.name;
      const record = await xata.db.Images.create({
        file: {
          name: filename,
          mediaType: blob.type,
          base64Content: await blob
            .arrayBuffer()
            .then((buffer) => Buffer.from(buffer).toString("base64")),
        },
      });
      uploadIds.push(record.id);
    }
  }

  return NextResponse.json({
    success: true,
    uploadIds: uploadIds,
  });
}
