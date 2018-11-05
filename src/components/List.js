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
      listOfItems: [...this.state.listOfItems, { title: "", isDone: false }]
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
        {this.state.listOfItems.map((item, i) => (
          <ListComponent
            title={item.title}
            isDone={item.isDone}
            key={i}
            index={i}
            onClick={() => this.toggleIsDone(i)}
            changeTitle={this.changeTitle}
          />
        ))}

        <button onClick={this.addItem} className="add-button">
          Add Item
        </button>
      </div>
    );
  }
}

// for(var i = 0; i < this.state.listOfItems.length; i++) {
//   <ListComponent name="i" />
// }

export default List;
