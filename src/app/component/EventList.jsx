import React, { useState,useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash,faPencil,faCheck  } from '@fortawesome/free-solid-svg-icons';
function EventList({ getEvent, event,presentDate}) {
  const link="https://task-manager-dusky-seven.vercel.app/"
  const patchNotDone = async (e) => {
    console.log(e);
    e.notDone = false;
    await axios.patch(
      link+"api/Event/Krishna?eventId=" + e._id,
      
    );
    getEvent();
  };

  const [changedDate,changeChangedDate]=useState('');
  const [selectedId,changeSelectedId]=useState('');
  const deleteEvent = async (e) => {
    console.log(e);
    await axios.delete(
      link+"api/Event/Krishna?eventId=" + e._id
    );
    getEvent();
  };
  const selectTheId=(e)=>{
    changeSelectedId(e._id);
    changeChangedDate('');
  }
  useEffect(()=>{
    if(selectedId!=''){
      changeChangedDate(presentDate);
      console.log(changedDate);
    }
  },[presentDate])
  const deselectTheId=async(e,form)=>{
    if(changedDate!='')
      e.endDate=changedDate;
    await axios.patch(
      link+"api/Event/Krishna?eventId=" + selectedId,
      e
    );
    getEvent();
    changeSelectedId('');
  }
  return (
    <div className="w-[60%] h-[100%] overflow-y-auto  p-9 ">
      <h2 className="text-3xl font-bold mb-4">📅 Task List</h2>

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
            <form onSubmit={deselectTheId}>
            <div className="flex flex-col border rounded-xl border-gray-100 m-2">
              <div className="w-[100%] flex justify-between">
                <div className="flex text-2xl">
                  <p className="py-2 pl-4">📆</p>
                  <input
                    placeholder={e.title}
                    onChange={(cevent) => {
                      e.title = cevent.target.value;
                    }}
                    disabled={(selectedId==e._id)?false:true}
                    className="h-10 px-2 py-6 border-none placeholder-white bg-transparent focus:outline-none text-white"
                  ></input>
                </div>
                <div className="flex flex-col items-end pt-2">
                  <input
                    placeholder={e.endDate}
                    value={(e._id==selectedId)!=''?changedDate:''}
                    disabled
                    className="h-4 w-[130px] px-5 py-3 border-none placeholder-white bg-transparent focus:outline-none text-white"
                  ></input>
                  <input
                    placeholder={e.endTime}
                    disabled={(selectedId==e._id)?false:true}
                    onChange={(cevent)=>{e.endTime=cevent.target.value}}
                    className="h-4 px-5 w-[90px] py-3 border-none placeholder-white bg-transparent focus:outline-none text-white"
                  ></input>
                </div>
              </div>
              <div className="flex w-[100%]">
              <textarea
                maxLength={100}
                disabled={(selectedId==e._id)?false:true}
                placeholder={e.description}
                onChange={(cevent)=>{e.description=cevent.target.value}}
                className=" px-4 py-2 resize-none w-[92%] border-none placeholder-white bg-transparent focus:outline-none text-white"
              ></textarea>
              <div className="flex flex-col">
                <FontAwesomeIcon icon={faTrash} className="p-2" onClick={()=>deleteEvent(e)}/>
                {selectedId==e._id?<FontAwesomeIcon icon={faCheck} onClick={()=>deselectTheId(e)} />:<FontAwesomeIcon icon={faPencil} onClick={()=>selectTheId(e)}/>}
              </div>
              </div>
            </div>
            </form>
          </div>
        ))}
    </div>
  );
}

export default EventList;
