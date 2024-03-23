import { connectToDB } from "@/utils/database";
import itemsForSale from "@/models/sellItems";


export const PUT = async (req, { params }) => {
    try {
        await connectToDB();    
        const { id } = params;
        const { brand, price, seller_address } = await req.json();

        // Check if  item exists
        const existingItem = await itemsForSale.findById(id);
        if (!existingItem) {
            return new Response("Item not found", { status: 404 });
        }

        // Update item
        if (brand) existingItem.brand = brand;
        if (price) existingItem.price = price;
        if (seller_address) existingItem.seller_address = seller_address;
        // Saveing updated item to my database  
        await existingItem.save();

        return new Response(JSON.stringify(existingItem), { status: 200 });
    } catch (err) {
        console.error("Error editing item:", err);
        return new Response("Internal server Error", { status: 500 });
    }
}
