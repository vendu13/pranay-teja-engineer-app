import {useForm} from 'react-hook-form';
import {Navigate} from 'react-router-dom';
import {HiOutlineMail} from 'react-icons/hi';
import {RiLockPasswordFill} from 'react-icons/ri';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Input, Text} from '@chakra-ui/react';
import style from './Login.module.css';
import {useLoginMutation} from '../../../store/user/userApi';
import {useSelector} from "react-redux";
import Loader from "../../Loader/Loader.jsx";


function Login() {
    const [loginHook, {isLoading}] = useLoginMutation();
    const user = useSelector((state) => state.userReducer.user);

    const {
        register,
        handleSubmit,
        setFocus,
        getValues,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            name: '',
            password: '',
        },
        mode: 'all',
    });

    const nameReg = register('name', {
        required: 'Name is required',
        minLength: {
            value: 3,
            message: `Minimum 3 characters`,
        },
        maxLength: {
            value: 15,
            message: `Maximum 15 characters`,
        },
    });

    const passwordReg = register('password', {
        required: 'Password is required',
    });

    const submitForm = async (values) => {
        await loginHook(values);
    };

    if (user.name) {
        return <Navigate to="/admin" replace/>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={style.loginContainer}>
            <div className={style.loginCard}>
                <Text
                    fontSize="3xl"
                    m="1rem"
                    as="b"
                    w="100%"
                >
                    Log in
                </Text>
                <Text
                    fontSize="m"
                    m="0 0 1.5rem"
                    w="100%"
                >
                    Welcome back! Please enter your details.
                </Text>
                <form className={style.loginForm} onSubmit={handleSubmit(submitForm)} autoComplete="off">
                    <fieldset
                        aria-hidden="true"
                        className={getValues('name') ? style.loginFieldsetCompleted : style.loginFieldset}
                        onClick={() => setFocus('name')}
                        style={errors?.name ? {borderColor: '#e76565'} : {}}
                    >
                        <legend className={style.legend}>Admin username</legend>
                        <HiOutlineMail className={style.iconLogin}/>
                        <div className={style.loginLine}/>
                        <Input
                            className={style.loginInput}
                            placeholder="Enter your admin username"
                            variant="unstyled"
                            autoComplete="off"
                            onChange={nameReg.onChange}
                            onBlur={nameReg.onBlur}
                            name={nameReg.name}
                            ref={nameReg.ref}
                        />
                    </fieldset>
                    <div className={style.loginError}>
                        {errors?.name
                            && (
                                <div>
                                    <ExclamationCircleOutlined/>
                                    {' '}
                                    {errors?.name?.message}
                                </div>
                            )}
                    </div>
                    <fieldset
                        aria-hidden="true"
                        className={getValues('password') ? style.loginFieldsetCompleted : style.loginFieldset}
                        onClick={() => setFocus('password')}
                        style={errors?.password ? {borderColor: '#e76565'} : {}}
                    >
                        <legend className={style.legend}>Password</legend>
                        <RiLockPasswordFill className={style.iconLogin}/>
                        <div className={style.loginLine}/>
                        <Input
                            className={style.loginInput}
                            variant="unstyled"
                            type="password"
                            placeholder="••••••••••"
                            onChange={passwordReg.onChange}
                            onBlur={passwordReg.onBlur}
                            name={passwordReg.name}
                            ref={passwordReg.ref}
                        />
                    </fieldset>
                    <div className={style.loginError}>
                        {errors?.password
                            && (
                                <div>
                                    <ExclamationCircleOutlined/>
                                    {' '}
                                    {errors?.password?.message}
                                </div>
                            )}
                    </div>

                    <button
                        type="submit"
                        className={style.loginButton}
                        disabled={!isValid}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
