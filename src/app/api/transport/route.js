import { connectToDB } from "@/utils/database";
import transport from "@/models/transportDetails";


export const GET=async(req,res)=>{
    try{
        await connectToDB();
        const items=await transport.find({}); 
        return new Response(JSON.stringify(items), { status: 201 });
    }
    catch(err)  
    {
        return new Response("Internal server Error", { status: 500 });
    }
}