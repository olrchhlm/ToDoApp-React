import React from "react";

//irgendwie ging das hier noch nichit...

function ListComponent(props) {
  return (
    <div>
      <button> check </button>
      <form>
        <input type="text" name={props.itemNumber} />
      </form>
    </div>
  );
}
