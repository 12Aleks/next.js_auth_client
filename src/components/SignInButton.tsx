"use client"
import {useSession} from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
    const {data: session} = useSession();



    if(session && session.user)
    return (
        <div className="flex gap-4 ml-auto">
            <p className="text-cyan-800">Hello {session.user.name} !</p>
            <Link className="flex gap-4  ml-auto text-gray-500 hover:text-gray-900  transition-colors font-medium" href={`/api/auth/signout`} >
                Sign Out
            </Link>
        </div>
    );

    return (
        <div className="flex gap-4 ml-auto items-center">
            <Link className="flex gap-4  ml-auto text-gray-500 hover:text-gray-900  transition-colors font-medium"
                  href={`/api/auth/signin`}>
                Sign Out
            </Link>
            <Link className="flex gap-4  ml-auto text-gray-500 hover:text-gray-900  transition-colors font-medium" href={`/api/signup`}>
                Sign Up
            </Link>
        </div>
    )
};

export default SignInButton;