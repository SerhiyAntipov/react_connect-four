import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playingField: Array(42).fill(null),
      count: 0,
      reset: '',
      winner: ''
    };
    // this.field = [
    //   [0, 1, 2, 3, 4, 5, 6],
    //   [7, 8, 9, 10, 11, 12, 13],
    //   [14, 15, 16, 17, 18, 19, 20],
    //   [21, 22, 23, 24, 25, 26, 27],
    //   [28, 29, 30, 31, 32, 33, 34],
    //   [35, 36, 37, 38, 39, 40, 41]
    // ];
    this.winnerLine = [];
    this.winnerDiagonalLeft = [0, 1, 2, 3, 7, 8, 9, 10, 14, 15, 16, 17];
    this.winnerDiagonalRight = [3, 4, 5, 6, 10, 11, 12, 13, 17, 18, 19, 20];
  }
  calcWinnerline = () => {
    let winnerAllAray = [];
    for (let i = 0; i < 42; i++) {
      winnerAllAray.push(i);
    }
    // horizontal lines
    for (let i = 0; i < winnerAllAray.length; i++) {
      if (i + 4 <= winnerAllAray.length) {
        this.winnerLine.push(winnerAllAray.slice(i, i + 4))
      }
    }

    // vertical lines
    for (let i = 0; i < winnerAllAray.length; i++) {
      if (i + 21 < winnerAllAray.length) {
        this.winnerLine.push([i, i + 7, i + 14, i + 21]);
      }
    }

    for (let i = 0; i < this.winnerDiagonalLeft.length; i++) {
      this.winnerLine.push([this.winnerDiagonalLeft[i], this.winnerDiagonalLeft[i] + 8, this.winnerDiagonalLeft[i] + 16, this.winnerDiagonalLeft[i] + 24]);
    }

    for (let i = 0; i < this.winnerDiagonalRight.length; i++) {
      this.winnerLine.push([this.winnerDiagonalRight[i], this.winnerDiagonalRight[i] + 6, this.winnerDiagonalRight[i] + 12, this.winnerDiagonalRight[i] + 18])
    }
    console.log(this.winnerLine);
  }


  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     playingField: props.appData.playingField
  //   }
  // }



  clickHandler = (event) => {
    let count = this.state.count;
    let dataId = event.target.getAttribute('data-id');
    let curentPlayingField = this.state.playingField;
    if (event.target.innerText === '' || curentPlayingField[dataId] === null) {
      if (count % 2 === 0) {
        // event.target.innerText = 'X';  
        curentPlayingField[dataId] = 'X';
      } else {
        // event.target.innerText = 'O';
        curentPlayingField[dataId] = 'O';
      }
      this.setState({ count: count + 1 });
      this.winner();
    } else {
      alert('field is occupied')
    }
  }

  winner = () => {
    let move = (this.state.count % 2 === 0) ? 'X' : 'O';
    for (let i = 0; i < this.winnerLine.length; i++) {
      let line = this.winnerLine[i];
      if (this.state.playingField[line[0]] === move &&
        this.state.playingField[line[1]] === move &&
        this.state.playingField[line[2]] === move &&
        this.state.playingField[line[3]] === move
      ) {
        let winner = <div className="winner">{move} Winner</div>;
        this.setState({ winner: winner });

        let reset = <div className="reset" onClick={this.resetApp}>Reset</div>
        this.setState({ reset: reset })

        let field = document.querySelectorAll('.playing-field__square');
 
        // field[line[0]].classList.add("bg-red");
        // field[line[1]].classList.add("bg-red");
        // field[line[2]].classList.add("bg-red");
        // field[line[3]].classList.add("bg-red");
        for (let i = 0; i < line.length; i++) {
          field[line[i]].classList.add("bg-red");
        }

        // setTimeout(() => {
        //   this.resetApp()
        // }, 5000)
      }
    }

    if (this.state.count === 41) {
      let reset = <div className="reset" onClick={this.resetApp}>Reset</div>
      this.setState({ reset: reset })
    }
  }

  resetApp = () => {
    this.setState({ playingField: Array(42).fill(null) });
    this.setState({ count: 0 });
    this.setState({ reset: '' });
    this.setState({ winner: '' });
    let redField = document.querySelectorAll('.bg-red');
    for (let i = 0; i < redField.length; i++) {
      redField[i].classList.remove("bg-red");
    }
  }

  render() {
    let appData = this.props.appData;
    this.calcWinnerline();
    return (
      <div className="tic-tac-toe">
        <h1>{appData.title}</h1>
        <p>{appData.description}</p>
        <div className="playing-field">
          {this.state.playingField.map((obect, i) => {
            return (
              <div key={'data-id' + i} data-id={i} className="playing-field__square" onClick={this.clickHandler}>{obect}</div>
            )
          })}
        </div>
        {this.state.winner}
        {this.state.reset}
      </div>
    )
  }
}

export default App;
