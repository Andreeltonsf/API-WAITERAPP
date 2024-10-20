import { model, Schema } from "mongoose";



export const Product = model('Product', new Schema({
  name:{
    type: String,
    require:true,
  },
  description:{
    type: String,
    require:true,
  },
  imagePath:{
    type: String,
    require:true,
  },
  price:{
    type: Number,
    require:true,
  },
  ingredients:[{
   name:{
    type: String,
    require:true,
   },
   icon:{
    type: String,
    require:true,
   },
}],
  category:{
    type:Schema.Types.ObjectId,
    require:true,
    ref:'Category',

  },
}));
