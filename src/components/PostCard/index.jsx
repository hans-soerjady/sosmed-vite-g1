import { FaRegComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { GoShare } from "react-icons/go";
import ProfileImg from "../ProfileImg";
import "./style.css"
import { BiBarChart } from "react-icons/bi";

const PostCard = (props) => {
    let time = Math.ceil((new Date() - new Date(props.date)) / 1000)
    if (time <= 60) {
        time = `${Math.round(time)} seconds ago.`
    } else {
        time = time / 60
        if (time <= 60) {
            time = `${Math.round(time)}m`
        } else {
            time = time / 60
            if (time <= 24) {
                time = `${Math.round(time)}h`
            } else {
                let tempDate = ((new Date(props.date)).toDateString()).split(" ")
                if (time <= 365) {
                    time = tempDate[1] + " " + tempDate[2]
                } else {
                    time = tempDate[1] + " " + tempDate[2] + ", " + tempDate[3]
                }
            }
        }
    }
    return <div className="w-[100%] flex flex-row gap-4  px-10 pt-6 pb-2 border-b-[1px] border-gray-600 hover:bg-[#0d0d0d] cursor-pointer">
        <ProfileImg text={(props.username[0]).toUpperCase()} style={{ backgroundColor: "gray" }} />

        <div className="flex flex-col gap-2 w-[90%]">
            <div className="flex flex-row gap-3">
                <p>@{props.username}</p>
                <p className="text-gray-500">· {time}</p>
            </div>
            <div>
                <p>{props.caption}</p>
            </div>
            <div className="flex flex-row justify-between items-center mt-4 text-gray-500">
                <div className="group flex flex-row items-center hover:text-[#1D9BF0] cursor-pointer">
                    <div className="group-hover:bg-[#1d9cf028] p-2 rounded-full">
                        <FaRegComment fontSize={"20px"} />
                    </div>
                    <span className="text-[13px] p-1" >0</span>
                </div>

                <div className="group flex flex-row items-center hover:text-[#54c64e] cursor-pointer ">
                    <div className="group-hover:bg-[#54c64e1d] p-2 rounded-full">
                        <AiOutlineRetweet fontSize={"20px"} />
                    </div>
                    <span className="text-[13px] p-1" >0</span>
                </div>

                <div className="group flex flex-row items-center hover:text-[#F91880] cursor-pointer"
                    onClick={props.likeFunc}>
                    <div className="group-hover:bg-[#f918811d] p-2 rounded-full" >
                        {props.condition ? <AiFillHeart fontSize={"22px"} className="text-[#F91880]" /> : <AiOutlineHeart fontSize={"22px"} />}
                    </div>
                    <span className={`text-[13px] p-1 ${props.condition ? "text-[#F91880]" : false}`} >{props.like}</span>
                </div>

                <div className="group flex flex-row items-center hover:text-[#1D9BF0] cursor-pointer">
                    <div className="group-hover:bg-[#1d9cf016] p-2 rounded-full" >
                        <BiBarChart fontSize={"22px"} />
                    </div>
                    <span className="text-[13px] p-1" >0</span>
                </div>

                <div className="cursor-pointer hover:text-[#1D9BF0] hover:bg-[#1d9cf012] p-2 rounded-full" >
                    <GoShare fontSize={"22px"} />

                </div>
            </div>
        </div>
    </div>
}

export default PostCard;