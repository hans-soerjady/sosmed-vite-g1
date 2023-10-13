import { FaRegComment } from "react-icons/fa";
import { AiOutlineEye, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { GoShare } from "react-icons/go";
import ProfileImg from "../ProfileImg";

const PostCard = (props) => {

    return <div className="w-[100%] flex flex-row gap-4  px-10 py-6 border-b-[1px] border-gray-600">
        <ProfileImg text={props.username[0]} style={{ backgroundColor: "gray" }} />
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row gap-3">
                <p>@{props.username}</p>
                <p className="text-gray-500">- {Math.ceil((new Date() - new Date(props.date)) / 1000 / 60 / 60 / 24)} days ago.</p>
            </div>
            <div>
                <p>{props.caption}</p>
            </div>
            <div className="flex flex-row justify-between items-center mt-8 text-gray-500">
                <FaRegComment fontSize={"20px"} cursor={"pointer"} />
                <AiOutlineRetweet fontSize={"22px"} cursor={"pointer"} />
                <AiOutlineHeart fontSize={"22px"} cursor={"pointer"} />
                <AiOutlineEye fontSize={"24px"} cursor={"pointer"} />
                <GoShare fontSize={"22px"} cursor={"pointer"} />
            </div>
        </div>
    </div>
}

export default PostCard;