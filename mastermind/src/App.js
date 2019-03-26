import React, { Component } from "react";
import { Button, Modal, Jumbotron, Table } from "react-bootstrap";

import "./App.css";

const numberGenerator = () => {
  return Math.floor(Math.random() * 100);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.guessHandler = this.guessHandler.bind(this);

    this.state = {
      userAnswer: undefined,
      answer: undefined,
      show: false,
      guesses: []
    };
  }

  componentDidMount() {
    this.playAgain();
  }

  render() {
    return (
      <div class="justify-content-md-center pageBody">
        <h1>my number is between (0-100), try guessing!</h1>
        <Jumbotron className="inputView">
          <input
            placeholder="your guess"
            onChange={e => this.setState({ userAnswer: e.target.value })}
          />
          <Button
            variant="info"
            onClick={() => {
              this.checkAnswer(this.state.userAnswer);
              this.guessHandler(this.state.userAnswer);
            }}
          >
            submit your answer
          </Button>

          {this.state.hint}
        </Jumbotron>
        {/* <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>guess</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{id}</th>
              <th>{}</th>
            </tr>
          </tbody>
        </Table> */}
        <ul>{this.itemList}</ul>
        <Modal show={this.state.show}>
          <p>YOU WIN</p>
          <Button
            variant="success"
            onClick={() => {
              this.playAgain();
              this.handleToggle();
            }}
          >
            Play again!
          </Button>
        </Modal>
      </div>
    );
  }

  playAgain() {
    const answer = numberGenerator();
    console.log(answer);
    this.setState({ answer, userAnswer: undefined });
  }

  handleToggle = () => {
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  };

  setHint(id) {
    let options = ["higher", "lower"];
    this.setState({
      hint: options[id]
    });
  }

  guessHandler = userAnswer => {
    const newGuesses = [...this.state.guesses, userAnswer];
    this.setState({ guesses: newGuesses });
    const itemList = this.state.guesses.map(item => <li>{item}</li>);
    console.log(this.state.guesses);
    return itemList;
  };

  checkAnswer = userAnswer => {

    if (this.state.answer === Number(userAnswer)) {
      this.handleToggle();
    } else if (this.state.answer > Number(userAnswer)) {
      this.setHint(0);
    } else if (this.state.answer < Number(userAnswer)) {
      this.setHint(1);
    }
  };
}

export default App;
