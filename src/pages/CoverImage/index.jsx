import { useRef, useState } from "react";
import Image from "@/compat/Image";
import { ImagePlus, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "@/compat/navigation";
import Button from "@/components/ui/Button";
import { useUploadCoverImage } from "../../hooks/useAuth";

export default function CoverImagePage() {
  const router = useRouter();

  const inputRef = useRef(null);

  const [preview, setPreview] = useState();



  const [file, setFile] = useState(null);

const handleImage = (e) => {
    const image = e.target.files?.[0];

    if (!image) return;

    setFile(image);
    setPreview(URL.createObjectURL(image));
};

const { mutate: uploadCover } =
    useUploadCoverImage();


  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}

      <div className="mb-10">
        <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold mb-3">
          <span>Creator Onboarding</span>
          <span>Step 3 / 4</span>
        </div>

        <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" />
        </div>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-black mb-4">
          Upload Your Cover Image
        </h1>

        <p className="text-zinc-400 max-w-xl mx-auto">
          This banner appears at the top of your creator profile and helps
          fans recognize your brand.
        </p>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className="relative h-[300px] rounded-3xl border-2 border-dashed border-yellow-500/30 overflow-hidden cursor-pointer group bg-zinc-900"
      >
        {preview ? (
          <Image
            src={preview}
            alt="cover"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-yellow-500/10 flex items-center justify-center mb-6">
              <ImagePlus
                size={40}
                className="text-yellow-400"
              />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Upload Cover Photo
            </h3>

            <p className="text-zinc-500 text-center leading-7">
              Recommended Size

              <br />

              1920 × 600

              <br />

              JPG or PNG
            </p>
          </div>
        )}

        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all" />
      </div>

      <input
        hidden
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleImage}
      />

      <div className="grid grid-cols-2 gap-5 mt-10">
        <Button
          type="button"
          onClick={() => router.back()}
          className="h-14 bg-zinc-900 border border-white/10 hover:bg-zinc-800"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </Button>

      <Button
                className="h-14"

    onClick={() => {

        if (!file) {
            router.push("/Kyc");
            return;
        }

        const formData = new FormData();

        formData.append("image", file);

       uploadCover(formData,{
   onSuccess:()=>{
      router.push("/Kyc");
   }
});

    }}
>
          Continue
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>

      <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
        <h3 className="font-bold text-yellow-300 mb-2">
          Tips for a great cover
        </h3>

        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Use a high quality image.</li>
          <li>• Avoid placing text near the edges.</li>
          <li>• Showcase your personality or brand.</li>
          <li>• Landscape images work best.</li>
        </ul>
      </div>
    </div>
  );
}