import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import ListOverview from "./components/ListOverview";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ListOverview />
        <Footer />
      </div>
    );
  }
}

export default App;
