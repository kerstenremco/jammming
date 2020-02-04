import React from 'react';
import './SearchBar.css';
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    search(searchTerm) {
        this.props.onSearch(this.state.searchTerm);
    }
    handleTermChange(e) {
        this.setState({searchTerm: e.target.value});
    }
    render() {
        return (
            <div className="SearchBar">
            <input placeholder="Zoek een nummer, album of artiest" onChange={this.handleTermChange} />
            <button className="SearchButton" onClick={this.search}>ZOEKEN</button>
            </div>
        );
    }
}
export default SearchBar;