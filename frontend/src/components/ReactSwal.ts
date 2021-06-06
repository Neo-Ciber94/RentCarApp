import { Colors } from "src/layout";
import Swal from "sweetalert2";
import createWithContent from "sweetalert2-react-content";

export const ReactSwalBase = createWithContent(Swal);
export const ReactSwal = ReactSwalBase.mixin({
  confirmButtonColor: Colors.Main,
  cancelButtonColor: Colors.Secondary,
});
