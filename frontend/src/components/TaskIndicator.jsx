import React from "react";
import { NavLink } from "react-router-dom";

const styles = {
  textDecoration: "none",
  color:"#171717",
  fontWeight: "bold",
  backgroundColor: "transparent"
};

function TaskIndicator() {
  return (
    <div className=" flex-grow">
      <nav>
        <ul className="flex gap-3 justify-between p-3 bg-slate-400 rounded-lg shadow-2xl">
          <li>
            <NavLink to="/" style={styles}>
              All Task
            </NavLink>
          </li>
          <li>
            <NavLink to="/active" style={styles}>
              Active
            </NavLink>
          </li>
          <li>
            <NavLink to="/completed" style={styles}>
              Completed
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TaskIndicator;
