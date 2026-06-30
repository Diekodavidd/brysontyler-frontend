import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Providers from "./providers";
import App from "./App";
import { BrysonLoader } from "@/components/ui/BrysonLoader";
// import 'bootstrap/dist/css/bootstrap.min.css';//
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(  <StrictMode>
    <BrowserRouter>
      <Providers>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Suspense fallback={<BrysonLoader />}>
          <App />
        </Suspense>
      </Providers>
    </BrowserRouter>
  </StrictMode>
);
