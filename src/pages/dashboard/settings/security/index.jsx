import { useState } from "react";
import {
  ShieldAlert,
  Trash2,
  Key,
  X,
  ShieldCheck,
  User,
  Calendar,
} from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useChangePassword } from "@/hooks/useAuth";
import { toast } from "react-toastify";

export default function Security() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const user = useAuthStore((state) => state.user);

const { mutate, isPending } =
  useChangePassword();


const [passwords, setPasswords] = useState({
  currentPassword: "",
  newPassword: "",
});

const handlePasswordChange = () => {
  mutate(passwords, {
    onSuccess: () => {
      setPasswords({
        currentPassword: "",
        newPassword: "",
      });

      setShowPasswordModal(false);
    },
  });
};

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black">
          Security Settings
        </h2>

        <p className="text-zinc-400 text-sm mt-1">
          Protect your account and manage access.
        </p>
      </div>

    <div className="space-y-6">

  <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6">

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">

        <User className="text-yellow-400"/>

      </div>

      <div>

        <h2 className="font-black text-xl">
          {user?.name}
        </h2>

        <p className="text-zinc-500">
          {user?.email}
        </p>

      </div>

    </div>

    <div className="grid md:grid-cols-3 gap-5 mt-8">

      <div>

        <p className="text-xs uppercase text-zinc-500">
          Role
        </p>

        <p className="font-bold capitalize">
          {user?.role}
        </p>

      </div>

      <div>

        <p className="text-xs uppercase text-zinc-500">
          Member Since
        </p>

        <p className="font-bold">
          {new Date(
            user?.createdAt
          ).toLocaleDateString()}
        </p>

      </div>

      <div>

        <p className="text-xs uppercase text-zinc-500">
          Account Status
        </p>

        <p className="text-green-400 font-bold">
          Active
        </p>

      </div>

    </div>

  </div>
  </div>

  <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6">

<div className="flex justify-between items-center">

<div>

<h3 className="font-black">
Password
</h3>

<p className="text-zinc-500">
Change your account password.
</p>

</div>

<button
onClick={() =>
setShowPasswordModal(true)
}
className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-black"
>

Change Password

</button>

</div>

</div>

<div className="bg-zinc-900 border border-white/5 rounded-3xl p-6">

<div className="flex items-center gap-4">

<ShieldCheck className="text-green-400"/>

<div>

<h3 className="font-black">
Verification
</h3>

<p className="text-zinc-500">

KYC Status:

<span className="ml-2 font-bold capitalize">

{user?.kycStatus}

</span>

</p>

{/* <p className="text-zinc-500 mt-2">

Creator Verification:

<span className="ml-2 font-bold">

{user?.creatorVerification?.verified
? "Verified"
: "Pending"}

</span>

</p> */}

</div>

</div>

</div>

<Input
type="password"
placeholder="Current Password"
value={passwords.currentPassword}
onChange={(e)=>

setPasswords({

...passwords,

currentPassword:e.target.value

})

}
/>

<Input
type="password"
placeholder="New Password"
value={passwords.newPassword}
onChange={(e)=>

setPasswords({

...passwords,

newPassword:e.target.value

})

}
/>

<Button
isLoading={isPending}
onClick={handlePasswordChange}
className="w-full bg-yellow-500 text-black py-3"
>

Update Password

</Button>

<div className="border border-red-500/20 bg-red-500/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-red-500 mb-4">
            <ShieldAlert size={20} />

            <h3 className="font-black uppercase tracking-widest text-sm">
              Danger Zone
            </h3>
          </div>

          <p className="text-sm text-zinc-400 mb-6">
            Once you delete your account,
            there is no going back. Please be
            certain.
          </p>

          <button
            onClick={() =>
              setShowDeleteModal(true)
            }
            className="flex items-center gap-2 text-red-500 font-bold hover:text-red-400 transition-all"
          >
            <Trash2 size={16} />
            DELETE ACCOUNT
          </button>
        </div>

      {/* Password Modal */}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black">
                Change Password
              </h2>

              <button
                onClick={() =>
                  setShowPasswordModal(false)
                }
              >
                <X size={20} />
              </button>
            </div>

            <Input
              type="password"
              placeholder="Current Password"
            />

            <Input
              type="password"
              placeholder="New Password"
            />

            <Button className="w-full py-3 rounded-xl font-black bg-yellow-500 text-black mt-4">
              UPDATE PASSWORD
            </Button>
          </div>
        </div>
      )}

      {/* Delete Modal */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full">
            <h2 className="text-xl font-black mb-4">
              Are you sure?
            </h2>

            <p className="text-zinc-400 text-sm mb-8">
              This action cannot be undone.
           Your account, subscriptions and purchase history will be permanently removed.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="flex-1 py-3 rounded-xl font-bold bg-zinc-800"
              >
                CANCEL
              </button>

              <button
                onClick={() => {
                  toast.warn(
                    "Account deleted"
                  );
                  setShowDeleteModal(false);
                }}
                className="flex-1 py-3 rounded-xl font-black bg-red-500 text-white"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}