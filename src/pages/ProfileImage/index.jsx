import { Camera, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Image from "@/compat/Image";
import Button from "@/components/ui/Button";
import { useRouter } from "@/compat/navigation";

export default function ProfileImagePage() {
  const router = useRouter();

  const inputRef = useRef(null);
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10">
        <div className="mb-3 flex justify-between text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          <span>Step 2 / 4</span>
          <span>Profile Photo</span>
        </div>

        <div className="h-2 rounded-full bg-zinc-800">
          <div className="h-full w-2/4 rounded-full bg-yellow-400" />
        </div>
      </div>

      <h1 className="mb-3 text-center text-4xl font-black">
        Upload Profile Photo
      </h1>

      <p className="mb-12 text-center text-zinc-400">
        This will be the first thing fans see.
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed border-yellow-500/30 bg-zinc-900 p-12 transition-all hover:border-yellow-400"
      >
        {preview ? (
          <Image
            src={preview}
            alt=""
            width={220}
            height={220}
            className="h-56 w-56 rounded-full object-cover"
          />
        ) : (
          <>
            <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-yellow-500/10">
              <Camera
                size={42}
                className="text-yellow-400"
              />
            </div>

            <h3 className="mb-2 text-xl font-bold">
              Upload Your Profile Picture
            </h3>

            <p className="text-center text-zinc-500">
              JPG, PNG
              <br />
              Recommended 1000 × 1000
            </p>
          </>
        )}

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <Button
        className="mt-10 h-16 w-full"
        onClick={() => router.push("/CoverImage")}
      >
        Continue
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
}