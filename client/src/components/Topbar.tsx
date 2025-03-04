import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { BoomBox, LayoutDashboardIcon } from "lucide-react"
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";

const Topbar = () => {
    const isAdmin = false;
    return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900 border-zinc-800 backdrop-blur-md z-10 rounded-lg">
        <div className="flex gap-2 items-center hover:transition-colors cursor-pointer">
            <BoomBox size={45} strokeWidth={2.5} className="animate-pulse shadow-md bg-linear-to-bl from-[#360033] to-[#0b8793] " />
            <h1 className="text-lg font-bold text-gray-300">Echo Connect</h1>
        </div>
        <div className="flex items-center gap-4">
            {isAdmin && (
                <Link to={"/admin"}>
                    <LayoutDashboardIcon className="size-4 mr-2"/>
                    Admin dashboard
                </Link>
            )}


            <SignedIn>
                <SignOutButton/>
            </SignedIn>

            <SignedOut>
                <SignInOAuthButtons />
            </SignedOut>

        </div>
    </div>
    )
}

export default Topbar