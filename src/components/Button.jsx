import React from "react";
//common btn me sabse important hota kon kon sa parameters accept kar rahe hai
// and unko use karne ka tarika

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props         //ye sab props by default hai, agar user ne liya hai, toh override kar do
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${type} ${bgColor}
        ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button

//note: ye syntax hum inputBtn me repeat karenge, waha par
//ek aur extra hook(forward reference hook) aa jayega.