import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import useForm from "../../hooks/useForm";
import "./login.css";

const LoginScreen = () => {
const dispatch = useDispatch();

const {formData:formLoginData, handleInputChange:handleLoginChange} = useForm({
  lEmail: "prueba1@gmail.com",
  lPassword: "1234536"
})

const {formData:formRegisterData,
handleInputChange: handleRegisterChange} = useForm({rName: "Andres",
rEmail: "anlopezd@hotmail.com",
rPassword1: "123456",
rPassword2: "123456"
})

const {rName, rEmail, rPassword1, rPassword2} = formRegisterData

const {lEmail, lPassword} = formLoginData
const handleLogin = (e) => {
  e.preventDefault()
  dispatch(startLogin(lEmail, lPassword))
}

const handleRegister = (e) => {
  e.preventDefault()
  if(rPassword1 !== rPassword2){
    Swal.fire("Error", "las contraseñas deben ser iguales", "error")
  }

  dispatch(startRegister(rEmail, rPassword1, rName))
}

  return (
    <div className="login-container container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={handleLoginChange}
                name="lPassword"
                value={lPassword}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit mt-2" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister} > 
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                onChange={handleRegisterChange}
                value={rName}
                name="rName"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                onChange={handleRegisterChange}
                value={rEmail}
                name="rEmail"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={handleRegisterChange}
                value={rPassword1}
                name="rPassword1"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                onChange={handleRegisterChange}
                value={rPassword2}
                name="rPassword2"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit mt-2" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
