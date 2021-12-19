import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
      song: state.song,
    };
  };

function SongPlay(props) {
    return (
        <audio autoPlay controls src={props.song}></audio>
    )
}

export default connect(mapStateToProps)(SongPlay);