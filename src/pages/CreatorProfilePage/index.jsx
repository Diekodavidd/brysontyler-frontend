import { useForm } from "react-hook-form";
import { useRouter } from "@/compat/navigation";
import {
  User,
  FileText,
  ArrowRight,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCompleteProfile } from "@/hooks/useAuth";

export default function CreatorProfilePage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCompleteProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    console.log("Submitting:", data);

    const res = await mutateAsync(data);

    console.log(res);

    router.push("/ProfileImage");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress */}

      <div className="mb-10">
        <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold mb-3">
          <span>Creator Onboarding</span>
          <span>Step 1 / 4</span>
        </div>

        <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
          <div className="h-full w-1/4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" />
        </div>
      </div>

      {/* Header */}

      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-6">
          <User className="text-yellow-400" size={34} />
        </div>

        <h1 className="text-4xl font-black tracking-tight mb-3">
          Complete Your Profile
        </h1>

        <p className="text-zinc-400 max-w-xl mx-auto">
          Tell your future fans more about yourself before setting up your
          creator profile.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            placeholder="Phone Number"
            error={errors.phoneNumber?.message}
          />

          <Input
            {...register("dateOfBirth", {
              required: "Date of birth is required",
            })}
            type="date"
            error={errors.dateOfBirth?.message}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 mb-3">
            Gender
          </label>

          <select
            {...register("gender")}
            className="w-full rounded-2xl bg-zinc-900 border border-white/10 px-5 py-4 outline-none focus:border-yellow-400"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Input
            {...register("country")}
            placeholder="Country"
          />

          <Input
            {...register("state")}
            placeholder="State"
          />

          <Input
            {...register("city")}
            placeholder="City"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 mb-3">
            Bio
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute top-5 left-5 text-zinc-500"
            />

            <textarea
              {...register("bio")}
              rows={6}
              placeholder="Tell your fans about yourself..."
              className="w-full rounded-3xl bg-zinc-900 border border-white/10 pl-14 pr-5 py-5 outline-none resize-none focus:border-yellow-400"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">
          <h3 className="font-bold text-yellow-300 mb-2">
            Why do we ask for this?
          </h3>

          <p className="text-sm text-zinc-400 leading-7">
            Your profile helps fans discover you and improves your verification
            experience. You can always update these details later.
          </p>
        </div>

        <Button
          isLoading={isPending}
          type="submit"
          className="w-full h-16 text-lg rounded-2xl flex items-center justify-center gap-3"
        >
          Continue
          <ArrowRight size={20} />
        </Button>
      </form>
    </div>
  );
}