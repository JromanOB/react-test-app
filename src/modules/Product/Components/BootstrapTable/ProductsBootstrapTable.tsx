import { useEffect, useRef } from "react";
import $ from "jquery";

(window as any).$ = $;
(window as any).jQuery = $;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";
import "bootstrap-table/dist/locale/bootstrap-table-es-ES.min.js";

import "bootstrap-icons/font/bootstrap-icons.css";

import { useNavigate } from "@tanstack/react-router";
import { useDeleteProduct, useGetAll } from "../../Hooks/productHooks";
import Swal from 'sweetalert2';
import { getProductColumns } from "./ProductColumns";

export default function ProductsBootstrapTable() {
  const tableRef = useRef<HTMLTableElement>(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetAll();
  const deleteProductMutation = useDeleteProduct();

  const products = data ?? [];

  const handleUpdate = (id: number) => {
    navigate({
      to: "/products/update/$id",
      params: {
        id: String(id),
      } as any,
    });
  };

  const handleDelete = (id: number) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, bórralo!"
      }).then((result) => {
        if (result.isConfirmed){
          Swal.fire({
          title: "¡Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success"
          });
          deleteProductMutation.mutate(id);
        }
      });
    };

  useEffect(() => {
    if (!tableRef.current) return;

    const $table = $(tableRef.current) as any;

    $table.bootstrapTable("destroy");

    $table.bootstrapTable({
      data: products,

      locale: "es-ES",

      search: true,
      pagination: true,
      showRefresh: true,
      showColumns: true,
      showToggle: true,
      clickToSelect: true,
      pageList: [10, 25, 50, 100, "Todos"],

      columns: getProductColumns({
        table: $table,
        onDelete: handleDelete,
        onUpdate: handleUpdate,
      }),
    });

    return () => {
      $table.bootstrapTable("destroy");
    };
  }, [products]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar productos.</div>;
  }

  return (
    <div className="container mt-3">
      <div className="header-table d-flex justify-content-between align-items-center mb-3">
        <h1>Tabla de Productos</h1>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate({ to: "/products/create" })}
        >
          Nuevo Producto
        </button>
      </div>

      <table ref={tableRef}></table>
    </div>
  );
}