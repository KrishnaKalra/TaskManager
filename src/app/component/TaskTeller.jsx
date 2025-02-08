import React from "react";
import { useState } from "react";
import axios from 'axios';
function TaskTeller({ getEvent, presentDate }) {
  let [description, setDescription] = useState();
  let [endTime, setEndTime] = useState();
  let [title, setTitle] = useState();
  let SubmitCall = async (e) => {
    let link="https://task-manager-dusky-seven.vercel.app/"
    e.preventDefault();
    const form = {
      endDate: presentDate,
      endTime: endTime,
      title: title,
      description: description,
    };

    console.log("submitting:" + form);
    await axios.post(
      link+`api/Event/Krishna`,
      JSON.stringify(form)
    );
    getEvent();
  };

  return (
    <div className="px-5 pt-5 h-[50%] rounded-xl text-center bg-[#121212] flex flex-col flex-center ">
      <h1 className="text-3xl">Add a Task</h1>
      <form
        className="flex flex-col h-[80%] justify-around"
        onSubmit={SubmitCall}
      >
        <input
          type="text"
          placeholder="Title"
          required
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <input
          type="date"
          placeholder="End Date"
          required
          value={presentDate}
          disabled
        ></input>
        <input
          type="time"
          required
          placeholder="End Time"
          onChange={(event) => setEndTime(event.target.value)}
        ></input>
        <input
          type="text"
          required
          placeholder="Task Details"
          onChange={(event) => setDescription(event.target.value)}
        ></input>
        <button
          className="
              hover:border-black border-[1px]
              rounded-lg bg-[#B2D7D0] font-extrabold md:text-2xl "
          type="submit"
        >
          SUBMIT
          <input className="hidden" type="submit" />
        </button>
      </form>
    </div>
  );
}

export default TaskTeller;
