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
    rowspan: 2,
    align: "center",
    valign: "middle",
    clickToSelect: false,

    formatter: () => `
      <div class="d-flex justify-content-center gap-2">
        <button
          type="button"
          class="btn btn-warning btn-sm update"
          title="Editar producto"
        >
          <i class="bi bi-pencil-square"></i>
        </button>

        <button
          type="button"
          class="btn btn-danger btn-sm delete"
          title="Eliminar producto"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `,

    events: {
      "click .update": (
        event: JQuery.Event,
        _value: unknown,
        row: { id: number }
      ) => {
        event.stopPropagation();
        onUpdate?.(row.id);
      },

      "click .delete": (
        event: JQuery.Event,
        _value: unknown,
        row: { id: number; name: string }
      ) => {
        event.stopPropagation();

        onDelete?.(row.id);
      },
    },
  };
}