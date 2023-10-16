import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5"
import { IoIosLogIn, IoIosLogOut } from "react-icons/io"
import { CiSettings, CiCircleMore } from "react-icons/ci"
import { FiMail } from "react-icons/fi"
import { BiSearch } from "react-icons/bi"
import { BsPeople, BsPerson } from "react-icons/bs"
import { RiFileListLine } from "react-icons/ri"
import Button from "../button"
import { useNavigate } from "react-router-dom"

const Sidebar = (props) => {
    const navigate = useNavigate("")

    return <div className="flex flex-col w-[22.5%] justify-between h-screen fixed bg-black pl-8 py-5 border-r-[1px] border-gray-600">
        <div>
            
            <div className="flex flex-col justify-start gap-4 text-lg">
                <Button text="Home" icon={<IoHomeOutline fontSize={"30px"} />} func={() => navigate("/")} />
                <Button text="Explore" icon={<BiSearch fontSize={"30px"} />} />
                <Button text="Notifications" icon={<IoNotificationsOutline fontSize={"30px"} />} />
                <Button text="Messages" icon={<FiMail fontSize={"30px"} />} />
                <Button text="Lists" icon={<RiFileListLine fontSize={"30px"} />} />
                <Button text="Communities" icon={<BsPeople fontSize={"30px"} />} />
                <Button text="Profile" icon={<BsPerson fontSize={"30px"} />} />
                <Button text="More" icon={<CiCircleMore fontSize={"30px"} />} />
            </div>
        </div>
        {props.condition ? <Button text="Logout" func={props.func} icon={<IoIosLogOut fontSize={"30px"} />} /> : <Button text="Login" icon={<IoIosLogIn fontSize={"30px"} />} func={() => navigate("/landing/login")} />}
    </div>
}

export default Sidebar;