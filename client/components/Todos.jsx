import { useState, useEffect, useRef } from "react";
function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [dataChanged, setDataChanged] = useState(false);
  const [showEdit, setShowEdit] = useState({ id: 0, show: false });
  const [edited, setEdited] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let currentId = currentUser.id;
  let apiUrl = `http://localhost:3000/todos/${currentId}`;
  let allTodos = useRef("");
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);

        setTodos(data);
        allTodos.current = data;
      });
  }, [dataChanged, currentId, apiUrl]);

  function handleCheck(todoId) {
    fetch(`http://localhost:3000/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        completed:
          todos.find((todo) => todo.id === todoId).completed === 1 ? 0 : 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });

        setTodos(updatedTodos);
      })
      .catch((error) => {
        alert("error:", error);
      });
  }

  function addTodo() {
    console.log("newtodo: ", newTodo);
    const newTodoObj = {
      user_id: currentId,
      title: newTodo,
      completed: 0,
      is_active: 1,
    };

    console.log("newTodoObj: ", newTodoObj);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodoObj),
    };
    fetch("http://localhost:3000/todos", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response;
      })
      //   .then((response) => response.json())
      .then(() => {
        console.log("entered");
        setDataChanged((prev) => !prev);
        console.log(dataChanged);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function sortTodos(value) {
    setSort(value);
    if (value === "alphabetically") {
      let sorted = todos.sort((a, b) => (a.title > b.title ? 1 : -1));
      console.log("sorted: ", sorted);
      setTodos(sorted);
    } else if (value === "completed") {
      let sorted = todos.sort((a, b) => (a.completed > b.completed ? 1 : -1));
      setTodos(sorted);
    } else if (value === "id") {
      let sorted = todos.sort((a, b) => (a.id > b.id ? 1 : -1));
      setTodos(sorted);
    }
  }

  function handleFilter(filter) {
    if (filter == "completed") {
      let filtered = todos.filter((todo) => todo.completed);
      setTodos(filtered);
    } else if (filter == "not completed") {
      {
        let filtered = todos.filter((todo) => todo.completed === false);
        setTodos(filtered);
      }
    } else {
      {
        let filtered = todos.filter((todo) => todo.title === filter);
        setTodos(filtered);
      }
    }
  }
  function clearFilter() {
    setTodos(allTodos.current);
  }

  function handeDelete(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("error accoured");
        return res;
      })
      .then(() => {
        setDataChanged((prev) => !prev);
      })

      .catch((err) => {
        console.log(err);
      });
  }
  function handleShowEdit(id) {
    setShowEdit((prev) => ({ id: id, show: !prev.show }));
  }
  function handleEdit(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: edited }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("error accoured");
        setDataChanged((prev) => !prev);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>todos</h1>
      <select value={sort} onChange={(e) => sortTodos(e.target.value)}>
        <option>sort by</option>
        <option value="id">id</option>
        <option value="alphabetically">alphabetically</option>
        <option value="completed">completed</option>
      </select>
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <button type="button" onClick={() => handleFilter(filter)}>
        filter by
      </button>
      <button onClick={clearFilter}>clear filter</button>

      <br></br>
      <ul style={{ textAlign: "left" }}>
        {todos
          .filter((todo) => todo.is_active === 1)
          .map((todo) => (
            <li key={todo.id}>
              <label>
                {todo.id}
                <input
                  type="checkbox"
                  value={todo.id}
                  checked={todo.completed}
                  onChange={() => {
                    handleCheck(todo.id);
                  }}
                />
                {todo.title}
              </label>
              <button onClick={() => handeDelete(todo.id)}>delete</button>
              <button onClick={() => handleShowEdit(todo.id)}>edit</button>
              {showEdit.id === todo.id && showEdit.show == true && (
                <>
                  <input
                    name="title"
                    onChange={(e) => {
                      setEdited(e.target.value);
                    }}
                  ></input>
                  <button onClick={() => handleEdit(todo.id)}>change</button>
                </>
              )}
            </li>
          ))}
      </ul>
      <label>
        <input
          onBlur={(e) => {
            setNewTodo(e.target.value);
            console.log(newTodo);
          }}
        />
        <button onClick={addTodo}>add todo</button>
      </label>
    </div>
  );
}

export default Todos;
