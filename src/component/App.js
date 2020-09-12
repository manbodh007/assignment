import React, { Component } from "react";
import { connect } from "react-redux";
import { insertQuestion, fetchQueryResult} from "../action";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDisplay: "none",
      query: "",
      topic: "",
      tags: "",
      searchValue: "",
    };
    this.id = "";
  }

  

  handleSearch = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
    clearTimeout(this.id);
    let self = this;
    // debounce function to minimize the api call
    this.id = setTimeout(function () {
      self.props.dispatch(fetchQueryResult(self.state.searchValue));
    }, 500);
  };
  // appear form then add query is clicked
  showform = () => {
    this.setState({
      formDisplay: "flex",
    });
  };


  handleFormSubmit = (e) => {
    e.preventDefault();
    const { query, topic, tags } = this.state;
    this.props.dispatch(insertQuestion({ query, topic, tags }));
    this.setState({
      formDisplay: "none",
    });
  };
  handleChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });
  };

  render() {
    console.log("state", this.props);
    const { results, error,message} = this.props.results;
    console.log(results);

    const { formDisplay } = this.state;
    return (
      <div className="App">
        {error&&<div className = 'error-msg'>{message}</div>}
        <div className="container">
          <div className="action">
            <textarea
              className="search-area"
              placeholder="Search your question"
              onChange={this.handleSearch}
            ></textarea>
            <button className="btn" onClick={this.showform}>
              Add Question
            </button>
          </div>
          <div className="search-result">
            {error && <h2 className="alert-msg">result not found!!</h2>}
            {results.map((result) => {
              return <p>{result.query}</p>;
            })}
          </div>
          <form className="form" style={{ display: formDisplay }}>
            <textarea
              type="text"
              placeholder="put your query"
              onChange={(e) => this.handleChange("query", e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="add topic name"
              onChange={(e) => this.handleChange("topic", e.target.value)}
            />
            <input
              type="text"
              placeholder="choose tags i.e top, collage, world"
              onChange={(e) => this.handleChange("tags", e.target.value)}
            />
            <input
              className="btn"
              type="submit"
              value="submit"
              onClick={this.handleFormSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results,
  };
}

export default connect(mapStateToProps)(App);
