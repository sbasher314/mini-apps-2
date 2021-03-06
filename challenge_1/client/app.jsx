import React from "react";
import Searchbox from './components/Searchbox';
import ReactPaginate from 'react-paginate';
import Results from './components/Results';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: null,
      results: [],
      pageCount: 0,
      page: 1
    };
    this.search = this.search.bind(this);
    this.pageHandler = this.pageHandler.bind(this);
  }

  search(input, page = 1) {
    const state = {query: input, page};
    const searchURL = '/events?' + new URLSearchParams({
      q: input,
      _page: page
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
    let selected = data.selected + 1;
    this.search(this.state.query, selected);
  }

  render() {
    return (<>
      <h1>Historical Events Finder!</h1>
      {this.state.query === null &&
        <h3>Type below to find a historical event matching your search terms</h3>
      }
      <Searchbox onSubmit={this.search} />
      <Results results={this.state.results} />
      {this.state.pageCount > 0 ?
        <ReactPaginate
          containerClassName={'pagination'}
          forcePage={this.state.page - 1}
          marginPagesDisplayed={2}
          onPageChange={this.pageHandler}
          pageCount={this.state.pageCount}
          pageRange={5}
        />
      :
        this.state.query !== null && <div>0 Results Found</div>
      }
    </>)
    }
}

export default App;
