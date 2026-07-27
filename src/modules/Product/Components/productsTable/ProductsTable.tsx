import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useGetAllProducts, useDeleteProduct, useUpdateProduct } from '../../Hooks/productHooks';
import { getProductColumns } from './productColumns';
import { useNavigate } from '@tanstack/react-router';

function ProductsTable() {
  const { data, isLoading, error } = useGetAllProducts();
  const deleteProductMutation = useDeleteProduct();
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    deleteProductMutation.mutate(id);
  };

  const handleUpdate = (id: number) => {
    navigate({ to: `/update-product/${id}` });
  };

  const table = useReactTable({
    data: data?.data || [],
    columns: getProductColumns({ onDelete: handleDelete, onUpdate: handleUpdate }),
    getCoreRowModel: getCoreRowModel(),
  })

  isLoading && <p>Loading data...</p>;
  error && <p>Error: {error.message}</p>;
  return (
    <div className="p-2">
      <div className="header-table">
        <h1>Products Table</h1>
        <button
          className="submit-button"
          type="button"
          onClick={() => navigate({ to: '/create-product' })}
        >
          New Product
        </button>
      </div>
      <div className="h-2" />
      <div className="table-container">
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable