// eslint-disable-next-line no-unused-vars
import react from "react";
import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
export default function Todolist() {
  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0)
      setTodos(
        todos.filter(
          (todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    else alert("Select row first");
  };

  const columns = [
    {
      headername: "Description",
      field: "description",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headername: "Date",
      field: "date",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headername: "Priority",
      field: "priority",
      sortable: true,
      filter: true,
      floatingFilter: true,

      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
  ];

  return (
    <div style={{ width: "50%", height: "700px", margin: "auto" }}>
      <input
        type="text"
        onChange={inputChanged}
        placeholder="Description"
        name="description"
        value={todo.description}
      />
      <input
        type="date"
        onChange={inputChanged}
        placeholder="Date"
        name="date"
        value={todo.date}
      />
      <input
        type="text"
        onChange={inputChanged}
        placeholder="Priority"
        name="priority"
        value={todo.priority}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div
        className="ag-theme-material"
        style={{ width: "80%", height: "700px", margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
          animateRows="true"
          rowHeight="50 px"
        />
      </div>
    </div>
  );
}
