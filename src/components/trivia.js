import React, { Component } from "react";

class trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      isLoaded: false,
      triviaData: [],
      show: false,
      count: 1,
    };
  }

  componentDidMount() {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=30&type=multiple&encode=base64"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          triviaData: json,
        });
      });
  }

  handleClick() {
    this.setState({ show: true });
  }

  nextTrivia() {
    this.incrementCount();
  }

  incrementCount() {
    this.setState((state) => {
      return { count: state.count + 1 };
    });
  }

  isCorrect(ans) {
    var { triviaData, count } = this.state;
    if (atob(triviaData.results[count].correct_answer) === ans) {
      console.log("CORRECT");
    } else {
      console.log("SO MUCH WRONG");
      console.log(atob(triviaData.results[count].correct_answer));
      console.log(ans);
    }

    console.log("hello there");
  }

  displayTrivia() {
    var { isLoaded, triviaData, count } = this.state;

    if (isLoaded) {
      var firstQuestion = triviaData.results[count].question;
      var decodedStringAtoB = atob(firstQuestion);
    } else {
      console.log("waiting");
    }
    const tquestion = (
      <div>
        <p>{decodedStringAtoB}</p>
      </div>
    );
    return tquestion;
  }

  displayTriviaA() {
    var { isLoaded, triviaData, count } = this.state;
    if (isLoaded) {
      var firstAnswer = atob(triviaData.results[count].correct_answer);
      var secondAnswer = atob(triviaData.results[count].incorrect_answers[0]);
      var thirdAnswer = atob(triviaData.results[count].incorrect_answers[1]);
      var fourthAnswer = atob(triviaData.results[count].incorrect_answers[2]);

      function shuffle(arry) {
        arry.sort(() => Math.random() - 0.5);
      }
      let answerArr = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];
      shuffle(answerArr);
      const tAnswers = (
        <div>
          <button
            class="button button1"
            onClick={() => this.isCorrect(answerArr[0])}
          >
            A. {answerArr[0]}
          </button>
          <button
            class="button button1"
            onClick={() => this.isCorrect(answerArr[1])}
          >
            B. {answerArr[1]}
          </button>
          <button
            class="button button1"
            onClick={() => this.isCorrect(answerArr[2])}
          >
            C. {answerArr[2]}
          </button>
          <button
            class="button button1"
            onClick={() => this.isCorrect(answerArr[3])}
          >
            D. {answerArr[3]}
          </button>
        </div>
      );
      return tAnswers;
    } else {
      console.log("waiting");
    }
  }

  render() {
    var { triviaData, isLoaded, show, count } = this.state;
    console.log(triviaData.results);

    const question = this.displayTrivia();
    const answer = this.displayTriviaA();
    const questionBox = (
      <div id="trivia">
        <p id="trivia">QUESTION {count} </p>
        <p>{question}</p>
        <p id="trivia">CHOOSE YOUR ANSWER</p>
        <p>{answer}</p>
      </div>
    );
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <body>
          <div id="trivia">
            <button class="button button1" onClick={() => this.handleClick()}>
              Start Trivia
            </button>
            <button class="button button1" onClick={() => this.nextTrivia()}>
              Next Question
            </button>
          </div>
          <p>Question</p>
          {isLoaded && show ? questionBox : null}

          <p>Enter your Answer</p>

          <button>SUBMIT</button>
        </body>
      );
    }
  }
}

export default trivia;

/*<ul>
            DATA HAS BEEN LOADED
            {triviaData.results.map((item) => (
              <li key={item.id}>
                Question: {item.question} | Answer: {item.correct_answer} |{" "}
                {item.id}
              </li>
            ))}
            ;
          </ul>*/
