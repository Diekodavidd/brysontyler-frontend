import {
  X,
  UploadCloud,
  Image as ImageIcon,
  Video,
  DollarSign,
  Calendar,
  Tag,
  Users,
  FileText,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import {
  useUploadContent,
} from "@/hooks/useContent";

import {
  useDiscoverCreators,
} from "@/hooks/useCreator";

export default function UploadContentModal({
  open,
  onClose,
}) {
  const uploadMutation =
    useUploadContent();

  const {
    data: creatorsData,
  } = useDiscoverCreators();

  const creators =
    creatorsData?.creators || [];

  const fileInputRef =
    useRef(null);

  const thumbInputRef =
    useRef(null);

  const [mediaFile, setMediaFile] =
    useState(null);

  const [thumbnailFile, setThumbnailFile] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [thumbnailPreview, setThumbnailPreview] =
    useState("");
const [previewFile, setPreviewFile] = useState(null);

const previewInputRef = useRef(null);

const [uploadProgress, setUploadProgress] = useState(0);
const [previewVideo, setPreviewVideo] = useState("");
const initialForm = {
  title: "",
  description: "",
  category: "General",
  tags: "",
  visibility: "free",
  price: "",
  releaseDate: "",
  releaseTime: "",
  collaborator: "",
  allowComments: true,
  featured: false,
  status: "pending_review",
  geoBlocking: false,
  blockedCountries: [],

  featuredModels: [],
};

const [form, setForm] = useState(initialForm);

const [externalModels, setExternalModels] = useState([]);

const addExternalModel = () => {
  setExternalModels((prev) => [
    ...prev,
    {
      id: crypto.randomUUID(),
      fullName: "",
      email: "",
      consentFile: null,
    },
  ]);
};

const removeExternalModel = (id) => {
  setExternalModels((prev) =>
    prev.filter(
      (model) => model.id !== id
    )
  );
};

const updateExternalModel = (
  id,
  key,
  value
) => {
  setExternalModels((prev) =>
    prev.map((model) =>
      model.id === id
        ? {
            ...model,
            [key]: value,
          }
        : model
    )
  );
};
  useEffect(() => {
  if (!open) {
    setUploadProgress(0);

    setMediaFile(null);
    setThumbnailFile(null);

    setPreview("");
    setThumbnailPreview("");

    setPreviewFile(null);
    setPreviewVideo("");

    setExternalModels([]);

    setForm(initialForm);
  }
}, [open]);

  if (!open) return null;

  const chooseMedia = (file) => {
    if (!file) return;

    setMediaFile(file);

    setPreview(
      URL.createObjectURL(file)
    );

 
  };

  const chooseThumbnail = (
    file
  ) => {
    if (!file) return;

    setThumbnailFile(file);

    setThumbnailPreview(
      URL.createObjectURL(file)
    );
  };
const choosePreview = (file) => {
  if (!file) return;

  setPreviewFile(file);

  setPreviewVideo(
    URL.createObjectURL(file)
  );
};
  const handleChange = (
    key,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

const submit = () => {
  if (!mediaFile) {
    return alert(
      "Please upload a video."
    );
  }

  if (!thumbnailFile) {
    return alert(
      "Please upload a thumbnail."
    );
  }

  if (!previewFile) {
    return alert(
      "Please upload a preview video."
    );
  }

  if (!form.title.trim()) {
    return alert(
      "Title is required."
    );
  }

  // Validate external models

  for (const model of externalModels) {
    if (!model.fullName.trim()) {
      return alert(
        "Please enter the full legal name for every external model."
      );
    }

    if (!model.consentFile) {
      return alert(
        `Please upload a signed consent form for ${model.fullName}.`
      );
    }
  }


  const payload = new FormData();


  // Main files

  payload.append(
    "video",
    mediaFile
  );

  payload.append(
    "preview",
    previewFile
  );

  payload.append(
    "thumbnail",
    thumbnailFile
  );


  // Content information

  payload.append(
    "title",
    form.title
  );

  payload.append(
    "description",
    form.description
  );

  payload.append(
    "category",
    form.category
  );

  payload.append(
    "visibility",
    form.visibility
  );

  payload.append(
    "price",
    form.price
  );

  payload.append(
    "ownerType",
    "creator"
  );

  payload.append(
    "mediaType",
    mediaFile.type.startsWith("image")
      ? "image"
      : "video"
  );

  payload.append(
    "featured",
    String(form.featured)
  );

  payload.append(
    "allowComments",
    String(form.allowComments)
  );

  payload.append(
    "releaseDate",
    form.releaseDate
  );

  payload.append(
    "releaseTime",
    form.releaseTime
  );

  payload.append(
    "status",
    "pending_review"
  );


  // Geo blocking

  payload.append(
    "geoBlocking",
    JSON.stringify({
      enabled:
        form.geoBlocking,
      blockedCountries:
        form.blockedCountries,
    })
  );


  // Existing creator

  payload.append(
    "taggedCreators",
    JSON.stringify(
      form.collaborator
        ? [form.collaborator]
        : []
    )
  );


  // Tags

  payload.append(
    "tags",
    JSON.stringify(
      form.tags
        .split(",")
        .map((tag) =>
          tag.trim()
        )
        .filter(Boolean)
    )
  );


  // External model metadata

  const externalModelData =
    externalModels.map(
      (model) => ({
        id: model.id,
        fullName:
          model.fullName,
        email:
          model.email,
      })
    );

  payload.append(
    "externalModels",
    JSON.stringify(
      externalModelData
    )
  );


  // External model consent files

  externalModels.forEach(
    (model) => {

      if (model.consentFile) {

        payload.append(
          `consent_${model.id}`,
          model.consentFile
        );

      }

    }
  );


  uploadMutation.mutate(
    {
      data: payload,

      onUploadProgress:
        (progress) => {
          setUploadProgress(
            progress
          );
        },
    },

    {
      onSuccess: () => {

        setUploadProgress(
          100
        );

        setTimeout(() => {
          onClose();
        }, 500);

      },

      onError: (error) => {

        console.error(
          "Upload failed:",
          error
        );

        alert(
          error?.response?.data?.error ||
          "Upload failed. Please try again."
        );

      },
    }
  );
};

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur overflow-y-auto">

      <div className="max-w-6xl mx-3 mx-auto py-16 px-6">

        <div className="bg-zinc-900 rounded-[36px] border border-white/5 p-5 sm:p-8 lg:p-10">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-10">

            <div>

              <h2 className="text-4xl font-black">

                Upload Content

              </h2>

              <p className="text-zinc-500 mt-2">

                Upload videos,
                photos and premium
                experiences.

              </p>

            </div>

            <button
              onClick={onClose}
            >
              <X size={28} />
            </button>

          </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT */}

            <div className="space-y-8">

              {/* MEDIA */}

              <div>

                <label className="font-bold mb-3 block">

                  Content File

                </label>

                <div
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="cursor-pointer rounded-3xl border-2 border-dashed border-yellow-500/30 h-80 bg-black flex flex-col items-center justify-center"
                >

                  {preview ? (

                  mediaFile?.type.startsWith("image") ? (

                      <img
                        src={preview}
                        className="w-full h-full object-cover rounded-3xl"
                      />

                    ) : (

                      <video
                        src={preview}
                        controls
                        className="w-full h-full rounded-3xl object-cover"
                      />

                    )

                  ) : (

                    <>

                      <UploadCloud
                        size={60}
                        className="text-yellow-400"
                      />

                      <h3 className="text-2xl font-black mt-6">

                        Upload Full Video
                        

                      </h3>

                      <p className="text-zinc-500 mt-3">

                        Click to browse

                      </p>

                    </>

                  )}

                </div>
{/* PREVIEW VIDEO */}

<div className="mt-6">

  <label className="font-bold mb-3 block">
    Preview Video
  </label>

  <div
    onClick={() =>
      previewInputRef.current?.click()
    }
    className="cursor-pointer rounded-3xl border border-sky-500/30 h-56 bg-black flex items-center justify-center overflow-hidden"
  >

    {previewVideo ? (

      <video
        src={previewVideo}
        controls
        className="w-full h-full object-cover rounded-3xl"
      />

    ) : (

      <div className="text-center">

        <Video
          size={50}
          className="mx-auto text-sky-400"
        />

        <p className="mt-4 font-bold">
          Upload Preview Clip(4-10 seconds clip)
        </p>

        <p className="text-zinc-500 text-sm mt-2">
          Fans will watch this before purchasing.
        </p>

      </div>

    )}

  </div>

  <input
    hidden
    ref={previewInputRef}
    type="file"
    accept="video/*"
    onChange={(e) =>
      choosePreview(
        e.target.files?.[0]
      )
    }
  />

</div>
                <input
                  hidden
                  ref={
                    fileInputRef
                  }
                  type="file"
                  accept="video/*,image/*"
                  onChange={(e) =>
                    chooseMedia(
                      e.target.files?.[0]
                    )
                  }
                />

              </div>

              {/* THUMBNAIL */}

              <div>

                <label className="font-bold mb-3 block">

                  Cover picture

                </label>

                <div
                  onClick={() =>
                    thumbInputRef.current?.click()
                  }
                  className="cursor-pointer rounded-3xl border border-white/10 h-44 bg-black flex items-center justify-center overflow-hidden"
                >

                  {thumbnailPreview ? (

                    <img
                      src={
                        thumbnailPreview
                      }
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <ImageIcon
                      size={50}
                      className="text-zinc-600"
                    />

                  )}

                </div>

                <input
                  hidden
                  ref={
                    thumbInputRef
                  }
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    chooseThumbnail(
                      e.target.files?.[0]
                    )
                  }
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="space-y-6">

              <div>

                <label className="font-bold mb-2 block">
                  Title
                </label>

                <input
                  value={form.title}
                  onChange={(e) =>
                    handleChange(
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                />

              </div>

              <div>

                <label className="font-bold mb-2 block">
                  Description
                </label>

                <textarea
                  rows={6}
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                />

              </div>
                            {/* CATEGORY */}

              <div>

                <label className="font-bold mb-2 block">
                  Category
                </label>

                <select
    value={form.category}
    onChange={(e)=>
        handleChange("category",e.target.value)
    }
    className="w-full rounded-2xl bg-black border border-white/10 p-4"
>

<option>General</option>

<option>Entertainment</option>

<option>Threesome</option>

<option>Fitness</option>

<option>Solo</option>

<option>Couples</option>

<option>Podcast</option>

<option>Behind the Scenes</option>

<option>Group</option>

<option>Adult</option>

</select>

              </div>

              {/* TAGS */}

              <div>

                <label className="font-bold mb-2 flex items-center gap-2">

                  <Tag size={18} />

                  Tags

                </label>

                <input
                  value={form.tags}
                  onChange={(e) =>
                    handleChange(
                      "tags",
                      e.target.value
                    )
                  }
                  placeholder="music, lifestyle, vlog"
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                />

              </div>

              {/* VISIBILITY */}

              <div>

                <label className="font-bold mb-2 block">
                  Visibility
                </label>

                <select
value={form.visibility}
onChange={(e)=>handleChange("visibility",e.target.value)}
className="w-full rounded-2xl bg-black border border-white/10 p-4"
>

<option value="free">
Free
</option>

<option value="subscribers">
Subscribers Only
</option>



</select>

              </div>
<div className="space-y-4 rounded-2xl border border-white/10 p-5">

    <label className="flex items-center justify-between">

        <span className="font-bold">
            Enable Geo Blocking
        </span>

        <input
            type="checkbox"
            checked={form.geoBlocking}
            onChange={(e)=>
                handleChange(
                    "geoBlocking",
                    e.target.checked
                )
            }
        />

    </label>

    {form.geoBlocking && (

        <textarea
            rows={4}
            placeholder="Nigeria, Ghana, India"
            value={form.blockedCountries.join(", ")}
            onChange={(e)=>
                handleChange(
                    "blockedCountries",
                    e.target.value
                        .split(",")
                        .map(country=>country.trim())
                        .filter(Boolean)
                )
            }
            className="w-full rounded-2xl bg-black border border-white/10 p-4"
        />

    )}

</div>
              {/* PRICE */}

              {(form.visibility==="ppv" ||
form.visibility==="members_ppv" ||
                form.visibility ===
                  "Members + Pay Per View") && (

                <div>

                  <label className="font-bold mb-2 flex items-center gap-2">

                    <DollarSign size={18} />

                    Price

                  </label>

                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      handleChange(
                        "price",
                        e.target.value
                      )
                    }
                    className="w-full rounded-2xl bg-black border border-white/10 p-4"
                  />

                </div>

              )}

   {/* FEATURED PEOPLE */}

<div className="space-y-5">

  <div>
    <label className="font-bold mb-2 flex items-center gap-2">
      <Users size={18} />
      Featured People
    </label>

    <p className="text-sm text-zinc-500">
      Add creators or models featured in this content.
    </p>
  </div>

  {/* EXISTING CREATOR */}

  <div className="rounded-2xl border border-white/10 p-5">

    <label className="font-bold mb-2 block">
      Existing Creator
    </label>

    <select
      value={form.collaborator}
      onChange={(e) =>
        handleChange(
          "collaborator",
          e.target.value
        )
      }
      className="w-full rounded-2xl bg-black border border-white/10 p-4"
    >

      <option value="">
        None
      </option>

      {creators.map((creator) => (
        <option
          key={creator._id}
          value={creator._id}
        >
          {creator.name}
        </option>
      ))}

    </select>

  </div>


  {/* EXTERNAL MODELS */}

  <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

    <div className="flex justify-between items-start">

      <div>

        <h3 className="font-black">
          External Models
        </h3>

        <p className="text-sm text-zinc-500 mt-2">
          If someone featured in your content does
          not have an account, add them here and
          upload their signed consent form.
        </p>

      </div>

      <Users
        size={24}
        className="text-yellow-400"
      />

    </div>


    {externalModels.map(
      (model, index) => (

        <div
          key={model.id}
          className="mt-5 rounded-2xl bg-black border border-white/10 p-5 space-y-4"
        >

          <div className="flex justify-between">

            <h4 className="font-bold">
              External Model {index + 1}
            </h4>

            <button
              type="button"
              onClick={() =>
                removeExternalModel(model.id)
              }
              className="text-red-400 text-sm"
            >
              Remove
            </button>

          </div>


          <input
            type="text"
            placeholder="Full legal name"
            value={model.fullName}
            onChange={(e) =>
              updateExternalModel(
                model.id,
                "fullName",
                e.target.value
              )
            }
            className="w-full rounded-2xl bg-zinc-900 border border-white/10 p-4"
          />


          <input
            type="email"
            placeholder="Email address"
            value={model.email}
            onChange={(e) =>
              updateExternalModel(
                model.id,
                "email",
                e.target.value
              )
            }
            className="w-full rounded-2xl bg-zinc-900 border border-white/10 p-4"
          />


          <div>

            <label className="font-bold mb-2 block">
              Signed Consent Form
            </label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) =>
                updateExternalModel(
                  model.id,
                  "consentFile",
                  e.target.files?.[0] || null
                )
              }
              className="w-full text-sm text-zinc-500"
            />

            {model.consentFile && (
              <p className="text-xs text-green-400 mt-2">
                ✓ {model.consentFile.name}
              </p>
            )}

          </div>

        </div>

      )
    )}


    <button
      type="button"
      onClick={addExternalModel}
      className="w-full mt-5 py-3 rounded-xl border border-yellow-500/30 text-yellow-400 font-bold"
    >
      + Add External Model
    </button>


    {/* DOWNLOAD FORM */}

    <div className="mt-5 pt-5 border-t border-white/10">

      <p className="text-sm text-zinc-400">
        Need the official consent form?
      </p>

      <a
  href="/forms/bryson-tyler-model-release-form.html"
  download="bryson-tyler-model-release-form.html"
  className="inline-flex items-center gap-2 mt-3 text-yellow-400 font-bold"
>
  <FileText size={18} />

  Download Model Consent Form
</a>
        

    </div>

  </div>

</div>


              {/* SCHEDULE */}

             <div className="grid grid-cols-2 gap-5">

<div>

<label className="font-bold mb-2 block">

Release Date

</label>

<input
type="date"
value={form.releaseDate}
onChange={(e)=>
handleChange("releaseDate",e.target.value)
}
className="w-full rounded-2xl bg-black border border-white/10 p-4"
/>

</div>

<div>

<label className="font-bold mb-2 block">

Release Time

</label>

<input
type="time"
value={form.releaseTime}
onChange={(e)=>
handleChange("releaseTime",e.target.value)
}
className="w-full rounded-2xl bg-black border border-white/10 p-4"
/>

</div>

</div>

              {/* SWITCHES */}

              <div className="space-y-4">

                <label className="flex justify-between items-center">

                  <span>
                    Allow Comments
                  </span>

                  <input
                    type="checkbox"
                    checked={
                      form.allowComments
                    }
                    onChange={(e) =>
                      handleChange(
                        "allowComments",
                        e.target.checked
                      )
                    }
                  />

                </label>

                <label className="flex justify-between items-center">

                  <span>
                    Feature this Content
                  </span>

                  <input
                    type="checkbox"
                    checked={
                      form.featured
                    }
                    onChange={(e) =>
                      handleChange(
                        "featured",
                        e.target.checked
                      )
                    }
                  />

                </label>

              </div>
<div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">

<p className="text-sm text-yellow-300">

Your upload will be reviewed by the Bryson Tyler moderation team before it becomes visible to fans.

Once approved, it will automatically publish on your selected release date and time.

</p>

</div>
              {/* BUTTONS */}
{uploadMutation.isPending && (
    <div className="space-y-3">

        <div className="flex justify-between text-sm">

            <span>Uploading...</span>

            <span>{uploadProgress}%</span>

        </div>

        <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">

            <div
                className="h-full bg-yellow-500 transition-all duration-300"
                style={{
                    width: `${uploadProgress}%`,
                }}
            />

        </div>

    </div>
)}
<div className="grid grid-cols-3 gap-4 pt-6">
                <button
type="button"
className="h-14 rounded-2xl border border-white/10"
>
Save Draft
</button>

<button
type="button"
onClick={onClose}
className="h-14 rounded-2xl border border-white/10"
>
Cancel
</button>

<button
type="button"
onClick={submit}
disabled={uploadMutation.isPending}
className="h-14 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black"
>
{uploadMutation.isPending
? "Submitting..."
: "Submit For Review"}
</button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}