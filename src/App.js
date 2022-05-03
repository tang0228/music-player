import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import RouterGuard from "./Hoc/RouterGuard";
import "./app.less";
import { Layout, BackTop } from '@douyinfe/semi-ui';
import CommonHeader from "./components/CommonHeader";
import CommonFooter from "./components/CommonFooter";
import SongPlay from "./components/SongPlay";
import Find from "./pages/Find";
import User from "./pages/User"
import Spinner from "@/components/Spinner";

const Index = lazy(() => import("./pages/Index"));
const Search = lazy(() => import("./pages/Search"));
const PlayList = lazy(() => import("./pages/Find/modules/PlayList"));
const Friend = lazy(() => import("./pages/Friend"));

const UserHome = lazy(() => import("./pages/User/modules/user-home/UserHome"));
const UserUpdate = lazy(() => import("./pages/User/modules/user-update/UserUpdate"));
const UserEvent = lazy(() => import("./pages/User/modules/user-event/UserEvent"));

const PlaylistDetail = lazy(() => import("./pages/Find/modules/playListDetail/PlaylistDetail.jsx"));
const SongDetail = lazy(() => import("./pages/Song/SongDetail"));
const ArtistDetail = lazy(() => import("./pages/Artist/ArtistDetail"));
const AlbumDetail = lazy(() => import("./pages/Album/AlbumDetail"));
const MvDetail = lazy(() => import("./pages/Mv/MvDetail"));
const TopList = lazy(() => import("./pages/Find/modules/topList/TopList"));
const Dj = lazy(() => import("./pages/Find/modules/Dj/DjRadio/Dj"));
const CatDetail = lazy(() => import("./pages/Find/modules/Dj/CatDetail/CatDetail"));
const DJRank = lazy(() => import("./pages/Find/modules/Dj/DjRank/DJRank"));
const DJRecommend = lazy(() => import("./pages/Find/modules/Dj/DjRecommend/DJRecommend"));
const Program = lazy(() => import("./pages/Find/modules/Dj/Program/Program"));
const DjDetail = lazy(() => import("./pages/Find/modules/Dj/DjDetail/DjDetail"));
const AlbumList = lazy(() => import("./pages/Album/AlbumList"));
const SingerCat = lazy(() => import("./pages/Find/modules/Singers/SingerCat"));
const Download = lazy(() => import("./pages/Other/Download"));
const Mall = lazy(() => import("./pages/Other/Mall"));
const Musician = lazy(() => import("./pages/Other/Musician"));
const MyMusic = lazy(() => import("./pages/MyMusic/MyMusic"));
const NotFound = lazy(() => import("./pages/NotFound"));

import white from "@/common/white"
import { Toast } from "@douyinfe/semi-ui"

function App() {
    const { Header, Footer, Content } = Layout;
    return (
        <RouterGuard onBeforeRouter={(prev, cur, action, msg, cb) => {
            const user = JSON.parse(localStorage.getItem('user')) || "";
            if(white.includes(cur.pathname) && !user) {
                Toast.warning("你还没有登录哦！");
                cb(false);
            } else {
                cb(true);
            }
        }}>
            <Suspense fallback={<Spinner />}>
                <Layout className="components-layout-demo">
                    <Header>
                        <CommonHeader />
                    </Header>
                    <Content>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/find" />
                            </Route>
                            <Route path="/find" render={() => (
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
                            <Route exact path="/mymusic" component={MyMusic}></Route>
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
                            <Route component={NotFound}></Route>
                        </Switch>
                    </Content>
                    <Footer><CommonFooter /></Footer>
                    <BackTop style={{ bottom: 100 }} />
                    <SongPlay />
                </Layout>
            </Suspense>
        </RouterGuard>
    );
}

export default App;

