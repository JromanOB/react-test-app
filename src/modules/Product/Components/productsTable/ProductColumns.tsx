import { createColumnHelper } from '@tanstack/react-table'
import { Product } from '../../Models/product';

const columnHelper = createColumnHelper<Product>();

type ProductColumnsProps = {
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
};

export const getProductColumns = ({ onDelete, onUpdate }: ProductColumnsProps) => [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.description, {
    id: 'description',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Description</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => 'Actions',
    cell: (info) => (
      <div>
        <button
          className="delete-button"
          type="button"
          onClick={() => onDelete(info.row.original.id)}
        >
          Delete
        </button>
        <button
          className="update-button"
          type="button"
          onClick={() => onUpdate(info.row.original.id)}
        >
          Update
        </button>
      </div>
    ),
    footer: (info) => info.column.id,
  }),
]