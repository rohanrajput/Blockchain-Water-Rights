import React from 'react';
import { Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Voter</Link>
                    </li>
                    <li>
                        <Link to="/buyer">Buyer</Link>
                    </li>
                    <li>
                        <Link to="/seller">Seller</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Layout;