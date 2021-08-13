import React from 'react'
import Track from '../Track/Track.js'
import './TrackList.css'

class TrackList extends React.Component {
    render() {
        return (
        <div className="TrackList">
            {this.props.tracks.map(trackP => {
                return <Track onAdd={this.props.onAdd} track={trackP} key={trackP.id} /> 
            })}
        </div>
        )
    }
}

export default TrackList