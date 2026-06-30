/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Lock, Eye, AlertTriangle } from "lucide-react";

const features = [
  { icon: Lock, label: "18+ VERIFIED" },
  { icon: Eye, label: "EXPLICIT MEDIA" },
  { icon: AlertTriangle, label: "PRIVATE ACCESS" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("isVerified");

    if (verified === "true") {
      navigate("/");
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("isVerified", "true");
    setIsOpen(false);
    navigate("/");
  };

  const handleBounce = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#020202] flex items-center justify-center p-6">

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="absolute top-8 left-8 d-flex align-items-center gap-4">
        <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl d-flex align-items-center justify-content-center text-black fw-bold fs-4">
          BT
        </div>

        <div>
          <h1 className="text-xl fw-bold text-white">
            Bryson Tyler
          </h1>

          <p className="text-warning small fw-bold">
            PRODUCTIONS
          </p>
        </div>
      </div>

      <div className="max-w-xl w-full bg-[#0a0a0a] border border-white/10 rounded-5 p-5 text-center">

        <ShieldAlert
          size={64}
          className="text-warning mb-4"
        />

        <h2 className="text-white fw-bold mb-4">
          AGE RESTRICTED
        </h2>

        <p className="text-secondary mb-5">
          The content on this platform is intended for mature audiences only.
          Please confirm you are 18+ and accept our terms of service.
        </p>

        <div className="row g-3 mb-5">

          {features.map(({ icon: Icon, label }) => (

            <div
              className="col-4"
              key={label}
            >
              <div className="bg-dark rounded-4 p-3 h-100">

                <Icon
                  size={18}
                  className="text-secondary mb-2"
                />

                <small className="text-secondary fw-bold">
                  {label}
                </small>

              </div>
            </div>

          ))}

        </div>

        <div className="d-flex gap-3">

          <button
            className="btn btn-warning flex-grow-1 fw-bold"
            onClick={handleVerify}
          >
            I AM 18+
          </button>

          <button
            className="btn btn-dark"
            onClick={handleBounce}
          >
            EXIT
          </button>

        </div>

      </div>
    </div>
  );
}