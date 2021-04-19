import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/style/global';
import Header from './components/Header';
import PlayBar from './components/PlayBar/PlayBar';
import Main from './page/Main';
import SongInfo from './page/SongInfo';
import ArtistInfo from './page/ArtistInfo';


const App = () => {


    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
            <Header />
            <PlayBar />
                <Switch>
                    <Route exact path='/'>
                        <Main />
                    </Route>
                    <Route exact path='/song'>
                        <SongInfo />
                    </Route>
                    <Route exact path='/artist'>
                        <ArtistInfo />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;