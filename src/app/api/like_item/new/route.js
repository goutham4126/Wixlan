import { connectToDB } from "@/utils/database";
import likedItems from "@/models/likedItems";

export const POST=async(req)=>{
    const {
        Category,
        Brand,
        No_of_owners,
        Year_owned,
        Description,
        Price,
        Photo,
        Seller_name,
        Seller_address,
        Seller_phone,
        Seller_id,
    }= await req.json();
    try{    
             await connectToDB();
            const items = new likedItems({
                Category,
                brand: Brand, 
                no_of_owners: No_of_owners, 
                year_owned: Year_owned,  
                description: Description,  
                price: Price, 
                photo: Photo, 
                seller_name: Seller_name, 
                seller_address: Seller_address, 
                seller_phone: Seller_phone, 
                seller_id: Seller_id, 
            });
            const LikedItems=await likedItems.findOne({id:items._id})
            if(!LikedItems)
            {
                await items.save();
                return new Response(JSON.stringify(items), { status: 201 });
            }    
            return new Response("Item already exists", { status: 201 });
    }
    catch(err)
    {
        return new Response("Internal server Error", { status: 500 });
    }
}