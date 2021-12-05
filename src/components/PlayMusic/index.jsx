import React from 'react';
import { IconBackward, IconFastFoward, IconPause, IconPlay} from "@douyinfe/semi-icons";
import "./index.less";
export default function PlayMusic(props) {
    return (
        <div className="play-music">
            <div className="play-left">
                <IconBackward />
                <IconPause />
                <IconPlay />
                <IconFastFoward />
            </div>
            <div className="play-center"></div>
            <div className="play-right"></div>
        </div>
    )
}
