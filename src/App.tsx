import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/style/global';
import Header from './components/header/Header';
import Main from './components/page/Main';

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
