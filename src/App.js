// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// Contexts
import { Web3Provider } from './contexts/Web3Provider';

// Pages
import HomePage from './pages/HomePage';
import MyAccount from './pages/MyAccount';
import AddUsr from './pages/AddUsr';
import UniTransfer from './pages/UniTransfer';
import UniMint from './pages/UniMint';
import SetExRate from './pages/SetExRate';
import ChangeCode from './pages/ChangeCode';
import Search from './pages/Search';

// Components
import Header from './components/Header';

const App = () => (
    <Web3Provider>
        <Container>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path='/universies/MyAccount' element={<MyAccount />} />
                    <Route path='/universies/AddUsr' element={<AddUsr />} />
                    <Route path='/universies/UniTransfer' element={<UniTransfer />} />
                    <Route path='/universies/UniMint' element={<UniMint />} />
                    <Route path='/universies/SetExRate' element={<SetExRate />} />
                    <Route path='/universies/ChangeCode' element={<ChangeCode />} />
                    <Route path='/universies/Search' element={<Search />} />
                </Routes>
            </main>
        </Container>
    </Web3Provider>
);

export default App;
