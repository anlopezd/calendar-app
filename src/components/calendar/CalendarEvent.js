import React from 'react'

const CalendarEvent = ({ event }) => {
    const {title, notes} = event
  return (
    <div>
        <span>{title} </span>
        <strong>{notes}</strong>
    </div>
  )
}

export default CalendarEvent