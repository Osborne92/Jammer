import React from 'react'
import './TrackList.css'
import Track from '../Track/Track.js'

class TrackList extends React.Component {
    render() {
        return (
        <div className="TrackList">
            {this.props.tracks.map(trackP => { //each instance of track is stored in the tracks array from the map method
                return <Track trackInfo={trackP} key={trackP.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} /> // Each mapped over item(trackP) in the tracks array will return a Track component. track will be set to each mapped item
            })} 
        </div>
        ) // addTrack is applied to each component
    }
}

export default TrackList