import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const xata = getXataClient();

  const data = await req.formData();

  for (const [key, value] of Array.from(data.entries())) {
    // console.log(key, value);
    const isFile = typeof value == "object";
    if (isFile) {
      const blob = value as Blob;
      const filename = blob.name;

      console.log(filename);
    }
  }

  return NextResponse.json({
    success: true,
  });
}
