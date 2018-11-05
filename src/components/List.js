import React from "react";

function ListComponent(props) {
  return (
    <div className="list-item">
      <button
        onClick={props.onClick}
        className={props.isDone ? "green" : "red"}
      >
        {props.isDone ? "✔" : "X"}
      </button>
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
        DEL
      </button>
    </div>
  );
}

class List extends React.Component {
  constructor(props) {
    super(props);

    //das im Constructor zu lösen ist wahrscheinlich sehr unschön :D
    let storedListOfItems = JSON.parse(localStorage.getItem("toDoListItems"));
    if (storedListOfItems) {
      this.state = {
        listOfItems: [...storedListOfItems]
      };
    } else {
      this.state = {
        listOfItems: [{ title: "Leg dein erstes ToDo an! :)", isDone: false }]
      };
    }

    this.addItem = this.addItem.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.toggleIsDone = this.toggleIsDone.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  changeTitle(index, newTitle) {
    let prevListOfItems = [...this.state.listOfItems];
    prevListOfItems[index].title = newTitle;
    this.setState({
      listOfItems: prevListOfItems
    });
  }

  toggleIsDone(index) {
    let prevListOfItems = [...this.state.listOfItems];
    prevListOfItems[index].isDone = !prevListOfItems[index].isDone;
    this.setState({
      listOfItems: prevListOfItems
    });
    this.sortListOfItems();
  }

  addItem() {
    this.setState({
      listOfItems: [...this.state.listOfItems, { title: "", isDone: false }]
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      "toDoListItems",
      JSON.stringify(this.state.listOfItems)
    );
  }

  sortListOfItems() {
    let sortedList = this.state.listOfItems.sort(item => {
      return item.isDone ? 1 : -1;
    });
    this.setState({
      listOfItems: [...sortedList]
    });
  }

  deleteToDo(index) {
    let copyOfList = [...this.state.listOfItems];
    copyOfList.splice(index, 1);
    this.setState({
      listOfItems: copyOfList
    });
  }

  render() {
    return (
      <div>
        {this.state.listOfItems.map((item, i) => (
          <ListComponent
            title={item.title}
            isDone={item.isDone}
            key={i}
            index={i}
            onClick={() => this.toggleIsDone(i)}
            changeTitle={this.changeTitle}
            deleteToDo={this.deleteToDo}
          />
        ))}

        <button onClick={this.addItem} className="add-button">
          Add Item
        </button>
      </div>
    );
  }
}

export default List;
