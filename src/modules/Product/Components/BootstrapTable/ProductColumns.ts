import { getActionColumn } from "./ActionColumn";

type ProductColumnsProps = {
  table: any;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number) => void;
};

export function getProductColumns({
  table,
  onDelete,
  onUpdate,
}: ProductColumnsProps) {
  return [
    [
      {
        field: "state",
        checkbox: true,
        rowspan: 2,
        align: "center",
      },
      {
        field: "id",
        title: "ID",
        rowspan: 2,
        sortable: true,
      },
      {
        title: "Detalles",
        colspan: 3,
      },
      {
        title: "Acciones",
        rowspan: 2,
      },
    ],

    [
      {
        field: "name",
        title: "Nombre",
        sortable: true,
      },

      {
        field: "description",
        title: "Descripción",
        sortable: true,
      },

      {
        field: "price",
        title: "Precio",
        sortable: true,
        align: "right",
      },

      getActionColumn({
        table,
        onDelete,
        onUpdate,
      }),
    ],
  ];
}