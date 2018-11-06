import React from "react";

function ListComponent(props) {
  return (
    <div className={props.showItem}>
      <button
        onClick={props.onClick}
        className={props.isDone ? "todo-done" : "todo-pending"}
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
        listOfItems: [...storedListOfItems],
        hideDoneActive: false
      };
    } else {
      this.state = {
        listOfItems: [
          { title: "Leg dein erstes ToDo an! :)", isDone: false, show: true }
        ]
      };
    }

    this.addItem = this.addItem.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.toggleIsDone = this.toggleIsDone.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.sortListOfItems = this.sortListOfItems.bind(this);
    this.hideDoneItems = this.hideDoneItems.bind(this);
    this.showDoneitems = this.showDoneitems.bind(this);
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
  }

  addItem() {
    this.setState({
      listOfItems: [
        ...this.state.listOfItems,
        { title: "", isDone: false, show: true }
      ]
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

  hideDoneItems() {
    let doneItemsNotListed = this.state.listOfItems.map(item => {
      item.isDone ? (item.show = false) : (item.show = true);
      return item;
    });

    this.setState({
      listOfItems: doneItemsNotListed,
      hideDoneActive: true
    });
  }

  showDoneitems() {
    let doneItemsListed = this.state.listOfItems.map(item => {
      item.show = true;
      return item;
    });

    this.setState({
      listOfItems: doneItemsListed,
      hideDoneActive: false
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.sortListOfItems} className="standard-button">
          Sort List
        </button>
        <button
          onClick={
            this.state.hideDoneActive ? this.showDoneitems : this.hideDoneItems
          }
          className="standard-button"
        >
          {this.state.hideDoneActive ? "Show Done" : "hide Done"}
        </button>

        {this.state.listOfItems.map((item, i) => (
          <ListComponent
            title={item.title}
            isDone={item.isDone}
            key={i}
            index={i}
            onClick={() => this.toggleIsDone(i)}
            changeTitle={this.changeTitle}
            deleteToDo={this.deleteToDo}
            showItem={item.show ? "list-item" : "hide"}
          />
        ))}

        <button onClick={this.addItem} className="standard-button">
          Add Item
        </button>
      </div>
    );
  }
}

export default List;
