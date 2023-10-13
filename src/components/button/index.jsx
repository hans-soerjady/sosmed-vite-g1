const Button = (props) => {

    return <button onClick={props.func} className={`flex justify-start items-center w-4/5 ${props.className} gap-3`}>
        {props.icon}{props.text}
    </button>
}

export default Button;