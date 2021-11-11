import React from "react";
import { Layout, Typography } from '@douyinfe/semi-ui';

function App() {
    const { Header, Footer, Content } = Layout;
    const { Title } = Typography;
    return (
        <Layout className="components-layout-demo">
            <Header>
                <Title>这是一个一级标题</Title>
            </Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    );
}

export default App;
