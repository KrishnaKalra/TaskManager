import dbConnect from "../../../../lib/dbConnect";
import User from "@/app/models/User";
import { NodeNextResponse } from "next/dist/server/base-http/node";
export async function POST(req) {
  await dbConnect();
  const formData = await req.formData(); // Parse JSON body
      console.log("Request Body:", formData);
      const newUser = new User({username:"Krishna",email:"krishna26kalra@gmail.com",password:"hello"});
      await newUser.save();
      return new Response(JSON.stringify({ message: "Received"}), {
          status: 200,
          headers: { "Content-Type": "application/json" }
      });
  
}
