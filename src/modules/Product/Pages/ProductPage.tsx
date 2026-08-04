import { useNavigate } from "@tanstack/react-router";
import ProductsBootstrapTable from "../Components/BootstrapTable/ProductsBootstrapTable";
import Swal from "sweetalert2";

function ProductPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
        title: "Quieres cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, cerrar sesión!"
      }).then((result) => {
        if (result.isConfirmed){
          Swal.fire({
          title: "¡Sesión cerrada!",
          text: "Has cerrado sesión correctamente.",
          icon: "success"
          });
          localStorage.removeItem("token");
          navigate({ to: "/", });
        }
      });
        
    }
  return (
    <div className="container mt-3">
      <ProductsBootstrapTable />
      <div className="d-flex gap-2">
        <button
            className="btn btn-danger btn-lg delete"
            type="button"
            onClick={handleLogout}
        >
            <i className="bi bi-box-arrow-left me-2"></i>
            Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default ProductPage