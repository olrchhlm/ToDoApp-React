import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import ToDoLists from "./components/ToDoLists";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ToDoLists />
        <Footer />
      </div>
    );
  }
}

export default App;
