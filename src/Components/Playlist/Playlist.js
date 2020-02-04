import React from 'react';
import './Playlist.css';
import Track from '../Track/Track';
class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }
    render() {
    
        return (
            <div className="Playlist">
                <input defaultValue={this.props.name} onChange={this.handleNameChange} />
                {
                    this.props.tracks.map(track => {
                        return <Track track={track} onRemove={this.props.onRemove} isRemoval={true} key={track.id} />
                    })
                }
                <button className="Playlist-save" onClick={this.props.onSave}>SLA OP IN MIJN SPOTIFY</button>
            </div>
        );
    }
}
export default Playlist;