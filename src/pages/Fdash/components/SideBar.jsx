import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { List, FileText, MessageSquare, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    const menuItems = [
        { title: "Dashboard", path: "/Fdashboard", icon: <LayoutDashboard size={20} /> },
        { title: "Listings", path: "/Fdashboard/listings", icon: <List size={20} /> },
        { title: "Contracts", path: "/Fdashboard/contracts", icon: <FileText size={20} /> },
        { title: "Chats", path: "/Fdashboard/chats", icon: <MessageSquare size={20} /> }
    ];

    return (
        <div className="bg-[#1C1C1C] text-white h-screen p-5 pt-8 w-64 shadow-md">
            <ul className="mt-10 space-y-4">
                {menuItems.map((item, index) => (
                    <li 
                        key={index}
                        className={`flex items-center gap-4 p-2 rounded-md cursor-pointer transition-all 
                            ${
                                location.pathname === item.path
                                    ? "bg-[#A8CBB5] text-[#2A2A2A]"
                                    : "hover:bg-[#A8CBB5] hover:text-[#2A2A2A]"
                            }`}
                        onClick={() => navigate(item.path)}
                    >
                        <span>{item.icon}</span>
                        <span className="font-medium">{item.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
