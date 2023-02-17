import React, { Component } from "react";
import {useNavigate} from 'react-router-dom';

const PageHoc = (Component, title, description) => {
    const navigate = useNavigate();
    return (
        <div className="App">
          <header className="App-header">
            <h1 className = "text-5xl p03"> Another Word Format Test</h1>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <connectWallet></connectWallet>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    )
}

export default PageHoc