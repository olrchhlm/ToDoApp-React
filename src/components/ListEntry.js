import React from "react";

class ListEntry extends React.Component {
  getCheckButtonClass() {
    if (!this.props.showCheckButton) {
      return "hide";
    }

    return this.props.isDone ? "todo-done" : "todo-pending";
  }

  getOnClickActionForm() {
    if (this.props.chooseToDoList) {
      return () => this.props.chooseToDoList(this.props.index);
    }
  }

  render() {
    return (
      <div className={this.props.showItem}>
        <button
          onClick={this.props.onClickCheckButton}
          className={this.getCheckButtonClass(this.props)}
        />
        <form>
          <input
            onClick={this.getOnClickActionForm()}
            type="text"
            value={this.props.title}
            onChange={event =>
              this.props.changeTitle(this.props.index, event.target.value)
            }
          />
        </form>
        <button
          className="remove-button"
          onClick={() => this.props.deleteToDo(this.props.index)}
        >
          X
        </button>
      </div>
    );
  }
}

export default ListEntry;
