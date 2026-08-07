import { useState } from "react";
import {
  Upload,
  Image,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function ReceiptUploadCard({
  paymentId,
  onUpload,
  isUploading = false,
  status = "pending",
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFile = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

const handleSubmit = () => {
    if (!file) return;

    console.log(file);
    console.log(file instanceof File);

    onUpload({
        paymentId,
        file,
    });
};

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">

      <h2 className="text-2xl font-black">
        Upload Payment Receipt
      </h2>

      <p className="text-zinc-500 mt-2">
        After completing your bank transfer,
        upload a clear screenshot or photo of
        your payment receipt.
      </p>

      {/* Upload Area */}

      <label className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-3xl h-72 cursor-pointer hover:border-pink-500 transition overflow-hidden">

        {preview ? (
          <img
            src={preview}
            alt="Receipt Preview"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-center">

            <Upload
              size={46}
              className="mx-auto text-pink-500"
            />

            <h3 className="font-bold mt-4">
              Choose Receipt
            </h3>

            <p className="text-zinc-500 text-sm mt-2">
              PNG • JPG • JPEG
            </p>

          </div>
        )}

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={handleFile}
        />

      </label>

      {file && (
        <div className="mt-5 rounded-2xl bg-black/30 p-4 flex items-center gap-3">

          <Image
            size={20}
            className="text-pink-500"
          />

          <div className="flex-1">

            <p className="font-semibold">
              {file.name}
            </p>

            <p className="text-xs text-zinc-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

          </div>

        </div>
      )}

      <div className="mt-8 flex justify-between items-center">

        <div>

          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Receipt Status
          </p>

          <div className="mt-2">

  {status === "waiting" && (
    <span className="px-4 py-2 rounded-full bg-yellow-500/15 text-yellow-400 text-sm font-bold">
      Awaiting Receipt
    </span>
  )}

  {status === "pending_verification" && (
    <span className="px-4 py-2 rounded-full bg-blue-500/15 text-blue-400 text-sm font-bold">
      Receipt Uploaded • Under Review
    </span>
  )}

  {status === "finished" && (
    <span className="px-4 py-2 rounded-full bg-green-500/15 text-green-400 text-sm font-bold flex items-center gap-2 w-fit">
      <CheckCircle2 size={16} />
      Payment Approved
    </span>
  )}

  {status === "rejected" && (
    <span className="px-4 py-2 rounded-full bg-red-500/15 text-red-400 text-sm font-bold">
      Payment Rejected
    </span>
  )}

</div>

        </div>

        <button
disabled={
    !file ||
    isUploading ||
    status === "pending_verification" ||
    status === "finished"
}          onClick={handleSubmit}
          className="h-12 px-8 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Uploading...
            </>
          ) : (
            "Upload Receipt"
          )}
        </button>
{status === "pending_verification" && (
    <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="font-semibold text-blue-400">
            Receipt uploaded successfully.
        </p>

        <p className="mt-2 text-sm text-zinc-400">
            Your payment is being reviewed. Verification may take up to 48 hours.
        </p>
    </div>
)}
      </div>

    </div>
  );
}