import { connectToDB } from "@/utils/database";
import likedItems from "@/models/likedItems";

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await likedItems.findByIdAndDelete(params.id);
        return new Response("Deletion Successful");
    } catch (err) {
        console.error("Error deleting item:", err);
        return new Response("Internal server Error", { status: 500 });
    }
}
