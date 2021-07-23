import React from 'react';
import he from 'he';

class Results extends React.Component{
  constructor(props) {
    super(props);
  }

  xmlCleanup(string = '') {
    try { string = he.decode(string) } catch {}
    try { string = he.decode(string) } catch {}
    try { string = he.decode(string) } catch {}
    try { string = he.decode(string) } catch {}
    try { string = string.replaceAll('–',' – ') } catch {}
    try { string = decodeURIComponent(string) } catch {}
    return  string.replaceAll('ampamp', '&');
  }

  render() {
    const results = this.props.results || [];
    if (results.length === 0) {
      return null;
    }
    return (<div className="Results">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, i) => (
            <tr key={i} className='result'>
              <td>{result.date}</td>
              <td>{this.xmlCleanup(result.category1)}</td>
              <td>{this.xmlCleanup(result.description)}</td>
            </tr>)
          )}
        </tbody>
      </table>
    </div>);
  }
}

export default Results;
