import React from 'react';

const toolbar = props => (
    <div className="ashraf">
    <header className='toolbar'>
        <nav className='toolbar-nav'>
            <div className='toolbar-toggle-button'>
            </div>
            <div className='toolbar-logo'><a href='/'>HOMERJI</a></div>
            <div id='whatever' ></div>
            <div className= 'toolbar-nav-items'>
                <ul>
                    <li className="danger"><a href='/'>Workers</a></li>
                    <li><a href='/'>Users</a></li>
                </ul>
            </div>
        </nav>
    </header>
    </div>
)


export default toolbar;