import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

    this.handleSearchKeyUp = this.keyUpHandler.bind(this, 'SearchInput');
    this.query = '';
    this.pageNumber = '1';
  }

  getSearchRecords(){
    
  }

  keyUpHandler(refName, e) {
    // console.log(e.target.value);
    this.query = e.target.value;
    fetch(`http://hn.algolia.com/api/v1/search?query=${this.query}&page=${this.pageNumber}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.hits

          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    
    fetch(`http://hn.algolia.com/api/v1/search?query=${this.query}&page=${this.pageNumber}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.hits

          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const listItems = items.map((item,index) => {
        return (
          <div key={"parentDiv"+index}>
            <h3 key={index}>{item.title || item.story_title}</h3>
            <div key={"div"+index} className="flex-list">
              <ul key={"uL"+index}>
                <li key={"points"+index}>{item.points} points(s)</li>|
                <li key={"author"+index}>{item.author}</li>|
                <li key={"num_comments"+index}>{item.num_comments} comments</li>|
                <li key={"url"+index}><a>{item.url}</a></li>
              </ul>
            </div>
          </div>
        );
      });

      return (
        <div className="App">

          <header className="App-header">
            <div className="title">
              <span className="title-span">Search News</span>
            </div>
            <div className="item-input-wrapper">
              <input onKeyUp={this.handleSearchKeyUp} ref="SearchInput" type="search" placeholder="Search stories by title, url or author" autoCapitalize="off" spellCheck="false" autoCorrect="off" autoFocus="" className="search-input" />
            </div>
          </header>

          <div className="bodyItems">
            <div className="rowItem" >{listItems}</div>
          </div >

        </div >
      );
    }
  }
}



export default App;
