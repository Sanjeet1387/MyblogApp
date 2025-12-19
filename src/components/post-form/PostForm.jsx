//yaha se actually samajh me aayega ki RTE k ander onChange kya hai,kya-kya values hai, control kya hai etc.

import React, {useCallback} from "react";
import { useForm } from "react-hook-form";
import {Button, Input, Select, RTE} from '../index'

//Appwrite ki service lagegi because actually me hume data collect karke appwrite ko hi send karna hai
import appwriteService from '../../appwrite/config';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, getValues} = useForm({
        defaultValues: {
            title: post ?.title || "", // means default value toh empty string hai(agar create karenge form usme bhi chal jayega)
            //but agar koi edit karne aaya toh -> edit btn click kar k hi aayega toh jab bhi aayenge toh post ki sara information dena hoga, toh post me jo bhi inf. hoga usko lenge nahi empty chhod denge.

            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })

    const Navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    // console.log("useData",userData);

    //ab agar user form submit karta hai -> kuchh data/information pass kiya hai
    //ab do cheez hai , agar post ki data pahle se hai, toh update karo , warna new entry/post create karo

    const submit = async (data) => {
        if(post) {
            //agar humare pass post hai, toh file ko handle karna padega
            const file = data.image[0] ? 
            appwriteService.uploadFile(data.image[0]) : null

            if(file && post.featuredImage){ //file to file && post.featuredImage after debugging
                //ab agar file mila hai 
                //new image upload kar diya ab purani image delete bhi toh karo
                await appwriteService.deleteFile(post.featuredImage)//post.featuredImage file ki id hi contain karta, aur file deletion k lie id hi kafi hai
            }

            //ab post ko update karna hai
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                //sirf image override karega
                featuredImage: file ? file.$id : undefined
    
            })
            if(dbPost){
               Navigate(`/post/${dbPost.$id}`)
            }
        } else {
            //means isme update karne ko kuchh nahi hai, user new post create karna chahta hai

            //Todo: this is best approach but why, ye hona bhi chahiye ya nahi
            // // const file = data.image[0] ? 
            // appwriteService.uploadFile(data.image[0]) : null

            const file = await appwriteService.uploadFile(data.image[0]);

            if (file){
                const fileId = file.$id // mongoDB me jaise _id likhte hai, same yaha $id likhte hai
                data.featuredImage = fileId

                //ab data ki ek property update kar di, toh bache sare data ko send kar do
                const dbPost = await appwriteService.createPost({
                    ...data, //spread isliye kiya because jo actually me form banegi waha par kabhi bhi userdata nahi hoga
                    //toh userId bhi toh ek field bana rakha hai, usko bhi toh dena padega.

                    userId: userData.$id, //userData ko store se le aaye the
                })
                //or agar dbPost aa gaya hai, toh user ko navigate bhi karwa do
                if(dbPost) {
                    Navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }

    //now very important concept for interview point of view
    const slugTransform = useCallback((value) => {
        //ab slugTransform kya karta hai: -> do input hai humare pass 1.title and 2.slug
        //kaam -> title ko watch karna hai and slug k ander value generate karna hai -> ye sab useEffect me jayega

        //yaha par sirf basic functionality likhenge
        if (value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, '-')

        }
        return '' //empty string bhi return karna padega, warna problem aayegi
    }, [])

    //ab slugTransform method ko use kaise karna hai wo hai interview question
    React.useEffect(() => {
        //actually aap jo bhi method yaha pe run karte hai, usko subscription(bydefault name hai, achha lagta hai) 
        // name ya koi aur name ki variable me store kar sakte hain

        //note: React Hook Form’s watch() returns a function that tracks form input changes.

        const subscription = watch((value, { name }) => {
            //watch ek react hook se mila hai,toh isme bhi ek call back milega
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {shouldValidate: true});
            }
        });

        return () => {
            subscription.unsubscribe() // ye thoda memory management hota hai, thoda optimize ho jata hai
        }

    }, [watch, slugTransform, setValue]);

    //Because of React Compiler (React 19) marks React Hook Form’s watch() as an “incompatible API”
    //we use the useWatch Because React Hook Form team created it specifically to avoid watch() subscription + compiler issues.
    
    //useWatch -> read from chatgpt or docs
    // useWatch:- It automatically tracks specific field values. It updates your component whenever that field changes
    //It works like useEffect + watch, but cleaner and warning-free

    // const title = useWatch({
    // control,
    // name: "title",
    // });

    // React.useEffect(() => {
    // if (title) {
    //     setValue('slug', slugTransform(title), { shouldValidate: true });
    // }
    // }, [title,slugTransform, setValue]);

    return (

        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {/* <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} /> */}
                
                {/* //fully based on textarea no RTE, no tinymce editon */}
                <label className="inline-block mb-1 pl-1">Content :</label>
                <textarea
                {...register("content", { required: true })}
                defaultValue={getValues("content")}
                className="w-full border p-2 rounded mb-4"
                rows="10"
                />

            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" disabled={!userData} bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

//button me disabled={!userData} ye karne se submit button work kiya tha during debugging in addpost.