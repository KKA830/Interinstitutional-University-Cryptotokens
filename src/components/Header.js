// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Provider';

const Header = () => {
    const { role } = useWeb3();
    return (
        <nav className="mt-4 px-4 ">
        {role === 'AUT' && (
            <div className="flex justify-end space-x-4">
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/'
                >
                Universies
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/AddUsr'
                >
                New User
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniTransfer'
                >
                Transfer
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniMint'
                >
                Mint
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/SetExRate'
                >
                Rates
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/Search'
                >
                Search
                </Link>                
            </div>
          )}
          
          {/*////////////////////////////////////////////////////////////////////////////////////////*/}

          {role === 'UNI' && (
            <div className="flex justify-end space-x-4">
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/'
                >
                Universies
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/AddUsr'
                >
                New User
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniTransfer'
                >
                Transfer
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniMint'
                >
                Mint
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/SetExRate'
                >
                Rates
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/ChangeCode'
                >
                My Code
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/Search'
                >
                Search
                </Link> 
            </div>
          )}

          {/*////////////////////////////////////////////////////////////////////////////////////////*/}

          {role === 'DEG' && (
            <div className="flex justify-end space-x-4">
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/'
                >
                Universies
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniTransfer'
                >
                Transfer
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniMint'
                >
                Mint
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/SetExRate'
                >
                Rates
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/ChangeCode'
                >
                My Code
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/Search'
                >
                Search
                </Link> 
            </div>
          )}

          {/*////////////////////////////////////////////////////////////////////////////////////////*/}

          {role === 'STU' && (
            <div className="flex justify-end space-x-4">
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/'
                >
                Universies
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniTransfer'
                >
                Transfer
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniMint'
                >
                Rates
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/Search'
                >
                Search
                </Link> 
            </div>
          )}

          {/*////////////////////////////////////////////////////////////////////////////////////////*/}

          {role === 'NONE' && (
            <div className="flex justify-end space-x-4">
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/'
                >
                Universies
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniTransfer'
                >
                Transfer
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/UniMint'
                >
                Rates
                </Link>
                <Link
                className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4"
                to='/universies/Search'
                >
                Search
                </Link> 
            </div>
          )}

        </nav>
    );
};

export default Header;
