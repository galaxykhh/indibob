import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/style/global';
import Header from './components/Header/Header';
import PlayBar from './components/PlayBar/PlayBar';
// pages
import Main from './page/Main';
import SongInfo from './page/SongInfo';
import ArtistInfo from './page/ArtistInfo';


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
                    <Route path='/song/:id'>
                        <SongInfo />
                    </Route>
                    <Route path='/artist'>
                        <ArtistInfo />
                    </Route>
                </Switch>
                <PlayBar />
            </BrowserRouter>
        </>
    );
}

export default App;