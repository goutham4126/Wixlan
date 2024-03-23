import {Schema,model,models} from "mongoose"

const transportSchema=new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    sender_address:{
        type:String,
        required:true,
    },
    sender_phone:{
        type:String,
        required:true,
    },
    product_name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    receiver_name:{
        type:String,
        required:true,
    },
    receiver_address:{
        type:String,
        required:true,
    },
    receiver_phone:{
        type:String,
        required:true,
    },
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },

})

const transport=models.transportDetails || model("transportDetails",transportSchema)
export default transport;