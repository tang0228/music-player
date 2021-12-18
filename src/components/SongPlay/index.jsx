import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    console.log(state)
    return {
      song: state.song,
    };
  };

function SongPlay(props) {
    return (
        <audio autoPlay src={props.song}></audio>
    )
}

export default connect(mapStateToProps)(SongPlay);