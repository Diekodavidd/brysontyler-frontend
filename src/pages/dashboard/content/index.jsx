

import { useState, useRef } from "react";
import {
  CloudUpload,
  Search,
  Filter,
  Video,
  Image as ImageIcon,
  Plus,
  X,
  UploadCloud,
  Save,
  Eye,
  Pencil,
  Trash2,
  Heart,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { useDeleteContent, useMyContent, useUpdateContent, useUploadContent } from "../../../hooks/useContent";

export default function ContentPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fileInputRef = useRef(null);

const [uploads, setUploads] = useState([]);

const [previewItem, setPreviewItem] = useState(null);
const [editingItem, setEditingItem] = useState(null);
const [deleteItem, setDeleteItem] = useState(null);

const handleFileChange = (e) => {
  const files = Array.from(e.target.files || []);

  const mapped = files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    preview: URL.createObjectURL(file),
    title:
      file.name.substring(0, file.name.lastIndexOf(".")) ||
      file.name,
    type: file.type.startsWith("video")
      ? "video"
      : "image",
    visibility: "Premium",
  }));

  setUploads((prev) => [...prev, ...mapped]);
};

const removeUpload = (id) => {
  setUploads((prev) =>
    prev.filter((item) => item.id !== id)
  );
};

  const stats = [
    {
      title: "Videos",
      value: 18,
      color: "text-yellow-400",
    },
    {
      title: "Images",
      value: 42,
      color: "text-blue-400",
    },
    {
      title: "Views",
      value: "286K",
      color: "text-green-400",
    },
    {
      title: "Revenue",
      value: "₦1.2M",
      color: "text-pink-400",
    },
  ];

//   const content = [
//   {
//     id: 1,
//     title: "Studio Session #12",
//     type: "video",
//     status: "Published",
//     visibility: "Premium",
//     views: "24.6K",
//     likes: "5.4K",
//     comments: 218,
//     revenue: "₦184K",
//     uploaded: "Jun 24, 2026",
//     thumbnail:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800"
// },

//   {
//     id: 2,
//     title: "Behind The Scenes",
//     type: "image",
//     status: "Draft",
//     visibility: "Subscribers",
//         likes: "5.4K",
//     views: "0",
//     revenue: "₦0",
//         comments: 218,

//         uploaded: "Jun 24, 2026",
//     thumbnail:
//       "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
//   },

//   {
//     id: 3,
//     title: "Exclusive Photoshoot",
//     type: "image",
//     status: "Published",
//     visibility: "Premium",
//     views: "12.8K",
//     revenue: "₦72K",
//         uploaded: "Jun 24, 2026",
//     comments: 218,

//     thumbnail:
//       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
//   },

//   {
//     id: 4,
//     title: "Live Performance",
//     type: "video",
//     status: "Published",
//     visibility: "Free",
//     views: "98K",
//     revenue: "₦0",   
//      uploaded: "Jun 24, 2026",
//     comments: 218,

//     thumbnail:
//       "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
//   },
// ];


const { data: content = [], isLoading } =
    useMyContent();

const uploadMutation =
    useUploadContent();

const updateMutation =
    useUpdateContent();

const deleteMutation =
    useDeleteContent();

    
  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

        <div>

          <p className="uppercase tracking-[0.3em] text-xs text-yellow-400 font-black">

            Creator Studio

          </p>

          <h1 className="text-5xl font-black mt-2">

            Content Library

          </h1>

          <p className="text-zinc-500 mt-3">

            Upload and manage all your exclusive productions.

          </p>

        </div>

        <button className="h-14 px-7 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-black flex items-center gap-2 transition-all">

          <Plus size={18} />

          Upload Content

        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className="rounded-3xl bg-zinc-900 border border-white/5 p-7"
          >

            <p className="text-zinc-500 uppercase text-xs tracking-[0.2em]">

              {item.title}

            </p>

            <h2 className={`text-4xl font-black mt-4 ${item.color}`}>

              {item.value}

            </h2>

          </div>

        ))}

      </div>

      {/* Search + Filter */}

      <div className="flex flex-col lg:flex-row gap-5">

        <div className="relative flex-1">

          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search content..."
            className="w-full h-14 rounded-2xl bg-zinc-900 border border-white/5 pl-14 pr-5 outline-none focus:border-yellow-500 transition-all"
          />

        </div>

        <div className="relative">

          <Filter
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none h-14 rounded-2xl bg-zinc-900 border border-white/5 pl-14 pr-12 outline-none"
          >

            <option value="all">All</option>
            <option value="video">Videos</option>
            <option value="image">Images</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>

          </select>

        </div>

      </div>

      {/* Upload Box */}

      <div className="rounded-[32px] bg-zinc-900 border border-white/5 p-8">

  <div className="flex justify-between items-center mb-8">

    <div>

      <h2 className="text-2xl font-black">

        Upload New Content

      </h2>

      <p className="text-zinc-500 mt-2">

        Videos & Images

      </p>

    </div>

    {uploads.length > 0 && (

      <button
        className="h-12 px-6 rounded-xl bg-yellow-400 text-black font-black flex items-center gap-2"
      onClick={() => {

uploads.forEach((upload) => {

const formData = new FormData();

formData.append(
"title",
upload.title
);

formData.append(
"visibility",
upload.visibility
);

formData.append(
"type",
upload.type
);

formData.append("file", upload.file);

uploadMutation.mutate(formData);

});

setUploads([]);

}}>

        <Save size={16} />

        Publish All

      </button>

    )}

  </div>

  <input
    hidden
    multiple
    ref={fileInputRef}
    type="file"
    accept="image/*,video/*"
    onChange={handleFileChange}
  />

  <div
    onClick={() =>
      fileInputRef.current.click()
    }
    className="border-2 border-dashed border-zinc-700 hover:border-yellow-500 rounded-3xl p-16 cursor-pointer transition-all text-center"
  >

    <UploadCloud
      size={60}
      className="mx-auto text-yellow-400 mb-5"
    />

    <h3 className="text-2xl font-black">

      Drag files here

    </h3>

    <p className="text-zinc-500 mt-3">

      or click to browse

    </p>

  </div>

  {uploads.length > 0 && (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      {uploads.map((upload) => (

        <div
          key={upload.id}
          className="bg-black rounded-3xl overflow-hidden border border-white/10"
        >

          <div className="relative aspect-video">

            {upload.type === "video" ? (

              <video
                src={upload.preview}
                className="w-full h-full object-cover"
              />

            ) : (

              <img
                src={upload.preview}
                className="w-full h-full object-cover"
              />

            )}

            <button
              onClick={() =>
                removeUpload(upload.id)
              }
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-red-500"
            >

              <X size={16} />

            </button>

          </div>

          <div className="p-4">

            <input
              value={upload.title}
              onChange={(e) =>
                setUploads((prev) =>
                  prev.map((item) =>
                    item.id === upload.id
                      ? {
                          ...item,
                          title:
                            e.target.value,
                        }
                      : item
                  )
                )
              }
              className="w-full bg-zinc-900 rounded-xl border border-white/10 px-4 py-3 outline-none mb-3"
            />

            <select
              value={upload.visibility}
              onChange={(e) =>
                setUploads((prev) =>
                  prev.map((item) =>
                    item.id === upload.id
                      ? {
                          ...item,
                          visibility:
                            e.target.value,
                        }
                      : item
                  )
                )
              }
              className="w-full bg-zinc-900 rounded-xl border border-white/10 px-4 py-3 outline-none"
            >

              <option>

                Premium

              </option>

              <option>

                Subscribers

              </option>

              <option>

                Free

              </option>

            </select>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

      {/* Empty Library */}

      {/* Content Grid */}

<div>

  <div className="flex items-center justify-between mb-8">

    <h2 className="text-2xl font-black">

      Your Library

    </h2>

    <p className="text-zinc-500 text-sm">

      8 Productions

    </p>

  </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

    {content
      .filter((item) => {

        if (
          search &&
          !item.title
            .toLowerCase()
            .includes(search.toLowerCase())
        )
          return false;

        if (filter === "all") return true;

        if (filter === "published")
          return item.status === "Published";

        if (filter === "draft")
          return item.status === "Draft";

        return item.type === filter;
      })
      .map((item) => (

        <div
          key={item.id}
          className="group rounded-[30px] overflow-hidden bg-zinc-900 border border-white/5 hover:border-yellow-500/30 transition-all"
        >

          {/* Thumbnail */}

          <div className="relative aspect-video overflow-hidden">

            <img
              src={item.fileUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <span
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest ${
                item.status === "Published"
                  ? "bg-green-500 text-black"
                  : "bg-yellow-400 text-black"
              }`}
            >

              {item.status}

            </span>

          </div>

          {/* Body */}

          <div className="p-6">

            <div className="flex items-center justify-between">

              <h3 className="font-black text-lg">

                {item.title}

              </h3>

              {item.type === "video" ? (
                <Video
                  size={18}
                  className="text-yellow-400"
                />
              ) : (
                <ImageIcon
                  size={18}
                  className="text-blue-400"
                />
              )}

            </div>

            <div className="flex gap-2 mt-4">

              <span className="px-3 py-1 rounded-full bg-black text-xs text-zinc-400">

                {item.visibility}

              </span>

            </div>

          <div className="grid grid-cols-2 gap-5 mt-6">

    <div>

        <p className="text-zinc-500 text-xs uppercase">

            Views

        </p>

        <p className="font-black">

            {item.views}

        </p>

    </div>

    <div>

        <p className="text-zinc-500 text-xs uppercase">

            Revenue

        </p>

        <p className="font-black text-green-400">

            {item.revenue}

        </p>

    </div>

    <div>

        <p className="text-zinc-500 text-xs uppercase">

            Likes

        </p>

        <div className="flex items-center gap-2">

            <Heart
                size={14}
                className="text-red-400"
            />

            {item.likes}

        </div>

    </div>

    <div>

        <p className="text-zinc-500 text-xs uppercase">

            Comments

        </p>

        <div className="flex items-center gap-2">

            <MessageCircle
                size={14}
                className="text-blue-400"
            />

            {item.comments}

        </div>

    </div>

</div>

<div className="mt-5 flex items-center gap-2 text-xs text-zinc-500">

    <Calendar size={14} />

    Uploaded {item.uploaded}

</div>

            <div className="grid grid-cols-3 gap-3 mt-8">

<button
onClick={() => setPreviewItem(item)}
className="h-11 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition flex justify-center items-center"
>

<Eye size={18} />

</button>

<button
onClick={() => setEditingItem({...item})}
className="h-11 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black transition flex justify-center items-center"
>

<Pencil size={18} />

</button>

<button
onClick={() => setDeleteItem(item)}
className="h-11 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white transition text-red-400 flex justify-center items-center"
>

<Trash2 size={18} />

</button>

</div>

          </div>

        </div>

      ))}

  </div>

</div>
{previewItem && (

<div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8">

<div className="bg-zinc-900 rounded-3xl overflow-hidden max-w-5xl w-full border border-white/10">

<div className="relative aspect-video bg-black">

{previewItem.type === "video" ? (

<video
controls
src={previewItem.thumbnail}
className="w-full h-full object-contain"
/>

) : (

<img
src={previewItem.thumbnail}
className="w-full h-full object-contain"
/>

)}

<button
onClick={()=>setPreviewItem(null)}
className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/70 hover:bg-red-500 flex items-center justify-center"
>

<X/>

</button>

</div>

<div className="p-8">

<h2 className="text-3xl font-black">

{previewItem.title}

</h2>

<p className="text-zinc-500 mt-3">

{previewItem.visibility}

</p>

</div>

</div>

</div>

)}

{editingItem && (

<div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">

<div className="bg-zinc-900 rounded-3xl p-8 w-full max-w-lg border border-white/10">

<h2 className="text-3xl font-black mb-8">

Edit Content

</h2>

<input

value={editingItem.title}

onChange={(e)=>

setEditingItem({

...editingItem,

title:e.target.value

})

}

className="w-full h-14 rounded-xl bg-black border border-white/10 px-5 mb-5"

/>

<select

value={editingItem.visibility}

onChange={(e)=>

setEditingItem({

...editingItem,

visibility:e.target.value

})

}

className="w-full h-14 rounded-xl bg-black border border-white/10 px-5"

>

<option>

Premium

</option>

<option>

Subscribers

</option>

<option>

Free

</option>

</select>

<div className="grid grid-cols-2 gap-4 mt-8">

<button

onClick={()=>setEditingItem(null)}

className="h-12 rounded-xl bg-zinc-800"

>

Cancel

</button>

<button

className="h-12 rounded-xl bg-yellow-400 text-black font-bold"
onClick={() => {

updateMutation.mutate({

id: editingItem.id,

payload: editingItem,

});

setEditingItem(null);

}}
>

Save Changes

</button>

</div>

</div>

</div>

)}

{deleteItem && (

<div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">

<div className="bg-zinc-900 rounded-3xl p-8 w-full max-w-md border border-red-500/20">

<h2 className="text-2xl font-black">

Delete Content?

</h2>

<p className="text-zinc-500 mt-3">

This action cannot be undone.

</p>

<div className="grid grid-cols-2 gap-4 mt-8">

<button

onClick={()=>setDeleteItem(null)}

className="h-12 rounded-xl bg-zinc-800"

>

Cancel

</button>

<button

className="h-12 rounded-xl bg-red-500 text-white font-bold"
onClick={() => {

deleteMutation.mutate(deleteItem.id);

setDeleteItem(null);

}}
>

Delete

</button>

</div>

</div>

</div>

)}


    </div>
  );
}