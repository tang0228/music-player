import React, {useState} from 'react';
import Login from '../../components/Login';
import "./index.less";

export default function Index() {
    const [visible, setVisible] = useState(false);
    return (
        <div className="main-container">
            <span className="text">测试less</span>
            <button onClick={() => {
                setVisible(true);
            }}>登录</button>
            <Login visible={visible} closeModal={() => {
                setVisible(false);
            }}></Login>
        </div>
    )
}
