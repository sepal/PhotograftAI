import { UploadImage } from "@/components/form/UploadImage";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-5">
      <UploadImage />
    </main>
  );
}
