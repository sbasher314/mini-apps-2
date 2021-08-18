import { React, Component } from "react";

class KeyPad extends Component {
  constructor(props) {
    super(props);
  }

  keyPress(key) {
    props.onSubmit(value);
  }

  render() {
    let keyVals = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10]
    ];
    let remaining = props.remaining;
    return (
      <table>
        <tbody>
          {keyVals.map(values => {
              <tr>
                {values.map(val => {
                  <td>
                    {val <= remaining && <button key={val} onClick={() => keyPress(val)}>{val}</button>}
                    {val > remaining && <button key={val} disabled>{val}</button>}
                  </td>
                })}
              </tr>
            })}
        </tbody>
      </table>
    )
  }
}

export default KeyPad;