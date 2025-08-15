"use client";
import * as React from "react";
import {
  Box,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Paper,
  Fab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";
import { Delete, Add, Edit } from "@mui/icons-material";

// 1. Data Model - Interface für Todo
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export function ToDo() {
  // State für alle Todos
  const [todos, setTodos] = React.useState<Todo[]>([
  ]);

  // State für Dialog (Add/Edit)
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);
  const [inputText, setInputText] = React.useState("");

  // 2. CRUD-Funktionen

  // CREATE - Neues Todo erstellen
  const addTodo = (text: string) => {
    if (text.trim() === "") return; // Validation

    const newTodo: Todo = {
      id: Date.now().toString(), // Einfache ID-Generierung
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTodos(prev => [...prev, newTodo]);
  };

  // READ - Todos anzeigen (passiert automatisch durch Rendering)

  // UPDATE - Todo aktualisieren
  const updateTodo = (id: string, newText: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, text: newText.trim() }
          : todo
      )
    );
  };

  // UPDATE - Todo Status togglen (completed)
  const toggleTodoComplete = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // DELETE - Todo löschen
  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Dialog-Handler
  const handleOpenAddDialog = () => {
    setEditingTodo(null);
    setInputText("");
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (todo: Todo) => {
    setEditingTodo(todo);
    setInputText(todo.text);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTodo(null);
    setInputText("");
  };

  const handleSaveTodo = () => {
    if (inputText.trim() === "") return;

    if (editingTodo) {
      // Update existierendes Todo
      updateTodo(editingTodo.id, inputText);
    } else {
      // Neues Todo erstellen
      addTodo(inputText);
    }

    handleCloseDialog();
  };

  return (
    <>
      <Paper elevation={3} sx={{ marginTop: 5, maxWidth: 600, margin: "20px auto", padding: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
          Meine Todo-Liste ({todos.length} Aufgaben)
        </Typography>
        
        {todos.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", padding: 4 }}>
            Keine Todos vorhanden. Klicke auf + um eine neue Aufgabe zu erstellen!
          </Typography>
        ) : (
          <List sx={{ width: "100%" }}>
            {todos.map((todo) => (
              <Paper elevation={1} sx={{ margin: 1 }} key={todo.id}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <IconButton 
                        edge="end" 
                        aria-label="edit"
                        onClick={() => handleOpenEditDialog(todo)}
                        sx={{ marginRight: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => deleteTodo(todo.id)}
                        sx={{ color: "error.main" }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                  disablePadding
                >
                  <ListItemButton onClick={() => toggleTodoComplete(todo.id)} dense>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Checkbox
                        edge="start"
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={todo.text}
                      sx={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        opacity: todo.completed ? 0.6 : 1
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </Paper>

      {/* Floating Action Button für neues Todo */}
      <Fab
        color="primary"
        aria-label="add todo"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={handleOpenAddDialog}
      >
        <Add />
      </Fab>

      {/* Dialog für Add/Edit */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTodo ? "Todo bearbeiten" : "Neues Todo erstellen"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo-Text"
            fullWidth
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSaveTodo();
              }
            }}
            placeholder="Was möchtest du erledigen?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Abbrechen
          </Button>
          <Button 
            onClick={handleSaveTodo} 
            color="primary" 
            variant="contained"
            disabled={inputText.trim() === ""}
          >
            {editingTodo ? "Speichern" : "Erstellen"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}