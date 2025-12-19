import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch()

    //ab logoutbtn toh ek btn handler bhi banana hoga
    const logoutHandler = async() => {
        //authService.logout ek promise return kar raha hai toh isko handle karne
        // k lie then and catch ka use karenge.
        await authService.logout()
        .then(() => {
            dispatch(logout()) // ab jab logout successfully ho gaya then ek dispatch
            //bhi laga dete hai logout ka taki store k ander jo information hai wo updated rahe.
        })
        .catch((err) => {
            console.log("logout Error",err)
        })
    }
    return (
        <button
        className="inline-block px-6 py-2 duration-200
        hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn