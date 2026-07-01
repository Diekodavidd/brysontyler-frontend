import { useState } from "react";
import { useRouter } from "@/compat/navigation";
import {
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useUpdateCreatorProfile } from "@/hooks/useKYC";
import { useAuthStore } from "@/store/useAuthStore";

export default function CreatorVerificationPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
const user = useAuthStore((state) => state.user);

const { mutateAsync: saveProfile } =
  useUpdateCreatorProfile();

  const [form, setForm] = useState({
    stageName: "",
    category: "Solo",
    socialLinks: ["", "", ""],
  });

  const [loading, setLoading] = useState(false);

  const handleSocialChange = (index, value) => {
    const links = [...form.socialLinks];
    links[index] = value;

    setForm({
      ...form,
      socialLinks: links,
    });
  };

const handleSubmit = async () => {
  try {
    setLoading(true);

    const data = await saveProfile(form);

    setUser({
      ...user,
      creatorVerification:
        data.creatorVerification,
    });

    router.push("/CreatorPending");

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20">
          <Sparkles className="h-10 w-10 text-yellow-400" />
        </div>

        <h1 className="text-3xl font-black uppercase">
          Creator Profile
        </h1>

        <p className="mt-3 text-zinc-400">
          Tell fans how they'll know you.
        </p>
      </div>

      <div className="space-y-5">
        <Input
          placeholder="Stage Name"
          value={form.stageName}
          onChange={(e) =>
            setForm({
              ...form,
              stageName: e.target.value,
            })
          }
        />

        <div>
          <label className="mb-2 block text-sm font-bold uppercase text-zinc-300">
            Category
          </label>

          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 outline-none focus:border-yellow-500"
          >
            <option>Solo</option>
            <option>Couple</option>
            <option>Cosplay</option>
            <option>Fitness</option>
            <option>Gaming</option>
            <option>Lifestyle</option>
          </select>
        </div>

        <Input
          placeholder="Instagram / X / Website"
          value={form.socialLinks[0]}
          onChange={(e) =>
            handleSocialChange(0, e.target.value)
          }
        />

        <Input
          placeholder="Second Social Link"
          value={form.socialLinks[1]}
          onChange={(e) =>
            handleSocialChange(1, e.target.value)
          }
        />

        <Input
          placeholder="Third Social Link"
          value={form.socialLinks[2]}
          onChange={(e) =>
            handleSocialChange(2, e.target.value)
          }
        />
      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
        <div className="flex gap-3">
          <BadgeCheck className="text-yellow-400 mt-1" />

          <p className="text-sm text-zinc-300">
            Your creator profile will be reviewed before it becomes public.
          </p>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit}
        isLoading={loading}
      >
        Continue
      </Button>
    </div>
  );
}