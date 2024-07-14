import s from './List.module.css'

const List = ({title, list, style = {}}) => {
    return (
        <div className={s.list}>
            <h1>{title}</h1>
            <div className={s.listMap} style={style}>
                {list.map((el, index) => (
                    <div key={index} className={s.listItem}>
                        <h3>{el}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default List
