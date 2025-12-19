import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from "../store/authSlice";
import {Button, Input, Logo} from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";

//jab bhi react form use hoga , hum useForm hook use kar lenge
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm() //isme register ek form handle karne ka tarika hai
    const [error, setError] = useState("") // state le rahe error display karne k lie

    const login = async(data) => {
        setError("") //basic syntax hai, login, register sab isi tarah se banega
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(authLogin(userData)) // fixed by debugging, before i was using data instead of useData
                }
                //now ab user login ho chuka hai, then navigate kar do root pe
                setTimeout(() => {
                    navigate("/");
                }, 200);
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div
            className={`mx-auto w-full max-w-lg bg-gray-100 
                rounded-xl p-10 border border-black/10`}
            >
               <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 
                 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {/* ab hume agar error display karwani hai */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* Now for form */}
                <form onSubmit={handleSubmit(login)}
                className="mt-8">
                    <div className="space-y-5">
                        {/* Input lete hai component wala */}
                        <Input 
                        label="Email: "
                        placeholder="Enter your email" // but Input me toh placeholder expect hi nahi kar rahe the, fir bhi le sakte hai because of ...props
                        type="email" //ye de denge toh @gmail.com ye sab kar dega

                        // ab ek javaScript use karni padegi
                        //ye javaScript kya hai -> jitne hum Input field is tarah se banauyege
                        //chahe wo Select ho ya koi aur, hume ek syntax use karna hota hai,kyonki hum useForm use kar rahe
                        //register that's why hume ...register likhna jaruri hota hai 
                        //note: agar hum ... nahi likhte hai, then other Input field ki value se override kar jayegi, that's why hume har spread karna padega -> ye compulsory hai

                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })} //ye name jaise yaha email hai -> unique rakhna hota hai,taki pata lagaya ja sake ki ye Input email
                        // k lie hai, ya password k lie hai etc toh ye name important hai , note:- final object spread hokar data k ander isi k basis par aayega.
                        //email k alawa dusra hai object jisme bahut sare options pass karte hai
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                        />
                        <Button
                        type="submit"
                        className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login