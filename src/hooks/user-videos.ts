import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetVideos = () => {
    const {isError,isLoading,data}= useQuery({
        queryKey: ["userVideos"],
        queryFn: async () => {
            const res = await axios.get("/api/video")
            return res.data
        }
    })
    return {isError,isLoading,data}
}