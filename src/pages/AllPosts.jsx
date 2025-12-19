// agar sare posts dikhane ho toh ye chahiye hoga
//note: sare posts hume direct nahi milegi, toh ek useState chahiye hoga
//because sare posts ko ek query karni padegi

import React, {useState, useEffect} from "react";
//yaha par appwrite ki services bhi chahiye hogi,therefore

import appwriteService from '../appwrite/config'
import {Container, PostCard} from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])

    // //jaise hi component load hoga hum useEffect ka use kar lenge, sara kaam ho jayega
    // useEffect(() => {}, []) // before debugging

    // appwriteService.getPosts([]).then((posts) => {
    //     if(posts) {
    //         setPosts(posts.documents) //ab ye sare posts k ander aa jayega, toh loop laga denge
    //     }
    // })

    //after debugging  , but note: dono hi sahi chal rahe hai -> why?
    useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-l">
                            {/* ab PostCard ko call karo and data usko send kar do */}
                            <PostCard {...post} /> 
                            {/* here i write {...post} instead of post={post} during debugging that fixed the not visible image error in AllPosts */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts