import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
//import logo from './logo.svg';
import './App.css';
import Spotify from '../util/Spotify/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: 'Vul hier een naam in',
      platlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    Spotify.getAccessToken();
  }
  
  addTrack(ID) {
    let tracks = this.state.platlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === ID)) {
      return;
    }
    let trackToAdd = this.state.SearchResults.filter(current => current.id === ID);
    tracks.push(trackToAdd[0]);
    this.setState({
      platlistTracks: tracks
    });
  }
  removeTrack(trackID) {
    let tracks = this.state.platlistTracks;
    tracks = tracks.filter(current => current.id !== trackID);
    this.setState({
      platlistTracks: tracks
    });
  }
  updatePlaylistName(name) {
      this.setState({
        playlistName: name
      });
  }
  savePlaylist() {
    console.log(Spotify.savePlaylist(this.state.playlistName, this.state.platlistTracks));
    this.setState({
      searchResults: [],
      platlistTracks: [],
      playlistName: 'Vul hier een naam in'
    });
    alert('Playlist opgeslagen!')
  };
  async search(searchTerm) {
      this.setState({
        SearchResults: await Spotify.search(searchTerm)
      }) 
  }
  render() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          
          <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack} />
          <Playlist name={this.state.playlistName} tracks={this.state.platlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
        </div>
      </div>
    </div>
  );
  }
}

export default App;
