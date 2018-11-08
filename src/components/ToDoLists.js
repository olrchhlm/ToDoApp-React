import React from "react";
import ToDoList from "./ToDoList";

class ToDoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoLists: this.createListOfItems()
    };

    this.addToDoList = this.addToDoList.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.createListOfItems = this.createListOfItems.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  createListOfItems() {
    let storedListOfItems = JSON.parse(localStorage.getItem("ToDoLists"));
    if (storedListOfItems) {
      return [...storedListOfItems];
    } else {
      let timeStamp = Date.now();
      return [
        {
          title: "Erste ToDo-Liste",
          color: "red",
          show: true,
          storageID: timeStamp
        }
      ];
    }
  }

  addToDoList() {
    let timeStamp = Date.now();
    this.setState({
      toDoLists: [
        ...this.state.toDoLists,
        { title: "", color: "red", show: false, storageID: timeStamp }
      ]
    });
  }

  handleInput(index, input) {
    let newValue = [...this.state.toDoLists];
    newValue[index].title = input;
    this.setState({
      toDoLists: newValue
    });
  }

  showList(indexToShow) {
    let updatedView = [...this.state.toDoLists];
    updatedView.map((list, i) => {
      indexToShow === i ? (list.show = true) : (list.show = false);
    });
    this.setState({
      toDoLists: updatedView
    });
  }

  componentDidUpdate() {
    localStorage.setItem("ToDoLists", JSON.stringify(this.state.toDoLists));
  }

  deleteToDo(index) {
    let copyOfList = [...this.state.toDoLists];
    copyOfList.splice(index, 1);
    this.setState({
      toDoLists: copyOfList
    });
  }

  render() {
    return (
      <div className="layout">
        <div className="spacing-right">
          <h1> Listenübersicht </h1>
          <div>
            {this.state.toDoLists.map((list, i) => {
              return (
                <div className="list-item">
                  <form className="list-overview">
                    <input
                      type="text"
                      onClick={() => this.showList(i)}
                      value={list.title}
                      key={i}
                      index={i}
                      onChange={event =>
                        this.handleInput(i, event.target.value)
                      }
                    />
                  </form>
                  <button
                    className="remove-button"
                    onClick={() => this.deleteToDo(i)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>

          <button className="standard-button" onClick={this.addToDoList}>
            Add List
          </button>
        </div>
        <div className="spacing-right">
          {this.state.toDoLists.map((list, i) => {
            if (list.show) {
              return (
                <ToDoList
                  title={list.title}
                  key={i}
                  index={i}
                  storageID={list.storageID}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default ToDoLists;
