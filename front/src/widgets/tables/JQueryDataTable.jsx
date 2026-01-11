import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons-dt";

const JQueryDataTable = ({
  data = [],
  columns = [],
  options = {}, // DataTables options like scrollX, buttons, paging
  onEdit = null,
  onDelete = null,
  rowActions = true, // show actions column
  idKey = "uuid", // unique key in your data
}) => {
  const tableRef = useRef(null);

  // Initialize or re-initialize DataTable
  useEffect(() => {
    if (tableRef.current) {
      const dt = $(tableRef.current).DataTable({
        destroy: true, // destroy previous instance
        data,
        columns: [
          ...columns,
          ...(rowActions
            ? [
                {
                  title: "Actions",
                  data: null,
                  orderable: false,
                  searchable: false,
                  render: function (dataRow) {
                    return `
                      <div class="flex justify-center gap-2">
                        ${
                          onEdit
                            ? `<button class="edit-btn bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>`
                            : ""
                        }
                        ${
                          onDelete
                            ? `<button class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>`
                            : ""
                        }
                      </div>
                    `;
                  },
                },
              ]
            : []),
        ],
        ...options,
      });

      // Handle edit/delete button clicks
      $(tableRef.current).off("click", ".edit-btn").on("click", ".edit-btn", function () {
        const rowData = dt.row($(this).closest("tr")).data();
        onEdit && onEdit(rowData);
      });

      $(tableRef.current).off("click", ".delete-btn").on("click", ".delete-btn", function () {
        const rowData = dt.row($(this).closest("tr")).data();
        onDelete && onDelete(rowData);
      });

      return () => {
        dt.destroy();
      };
    }
  }, [data, columns, onEdit, onDelete, rowActions, options]);

  return (
    <div className="overflow-auto w-full">
      <table ref={tableRef} className="display w-full" />
    </div>
  );
};

export default JQueryDataTable;
