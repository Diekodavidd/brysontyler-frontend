import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Camera,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { updateProfile, useUploadCoverImage, useUploadProfileImage } from "../../../../hooks/useAuth";



export default function Profile() {
  const user = useAuthStore((state) => state.user);
const setUser = useAuthStore(state => state.setUser);
const profileInputRef = useRef(null);
const coverInputRef = useRef(null);

const { mutate: uploadProfile } = useUploadProfileImage();
const { mutate: uploadCover } = useUploadCoverImage();
const [form, setForm] = useState({
  name: user?.name || "",
  email: user?.email || "",
  phoneNumber: user?.phoneNumber || "",
  bio: user?.bio || "",
  country: user?.country || "",
  state: user?.state || "",
  city: user?.city || "",
  stageName: user?.creatorApplication?.stageName || "",
  socialLinks:
    user?.creatorApplication?.socialLinks || ["", "", ""],
});
const approvalStatus =
  user?.creatorApproval?.status ?? "not_submitted";
const handleSave = async () => {

    const res = await updateProfile(form);

    setUser(res.user);

};
  return (
    <div className="space-y-8">

      {/* COVER */}

<div className="relative h-40 sm:h-56 lg:h-72 rounded-3xl overflow-hidden bg-zinc-900 border border-white/5">
        {user?.coverImage ? (
          <img
            src={user.coverImage}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-yellow-500/20 via-black to-yellow-500/10" />
        )}

       <button
    onClick={() => coverInputRef.current?.click()}
className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-black/70 backdrop-blur px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl font-bold flex items-center gap-2 text-sm">
    <Camera size={18} />
    Cover
</button>

        <div className="absolute left-4 sm:left-8 lg:left-10 bottom-4">

          <div className="relative">

            <img
              src={
                user?.profileImage ||
                `https://ui-avatars.com/api/?name=${user?.name}`
              }
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-black"
            />

            <button
    onClick={() => profileInputRef.current?.click()}
    className="absolute bottom-2 right-2 bg-yellow-500 text-black rounded-full p-3"
>
    <Camera size={16} />
</button>

          </div>

        </div>

      </div>

<div className="pt-16 sm:pt-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-black break-words">
              {user?.creatorApplication?.stageName || user?.name}
          </h1>

<div className="flex flex-wrap gap-3 mt-3">
            <span className="px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase">
{user?.role?.charAt(0).toUpperCase() +
  user?.role?.slice(1)}            </span>


             <span
  className={`px-4 py-2 rounded-full text-xs font-bold uppercase flex items-center gap-2
  ${
    approvalStatus === "approved"
      ? "bg-green-500/10 text-green-400"
      : approvalStatus === "pending"
      ? "bg-yellow-500/10 text-yellow-400"
      : approvalStatus === "rejected"
      ? "bg-red-500/10 text-red-400"
      : "bg-zinc-700/20 text-zinc-400"
  }`}
>
  <CheckCircle2 size={14} />

  {approvalStatus === "approved"
    ? "Verified"
    : approvalStatus === "pending"
    ? "Pending Review"
    : approvalStatus === "rejected"
    ? "Rejected"
    : "Not Submitted"}
</span>

          </div>

        </div>

<Button
className="w-full sm:w-auto bg-yellow-500 text-black px-8"
    onClick={handleSave}>
    Save Changes
</Button>

      </div>

      {/* BASIC */}

      <div className="grid lg:grid-cols-2 gap-6">

  <Input
    value={form.name}
    onChange={(e) =>
      setForm({
        ...form,
        name: e.target.value,
      })
    }
    placeholder="Display Name"
    icon={<User size={18} />}
  />
{user?.role === "creator" && (
  <>
    {/* Stage Name Input */}
    {/* Social Links */}
  
  <Input
    value={form.stageName}
    onChange={(e) =>
      setForm({
        ...form,
        stageName: e.target.value,
      })
    }
    placeholder="Stage Name"
  />
</>
)}
  <Input
    value={form.email}
    disabled
    placeholder="Email"
    icon={<Mail size={18} />}
  />

  <Input
    value={form.phoneNumber}
    onChange={(e) =>
      setForm({
        ...form,
        phoneNumber: e.target.value,
      })
    }
    placeholder="Phone"
    icon={<Phone size={18} />}
  />

</div>

      {/* BIO */}

      <div className="space-y-3">

        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
          Biography
        </label>

<textarea
className="w-full min-h-[140px] rounded-2xl bg-zinc-900 border border-white/10 p-5 resize-none"
    value={form.bio}
    onChange={(e) =>
        setForm({
            ...form,
            bio: e.target.value,
        })
    }
/>

      </div>

      {/* LOCATION */}

      <div className="grid lg:grid-cols-3 gap-6">

       <Input
    value={form.country}
    onChange={(e) =>
        setForm({
            ...form,
            country: e.target.value,
        })
    }
/>
<Input
    value={form.state}
    onChange={(e) =>
        setForm({
            ...form,
            state: e.target.value,
        })
    }
    
/>
       <Input
    value={form.city}
    onChange={(e) =>
        setForm({
            ...form,
            city: e.target.value,
        })
    }
    
/> 

        

      </div>

      {/* SOCIALS */}
{user?.role === "creator" && (
  <>
    {/* Stage Name Input */}
    {/* Social Links */}
 
      <div className="space-y-5">

        <h2 className="text-xl font-black">
          Social Links
        </h2>

        {(user?.creatorApplication?.socialLinks || ["", "", ""]).map(
          (link, index) => (
            <Input
              key={index}
              defaultValue={link}
              placeholder={`Social Link ${index + 1}`}
            />
          )
        )}

      </div>
 </>
)}
      {/* ACCOUNT */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="rounded-3xl bg-zinc-900 border border-white/5 p-6">

          <p className="text-xs uppercase text-zinc-500">
            Member Since
          </p>

          <h3 className="text-xl font-black mt-3">
            {new Date(user?.createdAt).toLocaleDateString()}
          </h3>

        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/5 p-6">

          <p className="text-xs uppercase text-zinc-500">
            Role
          </p>

          <h3 className="text-xl font-black mt-3 capitalize">
            {user?.role}
          </h3>

        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/5 p-6">

          <p className="text-xs uppercase text-zinc-500">
            Verification
          </p>

          <h3 className="text-xl font-black mt-3">
           {approvalStatus === "approved"
  ? "Verified"
  : approvalStatus === "pending"
  ? "Pending"
  : approvalStatus === "rejected"
  ? "Rejected"
  : "Not Submitted"}
          </h3>

        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/5 p-6">

          <p className="text-xs uppercase text-zinc-500">
            Profile Status
          </p>

          <h3 className="text-xl font-black mt-3">
            {user?.profileCompleted
              ? "Completed"
              : "Incomplete"}
          </h3>

        </div>

      </div>
<input
    ref={profileInputRef}
    hidden
    type="file"
    accept="image/*"
    onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        uploadProfile(formData);
    }}
/>

<input
    ref={coverInputRef}
    hidden
    type="file"
    accept="image/*"
    onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        uploadCover(formData);
    }}
/>
    </div>
  );
}