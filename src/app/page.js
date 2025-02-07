"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Calendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import CalendarThere from "./component/calendar";
import {today, getLocalTimeZone, isWeekend} from "@internationalized/date";
import axios from "axios";
import TaskTeller from "./component/TaskTeller";
import EventList from "./component/EventList";
export default function Home() {
  let [value, setValue] = useState(parseDate("2024-03-07"));
  let [date,setDate]=useState(today(getLocalTimeZone()));
  const [presentDate,setpresentDate]=useState();


  let [event, setEvent] = useState([]);




  let getEvent = async () => {
    try {
      console.log('what');
      const result = await axios.get("http://localhost:3000/api/Event/Krishna");
      console.log("Event Data:", result.data); 
      setEvent(result.data);// Log API response
      // setEvent(result.data); // Uncomment if using state
    } catch (error) {
      console.error("Error fetching event:", error); // Catch any errors
    }
  };



  useEffect(()=>{
    let curdate=date.year+'-';
    if(date.month<10)
      curdate+=('0'+date.month)+'-';
    else
      curdate+=date.month+'-';
    if(date.day<10)
      curdate+=('0'+date.day);
    else
      curdate+=date.day;
    setpresentDate(curdate);
  },[date]);


  const patchNotDone=async (e)=>{
    console.log(e)
    e.notDone=false;
    await axios.patch("http://localhost:3000/api/Event/Krishna?eventId="+e._id,e);
    getEvent();
  }
  useEffect(() => {
    getEvent();
  }, []);


  
  //getEvent();
  let createEvent = async () => {};
  return (
    <div className=" dark h-[100vh] items-center w-[100vw] flex justify-center ">
      <div className="m-10 h-[90%] w-[80%]">
        <div className="mx-4 flex  h-[100%]  w-[90%] border-white border-2 justify-center items-center">
          <div ><CalendarThere date={date} setDate={setDate}/>
          <TaskTeller getEvent={getEvent} presentDate={presentDate} /></div>
          <EventList getEvent={getEvent} event={event}/>
        </div>
      </div>
    </div>
  );
}
