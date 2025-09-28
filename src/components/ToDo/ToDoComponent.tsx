"use client";
import type { Session } from "@/lib/auth-client";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Todo } from "@prisma/client";

interface ProvidersProps {
    session: Session | null;
    todos: Todo[];
}
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150, editable: true },
    { field: 'completed', headerName: 'Completed', width: 150, editable: true },
];

export default function ToDoComponent({ session, todos }: ProvidersProps) {
    return (
        <>
            <DataGrid rows={todos} columns={columns} />
        </>
    );
}