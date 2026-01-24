import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import Swal from "sweetalert2";

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  error = null,
  pagination = null, // { page, limit, total, totalPages }
  onPageChange,
  onEdit,
  onDelete,
  onDeactivate,
  actionType = "delete", // "delete" or "deactivate"
  actionButtonText = null, // Custom text for action button
  showDocsButton = false,
  onDocsClick,
  emptyMessage = "No records found",
  tableClassName = "display w-full border border-gray-300 bg-white shadow-md rounded-md",
  headerClassName = "bg-gray-200",
  rowClassName = "text-start hover:bg-gray-100",
  actionColumnClassName = "border p-2 flex justify-start gap-2 text-xs md:text-base"
}) => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  useEffect(() => {
    // Only use jQuery DataTables for client-side mode (no server-side pagination)
    // This prevents the "removeChild" error caused by jQuery and React fighting over DOM nodes
    if (!pagination && data.length > 0 && tableRef.current) {
      if (dtInstance.current) {
        dtInstance.current.destroy();
      }

      dtInstance.current = $(tableRef.current).DataTable({
        destroy: true,
        responsive: true,
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
        order: [],
        language: {
          search: "Search:",
          lengthMenu: "Show _MENU_ entries",
          info: "Showing _START_ to _END_ of _TOTAL_ entries",
          paginate: {
            first: "First",
            last: "Last",
            next: "Next",
            previous: "Previous"
          }
        }
      });
    }

    return () => {
      if (dtInstance.current) {
        dtInstance.current.destroy();
        dtInstance.current = null;
      }
    };
  }, [data, pagination]);

  // ... (same handleAction and render functions as before)
  const handleAction = async (uuid, item) => {
    const isDelete = actionType === "delete";
    const actionText = actionButtonText || (isDelete ? "delete" : "deactivate");
    const confirmText = isDelete ? "You won't be able to revert this!" : "This will deactivate the record!";
    const confirmButtonText = isDelete ? "Yes, delete it!" : "Yes, deactivate it!";

    Swal.fire({
      title: `Are you sure?`,
      text: confirmText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const actionFunction = isDelete ? onDelete : onDeactivate;
          if (actionFunction) {
            await actionFunction(uuid, item);
          }
        } catch (err) {
          console.error(`Error ${actionText}ing:`, err);
          Swal.fire("Error", `Error ${actionText}ing data.`, "error");
        }
      }
    });
  };

  const renderActionButton = (item) => {
    const buttonText = actionButtonText || (actionType === "delete" ? "Delete" : "Deactivate");
    const buttonClass = "bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700";

    return (
      <button
        onClick={() => handleAction(item.uuid, item)}
        className={buttonClass}
      >
        {buttonText}
      </button>
    );
  };

  const renderDocsButton = (item) => {
    if (!showDocsButton || !onDocsClick) return null;

    return (
      <button
        onClick={() => onDocsClick(item)}
        className="text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        📄
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
        <span className="ml-3">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white mt-3 rounded-md shadow-md p-4 flex flex-col flex-1 overflow-hidden">
      <div key={pagination ? `${pagination.page}-${pagination.total}` : 'static'} className="overflow-auto flex-1">
        <table ref={tableRef} className={tableClassName}>
          <thead>
            <tr className={headerClassName}>
              {columns.map((column, index) => (
                <th key={index} className="border p-2">
                  {column.header}
                </th>
              ))}
              <th className="border p-2">Action</th>
              {showDocsButton && <th className="border p-2">Docs</th>}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.uuid || index} className={rowClassName}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="border p-2">
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                  <td className={actionColumnClassName}>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    )}
                    {(onDelete || onDeactivate) && renderActionButton(item)}
                  </td>
                  {showDocsButton && (
                    <td className="border p-2">
                      {renderDocsButton(item)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (showDocsButton ? 2 : 1)} className="p-3 text-start text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Server-side Pagination UI */}
      {pagination && (
        <div className="flex justify-between items-center mt-4 bg-gray-50 p-2 rounded-md border">
          <span className="text-sm text-gray-600">
            Showing page {pagination.page} of {pagination.totalPages} (Total: {pagination.total})
          </span>
          <div className="flex space-x-2">
            <button
              disabled={pagination.page === 1}
              onClick={() => onPageChange(parseInt(pagination.page) - 1)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange(parseInt(pagination.page) + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
