import React, { useEffect } from "react";
import axios from "axios"
import { API_URL } from "../../helper";

import Sidebar from "../../components/sidebar";
import PostCard from "../../components/PostCard";
import ProfileImg from "../../components/ProfileImg";

import { BsCardImage, BsEmojiSmile, BsMic, BsFiletypeGif } from "react-icons/bs"
import { CiLocationOn } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import TrendCards from "../../components/TrendCards";
import RecomUserCards from "../../components/RecomUserCards";

const TimelinePage = () => {
    const [loggedInUserId, setLoggedInUserId] = React.useState(0)

    const [databasePost, setDatabasePost] = React.useState([])
    const [databaseAccount, setDatabaseAccount] = React.useState([])

    const getAccounts = () => {
        axios.get(`${API_URL}/account`)
            .then((response) => {
                console.log(response.data);
                setDatabaseAccount(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    const getPosts = () => {
        axios.get(`${API_URL}/post`)
            .then((response) => {
                console.log(response.data);
                setDatabasePost(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        getAccounts()
        getPosts()
    }, [])

    const printPost = () => {
        return databasePost.map((value) => {
            let currentUsername = databaseAccount[databaseAccount.findIndex((val) => { return val.id === value.userId })].username
            return <PostCard username={currentUsername} date={value.date} caption={value.caption} />
        })
    }

    const getRecomUser = () => {
        console.log(databaseAccount.length)
        if (databaseAccount.length === 0) {
            return false
        } else {
            setIndex1(Math.floor(Math.random() * databaseAccount.length))
            setIndex2(Math.floor(Math.random() * databaseAccount.length))
            while (index1 === index2) {
                setIndex2(Math.floor(Math.random() * databaseAccount.length))
                console.log("inside loop")
            }
            console.log("finished loop")
        }
    }

    const printRecomUser = () => {
        if (databaseAccount.length > 0) {
            console.log("This runs")
            return <div>
                <RecomUserCards username={databaseAccount[0].username} />
                <RecomUserCards username={databaseAccount[1].username} />
                <RecomUserCards username={databaseAccount[2].username} />
            </div>
        }
    }


    return <div className="timeline-page flex flex-row text-white">
        <Sidebar />
        <div className="main-area flex flex-col items-center bg-black w-[55%] min-h-screen text-white">
            <div className="header flex flex-col justify-start w-[100%] text-gray-300 text-lg mt-2">
                <p className="px-10 font-bold text-[22px]">Home</p>
                <div className="flex flex-row">
                    <p className="w-1/2 text-center border-b-[6px] border-[#1D9BF0] rounded-b-[4px] p-2 font-bold hover:bg-gray-800 cursor-pointer" >For you</p>
                    <p className="w-1/2 text-center border-b-[1px] border-gray-600 p-2 font-bold hover:bg-gray-800 cursor-pointer" >Following</p>
                </div>
            </div>
            <div className="create-post flex flex-col items-center py-6 px-5 w-[100%] gap-3 border-b-[1px] border-gray-600">

                <div className="flex flex-row w-[100%] gap-6 justify-center">
                    <ProfileImg text="K" style={{ backgroundColor: "coral" }} />
                    <div className="flex flex-col text-right">
                        <textarea className="p-2 resize-none text-white bg-black outline-none text-[20px]" rows={"2"} cols={"57"} maxLength={"150"} placeholder="What is happening?!" ></textarea>
                        <span className="text-gray-500" >0 / 150</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between w-[100%] px-4">
                    <div className="flex flex-row gap-5 ml-[72px]" >
                        <BsCardImage className="blue-c-theme" size={"27px"} cursor={"pointer"} />
                        <BsFiletypeGif className="blue-c-theme" size={"27px"} cursor={"pointer"} />
                        <BsMic className="blue-c-theme" size={"27px"} cursor={"pointer"} />
                        <BsEmojiSmile className="blue-c-theme" size={"27px"} cursor={"pointer"} />
                        <CiLocationOn className="blue-c-theme" size={"27px"} cursor={"pointer"} />
                    </div>
                    <button className="h-fit rounded-3xl px-5 py-2 blue-bg-theme font-bold text-md"
                        onClick={() => alert("TEST")} >Post</button>
                </div>
            </div>

            <div className="posts-area w-[100%]">
                {printPost()}
            </div>
        </div>

        <div className="flex flex-col side-area bg-black w-[30%] border-l-[1px] border-gray-600 px-8 py-3 gap-4" >
            <div className="flex flex-row items-center">
                <div className="flex w-[15%] h-[40px] bg-slate-800 items-center justify-center rounded-l-full text-gray-300">
                    <FiSearch />
                </div>
                <input className="p-2 w-[85%] resize-none text-white bg-slate-800 rounded-r-full outline-none" placeholder="Search" />
            </div>

            <div className="bg-slate-800 rounded-[12px]">
                <div className="py-2 px-4">
                    <h1 className="text-[20px] font-bold">Trends for you</h1>
                </div>
                <TrendCards category="Sports" title="#MU" num="211K" />
                <TrendCards category="Music" title="Taylor Swift" num="476K" />
                <TrendCards category="Games" title="#Genshin" num="11K" />
                <div className="p-4 blue-c-theme cursor-pointer hover:bg-slate-700 rounded-b-[12px]">
                    <h1>Show more</h1>
                </div>
            </div>

            <div className="bg-slate-800 rounded-[12px]" >
                <div className="py-2 px-4">
                    <h1 className="text-[20px] font-bold">Who to follow</h1>
                </div>
                {printRecomUser()}
                <div className="p-4 blue-c-theme cursor-pointer hover:bg-slate-700 rounded-b-[12px]">
                    <h1>Show more</h1>
                </div>
            </div>
        </div>
    </div>
}

export default TimelinePage;