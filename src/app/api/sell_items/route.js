import { connectToDB } from "@/utils/database";
import itemsForSale from "@/models/sellItems";


export const GET=async(req,res)=>{
    try{
        await connectToDB();
        const items=await itemsForSale.find({});
        return new Response(JSON.stringify(items));
    }
    catch(err)  
    {
        return new Response("Internal server Error", { status: 500 });
    }
}