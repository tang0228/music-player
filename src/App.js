import React from "react";
import { Switch, HashRouter as Router, Route, Redirect } from "react-router-dom"
import "./app.less";
import { Layout, BackTop } from '@douyinfe/semi-ui';
import CommonHeader from "./components/CommonHeader";
import CommonFooter from "./components/CommonFooter";
import SongPlay from "./components/SongPlay";
import Index from "./pages/Index";
import Search from "./pages/Search";
import PlayList from "./pages/Find/modules/PlayList";
import Find from "./pages/Find";
import Friend from "./pages/Friend";
import User from "./pages/User"
import UserHome from "./pages/User/modules/user-home/UserHome";
import UserUpdate from "./pages/User/modules/user-update/UserUpdate";
import UserEvent from "./pages/User/modules/user-event/UserEvent";
import PlaylistDetail from "./pages/Find/modules/playListDetail/PlaylistDetail.jsx";
import SongDetail from "./pages/Song/SongDetail";
import ArtistDetail from "./pages/Artist/ArtistDetail";
import AlbumDetail from "./pages/Album/AlbumDetail";
import MvDetail from "./pages/Mv/MvDetail";
import TopList from "./pages/Find/modules/topList/TopList";
import Dj from "./pages/Find/modules/Dj/DjRadio/Dj";
import CatDetail from "./pages/Find/modules/Dj/CatDetail/CatDetail";
import DJRank from "./pages/Find/modules/Dj/DjRank/DJRank";
import DJRecommend from "./pages/Find/modules/Dj/DjRecommend/DJRecommend";
import Program from "./pages/Find/modules/Dj/Program/Program";
import DjDetail from "./pages/Find/modules/Dj/DjDetail/DjDetail";
import AlbumList from "./pages/Album/AlbumList";
import SingerCat from "./pages/Find/modules/Singers/SingerCat";
import Download from "./pages/Other/Download";
import Mall from "./pages/Other/Mall";
import Musician from "./pages/Other/Musician";

function App() {
    const { Header, Footer, Content } = Layout;
    return (
        <Router getUserConfirmation={(message, callback) => {
            // this is the default behavior
            const allowTransition = window.confirm(message);
            callback(allowTransition);}}
            >
            <Layout className="components-layout-demo">
                <Header>
                    <CommonHeader />
                </Header>
                <Content>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/find" />
                        </Route>
                        <Route path="/find" render={() =>(
                            <Find>  
                                <Route exact path="/find" component={Index}></Route>
                                <Route exact path="/find/playlist" component={PlayList}></Route>
                                <Route exact path="/find/playlist/detail" component={PlaylistDetail}></Route>
                                <Route exact path="/find/toplist" component={TopList}></Route>
                                <Route path="/find/djradio" render={() => (
                                    <>
                                        <Route exact path="/find/djradio" component={Dj}></Route>
                                        <Route exact path="/find/djradio/category" component={CatDetail}></Route>
                                        <Route exact path="/find/djradio/recommend" component={DJRecommend}></Route>
                                        <Route exact path="/find/djradio/rank" component={DJRank}></Route>
                                        <Route exact path="/find/djradio/program" component={Program}></Route>
                                        <Route exact path="/find/djradio/detail" component={DjDetail}></Route>
                                    </>
                                )}></Route>
                                <Route exact path="/find/song" component={SongDetail}></Route>
                                <Route exact path="/find/artist" component={ArtistDetail}></Route>
                                <Route exact path="/find/album" component={AlbumDetail}></Route>
                                <Route exact path="/find/album/list" component={AlbumList}></Route>
                                <Route exact path="/find/mv" component={MvDetail}></Route>
                                <Route exact path="/find/singers/cat" component={SingerCat}></Route>
                            </Find>
                        )}>
                        </Route>
                        <Route exact path="/mymusic"></Route>
                        <Route exact path="/friend" component={Friend}></Route>
                        <Route exact path="/mall" component={Mall}></Route>
                        <Route exact path="/musician" component={Musician}></Route>
                        <Route exact path="/download" component={Download}></Route>
                        <Route exact path="/search" component={Search}></Route>
                        <Route path="/user" render={() => (
                            <User>
                                <Route exact path="/user/home" component={UserHome} ></Route>
                                <Route exact path="/user/update" component={UserUpdate} ></Route>
                                <Route exact path="/user/event" component={UserEvent} ></Route>
                            </User>
                        )}></Route>
                    </Switch>
                </Content>
                <Footer><CommonFooter /></Footer>
                <BackTop />
                <SongPlay />
            </Layout>
        </Router>
    );
}

export default App;
