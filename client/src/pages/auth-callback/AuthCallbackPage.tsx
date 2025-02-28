import { Card } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Disc3 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAtempted=useRef(false);
  

  useEffect(() => {
		const syncUser = async () => {
			if (!isLoaded || !user || syncAtempted.current) return;

			try {

				syncAtempted.current = true;
				
				await axiosInstance.post("/auth/callback", {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					imageUrl: user.imageUrl,
				});

			} catch (error) {
				console.log("Error in auth callback", error);
			} finally {
				navigate("/");
			}
		};

		syncUser();
	}, [isLoaded, user, navigate]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800 flex flex-col gap-2 items-center p-2">
          <Disc3 strokeWidth={2.5} className="size-20 animate-spin text-orange-500 shadow-md" />
          <h3 className="text-lg font-bold text-gray-300">Logging you in</h3>
          <p className="text-sm text-gray-400">Redirecting...</p>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;