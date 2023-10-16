import { BsThreeDots } from "react-icons/bs";

const TrendCards = (props) => {
    return <div className="flex flex-row justify-between cursor-pointer hover:bg-[#2d2d2d] py-2 px-4 transition ease-in-out duration-400">
        <div>
            <p className="text-[14px] text-gray-400" >{props.category} · Trending</p>
            <p className="text-[17px] tracking-wide font-bold">{props.title}</p>
            <p className="text-[14px] text-gray-400" >{props.num} posts</p>
        </div>
        <div className="flex items-center justify-center text-gray-400 h-[40px] w-[40px] rounded-full cursor-pointer hover:text-[#1D9BF0] hover:bg-[#1d9cf028]">
            <BsThreeDots className="text-[18px]" />
        </div>
    </div>
}

export default TrendCards;