import React from "react";
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from "react-router-dom"; //redirection k lie ye chahiye hoga
import { useSelector } from "react-redux"; // ye hoga tabhi toh hum store me jakar dekh sakte hai ki use logeedin hai ya nahi.
import { useNavigate } from "react-router-dom"; //forcefully type ka kuchh navigate karna hai toh

function Header() {
    //for checking authenticate hai ya nahi
    const authStatus = useSelector((state) => state.auth.status); // state.status n likhkar state.auth.status because ye status auth k ander hi hai.

    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/" ,//means url kaha pe ja raha hai
            active: true
        },
        {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
    ]
    return (
        //flow => header->container->nav component -> (div -> link tag->logo) ,div k bahar-> unorderlists => ispe loop lag jayega
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                   <div className="mr-4">
                    <Link to='/'>
                     <Logo width='70px' />
                    </Link>
                   </div>
                   <ul className="flex ml-auto">
                    {navItems.map((item) => 
                        //ab item active hai ya nahi, is basis par kaam karenge yani kuchh display karwayenge
                        item.active ? (
                            // jaha bhi html element repeat hote waha par hume key(ye unique hota hai) lagani hoti hai
                            <li key={item.name}>
                                {/* ab btn chahiye and isi k ander sare nagigation wala kaam hoga */}
                                <button
                                onClick={() => navigate(item.slug)} //yahi kaam hum Link se kar sakte hai, navigate karega -> item.slug k uper
                                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                >{item.name}</button>
                            </li>
                        ) : null
                    )}

                    {/* means authenticate ho toh logoutBtn lo varna nahi lo */}
                    {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                   </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header

//note: isi header k ander hum sare link rakhenge but logout
//dikhana ya nahi dikhana ye hum conditionally render karenge