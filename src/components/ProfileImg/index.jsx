
const ProfileImg = (props) => {

    return <div className="flex w-12 h-12 user-img text-white rounded-full items-center justify-center" style={props.style}>
        <p className="flex text-[32px]">{(props.text)}</p>
    </div>
}

export default ProfileImg;