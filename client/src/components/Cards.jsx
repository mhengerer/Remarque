import React from "react";

const Card = () => {
  return (
    <div className="card card-compact w-full h-full bg-base-100 shadow-xl">
      <h2>List</h2>
      <div className="card-body">
        <textarea
          type="text"
          placeholder="Type here"
          className="flex textarea textarea-bordered h-full w-full"
        />
      </div>
    </div>
  );
};

const Table = () => {
  return (
    <div className="overflow-x-auto">
        <table className="table w-full">
          
        </table>
      </div>
  );
};

const Todo = () => {
    return (
        <div className="overflow-x-auto overflow-y-auto max-w-full max-h-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Importance</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td><textarea className="textarea textarea-ghost"></textarea></td>
              <td><div className="rating">
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-green-400" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-lime-400" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-red-400" />
              </div></td>
              <td><input type="checkbox" className="checkbox" /></td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td><textarea className="textarea textarea-ghost"></textarea></td>
              <td><div className="rating">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-green-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-lime-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-red-400" />
              </div></td>
              <td><input type="checkbox" className="checkbox" /></td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td><textarea className="textarea textarea-ghost"></textarea></td>
              <td><div className="rating">
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-green-400" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-lime-400" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-red-400" />
              </div></td>
              <td><input type="checkbox" className="checkbox" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

export { Card, Table, Todo };
