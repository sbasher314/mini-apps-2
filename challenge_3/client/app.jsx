import React, { Component } from "react";
import KeyPad from "./components/keyPad";
import ScoreCard from "./components/scoreCard";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      frames: [{
        remaining: 10,
        shots: [],
        score: 0
      }],
      shots: [], // list of each individual shot's pin amount
      accumulator: [], // {number: #, shotsLeft: x},
      totalScore: 0, // updated each input
      frameData: []
    };


    this.calcShot = this.calcShot.bind(this);
  }

  reset() {
    let frameData = this.calculateFrameData([]);
    this.setState({
      current: 0,
      frames: [{
        remaining: 10,
        shots: [],
        score: 0
      }],
      shots: [], // list of each individual shot's pin amount
      accumulator: [], // {number: #, shotsLeft: x},
      totalScore: 0, // updated each input
      frameData: frameData
    });
  }

  calculateFrameData(frames) {
    let total = 0;
    let frameData = frames;
    for (let i = 0; i < frames.length; i++) {
      if (frames[i]?.score !== undefined) {
        total += frames[i].score;
        frames[i].cumulative = total;
      }
    }
    return frameData;
  }

  calculateScore() {
    let total = 0;
    this.state.frames.forEach(frame => {
      total += frame.score;
    })
    this.state.totalScore = total;
  }

  newFrame() {
    if (this.state.current < 9) {
      this.state.frames.push({
        remaining: 10,
        shots: [],
        score: 0
      });
    } else {
      console.log('Game finished!')
    }
    this.setState({frames: this.state.frames})
    this.calculateScore();
  }

  calcShot(num) {
    if (num === 'reset') {
      return this.reset();
    }
    let current = this.state.current;
    let currentFrame = this.state.frames[current];
    this.state.shots.push(num);
    let shots = currentFrame.shots;
    let endFrame = false;
    this.state.accumulator.forEach((frame, index) => {
      if (frame.shotsLeft > 0) {
        this.state.frames[frame.number].score += num;
        this.state.accumulator[index].shotsLeft--;
      }
    })
    let remaining = currentFrame.remaining - num;
    if (remaining === 0 && current < 9) {
      currentFrame.shots.push(num === 10 ? 'x' : '/');
      this.state.accumulator.push({number: current, shotsLeft: num === 10 ? 2 : 1});
      currentFrame.score = 10;
      endFrame = true;
    } else {
      currentFrame.score += num;
      currentFrame.shots.push(num);
    }

    currentFrame.remaining = remaining;

    if (current < 9 && shots.length === 2) {
      endFrame = true;
    }
    if (current === 9) {
      const hasStrike = currentFrame.shots.length <= 2 && num === 10;
      const hasSpare = currentFrame.shots.length === 2 && currentFrame.score === 10;
      if (num === 10) {
        currentFrame.shots[currentFrame.shots.length - 1] = 'x';
      }
      if (hasSpare) {
        currentFrame.shots[currentFrame.shots.length - 1] = '/';
      }
      if (hasStrike || hasSpare || currentFrame.shots.length > 2) {
        currentFrame.remaining = 10;
        endFrame = false;
      }
      const openFrame = currentFrame.score < 10 && currentFrame.shots.length === 2;
      if (openFrame || currentFrame.shots.length > 2) {
        currentFrame.remaining = 0;
        endFrame = true;
      }
    }
    this.state.frames[current] = currentFrame;
    this.calculateScore();

    let frameData = this.calculateFrameData(this.state.frames);
    if (endFrame === true) {
      current++;
      this.newFrame();
    }

    this.setState({current, frameData})
  }

  render () {
    let remaining = this.state.frames[this.state.current]?.remaining || -1;
    return (
      <>
        <KeyPad remaining={remaining} onSubmit={this.calcShot}/>
        <ScoreCard frames={this.state.frameData} score={this.state.totalScore}/>
      </>
    )
  }
}

export default App;