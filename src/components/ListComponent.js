import React from "react";

function ListComponent(props) {
  return (
    <div className={props.showItem}>
      <button
        onClick={props.onClick}
        className={props.isDone ? "todo-done" : "todo-pending"}
      />
      <form>
        <input
          type="text"
          value={props.title}
          placeholder={props.title}
          onChange={event => props.changeTitle(props.index, event.target.value)}
        />
      </form>
      <button
        className="remove-button"
        onClick={() => props.deleteToDo(props.index)}
      >
        X
      </button>
    </div>
  );
}

export default ListComponent;
