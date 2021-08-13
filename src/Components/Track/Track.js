import React from 'react';
import './Track.css' 

class Track extends React.Component {
    constructor(props) {
        super(props)

        this.addTrack = this.addTrack.bind(this)
    }
    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action">-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        } //initiates addTrack in App
    }

    addTrack() {
        this.props.onAdd(this.props.trackInfo) // this parameter is used in addTrack in App.js
    }

    render() {
        return (
        <div className="Track">
            <div className="Track-information">
                <h3>{this.props.trackInfo.name}</h3>
                <p>{this.props.trackInfo.artist} |  {this.props.trackInfo.albums}</p>
            </div>
            {this.renderAction()}
        </div>
        )
    }
}

export default Track