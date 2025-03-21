import { IoMdHelpCircle, IoMdHome } from "react-icons/io";
import NavButton from "./navButton";
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { AiFillSchedule } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import UserBar from "./userBar";

const SideBar = () => {
    return (
        <div className="flex justify-between flex-col w-72 h-[100vh] bg-[#161819] p-5">
            <div className="flex flex-col w-full gap-3">
                <div className="flex justify-center mb-2">
                    <img src="/group.png" alt="logo" className="w-16 h-auto" />
                </div>
                <NavButton 
                    title='Home' 
                    icon={<IoMdHome className="text-[24px]" />} 
                    path="/home" 
                    premium={false}
                />
                <NavButton 
                    title='Candidates' 
                    icon={<FaUser className="text-[20px]" />} 
                    path="/" 
                    premium={true}
                />
                <NavButton 
                    title='Massage' 
                    icon={<FaMessage className="text-[20px]" />} 
                    path="/" 
                    premium={true}
                />
                <NavButton 
                    title='Schedule' 
                    icon={<AiFillSchedule className="text-[24px]" />} 
                    path="/" 
                    premium={true}
                />
                <NavButton 
                    title='Reports' 
                    icon={<TbReportAnalytics className="text-[24px]" />} 
                    path="/" 
                    premium={true}
                />
                <NavButton 
                    title='Help' 
                    icon={<IoMdHelpCircle className="text-[24px]" />} 
                    path="/" 
                    premium={true}
                />
            </div>
            <UserBar />
        </div>
    );
};

export default SideBar;