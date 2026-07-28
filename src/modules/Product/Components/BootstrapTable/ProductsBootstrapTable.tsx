// import { useEffect, useRef } from "react";
// import $ from "jquery";

// (window as any).$ = $;
// (window as any).jQuery = $;

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import "bootstrap-table/dist/bootstrap-table.min.css";
// import "bootstrap-table/dist/bootstrap-table.min.js";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { useGetAll } from "../../Hooks/productHooks";

// export default function ProductsBootstrapTable() {
//   const tableRef = useRef<HTMLTableElement | null>(null);
//   const { data, isLoading, error } = useGetAll();

//     const products = data || [];

//   useEffect(() => {
//     if (!tableRef.current) return;

//     const $table = $(tableRef.current) as any;

//     $table.bootstrapTable({
//       data: products,
//       search: true,
//       pagination: true,
//       showRefresh: true,
//       showColumns: true,
//       showToggle: true,
//       showExport: true,
//       clickToSelect: true,
//       pageList: [10, 25, 50, 100, "All"],

//       columns: [
//         [
//           {
//             field: "state",
//             checkbox: true,
//             rowspan: 2,
//             align: "center",
//           },
//           {
//             field: "id",
//             title: "ID",
//             rowspan: 2,
//             sortable: true,
//           },
//           {
//             title: "Detalles",
//             colspan: 3,
//           },
//         ],
//         [
//           {
//             field: "name",
//             title: "Nombre",
//             sortable: true,
//           },
//           {
//             field: "description",
//             title: "Descripción",
//             sortable: true,
//           },
//           {
//             field: "price",
//             title: "Precio",
//             sortable: true,
//           },
//           {
//             field: "operate",
//             title: "Acciones",
//             formatter: () => `
//             <button class="btn btn-primary btn-sm like">❤️</button>
//             <button class="btn btn-danger btn-sm remove">🗑</button>
//             `,
//             events: {
//                 "click .like": (_e, _value, row) => {
//                     alert(`Like ${row.name}`);
//                 },
//                 "click .remove": (_e, _value, row) => {
//                     $table.bootstrapTable("remove", {
//                     field: "id",
//                     values: [row.id],
//                     });
//                 },
//             },
//           },
//         ],
//       ],
//     });

//     return () => {
//       if (tableRef.current) {
//         ($(tableRef.current) as any).bootstrapTable("destroy");
//       }
//     };
//   }, [products, isLoading]);

//   if (isLoading) {
//     return <div>Cargando...</div>;
//   }

//   if (error) {
//     return <div>Error al cargar los productos.</div>;
//   }

//   return (
//     <div className="container mt-3">
//       <table ref={tableRef}></table>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import $ from "jquery";

(window as any).$ = $;
(window as any).jQuery = $;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";

import "bootstrap-icons/font/bootstrap-icons.css";
import { useGetAll } from "../../Hooks/productHooks";
import { getProductColumns } from "./ProductColumns";


export default function ProductsBootstrapTable() {
  const tableRef = useRef<HTMLTableElement>(null);

  const { data, isLoading, error } = useGetAll();

  const products = data ?? [];

  useEffect(() => {
    if (!tableRef.current) return;

    const $table = $(tableRef.current) as any;

    $table.bootstrapTable("destroy");

    $table.bootstrapTable({
      data: products,

      search: true,
      pagination: true,
      showRefresh: true,
      showColumns: true,
      showToggle: true,
      clickToSelect: true,
      pageList: [10, 25, 50, 100, "All"],

      columns: getProductColumns({
        table: $table,

        onDelete: (id) => {
          console.log("Eliminar", id);

          // Aquí puedes llamar tu API
        },

        onUpdate: (id) => {
          console.log("Actualizar", id);

          // Navegar
          // navigate(`/products/edit/${id}`)
        },
      }),
    });

    return () => {
      $table.bootstrapTable("destroy");
    };
  }, [products]);

  if (isLoading) return <div>Cargando...</div>;

  if (error) return <div>Error al cargar productos.</div>;

  return (
    <div className="container mt-3">
      <table ref={tableRef}></table>
    </div>
  );
}