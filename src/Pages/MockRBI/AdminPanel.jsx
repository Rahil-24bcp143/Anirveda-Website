import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSituationForm from "../../components/MockRbi/AdminSituationForm";
import TeamList from "../../components/MockRbi/TeamList";

export default function AdminPanel() {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token !== "anirveda-admin-token") {
            navigate("/mockrbi/admin-login");
        } else {
            setIsAdmin(true);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/mockrbi/admin-login");
    };

    if (!isAdmin) return <p>Checking authentication...</p>;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Mock RBI Admin Panel</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AdminSituationForm />
                <TeamList />
            </div>
        </div>
    );
}
