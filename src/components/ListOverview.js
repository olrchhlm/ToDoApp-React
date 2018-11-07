import React from "react";
import List from "./List";

class ListOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //timestamp als ID hinzufügen, damit alles im speicher wiedergefunden werden kann
      toDoLists: [
        {
          title: "Einkaufsliste",
          color: "blue",
          clicked: true,
          id: Date.now()
        },
        {
          title: "Packliste",
          color: "red",
          clicked: true,
          id: 1541522142967
        }
      ]
    };

    this.addToDoList = this.addToDoList.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  addToDoList() {
    let timeStamp = Date.now();
    this.setState({
      toDoLists: [
        ...this.state.toDoLists,
        { title: "", color: "red", clicked: false, id: timeStamp }
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

  render() {
    return (
      <div className="layout">
        <div>
          <h1> Listenübersicht</h1>
          <form className="list-overview">
            {this.state.toDoLists.map((list, i) => {
              return (
                <input
                  type="text"
                  // onClick={() =>
                  //   console.log("hier muss die Listenauswahl geschehen")
                  // }
                  value={list.title}
                  key={i}
                  index={i}
                  onChange={event => this.handleInput(i, event.target.value)}
                />
              );
            })}
          </form>
          <button className="standard-button" onClick={this.addToDoList}>
            Add List
          </button>
        </div>
        <div>
          {this.state.toDoLists.map((list, i) => {
            if (list.clicked) {
              return <List title={list.title} key={i} index={i} />;
            }
          })}
        </div>
      </div>
    );
  }
}

export default ListOverview;
