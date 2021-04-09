import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/style/global';
import Header from './components/Header';
import Main from './page/Main';

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
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
