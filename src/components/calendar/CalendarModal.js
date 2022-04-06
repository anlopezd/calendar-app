import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {  clearActiveNote, eventStartAddNew, eventStartUpdated } from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");


const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
}
const CalendarModal = () => {
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlusOne.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formData, setFormData] = useState(initEvent);
const { activeEvent } = useSelector( state => state.calendar );
  useEffect(()=> {
      if(activeEvent){
        setFormData(activeEvent)
      } else {
        setFormData(initEvent)
      }
  }, [activeEvent, setFormData])

  const { title, notes, start, end } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateStartChange = (e) => {
    setDateStart(e);
    setFormData({
      ...formData,
      start: e,
    });
  };
  const dispatch = useDispatch();
  const {modalOpen} = useSelector( state => state.ui );
  console.log(modalOpen);

  const closeModal = () => {
    // cerrar el modal
    dispatch(uiCloseModal())
    setFormData(initEvent)
    dispatch(clearActiveNote())
  };

  const handleDateEndChange = (e) => {
    setDateEnd(e);
    setFormData({
      ...formData,
      end: e,
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire(
        "Error",
        "La fecha final debe ser mayor que la inicial",
        "error"
      );
      return;
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    // grabacion en base de datos

    if(activeEvent) {
      dispatch(eventStartUpdated(formData))
    } else {
      dispatch(eventStartAddNew(formData))

    }



    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>{activeEvent ? "Editar elemento" : "nuevo elemento"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleDateStartChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleDateEndChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
