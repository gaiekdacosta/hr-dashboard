import { FaUserCircle } from "react-icons/fa";
import { IoIosExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const UserBar = () => {
    const navigate = useNavigate();

    const user = 'Convidado';

    return ( 
        <div className="flex justify-center">
            <div className="flex w-full justify-between items-center rounded-md p-2 shadow-xl bg-[#252728]">
                <div className="flex items-center gap-2">
                    <FaUserCircle className="text-[25px]" />
                    <p className="font-medium">{user}</p>
                </div>
                <button className="cursor-pointer" onClick={() => navigate('/')}>
                    <IoIosExit className="text-[23px]" />
                </button>
            </div>
        </div>
    );
}

export default UserBar;