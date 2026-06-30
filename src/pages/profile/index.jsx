import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";
import Image from "@/compat/Image";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/utils/getInitials";
import { useChangePassword } from "@/hooks/useAuth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password too short"),
    confirmPassword: z.string().min(6, "Confirm password required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function AccountPage() {
  const user = useAuthStore((state) => state.user);
  const [avatar, setAvatar] = useState(user?.profilePic || null);

  const {
    mutate: changePassword,
    isPending,
  } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const handleAvatarChange = (e) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
      toast.success("Profile picture updated!");
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-xl">
      <h2 className="mb-8 text-2xl font-black">
        EDIT ACCOUNT
      </h2>

      <div className="mb-8 flex flex-col items-center">
        <label className="group relative cursor-pointer">
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-yellow-500 bg-zinc-800">
            {avatar ? (
              <Image
                width={96}
                height={96}
                src={avatar}
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xl font-bold">
                {getInitials(user.name)}
              </div>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera
              size={24}
              className="text-white"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </label>
      </div>

      <form
        onSubmit={handleSubmit((data) =>
          changePassword(data)
        )}
        className="space-y-6"
      >
        <Input
          label="Full Name"
          value={user.name}
          disabled
        />

        <Input
          {...register("currentPassword")}
          type="password"
          placeholder="Current Password"
          error={errors.currentPassword?.message}
        />

        <Input
          {...register("newPassword")}
          type="password"
          placeholder="New Password"
          error={errors.newPassword?.message}
        />

        <Input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          isLoading={isPending}
          disabled={isPending}
        >
          SAVE CHANGES
        </Button>
      </form>
    </div>
  );
}