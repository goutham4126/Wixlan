import { connectToDB } from "@/utils/database";
import likedItems from "@/models/likedItems";

export const GET=async(req,res)=>{
    try{
        await connectToDB();
        const items=await likedItems.find({});
        return new Response(JSON.stringify(items));
    }
    catch(err) 
    {
        return new Response("Internal server Error", { status: 500 });
    }
}