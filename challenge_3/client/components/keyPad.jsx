import React, { Component } from "react";

class KeyPad extends Component {
  constructor(props) {
    super(props);
  }

  keyPress(e, value) {
    e.preventDefault();
    this.props.onSubmit(value);
  }

  render() {
    let keyVals = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10, 'reset']
    ];
    let remaining = this.props.remaining;
    return (
      <table>
        <tbody>
          {keyVals.map(values =>
            <tr key={values}>
              {values.map(val =>
                <td key={val}>
                  {(val <= remaining || val === 'reset') &&
                    <button onClick={(e) => this.keyPress(e, val)}>{val}</button>
                  }
                  {val > remaining && <button disabled>{val}</button>}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default KeyPad;