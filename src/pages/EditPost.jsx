import React, {useState, useEffect} from "react";
import {Container, PostForm} from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPosts] = useState(null)

    // ab edit k slug chahiye, aur milega url se (kyonki jab use edit
    // button click karega toh wo page pe jayega, usme slug present hoga)
    // and we know that url se value nikalne k lie useParams hook ka use karte hai
    
    const {slug} = useParams()
    const navigate = useNavigate()

    //ab ek useEffect toh lagega hi lagega because sara data slug se lekar aani hai
    // and agar slug me kuchh change ho toh sare data values le kar aao

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if(post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return (
        //ab return karna hai post hai ya nahi hai uske basis pe
        post ? (
            <div className="py-8">
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        ) : null
    )
}

export default EditPost