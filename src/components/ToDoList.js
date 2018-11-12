import React from "react";
import ListEntry from "./ListEntry";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfItems: this.createListOfItems(props.storageID)
    };

    this.createListOfItems = this.createListOfItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.toggleIsDone = this.toggleIsDone.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.sortListOfItems = this.sortListOfItems.bind(this);
    this.hideDoneItems = this.hideDoneItems.bind(this);
    this.showDoneitems = this.showDoneitems.bind(this);
    this.hiddenItemExists = this.hiddenItemExists.bind(this);
    this.allowSort = this.allowSort.bind(this);
  }

  createListOfItems(storageID) {
    let storedListOfItems = JSON.parse(localStorage.getItem(storageID));
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
      listOfItems: doneItemsNotListed
    });
  }

  showDoneitems() {
    let doneItemsListed = this.state.listOfItems.map(item => {
      item.show = true;
      return item;
    });

    this.setState({
      listOfItems: doneItemsListed
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.storageID,
      JSON.stringify(this.state.listOfItems)
    );
  }

  getHiddenItems() {
    return this.state.listOfItems.find(todo => {
      return !todo.show;
    });
  }

  getDoneItems() {
    return this.state.listOfItems.find(todo => {
      return todo.isDone;
    });
  }

  getDoneButShownItems() {
    return this.state.listOfItems.find(todo => {
      return todo.isDone && todo.show;
    });
  }

  hiddenItemExists() {
    return this.getHiddenItems() && !this.getDoneButShownItems();
  }

  allowSort() {
    return this.getDoneButShownItems();
  }

  allowHide() {
    return this.getDoneItems();
  }

  render() {
    return (
      <div>
        <h1> {this.props.title} </h1>
        <button
          onClick={this.allowSort() ? this.sortListOfItems : null}
          className={this.allowSort() ? "standard-button" : "hide"}
        >
          Sort List
        </button>

        <button
          onClick={
            this.hiddenItemExists() ? this.showDoneitems : this.hideDoneItems
          }
          className={this.allowHide() ? "standard-button" : "hide"}
        >
          {this.hiddenItemExists() ? "Show Done" : "Hide Done"}
        </button>

        {this.state.listOfItems.map((item, i) => (
          <ListEntry
            title={item.title}
            isDone={item.isDone}
            key={i}
            index={i}
            onClickCheckButton={() => this.toggleIsDone(i)}
            changeTitle={this.changeTitle}
            deleteToDo={this.deleteToDo}
            showItem={item.show ? "list-item" : "hide"}
            showCheckButton={true}
            chooseToDoList={false}
          />
        ))}

        <button onClick={this.addItem} className="standard-button">
          Add Item
        </button>
      </div>
    );
  }
}

export default ToDoList;
