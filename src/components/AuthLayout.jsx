import React, { useEffect } from "react";
// import { useState } from "react";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    // const [loader, setLoader] = useState(true)

    //ab sabse pahle puchhenge auth status se ki aap login ho ya nahi ho,directly
    //depend nahi karenge jo user pass kar raha hai component k ander.
    const authStatus = useSelector(state => state.auth.status)

    const loader = authStatus === "loading";

    //ab useEffect chahiye, because useEffect hi hume batayega ki appko login pe bhejna hai
    //ya home pe bhejna ya kaam karana hai aur kis kis field me change hone par dubara recheck karna hai
    useEffect(() => {
        //Todo: make it more easy to understand

        // if (authStatus === true){
        //     navigate("/")
        // } else if(authStatus === false){
        //     navigate("/login")
        // }
        
        //but this is best according to routing point of view and better approach
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        // setLoader(false) //ye rakhenge agar hum useState se kar rahe hain.but isme abhi kuchh problem hai -> do chatgpt
    },[authStatus, navigate, authentication]) 

    return loader ? <h1>Loading...</h1> : <>{children}</>
}