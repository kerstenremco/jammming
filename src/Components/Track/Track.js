import React from "react";
import "./Track.css";
class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction(id) {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack} data-trackid={id}>-</button>;
        }
        return <button className="Track-action" onClick={this.addTrack} data-trackid={id}>+</button>;
    }
    addTrack(track) {
        this.props.onAdd(track.target.getAttribute('data-trackid'));
    }
    removeTrack(track) {
        this.props.onRemove(track.target.getAttribute('data-trackid'));
    }
    render() {
        return (
            <div className="Track" key={this.props.track.id}>
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
            {this.renderAction(this.props.track.id)}
        </div>
        );
    
}
}
export default Track;
