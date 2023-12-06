// import { useState } from "react";
// function Todos() {
//   let currentId;

//   const [todos, setTodos] = useState([]);
//   const [search, setSearch] = useState("");
//   const [newTodo, setNewTodo] = useState("");
//   const [sort, setSort] = useState("");
//   const [clickSearch, setClickSearch] = useState(false);
//   let currUser = JSON.parse(localStorage.getItem("currUser"));

//   currentId = currUser.id;

//   function fetchTodos()
//     let apiUrl = `http://localhost:3000/todos?userId=${currentId}`;
//     fetch(apiUrl)
//       .then((res) => res.json())
//       .then((data) => {
//         setTodos(data);
//         allTodos.current = data;
//       });

//   return (
//     <div>
//       <h1>todos</h1>
//       <br></br>
//       <label>
//         <input
//           onChange={(e) => {
//             setNewTodo(e.target.value);
//           }}
//         />
//         <button onClick={addTodo}>add todo</button>
//       </label>
//       <ul style={{ textAlign: "left" }}>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <label>
//               {todo.id}
//               <input
//                 type="checkbox"
//                 value={todo.id}
//                 checked={todo.completed}
//                 onChange={() => {
//                   handleCheck(todo.id);
//                 }}
//               />
//               {todo.title}
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Todos;
