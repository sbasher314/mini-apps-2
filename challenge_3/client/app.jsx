import {React, Component} from "react";
import KeyPad from "./components/keyPad";
import ScoreCard from "./components/scoreCard";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      frames: [{
        remaining: 10,
        shots: [],
        score: 0
      }],
      shots: [], // list of each individual shot's pin amount
      accumulator: [] // {number: #, shotsLeft: x},
      totalScore: 0 // updated each input
    };

    this.calcShot = calcShot.bind(this);
  }

  calculateScore() {
    let total = 0;
    this.state.frames.forEach(frame => {
      total += frame.score;
    })
    this.state.totalScore = total;
  }

  newFrame() {
    if (this.state.current <= 10) {
      this.state.frames.push({
        remaining: 10,
        shots: [],
        score: 0
      });
    } else {
      console.error('Can not make a new frame after 10 frames have been played')
    }
    calculateScore();
  }

  calcShot(num) {
    let current = this.state.current;
    let currentFrame = this.state.frames[current];
    let shots = this.state.shots.push(num);
    let endFrame = false;
    this.state.accumulator.forEach((frame, index) => {
      if (frame.shotsLeft > 0) {
        this.state.frames[frame.number].score += num;
        this.state.accumulator[index].shotsLeft--;
      }
    })
    let remaining = currentFrame.remaining - num;
    if (remaining === 0) {
      currentFrame.shots.push(num === 10 ? 'x' : '/');
      if (current < 10) {
        this.state.accumulator.push({number: current, num === 10 ? 2 : 1});
      }
      currentFrame.score += 10;
      currentFrame.remaining = 0;
      endFrame = true;
    } else {
      currentFrame.score += num;
      currentFrame.shots.push(num);
    }
    }

    if (current < 10 && shots.length === 2) {
      endFrame = true;
    }
    if (current === 10) {
      const hasStrike = currentFrame.shots.length <= 2 && num = 10;
      const hasSpare = currentFrame.shots.length === 2 && currentFrame.score === 10
      if (hasStrike || hasSpare) {
        currentFrame.remaining = 10;
        endFrame = false;
      }
      if (currentFrame.score < 10 && currentFrame.shots.length === 2) {
        currentFrame.remaining = 0;
        endFrame = true;
      }
    }

    if (endFrame === true) {
      current++;
      newFrame();
    }
    const frames = this.state.frames;
    frames[current] = currentFrame;
    this.setState({current, shots, frames})
  }

  render () {
    let remaining = this.state.frames[this.state.current].remaining;
    return (
      <>
        <KeyPad remaining={remaining} onSubmit={this.calcShot}/>
        <ScoreCard frames={this.state.frames} score={this.state.totalScore}/>
      </>
    )
  }
}

export default App;