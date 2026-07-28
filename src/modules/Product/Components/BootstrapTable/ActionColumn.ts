import $ from "jquery";

type ActionColumnProps = {
  table: any;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number) => void;
};

export function getActionColumn({
  table,
  onDelete,
  onUpdate,
}: ActionColumnProps) {
  return {
    field: "operate",
    title: "Acciones",
    align: "center",
    clickToSelect: false,

    formatter: () => `
      <div class="d-flex justify-content-center gap-2">

        <button
          class="btn btn-warning btn-sm update"
          title="Editar">
          <i class="bi bi-pencil-square"></i>
        </button>

        <button
          class="btn btn-danger btn-sm delete"
          title="Eliminar">
          <i class="bi bi-trash"></i>
        </button>

      </div>
    `,

    events: {
      "click .update": (_e: JQuery.Event, _value: any, row: any) => {
        onUpdate?.(row.id);
      },

      "click .delete": (_e: JQuery.Event, _value: any, row: any) => {
        if (!confirm(`¿Eliminar ${row.name}?`)) return;

        table.bootstrapTable("remove", {
          field: "id",
          values: [row.id],
        });

        onDelete?.(row.id);
      },
    },
  };
}