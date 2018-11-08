import React from "react";

function ListEntry(props) {
  return (
    <div className={props.showItem}>
      <button
        onClick={props.onClick}
        className={
          if(props.showCheckButton) {
            if({props.isDone}) {
              return "todo-done";
            }else {
              return "todo-pending";
            }
          }

          }
      />
      <form>
        <input
          type="text"
          value={props.title}
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

export default ListEntry;
