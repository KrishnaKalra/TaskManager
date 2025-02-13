"use client"
import React from "react";
import {Calendar} from "@heroui/react";
import {today, getLocalTimeZone, isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";

export default function CalendarThere({date,setDate}) {
  let {locale} = useLocale();
  let isInvalid = isWeekend(date, locale);
  //React.useEffect(()=>console.log(date),[date]);
  return (
    <Calendar
      aria-label="Date (Invalid on weekends)"
      value={date}
      onChange={setDate}
    />
  );
}

