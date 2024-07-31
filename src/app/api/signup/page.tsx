"use client"
import {useRef} from 'react';

import InputBox from "@/components/InputBox";
import Link from "next/link";
import {Button} from "@/components/Button";
import {Backend_URL} from "@/lib/Constants";

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

const SignupPage = () => {
    const data = useRef<FormInputs>({
        name: '',
        email: '',
        password: ''
    })


    const register = async () => {
        const res = await fetch(Backend_URL + "/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name: data.current.name,
                email: data.current.email,
                password: data.current.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            alert(res.statusText);
            return;
        }
        const response = await res.json();
        alert("User Registered!");
        console.log({ response });
    };


    return (
        <div className="overflow-hidden border-t border-l border-r border-gray-400 bg-gray-200 min-h-screen flex justify-center items-center">
        <div className="m-2 border rounded shadow overflow-hidden w-full max-w-xs p-3 bg-white">
            <div className="p2 bg-gradient-to-b from-white to-state-20 text-state-600 text-center text-blue-950 uppercase">Sign up</div>
            <InputBox
                autoComplete="off"
                name="name"
                labelText="Name"
                required
                onChange={(e) => (data.current.name = e.target.value)}
                />
            <InputBox
                autoComplete="off"
                name="email"
                labelText="Email"
                required
                onChange={(e) => (data.current.email = e.target.value)}
            />
            <InputBox
                autoComplete="off"
                name="password"
                labelText="Password"
                required
                onChange={(e) => (data.current.password = e.target.value)}
            />
            <div className="flex justify-center items-center gap-2 pt-5">
                <Button onClick={register}>Submit</Button>
                <Link href={"/"}>
                    Cancel
                </Link>
            </div>
        </div>
        </div>
    );
};

export default SignupPage;
