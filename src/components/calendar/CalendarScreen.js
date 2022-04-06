import React, { useEffect, useState } from 'react'
import Navbar from '../ui/Navbar'
import CalendarEvent from "./CalendarEvent"

import { Calendar, momentLocalizer} from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"

import moment from 'moment'
import "moment/locale/es"

import { messages } from '../../helpers/calendar-message'
import CalendarModal from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { clearActiveNote, eventStartLoading, setActive } from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
import DeleteEventFab from '../ui/DeleteEventFab'

moment.locale('es')

const localizer = momentLocalizer(moment)


const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month")

  const dispatch = useDispatch();

  // leer los eventos

    const {events} = useSelector( state => state.calendar );
    const {activeEvent} = useSelector( state => state.calendar );


  useEffect(()=> {
    dispatch(eventStartLoading())
  }, [dispatch])


  const onDoubleClick = (e) => {
   dispatch(uiOpenModal())
   
  }

  const onSelectEvent = (e) => {
    dispatch(setActive(e))

  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem("lastView", e)
  }

  const onSelectSlot = (e) => {
    dispatch(clearActiveNote())
  }
  const { uid } = useSelector( state => state.auth )
const eventStyleGetter = ( event, start, end, isSelected) => {

const style = {
  backgroundColor: (uid === event.user._id) ? "#367CF7" : "red",
  borderRadius: "0px",
  opacity: "0.8",
  display: "block",
  color: "white"
}

return {
  style
}

}

  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
      localizer={localizer}
      events={ events }
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectSlot={ onSelectSlot }
      onSelectEvent={onSelectEvent}
      selectable={true}
      onView={ onViewChange }
      view={lastView}
    />

     {activeEvent &&  <DeleteEventFab />}
    <AddNewFab />

    <CalendarModal />



    </div>

    
  )
}

export default CalendarScreen