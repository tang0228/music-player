import React, {useState, useCallback} from 'react';

import { Modal, Button, Form, Row } from '@douyinfe/semi-ui';

import { phoneLogin } from "../../services/apis"
export default function Login(props) {
    // const [formApi, setFormApi] = useState(null);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const closeModal = useCallback(
        () => {
            props.closeModal && props.closeModal(false);
        },
        [],
    );

    // const getFormApi = useCallback(
    //     (formApi) => {
    //         setFormApi(formApi);
    //     },
        
    // );

    const handleOk = useCallback(
        async () => {
            const res = await phoneLogin({
                phone,
                password
            })
            console.log(res);
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
                                { required: true, message: "请输入邮箱" },
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
}

