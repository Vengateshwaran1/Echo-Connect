import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { Disc3 } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = async (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                await updateApiToken(token);
            } catch (error) {
                console.error("Error in authProvider:", error);
                await updateApiToken(null);
            } finally {
                setLoading(false);
            }
        };
        
        initAuth();

        return () => {
            updateApiToken(null); 
        };
    }, [getToken]);

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <Disc3 strokeWidth={2.5} absoluteStrokeWidth  className="size-20 animate-spin text-orange-500 shadow-md" />
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthProvider;