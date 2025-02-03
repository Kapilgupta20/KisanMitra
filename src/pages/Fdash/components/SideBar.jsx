import React from "react";

const Sidebar = () => {

    const menuItems = [
        { title: "My Listings", path: "/FDashboard/listings" },
        { title: "My Contracts", path: "/FDashboard/contracts" },
        { title: "Chats", path: "/FDashboard/chats" }
    ];

    const handleNavigation = (path) => {
        window.location.href = path;
    };

    return (
        <div className="flex">
            <div className="bg-gray-900 text-white h-screen p-5 pt-8 relative duration-300 w-64">
                <ul className="mt-10 space-y-4">
                    {menuItems.map((item, index) => (
                        <li 
                            key={index} 
                            className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer"
                            onClick={() => handleNavigation(item.path)}
                        >
                            <span className="transition-all">{item.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
