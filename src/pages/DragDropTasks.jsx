import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  LinearProgress,
  Avatar,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
  Button,
} from "@mui/material";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../component/Sidebar";

// 🔹 Sortable Task
function SortableTask({ id, task, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
    padding: "10px",
    marginBottom: "10px",
    cursor: "grab",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <ListItem ref={setNodeRef} {...attributes} {...listeners} sx={style}>
      <ListItemText primary={task} />
      <IconButton
        edge="end"
        color="error"
        size="small"
        onClick={() => onDelete(id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
}

// 🔹 Droppable Container
function DroppableContainer({ id, title, tasks, onAddTask, onDeleteTask }) {
  return (
    <Paper
      elevation={6}
      sx={{
        flex: 1,
        minHeight: "350px",
        borderRadius: "20px",
        p: 2,
        backgroundColor: "#fdfdfd",
        backgroundImage:
          "linear-gradient(145deg, #ffffff, #f0f0f0), url('https://www.transparenttextures.com/patterns/white-diamond.png')",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        {title}
      </Typography>

      {/* Sortable List */}
      <SortableContext items={tasks.map((_, i) => `${id}-${i}`)} strategy={verticalListSortingStrategy}>
        <List sx={{ flexGrow: 1 }}>
          {tasks.map((task, index) => (
            <SortableTask
              key={`${id}-${index}`}
              id={`${id}-${index}`}
              task={task}
              onDelete={onDeleteTask}
            />
          ))}
        </List>
      </SortableContext>

      {/* Add Task Button */}
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => onAddTask(id)}
        sx={{ mt: "auto", borderRadius: "10px" }}
      >
        ➕ Add Task
      </Button>
    </Paper>
  );
}

// 🔹 Main Page
export default function TaskBoard() {
  const [containers, setContainers] = useState({
    todo: [
      "Buy groceries",
      "Finish project",
      "Read a book",
      "Plan a trip",
      "Clean the house",
      "Pay bills",
    ],
    done: [
      "Exercise",
      "Call a friend",
      "Water the plants",
      "Complete report",
      "Cook dinner",
      "Organize desk",
    ],
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ✅ Handle Drag End
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const [fromContainer, fromIndex] = active.id.split("-");
    const [toContainer, toIndex] = over.id.split("-");

    if (fromContainer === toContainer) {
      // Reorder inside the same list
      setContainers((prev) => ({
        ...prev,
        [fromContainer]: arrayMove(
          prev[fromContainer],
          parseInt(fromIndex),
          parseInt(toIndex)
        ),
      }));
    } else {
      // Move between containers
      setContainers((prev) => {
        const fromList = [...prev[fromContainer]];
        const toList = [...prev[toContainer]];
        const [movedItem] = fromList.splice(parseInt(fromIndex), 1);
        toList.splice(parseInt(toIndex), 0, movedItem);

        return {
          ...prev,
          [fromContainer]: fromList,
          [toContainer]: toList,
        };
      });
    }
  };

  // ✅ Add Task
  const handleAddTask = (containerId) => {
    const newTask = prompt("Enter new task:");
    if (newTask) {
      setContainers((prev) => ({
        ...prev,
        [containerId]: [...prev[containerId], newTask],
      }));
    }
  };

  // ✅ Delete Task
  const handleDeleteTask = (taskId) => {
    const [container, index] = taskId.split("-");
    setContainers((prev) => {
      const updated = { ...prev };
      updated[container] = prev[container].filter(
        (_, i) => i !== parseInt(index)
      );
      return updated;
    });
  };

  const totalTasks = containers.todo.length + containers.done.length;
  const completedPercent = Math.round(
    (containers.done.length / totalTasks) * 100
  );

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {/* ✅ Sidebar */}
        <Sidebar isSmallScreen={isMediumScreen} />

        {/* ✅ Main Content */}
        <Box
          sx={{
            flex: 1,
            px: isSmallScreen ? 2 : 4,
            py: 2,
            overflowY: "auto",
            width: "100%",
            background: `linear-gradient(120deg, #e1f5fe, #f8faff)`,
            backgroundImage: `url("https://www.transparenttextures.com/patterns/cartoon-clouds.png")`,
          }}
        >
          
          {/* Banner */}
<Paper
  elevation={10}
  sx={{
    width: "90%",              
    maxWidth: "2000px",       
    mx: "auto",                
    p: 3,
    mb: 4,
    borderRadius: "20px",
    background: "linear-gradient(to right, #42a5f5, #ae72e6ff)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <Typography variant="h4" fontWeight="bold">
    🎨 Creative Task Board
  </Typography>
  <Avatar
    src="https://cdn-icons-png.flaticon.com/512/3048/3048122.png"
    sx={{ width: 60, height: 60, border: "2px solid white" }}
  />
</Paper>

          {/* Task Containers */}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Box
              sx={{
                display: "flex",
                gap: 4,
                width: "100%",
                mb: 5,
                flexWrap: "wrap",
              }}
            >
              <DroppableContainer
                id="todo"
                title="📝 To Do"
                tasks={containers.todo}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
              <DroppableContainer
                id="done"
                title="✅ Done"
                tasks={containers.done}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
            </Box>
          </DndContext>

          {/* Progress & Motivation */}
          <Box
            sx={{
              width: "100%",
              mb: 4,
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* Progress */}
            <Paper
              elevation={6}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: "20px",
                background: "#fffaf0",
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/gplay.png')",
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={1}>
                📊 Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={completedPercent}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "#eee",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#42a5f5",
                  },
                }}
              />
              <Typography mt={2} color="text.secondary">
                {completedPercent}% completed
              </Typography>
            </Paper>

            {/* Motivation */}
            <Paper
              elevation={6}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #ffecb3, #ffe082)",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                💡 Daily Motivation
              </Typography>
              <Typography variant="body2" mt={1}>
                “Small progress each day adds up to big results!”
              </Typography>
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                sx={{
                  width: 80,
                  height: 80,
                  mt: 2,
                  mx: "auto",
                }}
              />
            </Paper>
          </Box>

          {/* Footer Icons */}
          <Stack
            direction="row"
            spacing={4}
            sx={{
              mt: "auto",
              pb: 2,
              justifyContent: "center",
              opacity: 0.8,
            }}
          >
            <Avatar src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" />
            <Avatar src="https://cdn-icons-png.flaticon.com/512/1864/1864514.png" />
            <Avatar src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
