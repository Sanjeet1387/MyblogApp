import conf from '../conf/conf.js';

import { Client, Account, ID } from "appwrite";

//quality code -> best approach

export class AuthService {
    client = new Client();
    account; //ab ye dono (i,.e client and account) me account tabhi banna chahiye jab constructor call ho.

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    //account creation/Signup
    async createAccount({email, password, name}) {
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another method
                return await this.login({email,password});
            }else{
                return userAccount;
            }
        }catch (error){
            console.log(error);
        }
    }

    //for login via email and password
    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log(error);
        }
    }
    //to check user are logged in or not
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            
        }
        
        return null;
    }

    //logout
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);
        }
    }
}

const authService = new AuthService(); //authService is the object of the classs AuthService.and new variable use karke
// object banaya hai, then constructor ye sab toh aayega hi aayega.

export default authService

//note: ye jo object banayi gayi hai authService isse se dot se(i.,e authService.logout, authService.login etc) sab accessble hai.
//toh ise ban gaya ye future proof code, underhood kya ho raha hai, wo sirf is file ko pata hai. fir aap appwrite use kariye , firebase
//use kariye aapko bas isi file ko change karna hoga.. baki k frontend , backend ko fark nahi padega. yani hum easily dusre service me shift kar sakte hai
// bina jyada preshani ke.