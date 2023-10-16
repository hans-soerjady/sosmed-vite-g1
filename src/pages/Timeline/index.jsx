import React, { useEffect, useRef } from "react";
import axios from "axios"
import { API_URL } from "../../helper";

import Sidebar from "../../components/sidebar";
import PostCard from "../../components/PostCard";
import ProfileImg from "../../components/ProfileImg";

import { BsCardImage, BsEmojiSmile, BsMic, BsFiletypeGif, BsThreeDots } from "react-icons/bs"
import { CiLocationOn } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import TrendCards from "../../components/TrendCards";
import RecomUserCards from "../../components/RecomUserCards";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../../redux/action/accountAction";
import { Navigate, useNavigate } from "react-router-dom";

const TimelinePage = () => {
    const dispatch = useDispatch("");
    const navigate = useNavigate("")

    const [databasePost, setDatabasePost] = React.useState([])
    const [databaseAccount, setDatabaseAccount] = React.useState([])
    const [charCount, setCharCount] = React.useState(0)

    const loggedInUser = useSelector((state) => { return state.accountReducer })
    const inputAddPost = React.useRef()

    const [databaseRecomUser, setDatabaseRecomUser] = React.useState([])
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    const getAccounts = () => {
        axios.get(`${API_URL}/account`)
            .then((response) => {
                setDatabaseAccount(response.data);

                let temp = [...response.data]
                let index1 = Math.floor((Math.random() * temp.length))
                let index2 = index1 + 3
                setDatabaseRecomUser(temp.slice(index1, index2))

            }).catch((err) => {
                console.log(err);
            })
    }

    const getPosts = () => {
        axios.get(`${API_URL}/post`)
            .then((response) => {
                let temp = [...response.data]
                setDatabasePost(temp.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                }))
            }).catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        getAccounts()
        getPosts()
        if (localStorage.getItem("dataAccount")) {
            dispatch(loginAction(JSON.parse(localStorage.getItem("dataAccount"))))
            setIsLoggedIn(true)
        }
    }, [])

    const printPost = () => {
        let count = 0
        return databasePost.map((value) => {
            count += 1
            if (count <= 50) {
                return <PostCard username={databaseAccount[databaseAccount.findIndex((val) => { return val.id === value.userId })].username}
                    date={value.date} caption={value.caption} like={value.likes.length} condition={(value.likes).includes(loggedInUser.id)}
                    likeFunc={() => {
                        if (isLoggedIn === false) { return alert("Please login to like a post.")}

                        if (!((value.likes).includes(loggedInUser.id))) {
                            axios.patch(API_URL + `/post/${value.id}`, { likes: [...value.likes, loggedInUser.id] })
                                .then((response) => { getPosts() })
                                .catch((err) => { console.log("masuk error", err); })
                        } else {
                            let temp = [...value.likes]
                            temp.splice(temp.findIndex((val1) => { return val1 === loggedInUser.id }), 1)
                            axios.patch(API_URL + `/post/${value.id}`, { likes: temp })
                                .then((response) => { getPosts() })
                                .catch((err) => { console.log("masuk error", err); })
                        }
                    }} />
            }
        })
    }



    const printRecomUser = () => {

        return databaseRecomUser.map((value, index) => {
            if (value.id === loggedInUser.id) {
                return false
            } else {
                return <RecomUserCards username={value.username} />
            }
        })
    }

    const addPost = () => {
        axios.post(API_URL + "/post", {
            caption: inputAddPost.current.value,
            img: "",
            userId: loggedInUser.id,
            date: new Date(),
        }).then((response) => {
            console.log("Berhasil post", response)
        }).catch((err) => {
            console.log("error", err)
        })

        getPosts()
    }


    return <div className="timeline-page flex flex-row text-white">
        <Sidebar func={() => {
            localStorage.removeItem("dataAccount")
            dispatch(logoutAction())
            setIsLoggedIn(false)
            alert("Succesfully logged out of your account.")
        }}
            condition={isLoggedIn}
        />
        <div className="main-area flex flex-col items-center bg-black w-[45%] min-h-screen text-white ml-[22.5%]">
            <div className="header flex flex-col justify-start w-[100%] text-lg mt-2" >
                <p className="px-4 py-2 font-bold text-[22px]">Home</p>
                <div className="flex flex-row">
                    <p className="w-1/2 text-center border-b-[6px] border-[#1D9BF0] rounded-b-[4px] p-[8px] hover:bg-gray-800 cursor-pointer" >For you</p>
                    <p className="w-1/2 text-center text-gray-600 border-b-[1px] border-gray-600 p-[8px] hover:bg-gray-800 cursor-pointer" >Following</p>
                </div>
            </div>

            <div className="create-post flex flex-col items-center px-10 py-6 w-[100%] gap-3 border-b-[1px] border-gray-600" style={loggedInUser.username === "" ? { display: "none" } : { display: "flex" }}>
                <div className="flex flex-row w-[100%] gap-6">
                    <ProfileImg text={loggedInUser.username[0]} style={{ backgroundColor: "coral" }} />
                    <div className="flex flex-col text-right">
                        <textarea className="p-2 resize-none text-white bg-black outline-none text-[20px]" ref={inputAddPost}
                            rows={"1"} cols={"40"} maxLength={"150"} placeholder="What is happening?!"
                            onChange={() => {
                                setCharCount(inputAddPost.current.value.length)
                            }} ></textarea>
                        <span className="text-gray-500" >{charCount} / 150</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between w-[100%] px-4">
                    <div className="flex flex-row gap-5 ml-[72px]" >
                        <BsCardImage className="blue-c-theme" size={"20px"} cursor={"pointer"} />
                        <BsFiletypeGif className="blue-c-theme" size={"20px"} cursor={"pointer"} />
                        <BsMic className="blue-c-theme" size={"20px"} cursor={"pointer"} />
                        <BsEmojiSmile className="blue-c-theme" size={"20px"} cursor={"pointer"} />
                        <CiLocationOn className="blue-c-theme" size={"20px"} cursor={"pointer"} />
                    </div>
                    <button className="h-fit rounded-3xl px-5 py-2 blue-bg-theme font-bold text-md"
                        onClick={() => {
                            addPost()
                            getPosts()
                        }} >Post</button>
                </div>
            </div>

            <div className="posts-area w-[100%]">
                {printPost()}
            </div>
        </div>

        <div className="flex flex-col side-area min-h-screen bg-black w-[32.5%] border-l-[1px] border-gray-600 px-8 py-3 gap-4 sticky" >
            <div className="flex flex-row items-center">
                <div className="flex w-[15%] h-[48px] bg-[#202020] items-center justify-center rounded-l-full text-gray-300 cursor-text">
                    <FiSearch />
                </div>
                <input className="p-3 w-[85%] resize-none text-white bg-[#202020] rounded-r-full outline-none" placeholder="Search" />
            </div>

            <div className="bg-[#202020] rounded-[12px]">
                <div className="py-2 px-4">
                    <h1 className="text-[20px] font-bold">Trends for you</h1>
                </div>
                <TrendCards category="Sports" title="#MU" num="211K" />
                <TrendCards category="Music" title="Taylor Swift" num="476K" />
                <TrendCards category="Games" title="#Genshin" num="11K" />
                <div className="p-4 blue-c-theme cursor-pointer hover:bg-[#2d2d2d] rounded-b-[12px]">
                    <h1>Show more</h1>
                </div>
            </div>

            <div className="bg-[#202020] rounded-[12px]" >
                <div className="py-2 px-4">
                    <h1 className="text-[20px] font-bold">Who to follow</h1>
                </div>
                {printRecomUser()}
                <div className="p-4 blue-c-theme cursor-pointer hover:bg-[#2d2d2d] rounded-b-[12px]">
                    <h1>Show more</h1>
                </div>
            </div>

            <div className="py-1 px-5 text-sm text-[#71767B]">
                <p className="flex flex-row justify-between flex-wrap"><span className="hover:underline cursor-pointer">Terms of Service</span> <span className="hover:underline cursor-pointer">Privacy Policy</span> <span className="hover:underline cursor-pointer">Cookie Policy</span>
                    <span className="hover:underline cursor-pointer">Accesibility</span> <span className="hover:underline cursor-pointer">Ads info</span> <span className="flex flex-row items-center gap-[3px] hover:underline cursor-pointer">More <BsThreeDots /></span> <span className="hover:underline cursor-pointer">© 2023 A Corp.</span>
                </p>
            </div>
        </div>
    </div>
}

export default TimelinePage;