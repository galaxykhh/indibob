import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/style/global';
import Header from './components/Header';
import PlayBarObserver from './components/PlayBar/PlayBar';
import Main from './page/Main';
import Info from './page/Info';


const App = () => {


    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
            <Header />
            <PlayBarObserver />
                <Switch>
                    <Route exact path='/'>
                        <Main />
                    </Route>
                    <Route exact path='/Info'>
                        <Info />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;