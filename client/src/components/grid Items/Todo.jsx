import React from "react";
import Dragger from "./Dragger";

const Todo = () => {
  return (
    <div>
      <div className="overflow-x-auto overflow-y-auto max-w-full max-h-full">
        <table className="table w-full">
          {/* head */}

          <thead>
            <tr>
              <th>
                <Dragger />
              </th>
              <th>Task</th>
              <th>Importance</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>
                <textarea className="textarea textarea-ghost text-xl handwriting-font"></textarea>
              </td>
              <td>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star-2 bg-green-400"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star-2 bg-lime-400"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star-2 bg-yellow-400"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star-2 bg-red-400"
                  />
                </div>
              </td>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>
                <textarea className="textarea textarea-ghost text-xl handwriting-font"></textarea>
              </td>
              <td>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-green-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-lime-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-red-400"
                  />
                </div>
              </td>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>
                <textarea className="textarea textarea-ghost text-xl handwriting-font"></textarea>
              </td>
              <td>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star-2 bg-green-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star-2 bg-lime-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star-2 bg-yellow-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star-2 bg-red-400"
                  />
                </div>
              </td>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
