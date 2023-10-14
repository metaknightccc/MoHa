import React, { useState, useEffect } from 'react';
import './Template.css';

function Template({children}) {
    const [showMenu, setShowMenu] = useState(false);
    const [isSidebarVisible, setSidebarVisibility] = useState(true);

    return (
        <div className='Template'>
           <div className='Header'>
                <button className="sidebarToggle" onClick={() => setSidebarVisibility(prevVisible => !prevVisible)}>
                ☰
                </button>
                <nav>
                    <a href="/">Home</a>
                    <a href="/find-tutor">Find a Tutor</a>
                    <a href="/find-class">Find a Class</a>
                    <a href="/become-tutor">Become a Tutor</a>
                </nav>


                <input type="text" placeholder="Search..." />
                <div className="avatar" onClick={() => setShowMenu(!showMenu)}>
                    {/* Dummy avatar icon, replace with your actual image or icon */}
                    O
                    {showMenu && (
                        <div className="dropdownMenu">
                            <a href="/login">Login</a>
                            <a href="/signup">Sign Up</a>
                        </div>
                    )}
                </div>
            </div>

            <div className={`Sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
                Placeholder
            </div>
            <div className='Body'>{children}</div>

            <div className='Footer'>© 2023 Moha. All rights reserved.</div>
        </div>        
    );

}

export default Template;
