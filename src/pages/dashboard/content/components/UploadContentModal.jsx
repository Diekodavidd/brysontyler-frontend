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

 const [form, setForm] = useState({
  title: "",
  description: "",

  category: "General",

  tags: "",

  visibility: "free",

  type: "video",

  price: "",

  releaseDate: "",

  releaseTime: "",

  collaborator: "",

  allowComments: true,

  featured: false,

  status: "pending_review",
});
  useEffect(() => {
    if (!open) {
      setMediaFile(null);
      setThumbnailFile(null);
      setPreview("");
      setThumbnailPreview("");

      setForm({
        title: "",
        description: "",
        category: "",
        tags: "",
        visibility: "Free",
        type: "video",
        price: 0,
        scheduledDate: "",
        collaborator: "",
        allowComments: true,
        featured: false,
      });
    }
  }, [open]);

  if (!open) return null;

  const chooseMedia = (file) => {
    if (!file) return;

    setMediaFile(file);

    setPreview(
      URL.createObjectURL(file)
    );

    if (
      file.type.startsWith("image")
    ) {
      setForm((prev) => ({
        ...prev,
        type: "image",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        type: "video",
      }));
    }
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
    return alert("Please upload a video.");
}

if (!thumbnailFile) {
    return alert("Please upload a thumbnail.");
}

if (!form.title.trim()) {
    return alert("Title is required.");
}
    const payload =
      new FormData();

  payload.append(
    "video",
    mediaFile
);

    if (thumbnailFile) {
      payload.append(
        "thumbnail",
        thumbnailFile
      );
    }

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
      "type",
      form.type
    );

    payload.append(
      "featured",
      form.featured
    );

    payload.append(
      "allowComments",
      form.allowComments
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

   payload.append(
    "taggedCreators",
    JSON.stringify(
        form.collaborator
            ? [form.collaborator]
            : []
    )
);

  payload.append(
    "tags",
    JSON.stringify(
        form.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean)
    )
);
for (const [key] of payload.entries()) {
    console.log(key);
}
    uploadMutation.mutate(
      payload,
      {
        onSuccess: () => {
          onClose();
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

          <div className="grid-cols-1 lg:grid-cols-2 gap-10">

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

                    form.type ===
                    "image" ? (

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

                        Upload Video
                        or Image

                      </h3>

                      <p className="text-zinc-500 mt-3">

                        Click to browse

                      </p>

                    </>

                  )}

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

                  Thumbnail

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

<option>Lifestyle</option>

<option>Fitness</option>

<option>Music</option>

<option>Fashion</option>

<option>Podcast</option>

<option>Education</option>

<option>Gaming</option>

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

<option value="ppv">
Pay Per View
</option>

<option value="members_ppv">
Members + Pay Per View
</option>

</select>

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

              {/* COLLABORATOR */}

              <div>

                <label className="font-bold mb-2 flex items-center gap-2">

                  <Users size={18} />

Approved Collaborator (Optional)
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