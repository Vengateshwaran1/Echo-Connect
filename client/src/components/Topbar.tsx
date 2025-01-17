import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { BoomBox, LayoutDashboardIcon } from "lucide-react"
import { Link } from "react-router-dom";
import SignInAuthButtons from "./SignInAuthButtons";

const Topbar = () => {
    const isAdmin = false;
  return (
    <div className="flex items-center justify-normal p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
        <div className="flex gap-2 items-center hover:transition-colors cursor-pointer">
            <BoomBox size={45} strokeWidth={2.5} className="animate-pulse text-orange-500 shadow-md" />
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
                <SignedOut/>
            </SignedIn>


            <SignedOut>
                <SignInAuthButtons />
            </SignedOut>


        </div>
    </div>
  )
}

export default Topbar