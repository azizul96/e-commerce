import connectToDB from "@/database";
import Joi from "joi";
import { NextResponse } from "next/server";





const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
})

export const dynamic = 'force-dynamic'

export async function POST(req){
  await connectToDB();

  const {name, email, password, role} = await req.json();

  // Validate the schema 
  const {error} = schema.validate({name,email, password, role});

  if(error){
    return NextResponse.json({
      success: false,
      message: email.details[0]
    })
  }

  try{

  }
  catch(error){
    console.log('Error in registration');

    return NextResponse.json({
      success: false,
      message: 'Something went wrong!'
    })
  }


}