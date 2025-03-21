import { ReactNode } from "react";
import { FaCrown } from "react-icons/fa";
import { useLocation } from "react-router-dom";

interface NavButtonProps {
    title: string;
    icon: ReactNode;
    path: string; 
    premium: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ title, icon, path, premium }) => {
    const location = useLocation();

    const isActive = location.pathname === path; 

    return ( 
        <button 
            className={`
                flex 
                p-2
                cursor-pointer 
                items-center 
                gap-1 
                font-medium 
                rounded-lg 
                transition-all 
                ${isActive ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800"}
            `}
        >
            {icon} <p className="text-[18px]">{title}</p>
            {premium && <FaCrown style={{ color:'yellow' }} />}
        </button>
    );
}

export default NavButton;
