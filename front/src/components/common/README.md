# DataTable Component Usage Guide

## Overview
The `DataTable` component is a reusable jQuery DataTable wrapper that supports both delete and deactivate actions. It provides a consistent interface for displaying tabular data across your application.

## Basic Usage

### For Delete Actions (like EmployeePage)
```jsx
import DataTable from "@/components/common/DataTable";

<DataTable
  data={employees}
  columns={[
    {
      key: "id",
      header: "ID",
      render: (item) => item.id
    },
    {
      key: "name", 
      header: "Name",
      render: (item) => item.name
    }
  ]}
  loading={loading}
  error={error}
  onEdit={handleEdit}
  onDelete={handleDelete}
  actionType="delete"
  showDocsButton={true}
  onDocsClick={generatePDF}
  emptyMessage="No records found"
/>
```

### For Deactivate Actions (like MSWCGodown, DriverPage)
```jsx
<DataTable
  data={godowns}
  columns={[
    {
      key: "id",
      header: "ID", 
      render: (item) => item.id
    },
    {
      key: "name",
      header: "Name",
      render: (item) => item.name
    }
  ]}
  loading={loading}
  error={error}
  onEdit={handleEdit}
  onDeactivate={handleDeactivate}
  actionType="deactivate"
  actionButtonText="Deactivate"
  emptyMessage="No records found"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | Array | Yes | Array of data objects to display |
| `columns` | Array | Yes | Column configuration array |
| `loading` | Boolean | No | Shows loading spinner when true |
| `error` | String | No | Error message to display |
| `onEdit` | Function | No | Callback for edit button click |
| `onDelete` | Function | No | Callback for delete button click |
| `onDeactivate` | Function | No | Callback for deactivate button click |
| `actionType` | String | No | "delete" or "deactivate" (default: "delete") |
| `actionButtonText` | String | No | Custom text for action button |
| `showDocsButton` | Boolean | No | Show documents button (default: false) |
| `onDocsClick` | Function | No | Callback for docs button click |
| `emptyMessage` | String | No | Message when no data (default: "No records found") |

## Column Configuration

Each column object should have:
- `key`: Unique identifier for the column
- `header`: Display text for column header
- `render`: Function that returns JSX for cell content

## Handler Functions

### Delete Handler
```jsx
const handleDelete = async (uuid) => {
  try {
    const response = await fetch(`${URL}/api/endpoint/${uuid}`, {
      method: "DELETE",
    });
    if (response.ok) {
      Swal.fire("Deleted!", "Record deleted successfully!", "success");
      fetchData(); // Refresh data
    } else {
      Swal.fire("Error", "Failed to delete record.", "error");
    }
  } catch (err) {
    console.error("Error deleting:", err);
    Swal.fire("Error", "Error deleting data.", "error");
  }
};
```

### Deactivate Handler
```jsx
const handleDeactivate = async (uuid) => {
  try {
    const response = await fetch(`${URL}/api/endpoint/${uuid}`, {
      method: "DELETE",
    });
    if (response.ok) {
      Swal.fire("Deactivated!", "Record deactivated successfully!", "success");
      fetchData(); // Refresh data
    } else {
      Swal.fire("Error", "Failed to deactivate record.", "error");
    }
  } catch (err) {
    console.error("Error deactivating:", err);
    Swal.fire("Error", "Error deactivating data.", "error");
  }
};
```

## Migration from Old Tables

1. Remove jQuery DataTable imports and refs
2. Replace table JSX with DataTable component
3. Convert table columns to column configuration array
4. Update handler functions to remove SweetAlert confirmation (handled by component)
5. Remove DataTable initialization useEffect

## Features

- ✅ jQuery DataTable integration with responsive design
- ✅ Built-in loading and error states
- ✅ Customizable action buttons (delete/deactivate)
- ✅ Optional documents button
- ✅ Customizable styling and messages
- ✅ Automatic confirmation dialogs
- ✅ Consistent UI across all pages

