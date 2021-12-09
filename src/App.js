import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import "./app.less";
import { Layout, BackTop } from '@douyinfe/semi-ui';
import CommonHeader from "./components/CommonHeader";
import CommonFooter from "./components/CommonFooter";
import Index from "./pages/Index";
import Search from "./pages/Search";
import PlayList from "./pages/Find/modules/PlayList";
import Find from "./pages/Find";
import Friend from "./pages/Friend";
import User from "./pages/User"
import UserHome from "./pages/User/modules/user-home/UserHome";
import UserUpdate from "./pages/User/modules/user-update/UserUpdate";
import PlaylistDetail from "./pages/Find/modules/components/PlaylistDetail.jsx";

function App() {
    const { Header, Footer, Content } = Layout;
    return (
        <Router>
            <Layout className="components-layout-demo">
                <Header>
                    <CommonHeader />
                </Header>
                <Content>
                    <Switch>
                        <Route exact path="/" component={Index}></Route>
                        <Route path="/find" render={() =>(
                            <Find>  
                                <Route exact path="/find/playlist" component={PlayList}></Route>
                                <Route exact path="/find/playlist/detail" component={PlaylistDetail}></Route>
                            </Find>
                        )}>
                        </Route>
                        <Route exact path="/mymusic"></Route>
                        <Route exact path="/friend" component={Friend}></Route>
                        <Route exact path="/mall"></Route>
                        <Route exact path="/musicians"></Route>
                        <Route exact path="/download"></Route>
                        <Route exact path="/search" component={Search}></Route>
                        <Route path="/user" render={() => (
                            <User>
                                <Route exact path="/user/home" component={UserHome} ></Route>
                                <Route exact path="/user/update" component={UserUpdate} ></Route>
                            </User>
                        )}></Route>
                    </Switch>
                </Content>
                <Footer><CommonFooter /></Footer>
                <BackTop />
            </Layout>
        </Router>
    );
}

export default App;
