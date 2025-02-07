import { Jost } from "next/font/google";
import dbConnect from "../../../../../lib/dbConnect";
import User from "@/app/models/User";
import Event from "@/app/models/Event";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  await dbConnect();
  const param = await params;
  const name = await param["name"];
  console.log(name);
  const userData = await User.findOne({ username: name });
  const event = await Event.find({ userId: userData._id });
  console.log(event);
  return NextResponse.json(event);
}
export async function POST(request, { params }) {
  await dbConnect();
  const param = await params;
  const name = await param["name"];
  console.log(name);
  const data = await User.findOne({ username: name });
  console.log(data);
  const body = await request.json();
  const obj = {
    userId: data._id,
    title: body.title, // Combined Date & Time
    endDate: body.endDate,
    endTime:body.endTime,
    description: body.description,
  };
  const newEvent = new Event(obj);
  await newEvent.save();
  return new Response(JSON.stringify({ message: "Received" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(request, { params }) {
  await dbConnect();

  const { searchParams } = new URL(request.url); // Get query parameters
  const eventId = searchParams.get("eventId"); // Extract specific query param
 

  const body = await request.json();
  console.log(body);
  const result=await Event.findOneAndUpdate({_id:eventId},{...body});
  console.log(result);
  const event=await Event.find();
  return NextResponse.json(event);
}

export async function DELETE(request) {
  try {
      await dbConnect();

      const { searchParams } = new URL(request.url); // Get query parameters
      const eventId = searchParams.get("eventId"); // Extract eventId

      if (!eventId) {
          return new Response(JSON.stringify({ error: "eventId is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
          });
      }

      const deletedEvent = await Event.findByIdAndDelete(eventId);

      if (!deletedEvent) {
          return new Response(JSON.stringify({ error: "Event not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
          });
      }

      return new Response(JSON.stringify({ message: "Event deleted successfully", event: deletedEvent }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
      });

  } catch (error) {
      console.error("Error deleting event:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
      });
  }
}

