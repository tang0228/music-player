import React from 'react';
import "./index.less";

export default function CommonFooter() {
    return (
        <div className="footer-container">
            <div className="footer">
                <div className="copy">
                    <p className="link">
                        <a href="https://st.music.163.com/official-terms/service" target="_blank">服务条款</a>
                        <span className="line"></span>
                        <a href="https://st.music.163.com/official-terms/privacy" target="_blank">隐私政策</a>
                        <span className="line"></span>
                        <a href="https://st.music.163.com/official-terms/children" target="_blank">儿童隐私政策</a>
                        <span className="line"></span>
                        <a href="https://music.163.com/st/staticdeal/complaints.html" target="_blank">版权投诉指引</a>
                        <span className="line"></span>
                        <a href="https://st.music.163.com/official-terms/service" target="_blank">意见反馈</a>
                        <span className="line"></span>
                        <a href="https://st.music.163.com/official-terms/service" target="_blank">广告合作</a>
                    </p>
                </div>
                <div className="enter">

                </div>
            </div>
        </div>
    )
}
