// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// Contexts
import { Web3Provider } from './contexts/Web3Provider';

// Pages
import HomePage from './pages/HomePage';
import AddUsr from './pages/AddUsr';
import UniTransfer from './pages/UniTransfer';
import UniMint from './pages/UniMint';
import Rates from './pages/Rates';
import SetExRate from './pages/SetExRate';
import ChangeCode from './pages/ChangeCode';
import Search from './pages/Search';
import AddInfo from './pages/AddInfo';
import ViewBalance from './pages/ViewBalance';

// Components
import Header from './components/Header';

const App = () => (
    <Web3Provider>
        <Container>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path='/universies/add-user' element={<AddUsr />} />
                    <Route path='/universies/uni-transfer' element={<UniTransfer />} />
                    <Route path='/universies/uni-mint' element={<UniMint />} />
                    <Route path='/universies/rates' element={<Rates />} />
                    <Route path='/universies/set-rate/:address' element={<SetExRate />} />
                    <Route path='/universies/change-code' element={<ChangeCode />} />
                    <Route path='/universies/search' element={<Search />} />
                    <Route path='/universies/add-info/:address' element={<AddInfo />} />
                    <Route path='/universies/view-balance/:account/:address/:code/:exchRate' element={<ViewBalance />} />
                </Routes>
            </main>
        </Container>
    </Web3Provider>
);

export default App;
