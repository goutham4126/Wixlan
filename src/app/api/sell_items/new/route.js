import { connectToDB } from "@/utils/database";
import itemsForSale from "@/models/sellItems";

export const POST=async(req)=>{
    const {
        Category,
        brand,
        no_of_owners,
        year_owned,
        description,
        price,
        photo,
        seller_name,
        seller_address,
        seller_phone,
        seller_id,
    }= await req.json();
    try{    
        await connectToDB();
        const items=new itemsForSale({
            Category,
            brand,
            no_of_owners,
            year_owned,
            description,
            price,
            photo,
            seller_name,
            seller_address,
            seller_phone,
            seller_id,
        })
        await items.save();
        return new Response(JSON.stringify(items), { status: 201 });
    }
    catch(err)
    {
        return new Response("Internal server Error", { status: 500 });
    }
}