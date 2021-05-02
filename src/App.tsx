import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/style/global';
import Header from './components/Header/Header';
import PlayBar from './components/PlayBar/PlayBar';
// pages
import Main from './page/Main';
import SongInfo from './page/SongInfo';
import ArtistInfo from './page/ArtistInfo';
import Signin from './page/Signin';
import Signup from './page/Signup';
import MyPage from './page/MyPage'
import PrivateRoute from './components/PrivateRoute';

const App = () => {


    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path='/'>
                        <Main />
                    </Route>
                    <Route exact path='/song/:id'>
                        <SongInfo />
                    </Route>
                    <Route exact path='/artist/:artist'>
                        <ArtistInfo />
                    </Route>
                    <Route exact path='/signin' >
                        <Signin />
                    </Route>
                    <Route exact path='/signup' >
                        <Signup />
                    </Route>
                    <PrivateRoute exact path='/mypage'>
                        <MyPage />
                    </PrivateRoute>
                </Switch>
                <PlayBar />
            </BrowserRouter>
        </>
    );
}

export default App;