import s from './Loader.module.css'

const Loader = () => {
    return (
        <div className={s.loaderContainer} >
            <span className={s.loader} />
        </div>
    )
}

export default Loader