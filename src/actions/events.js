import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartAddNew = ( event ) => {
    return async(dispatch, getState) => {
        
        const { uid, name } = getState().auth

        try {
            const res = await fetchConToken("events", event, "POST")
            const body = await res.json()

            if(body.ok){
                event.id = body.evento.id 
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(addNew(event))
            }
        } catch (error) {
            
        }
        

    }
}

 const addNew = (event) => ({
type: types.eventAddNew,
payload: event
})

export const setActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const clearActiveNote = () => ({
    type: types.eventClearActiveNote
})


export const eventStartUpdated = ( event ) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`events/${event.id}`, event, "PUT")
            const body = await resp.json()

            if(body.ok){
                dispatch(eventUpdated(event))
            } else {
                Swal.fire("Error", body.msg, "error")
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventUpdated =  (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventStartDelete = (event) => {
    return async (dispatch, getState) => {

        const { id } = getState().calendar.activeEvent

        try {
            const resp = await fetchConToken(`events/${id}`, {}, "DELETE")
            const body = await resp.json()

            if(body.ok){
                dispatch(eventDeleted(event))
            } else {
                Swal.fire("Error", body.msg, "error")
            }

        } catch (error) {
            console.log(error);
        }
    }
}


const eventDeleted = () => ({type: types.eventDeleted})

export const eventStartLoading = () => {
    return async (dispatch) => {
       
        try {
            const resp = await fetchConToken("events")
            const body = await resp.json()

            const events = prepareEvents(body.eventos)

            dispatch(eventLoaded(events))

        } catch (error) {
            console.log(error);
        }


    }
}

const eventLoaded = (event) => ({
    type: types.eventLoaded,
    payload: event
})

export const eventLogout = () => ({
type: types.eventLogout
})