import {BiSolidUpArrow, BiSolidDownArrow} from 'react-icons/bi'
import s from './Arrow.module.css'

const Arrow = ({focus, style={}}) => {
    return (
        <div className={s.arrow} style={style}>
            {focus
                ?
                <BiSolidUpArrow/>
                :
                <BiSolidDownArrow/>
            }
        </div>
    )
}
export default Arrow
