"use client";

import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Fab,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardContent,
} from "@mui/material";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    PriorityHigh,
} from "@mui/icons-material";
import { useTodos } from "@/hooks/useTodos";
import { TodoFilters } from "@/types/todo";

export default function Todo() {
    const {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        clearCompleted,
        getFilteredTodos,
        getStats,
    } = useTodos();

    const [filters, setFilters] = useState<TodoFilters>({
        status: 'all',
        searchTerm: '',
    });

    const [showAddForm, setShowAddForm] = useState(false);
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
        priority: 'medium' as 'low' | 'medium' | 'high',
        category: '',
    });

    const filteredTodos = getFilteredTodos(filters);
    const stats = getStats();
    const categories = [...new Set(todos.map(todo => todo.category).filter(Boolean))];

    const handleFilterChange = (key: keyof TodoFilters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleAddTodo = () => {
        if (newTodo.title.trim()) {
            addTodo({
                title: newTodo.title,
                description: newTodo.description || undefined,
                priority: newTodo.priority,
                category: newTodo.category || undefined,
                completed: false,
            });
            setNewTodo({ title: '', description: '', priority: 'medium', category: '' });
            setShowAddForm(false);
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'high': return 'Hoch';
            case 'medium': return 'Mittel';
            case 'low': return 'Niedrig';
            default: return priority;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Meine Todos
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Organisiere deine Aufgaben und bleibe produktiv
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Gesamt
                            </Typography>
                            <Typography variant="h4">
                                {stats.total}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Aktiv
                            </Typography>
                            <Typography variant="h4" color="primary">
                                {stats.active}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Erledigt
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.completed}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Überfällig
                            </Typography>
                            <Typography variant="h4" color="error.main">
                                {stats.overdue}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filters */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Filter & Suche
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Suchen..."
                            value={filters.searchTerm || ''}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                label="Status"
                            >
                                <MenuItem value="all">Alle</MenuItem>
                                <MenuItem value="active">Offen</MenuItem>
                                <MenuItem value="completed">Erledigt</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Priorität</InputLabel>
                            <Select
                                value={filters.priority || ''}
                                onChange={(e) => handleFilterChange('priority', e.target.value || undefined)}
                                label="Priorität"
                            >
                                <MenuItem value="">Alle</MenuItem>
                                <MenuItem value="high">Hoch</MenuItem>
                                <MenuItem value="medium">Mittel</MenuItem>
                                <MenuItem value="low">Niedrig</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Kategorie</InputLabel>
                            <Select
                                value={filters.category || ''}
                                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                                label="Kategorie"
                            >
                                <MenuItem value="">Alle</MenuItem>
                                {categories.map(category => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            variant="outlined"
                            onClick={clearCompleted}
                            disabled={stats.completed === 0}
                            fullWidth
                        >
                            Erledigte löschen ({stats.completed})
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Todo List */}
            <Paper elevation={3} sx={{ mb: 3 }}>
                {filteredTodos.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {todos.length === 0
                                ? "Noch keine Todos erstellt"
                                : "Keine Todos entsprechen den Filterkriterien"
                            }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {todos.length === 0
                                ? "Klicke auf das Plus-Symbol, um dein erstes Todo zu erstellen"
                                : "Versuche die Filter zu ändern oder ein neues Todo zu erstellen"
                            }
                        </Typography>
                    </Box>
                ) : (
                    <List>
                        {filteredTodos.map((todo, index) => (
                            <ListItem
                                key={todo.id}
                                divider={index < filteredTodos.length - 1}
                                secondaryAction={
                                    <Box>
                                        <IconButton
                                            edge="end"
                                            onClick={() => deleteTodo(todo.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                }
                            >
                                <ListItemButton onClick={() => toggleTodo(todo.id)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={todo.completed}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography
                                                    sx={{
                                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                                        opacity: todo.completed ? 0.6 : 1
                                                    }}
                                                >
                                                    {todo.title}
                                                </Typography>
                                                <Chip
                                                    label={getPriorityLabel(todo.priority)}
                                                    color={getPriorityColor(todo.priority)}
                                                    size="small"
                                                />
                                                {todo.category && (
                                                    <Chip
                                                        label={todo.category}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                )}
                                            </Box>
                                        }
                                        secondary={todo.description}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>

            {/* Add Todo FAB */}
            <Fab
                color="primary"
                aria-label="add todo"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={() => setShowAddForm(true)}
            >
                <AddIcon />
            </Fab>

            {/* Add Todo Dialog */}
            <Dialog open={showAddForm} onClose={() => setShowAddForm(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Neues Todo erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Todo Titel"
                        fullWidth
                        variant="outlined"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Beschreibung (optional)"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Priorität</InputLabel>
                                <Select
                                    value={newTodo.priority}
                                    onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as 'low' | 'medium' | 'high' })}
                                    label="Priorität"
                                >
                                    <MenuItem value="low">Niedrig</MenuItem>
                                    <MenuItem value="medium">Mittel</MenuItem>
                                    <MenuItem value="high">Hoch</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Kategorie (optional)"
                                value={newTodo.category}
                                onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAddForm(false)}>Abbrechen</Button>
                    <Button onClick={handleAddTodo} variant="contained" disabled={!newTodo.title.trim()}>
                        Erstellen
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}