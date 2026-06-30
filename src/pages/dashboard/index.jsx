

import { useAuthStore } from "@/store/useAuthStore";
import CreatorDashboard from "./CreatorDashboard";
import FanDashboard from "./FanDashboard";

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);

    if (user?.role === "creator") {
        return <CreatorDashboard />;
    }

    return <FanDashboard />;
}