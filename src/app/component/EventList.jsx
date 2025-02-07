import React from "react";
import axios from "axios";

function EventList({ getEvent, event }) {
  const patchNotDone = async (e) => {
    console.log(e);
    e.notDone = false;
    await axios.patch(
      "http://localhost:3000/api/Event/Krishna?eventId=" + e._id,
      e
    );
    getEvent();
  };
  return (
    <div className="w-[60%] h-[100%] overflow-y-auto  p-9 ">
      <h2 className="text-xl font-bold mb-4">📅 Task List</h2>

      {event
        .filter((event) => event.notDone)
        .map((e) => (
          <div key={e._id} className="flex ">
            <input
              type="checkbox"
              checked={!e.notDone}
              onChange={(check) => {
                patchNotDone(e);
                check.target.value = false;
              }}
            ></input>
            <div className="flex flex-col border rounded-xl border-gray-100 m-2">
              <div className="w-[100%] flex justify-between">
                <div className="flex text-2xl">
                  <p className="py-2 pl-4">📆</p>
                  <input
                    placeholder={e.title}
                    onChange={(e) => {
                      event.title = e.target.value;
                      console.log(e.title);
                    }}
                    className="h-10 px-2 py-6 border-none placeholder-white bg-transparent focus:outline-none text-white"
                  ></input>
                </div>
                <div className="flex flex-col items-end pt-2">
                  <input
                    placeholder={e.endDate}
                    className="h-4 w-[130px] px-5 py-3 border-none placeholder-white bg-transparent focus:outline-none text-white"
                  ></input>
                  <input
                    placeholder={e.endTime}
                    className="h-4 px-5 w-[90px] py-3 border-none placeholder-white bg-transparent focus:outline-none text-white"
                  ></input>
                </div>
              </div>

              <textarea
                maxLength={100}
                placeholder={e.description}
                className=" px-4 py-2 resize-none border-none placeholder-white bg-transparent focus:outline-none text-white"
              ></textarea>
            </div>
          </div>
        ))}
    </div>
  );
}

export default EventList;
