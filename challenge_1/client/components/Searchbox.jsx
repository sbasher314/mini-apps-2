import React from 'react';

class Searchbox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.input = React.createRef();
    this.submit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.input.current.value);
  }

  render() {
    return (
      <form className="Searchbox" onSubmit={this.submit}>
        <input ref={this.input} type="search"/>
        <button>Find</button>
      </form>
    );
  }
}

export default Searchbox;
