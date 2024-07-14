import React from 'react'
import style from './Button.module.css'
import {BsArrowRight} from 'react-icons/bs'
import {useNavigate} from "react-router-dom";

const Button = ({text, BGcolor, link='/contact'}) => {

    const navigate = useNavigate()

    let ClassName = ''
    if (BGcolor === 'white') {
        ClassName = 'buttonWhite'
    } else if (BGcolor === 'black') {
        ClassName = 'buttonBlack'
    }



    return (
        <a className={`${style.buttonA} ${BGcolor === 'black' ? style.buttonBlack : style.buttonWhite}`}
           onClick={() => {navigate(link)}}>
            <BsArrowRight className={style.iconArrowBefore}/>
            <span className={style.buttonLabel}>{text}</span>
            <BsArrowRight className={style.iconArrowAfter}/>
        </a>
    )
}
export default Button
