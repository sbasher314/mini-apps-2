import React, { Component } from "react";

class ScoreCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let frames = this.props.frames;
    let length = 10 - frames.length;
    let emptiness = Array(length).fill({'score': 0, 'shots': []});
    frames = frames.concat(emptiness);
    console.log(frames);
    return (
      <table className="scoreCard">
        <tbody>
          <tr>
            {frames.map((frame, i) =>
              <td key={i}>
                <table className="cardFrame"><tbody>
                  <tr>{frame.shots.map((shot, s) =>
                    <td className='shot' key={i + s}>{shot}</td>
                  )}</tr>
                  <tr><td className='score' colSpan={i < 9 ? 2 : 3}>{frame.shots.length > 0 && frame.cumulative}</td></tr>
                </tbody></table>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ScoreCard;