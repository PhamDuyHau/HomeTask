import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setTranslations, setDefaultLanguage, setLanguage } from 'react-multi-lang';
import en from './Database/en.json';
import vn from './Database/vn.json';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";


// Do this two lines only when setting up the application
setTranslations({ en, vn });
setDefaultLanguage('en');

function App() {
    return (
        <Router>
            <div className="container">
                {/* Add language switch button */}
                <button onClick={() => setLanguage('en')}>English</button>
                <button onClick={() => setLanguage('vn')}>VietNamese</button>

                <Routes>
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
