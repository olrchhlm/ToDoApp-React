import React from "react";
import ListComponent from "./ListComponent";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfItems: this.createListOfItems(),
      hideDoneActive: false
    };

    this.createListOfItems = this.createListOfItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.toggleIsDone = this.toggleIsDone.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.sortListOfItems = this.sortListOfItems.bind(this);
    this.hideDoneItems = this.hideDoneItems.bind(this);
    this.showDoneitems = this.showDoneitems.bind(this);
  }

  createListOfItems() {
    let storedListOfItems = JSON.parse(localStorage.getItem("toDoListItems"));
    if (storedListOfItems) {
      return [...storedListOfItems];
    } else {
      return [
        { title: "Leg dein erstes ToDo an! :)", isDone: false, show: true }
      ];
    }
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

  componentDidUpdate() {
    localStorage.setItem(
      "toDoListItems",
      JSON.stringify(this.state.listOfItems)
    );
  }

  render() {
    return (
      <div>
        <h1> {this.props.title} </h1>
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
