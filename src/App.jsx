import { Routes, Route, Link, useLocation } from "react-router-dom";

// Layouts
import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardSettingsLayout from "@/layouts/DashboardSettingsLayout";
import ProfileLayout from "@/layouts/ProfileLayout";

// Guards
import ProtectedRoute from "@/guards/ProtectedRoute";
import AuthRoute from "@/guards/AuthRoute";

// Public pages
import Landing from "@/pages/Landing";
import HomePage from "@/pages/home";
import CreatorsPage from "@/pages/creators";
import AllStreamsPage from "@/pages/all-streams";
import LivePage from "@/pages/live";
import OnboardingPage from "@/pages/onboarding";

// Auth-group pages
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import ForgotPasswordPage from "@/pages/forgot-password";
import VerifyEmailPage from "@/pages/verify-email";
import ResetPasswordPage from "@/pages/reset-password";
import KycPage from "@/pages/Kyc";
import KycCompletePage from "@/pages/KycComplete";
import CoverImagePage from "@/pages/CoverImage";
import ProfileImagePage from "@/pages/ProfileImage";
import CreatorPendingPage from "@/pages/CreatorPending";
import CreatorProfilePagePage from "@/pages/CreatorProfilePage";
import CreatorVerificationPage from "@/pages/CreatorVerification";

// Admin pages
import AdminPage from "@/pages/admin";
import AdminPayoutsPage from "@/pages/admin/payouts";
import AdminPendingCreatorsPage from "@/pages/admin/pending-creators";
import AdminSecurityPage from "@/pages/admin/security";
import AdminSettingsPage from "@/pages/admin/settings";

// Dashboard pages
import DashboardPage from "@/pages/dashboard";
import DashboardContentPage from "@/pages/dashboard/content";
import DashBoardSubscriptionsPage from "@/pages/dashboard/subscriptions"
import DashboardMessagesPage from "@/pages/dashboard/messages";
import DashboardSubscribersPage from "@/pages/dashboard/subscribers";
import DashboardHistoryPage from "@/pages/dashboard/history";
import DashBoardWalletPage from "@/pages/dashboard/wallet";
import DashboardSettingsPage from "@/pages/dashboard/settings";
import DashboardSettingsNotificationsPage from "@/pages/dashboard/settings/notifications";
import DashboardSettingsSecurityPage from "@/pages/dashboard/settings/security";
import DashboardProfilePage from "@/pages/dashboard/settings/profile";
import DashboardSettingsSubscriptionPage from "@/pages/dashboard/settings/subscription";
import DashboardSettingsIdentityDocsPage from "@/pages/dashboard/settings/identity-docs";
import DashboardSettingsPreferencesPage from "@/pages/dashboard/settings/preferences";
import DashboardSettingsPaymentMethodPage from "@/pages/dashboard/settings/payment-method";

// Profile pages
import ProfilePage from "@/pages/profile";
import ProfileFollowingPage from "@/pages/profile/following";
import ProfileWalletPage from "@/pages/profile/wallet";
import { useEffect } from "react";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="text-6xl font-black tracking-tight text-yellow-500">404</div>
      <p className="text-zinc-400">This page doesn&apos;t exist.</p>
      <Link
        to="/home"
        className="rounded-xl bg-yellow-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-400"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    console.log("ROUTE CHANGED:", location.pathname);
  }, [location.pathname]);
  return (
    <Routes>
      {/* ---------- Public ---------- */}
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/creators" element={<CreatorsPage />} />
      <Route path="/all-streams" element={<AllStreamsPage />} />
      <Route path="/live/:id" element={<LivePage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* ---------- Auth group (AuthLayout) ---------- */}
      <Route element={<AuthLayout />}>
        {/* Redirect to /home if already signed in */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Route>

        {/* Reachable regardless of auth state (onboarding / reset flows) */}
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/Kyc" element={<KycPage />} />
<Route
  path="/kyc-complete"
  element={<KycCompletePage />}
/>        <Route path="/CoverImage" element={<CoverImagePage />} />
        <Route path="/ProfileImage" element={<ProfileImagePage />} />
        <Route path="/CreatorPending" element={<CreatorPendingPage />} />
        <Route path="/CreatorProfilePage" element={<CreatorProfilePagePage />} />
        <Route path="/CreatorVerification" element={<CreatorVerificationPage />} />
      </Route>

      {/* ---------- Admin (protected) ---------- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="payouts" element={<AdminPayoutsPage />} />
          <Route path="pending-creators" element={<AdminPendingCreatorsPage />} />
          <Route path="security" element={<AdminSecurityPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* ---------- Dashboard (protected) ---------- */}
     <Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardPage />} />
    <Route path="content" element={<DashboardContentPage />} />
    <Route path="messages" element={<DashboardMessagesPage />} />
    <Route path="subscribers" element={<DashboardSubscribersPage />} />
    <Route path="subscriptions" element={<DashBoardSubscriptionsPage />} />
    <Route path="wallet" element={<DashBoardWalletPage />} />
    <Route path="history" element={<DashboardHistoryPage />} />

    <Route path="settings" element={<DashboardSettingsLayout />}>
      <Route index element={<DashboardSettingsPage />} />
      <Route path="notifications" element={<DashboardSettingsNotificationsPage />} />
      <Route path="security" element={<DashboardSettingsSecurityPage />} />
      <Route path="profile" element={<DashboardProfilePage />} />
      <Route path="subscription" element={<DashboardSettingsSubscriptionPage />} />
      <Route path="identity-docs" element={<DashboardSettingsIdentityDocsPage />} />
      <Route path="payment-methods" element={<DashboardSettingsPaymentMethodPage />} />
      <Route path="preferences" element={<DashboardSettingsPreferencesPage />} />
    </Route>
  </Route>
</Route>

      {/* ---------- Profile (ProfileLayout, public like the original) ---------- */}
      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="following" element={<ProfileFollowingPage />} />
        <Route path="wallet" element={<ProfileWalletPage />} />
      </Route>

      {/* ---------- Catch-all ---------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
