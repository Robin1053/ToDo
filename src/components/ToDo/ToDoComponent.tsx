"use client";
import type { Session } from "@/lib/auth-client";
import * as React from "react";
import { Todo } from "@prisma/client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridColDef,
  GridActionsColDef,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

interface ProvidersProps {
  session: Session | null;
  todos: Todo[];
}

export default function ToDoComponent({ session, todos }: ProvidersProps) {
  const [rows, setRows] = React.useState<Todo[]>(todos);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    try {
      const row = rows.find((r) => r.id === id);
      if (!row) return;

      const res = await fetch("/api/todo", {
        method: "PUT",
        body: JSON.stringify(row),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const updated = await res.json();
        setRows((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
        );
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const res = await fetch("/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleAddTodo = async () => {
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({ title: "Neues Todo" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Fehler beim Erstellen");

      const newTodo: Todo = await res.json();
      setRows((prev) => [...prev, newTodo]);
    } catch (err) {
      console.error(err);
    }
  };

  const columns: (GridColDef<Todo> | GridActionsColDef<Todo>)[] = [
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
    },
    {
      field: "completed",
      headerName: "Completed",
      type: "boolean",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      type: "actions" as const,
      headerName: "Actions",
      width: 120,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              key="cancel"
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddTodo}
        sx={{ mb: 2 }}
      >
        Add Todo
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        autoHeight
      />
    </Box>
  );
}
