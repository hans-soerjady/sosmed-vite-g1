const RecomUserCards = (props) => {
    return <div className="flex flex-row items-center justify-between py-3 px-4 cursor-pointer hover:bg-slate-700">
        <div className="flex flex-row items-center gap-3">
            <div className="flex w-10 h-10 user-img text-white rounded-full items-center justify-center bg-gray-500" >
                <p className="flex text-[27px]">{props.username[0]}</p>
            </div>
            <div>
            <p className="font-bold text-[16px]">{props.username}</p>
            <p className="text-[15px] text-gray-400">@{props.username}</p>

            </div>
        </div>

        <button className="text-black text-[15px] bg-slate-300 rounded-[18px] py-[6px] px-5">Follow</button>
    </div>
}

export default RecomUserCards;