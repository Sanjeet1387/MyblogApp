import React from "react";
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

//ab PostCard ko display karane k lie kuchh props dena hoga
//isme id -> $id karke likha jata hai , ye syntax hai appwrite ka
function PostCard({$id, title, featuredImage}) {
    return (
        //sara card clickable hona chahiye -> ye banayenge by Link
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                   <img 
                        src={
                            featuredImage 
                              ? appwriteService.getFilePreview(featuredImage)
                              : "https://via.placeholder.com/400x300?text=No+Image"
                        }
                        alt={title}
                        className="rounded-xl"
                    />
                </div>
            </div>
            <h2 
            className="text-xl font-bold"
            
            >{title}</h2>
        </Link>
       
    )
}

export default PostCard