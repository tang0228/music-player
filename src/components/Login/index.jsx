import React, {useState, useCallback} from 'react';
import { Modal, Button, Form, Row, Toast } from '@douyinfe/semi-ui';
import { phoneLogin } from "../../services/apis"
import { connect } from "react-redux";
import { addUserAction } from "../../store/actions/user";
import utils from '../../utils';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (...args) => dispatch(addUserAction(...args)),
    }
}
function Login(props) {
    const {addUser} = props;
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const closeModal = useCallback(
        () => {
            props.closeModal && props.closeModal(false);
        },
        [props],
    );

    const handleOk = useCallback(
        async () => {
            const res = await phoneLogin({
                phone,
                password
            });
            if(res.code === 200) {
                Toast.success({
                    content: `欢迎${res.profile.nickname}回家`,
                    duration: 2,
                })
                closeModal();
                addUser(res.profile);
                localStorage.setItem('user', JSON.stringify(res.profile));
                utils.setCookie('token', JSON.stringify(res.token));
            } else {
                Toast.error({
                    content: "手机号或密码错误",
                    duration: 2
                });
            }
        },
        [password, phone],
    );

    const handlePassChange = useCallback(
        (val) => {
            setPassword(val);
        },
        [],
    );

    const handlePhoneChange = useCallback(
        (val) => {
            setPhone(val)
        },
        [],
    );

    return (
        <div>
            <Modal
                title="登录"
                visible={props.visible}
                onOk={handleOk}
                onCancel={closeModal}
                centered
                bodyStyle={{height: 200}}
                footer={
                    <>
                        <Button type="tertiary" onClick={closeModal}>取消</Button>
                        <Button type="primary" onClick={handleOk}>登录</Button>
                    </>
                }
            >
                <Form>
                    <Row>
                        <Form.Input
                            field='phone'
                            label="手机"
                            trigger='blur'
                            onChange={handlePhoneChange}
                            rules={[
                                { required: true, message: "请输入手机号" },
                            ]}
                        />
                    </Row>
                    <Row>
                        <Form.Input
                            field='password'
                            label="密码"
                            trigger='blur'
                            mode="password"
                            onChange={handlePassChange}
                            rules={[
                                { required: true, message: "请输入密码" },
                            ]}
                        />
                    </Row>
                </Form>
            </Modal>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

