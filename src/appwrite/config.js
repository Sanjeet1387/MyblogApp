import conf from '../conf/conf';

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket; // ya fir storage

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        .setSession(true); //added during debugging, it can be remove
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // <---------- Documents ----------->
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //ID.unique() bhi le sakte the
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug, {title, content, featuredImage,
        status
    }){
        try {
            return await this.databases.updateDocument( //updateDocument is deprecated, so in new docs simply use update , similarly do for all
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true; //ki ha delete ho gaya hai
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false; //agar koi as such error aa gaya toh
        }
    }
    //to get a single post
    //is method me sirf slug pass kar rahe because delete and single post k lie uski id kafi hai.

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false;
        }
    }
    
    // <----------- Queries ----------->
    //sirf active status wala hi value chahiye then,
    //note: queries tab hi laga sakte hai, jab hum database me indexes banayi ho iske bina queries nahi laga sakte
    //jo indexes humne appwrite me lagayi hai uski baat ho rahi hai

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);
            return false;
        }
    }

    //<--------- file upload service ------------>
    //file upload karte samay actual file deni hoti hai, sirf uska name dene se nahi hota hai

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false;
        }
    }

    //for delete the file
    //note: delete karte samay file ki id deni padti hai

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true; // agar file delete ho gayi hai
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false; // agar kisi wajah se file delete nahi hua hai
        }
    }

    //file preview -> to get file preview image
    //isko bhi chahe toh async me dal sakte hai,but iska response kafi fast hota hai, so not need to use

    getFilePreview(fileId){
        return this.bucket.getFileDownload( //getFilePreview go replaced with getFileDownload during debugging due to appwrite plan issue.
            conf.appwriteBucketId,
            fileId
        );
    }

}

const service = new Service();

export default service