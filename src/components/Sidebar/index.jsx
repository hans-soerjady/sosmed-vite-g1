import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5"
import { CiMail, CiSettings } from "react-icons/ci"
import Button from "../button"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
    const navigate = useNavigate("")

    return <div className="flex flex-col w-[15%] min-h-screen bg-black pl-8 py-5 border-r-[1px] border-gray-600">
        <div className="flex flex-col gap-4 text-lg">
            <Button text="Home" icon={<IoHomeOutline fontSize={"27px"} />} func={() => navigate("/")} />
            <Button text="Notifications" icon={<IoNotificationsOutline fontSize={"27px"} />} />
            <Button text="Messages" icon={<CiMail fontSize={"27px"} />} />
            <Button text="Settings" icon={<CiSettings fontSize={"27px"} />} />
        </div>
    </div>
}

export default Sidebar;