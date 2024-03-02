/* import { useDispatch } from "react-redux";
import {
  updateName,
  updateApellido,
  updateAgrupaciones,
  updateImagenPerfil,
  updateLogin,
  updateSobreMi,
  updateCredential,
} from "../features/user/userSlice";
import { Student } from "../api/Estudiantes";

export function updateUserState(student: Student) {
  const dispatch = useDispatch();

  dispatch(updateName(student.nombre));
  dispatch(updateApellido(student.Apellido));

  dispatch(updateAgrupaciones(student.agrupaciones || []));
  dispatch(updateImagenPerfil(student.imagen_perfil));
  dispatch(updateLogin(true));
  dispatch(updateSobreMi(student.sobre_ti));
  dispatch(updateCredential({ email: student.email }));
}
 */
