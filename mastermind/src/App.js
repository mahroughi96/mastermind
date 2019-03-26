import React, { Component } from "react";
import { Button, Modal, Jumbotron } from "react-bootstrap";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.numberGenerator = this.numberGenerator.bind(this);

    this.state = {
      userAnswer: "",
      answer: this.numberGenerator(),
      show: false
    };
  }

  render() {
    return (
      <div className="pageBody">
        <h1>my number is between (0-100), try guessing!</h1>
        <Jumbotron className="inputView">
          <input
            placeholder="your guess"
            onChange={e => this.setState({ userAnswer: e.target.value })}
            value={this.state.userAnswer}
          />
          <Button variant="outline-info" onClick={this.checkAnswer(this)}>
            submit your answer
          </Button>
        </Jumbotron>
        <Modal show={this.state.show}>
          <p>YOU WIN</p>
          <Button onClick={this.numberGenerator}>Play again!</Button>
        </Modal>
        <h2 show={this.state.show}>{this.hint}</h2>
      </div>
    );
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showHint = () => {
    let hint = "";
    this.setState({ show: true });
    if (this.props === 1) {
      hint = "go higher";
    } else if (this.props === -1) {
      hint = "go lower";
    }
    return hint;
  };

  numberGenerator() {
    this.answer = Math.floor(Math.random() * 100);
    console.log("answer generated: ", this.answer);
    return this.answer;
    
  }

  checkAnswer(userAnswer) {
    console.log(userAnswer);
    if (this.answer === Number(userAnswer)) {
      console.log("hooooray");
    } else if (this.answer > Number(userAnswer)) {
      this.showHint(1);
    } else if (this.answer < Number(userAnswer)) {
      this.showHint(-1);
    }
  }
}

export default App;
