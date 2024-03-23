import { connectToDB } from "@/utils/database";
import transport from "@/models/transportDetails";

export const POST = async (req) => {
    const {
        firstname,
        lastname,
        sender_address,
        sender_phone,
        product_name,
        description,
        receiver_name,
        receiver_address,
        receiver_phone,
        sender_id
    } = await req.json();

    try {
        await connectToDB();
        const details = new transport({
            firstname,
            lastname,
            sender_address,
            sender_phone,
            product_name,
            description,
            receiver_name,
            receiver_address,
            receiver_phone,
            sender_id
        });
        await details.save();
        return new Response(JSON.stringify(details), { status: 201 });
    } catch (err) {
        return new Response("Failed to create new transport", { status: 500 });
    }
};
