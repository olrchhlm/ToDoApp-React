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

  render() {
    return (
      <div className="layout">
        <div>
          <h1> Listenübersicht</h1>
          <ul>
            {this.state.toDoLists.map(list => {
              return <li> {list.title} </li>;
            })}
          </ul>
        </div>
        <div>
          {this.state.toDoLists.map(list => {
            console.log(this.state.toDoLists);
            if (list.clicked) {
              return <List title={list.title} />;
            }
          })}
        </div>
      </div>
    );
  }
}

export default ListOverview;
