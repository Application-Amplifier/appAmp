"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { UserCard } from "./userCard";

export default function Login() {
    // get session from nextAuth
    const { data: session } = useSession();
    console.log(session);
    // useSession uses React Context

    //This is part of the first page 
    //Where the buttons are
    //When you click sign in it brings you to
    //http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F

    // if the user exists -> show a Sign Out button and their information

    //When signed  it brings us back to page with now a user card that has our name as part of the info
    if(session) {
        return (
            <>
                <button onClick={() => signOut()} type="button" className="btn btn-primary">Sign Out of Google</button>
                {/* Pass session info to server component */}
                <UserCard user={session?.user}/>
            </>
        )
    } else {
        return (
            <>
                <button onClick={() => signIn()} type="button" className="btn btn-primary">Sign In with Google</button>
            </>
        )
    }

    // if a user doesn't exist -> show a Sign In button
}