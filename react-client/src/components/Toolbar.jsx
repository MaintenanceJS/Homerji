import React from 'react';

class Toolbar extends React.Component {
    render() {

        return (
            <header className='toolbar'>
                <nav className='toolbar-nav'>
                    <div className='toolbar-logo'><a href='/'>HOMERJI</a></div>
                    <div className='spacer'></div>
                    <div className='toolbar-nav-items'>
                        <ul>
                            <li><a href='/Signup'>Signup</a></li>
                            <li><a href='/Login'>Login</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Toolbar;