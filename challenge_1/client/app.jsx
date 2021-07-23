import React from "react";
import Searchbox from './components/Searchbox';
import ReactPaginate from 'react-paginate';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      pageCount: 0,
      page: 1
    };
    this.search = this.search.bind(this);
  }

  search(input) {
    const state = {query: input, page: 1};
    const searchURL = '/events?' + new URLSearchParams({
      q: input,
      _page: 1
    });

    fetch(searchURL)
      .then(response => {
        state.pageCount = Math.ceil(response.headers.get('x-total-count') / 10);
        return response.json();
      }).then(response => {
        state.results = response;
        this.setState(state);
      })
      .catch(err => {
        console.error(err);
      });
  }

  pageHandler(data) {
    console.log(data);
    let selected = data.selected;
    console.log(selected);
  }

  render() {
    return (<>
      <Searchbox onSubmit={this.search} />
      {this.state.pageCount > 0 &&
        <ReactPaginate
          containerClassName={'pagination'}
          forcePage={this.state.page - 1}
          marginPagesDisplayed={2}
          onPageChange={this.pageHandler}
          pageCount={this.state.pageCount}
          pageRange={5}
        />
      }
    </>)
    }
}

export default App;
