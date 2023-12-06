import { useState, useEffect } from "react";
function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [dataChanged, setDataChanged] = useState(false);
  const [showEdit, setShowEdit] = useState({ id: 0, show: false });
  const [edited, setEdited] = useState("");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let currentId = currentUser.id;

  useEffect(() => {
    fetch(`http://localhost:3000/todos/${currentId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);

        setTodos(data);
      });
  }, [dataChanged, currentId]);

  function handleCheck(todoId) {
    fetch(`http://localhost:3000/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        completed: !todos.find((todo) => todo.id === todoId).completed,
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
