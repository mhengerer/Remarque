import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos]);
  };

  return (
    <div className="card card-compact card-bordered overflow-x-auto overflow-y-auto w-full h-full bg-base-100 shadow-xl rounded-xl">
      <table className="table">
        {/* head */}
        <thead className="">
          <tr className="">
            <th className="justify-start">Complete</th>
            <th>Today's To-Dos</th>
            <th className="justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path fill="" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {/* row 1 */}
          {/* For each entry in the weekday planner, make table row autofilled with data. */}
          <tr className="h-24">
            <td>
              <input type="checkbox" className="checkbox justify-start" />
            </td>
            <td>
              <input className="textarea textarea-ghost input text-m handwriting-font border-ghost"></input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
