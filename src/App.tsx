import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './style/global';
import Header from './components/Header/Header';
import Controller from './components/Controller/Controller';
// pages
import Main from './page/Main';
import SongInfo from './page/SongInfo';
import ArtistInfo from './page/ArtistInfo';
import Signin from './page/Signin';
import Signup from './page/Signup';
import MyPage from './page/MyPage'
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import authStore from './stores/authStore';
import { observer } from 'mobx-react';

const App = observer(() => {

    useEffect(() => {
        authStore.autoSignIn();
    }, []) // eslint-disable-line

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
                <Controller />
            </BrowserRouter>
        </>
    );
});

export default App;