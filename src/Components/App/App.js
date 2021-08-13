import './App.css';
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [{
        name: 'name1',
        artist: 'artist1',
        albums: 'album1',
        id: 1
      },
      {
        name: 'name2',
        artist: 'artist2',
        albums: 'album2',
        id: 2
      },
      {
        name: 'name3',
        artist: 'artist3',
        albums: 'album3',
        id: 3
      }],

      playlistName: 'Nas Playlist',

      playlistTracks: [{
        name: 'playlistName1',
        artist: 'playlistArtist1',
        albums: 'playlistAlbum1',
        id: 4
      },
      {
        name: 'playlistName2',
        artist: 'playlistArtist2',
        albums: 'playlistAlbum2',
        id: 5
      },
      {
        name: 'playlistName3',
        artist: 'playlistArtist3',
        albums: 'playlistAlbum3',
        id: 6
      }]
    }
    this.addTrack = this.addTrack.bind(this)
  }

  addTrack(track) { // the parameter here is the value of the addtrack parameter in Track.js
    let tracks = this.state.playlistTracks;
    if (tracks.find(trackP => trackP.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({
      playlistTracks: tracks
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>er</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
