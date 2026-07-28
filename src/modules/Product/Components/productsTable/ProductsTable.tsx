import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useGetAllProducts, useDeleteProduct, useUpdateProduct } from '../../Hooks/productHooks';
import { getProductColumns } from './productColumns';
import { useNavigate } from '@tanstack/react-router';
import Swal from 'sweetalert2';

function ProductsTable() {
  const { data, isLoading, error } = useGetAllProducts();
  const deleteProductMutation = useDeleteProduct();
  const navigate = useNavigate();

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

  const handleUpdate = (id: number) => {
    navigate({ to: `/update-product/${id}` });
  };

  const table = useReactTable({
    data: data?.data || [],
    columns: getProductColumns({ onDelete: handleDelete, onUpdate: handleUpdate }),
    getCoreRowModel: getCoreRowModel(),
  })

  isLoading && <p>Cargando datos...</p>;
  error && <p>Error: {error.message}</p>;
  return (
    <div className="p-2">
      <div className="header-table">
        <h1>Tabla de Productos</h1>
        <button
          className="submit-button"
          type="button"
          onClick={() => navigate({ to: '/create-product' })}
        >
          Nuevo Producto
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