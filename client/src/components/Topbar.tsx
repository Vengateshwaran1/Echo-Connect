import {  SignedOut, UserButton } from "@clerk/clerk-react";
import { BoomBox, LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";

const Topbar = () => {
  const isAdmin = useAuthStore();
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 border border-purple-500/20 bg-black/40 backdrop-blur-md z-10 rounded-lg">
        <div className="flex items-center gap-3 px-2 mb-8  cursor-pointer mt-4">
          <BoomBox className="h-8 w-8 text-purple-400" />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Echo Connect
          </h1>
        </div>
   
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"} className="flex items-center rounded-xl bg-gradient-to-l from-amber-400 to-black p-1 text-md border hover:border-amber-400 ">
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton/>
      </div>
    </div>
  );
};

export default Topbar;
