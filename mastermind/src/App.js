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
      message: undefined,
      buttonMsg: undefined,
      hint: "GO!",
      guesses: []
    };
  }

  componentDidMount() {
    this.playAgain();
  }

  resetUserAnswer = () => this.setState({ userAnswer: "" });
  resetGuesses = () => this.setState({ guesses: [] });
  resetAnswer = number => this.setState({ answer: number });

  playAgain() {
    const answer = numberGenerator();
    console.log(answer);
    this.resetUserAnswer();
    this.resetGuesses();
    this.resetAnswer(answer);
  }

  handleToggle = (message, buttonMsg) => {
    this.setState(prevState => {
      return {
        show: !prevState.show,
        message: message,
        buttonMsg: buttonMsg
      };
    });
  };

  guessHandler = userAnswer => {
    if (userAnswer) {
      this.setState({
        guesses: [
          ...this.state.guesses,
          {
            id: this.state.guesses.length + 1,
            guess: userAnswer
          }
        ]
      });
      if (this.state.guesses.length > 10) {
        this.handleToggle("you idiot");
      }
    }
  };

  checkAnswer = userAnswer => {
    if (userAnswer) {
      if (this.state.answer === Number(userAnswer)) {
        this.handleToggle(" You Win! ");
      } else if (this.state.answer > Number(userAnswer)) {
        this.setState({ hint: "Higher" });
        return false;
      } else if (this.state.answer < Number(userAnswer)) {
        this.setState({ hint: "Lower" });
      }
    } else {
      this.handleToggle("bi pedar vared kon bad!", "ok!");
    }
  };

  MyModal = ({
    message,
    show,
    buttonMsg = "Play again!"
  }) => {
    if (buttonMsg === "ok!") {
      return (
        <Modal show={show}>
          <p>{message}</p>
          <Button
            class="m"
            variant="warning"
            onClick={() => this.handleClick(1)}
          >
            {buttonMsg}
          </Button>
        </Modal>
      );
    } else {
      return (
        <Modal show={show}>
          <p>{message}</p>
          <Button class="m" variant="success" onClick={() => this.handleClick()}>
            {buttonMsg}
          </Button>
        </Modal>
      );
    }
  };

  handleClick = status => {
    if (status) {
      this.handleToggle();
    } else {
      this.playAgain();
      this.handleToggle();
    }
  };

  render() {
    const { userAnswer, hint, show, message, buttonMsg } = this.state;
    const itemList = this.state.guesses.map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.guess}</td>
      </tr>
    ));

    return (
      <div class="col-lg">
        <div class="m">
          <h2>my number is between (0-100), try guessing!</h2>
        </div>
        <div class="pageBody">
          <Jumbotron className="inputView">
            <input
              placeholder="your guess"
              onChange={e => this.setState({ userAnswer: e.target.value })}
              value={this.state.userAnswer}
            />
            <Button
              class="m"
              variant="info"
              onClick={() => {
                this.checkAnswer(userAnswer);
                this.guessHandler(userAnswer);
                this.resetUserAnswer();
              }}
            >
              submit
            </Button>

            <h3>{hint}</h3>
          </Jumbotron>
          <Table class="my-table">
            <thead>
              <tr>
                <th>#</th>
                <th>guess</th>
              </tr>
            </thead>
            <tbody>{itemList}</tbody>
          </Table>
        </div>

        <this.MyModal message={message} show={show} buttonMsg={buttonMsg} />
      </div>
    );
  }
}

export default App;
