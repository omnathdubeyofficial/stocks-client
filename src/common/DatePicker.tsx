import React, { useState } from 'react'
import './datepicker.css'
import { FlatInput } from './InputFields/Input'
import shortid from 'shortid'
import {
  setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from './validationlib';
function DatePicker(props: any) {
  const [toggle, setToggle] = useState(false)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  const [finalDate, setFinalDate] = useState({ day: '', month: '', year: '' })
  const [SelectedDate, setSelectedDate] = useState({ day, month, year })
  const [displayDate, setDisplayDate] = useState({ day, month, year })
  let selectedMth = months[displayDate.month] + ' ' + displayDate.year
  function toggleDatePicker() {
    setToggle(!toggle)
  }
  function goToNextMonth() {
    if (displayDate.month < 11) {
      setDisplayDate({
        day: displayDate.day,
        month: displayDate.month + 1,
        year: displayDate.year,
      })
    } else {
      setDisplayDate({
        day: displayDate.day,
        month: 0,
        year: displayDate.year + 1,
      })
    }
  }
  function goToPrevMonth() {
    if (displayDate.month - 1 < 0) {
      setDisplayDate({
        day: displayDate.day,
        month: 11,
        year: displayDate.year - 1,
      })
    } else {
      setDisplayDate({
        day: displayDate.day,
        month: displayDate.month - 1,
        year: displayDate.year,
      })
    }
  }

  function formatDate(date: any, format: string) {
    if (date.day !== '') {
      let day = date.day
      let month = date.month
      if (day < 10) {
        day = '0' + day
      }
      if (month + 1 < 10) {
        month = '0' + (month + 1)
      } else {
        month = month + 1
      }
     if(format==="yyyymmdd")
        return date.year+""+month+""+day 
      return day + '/' + month + '/' + date.year
    }
    return ''
  }
  function getDay(date: number, dispalydate: any) {
    return new Date(
      dispalydate.year + '-' + (dispalydate.month + 1) + '-' + (date + 1)
    ).getDay()
  }
  function populateDays() {
    let Noofdays = 31
    if ((displayDate.month + 1) % 2 === 0 && displayDate.month + 1 < 7) {
      Noofdays = 30
    } else if (
      !((displayDate.month + 1) % 2 === 0) &&
      displayDate.month + 1 > 7
    ) {
      Noofdays = 30
    } else {
      Noofdays = 31
    }

    if (displayDate.month === 1 && !(displayDate.year % 4 === 0)) {
      Noofdays = 28
    } else if (displayDate.month === 1 && displayDate.year % 4 === 0) {
      Noofdays = 29
    }

    let arr = []
    const temp = getDay(0, displayDate)
    for (let i = 0; i < temp; i++) {
      arr.push(
        <div className="day" key={i+"_#"+shortid.generate()}>
          <span>{days[i]}</span>&nbsp;
        </div>
      )
    }
    for (let i = 0; i < Noofdays; i++) {
      if (
        SelectedDate.day === i + 1 &&
        SelectedDate.month === displayDate.month &&
        SelectedDate.year === displayDate.year
      ) {
        console.log(
          SelectedDate.day === i + 1 &&
            SelectedDate.month === displayDate.month &&
            SelectedDate.year === displayDate.year
        )
        arr.push(
          <div className="day selected" key={shortid.generate()}>
            <span className="selected">{days[getDay(i, displayDate)]}</span>
            {i + 1}
          </div>
        )
      } else
        arr.push(
          <div
          key={shortid.generate()}
            className="day"
            onClick={() =>
              setSelectedDate({
                day: i + 1,
                month: displayDate.month,
                year: displayDate.year,
              })
            }
          >
            <span>{days[getDay(i, displayDate)]}</span>
            {i + 1}
          </div>
        )
    }
    return arr
  }
  
  const { wd, label, name, section, currdoc,modifydoc,cal,format} = props
  let classname = 'input-field'
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      classname = 'error-input-field'
    }
  }
  return (
    <div
      className={`date-picker col_itss-${wd}`}
      onClick={!toggle ? toggleDatePicker : () => {}}
    >
      {/* <div className="selected-date">{formatDate(finalDate,"")}</div> */}

<FlatInput wd="12" label={label} name={label} currdoc={currdoc} section={section} modifydoc={modifydoc} />
    
      <div className={toggle ? 'dates active' : 'dates'}>
        <div className="month" key={shortid.generate()}>
          <div className="arrows prev-mth" onClick={goToPrevMonth}>
            &lt;
          </div>
          <div className="mth" onClick={() => {}} key={shortid.generate()}>
            {selectedMth}
          </div>
          <div className="arrows next-mth" onClick={goToNextMonth} key={shortid.generate()}>
            &gt;
          </div>
        </div>

        <div className="days" onClick={() => {}} key={shortid.generate()}>
          {populateDays()}
        </div>
        <div className="date-button-container_itss">
          <div className="date-cancel-button" onClick={toggleDatePicker}>
            Cancel
          </div>
          <div
            className="date-cancel-button"
            onClick={() => {
              setFinalDate({ day: '', month: '', year: '' })
            }}
          >
            reset
          </div>
          <div
            className="date-ok-button"
            onClick={() => {
              toggleDatePicker(); setFinalDate({ ...SelectedDate });
              setCalValue(currdoc, section, formatDate({ ...SelectedDate }, format), modifydoc, cal)
            }}
          >
            OK
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
