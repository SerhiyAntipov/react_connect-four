import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let appData = {
title: "Connect Four",
description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum iure ratione maiores, deleniti accusamus animi esse quos totam libero consequuntur, quod cumque veniam harum maxime, earum dicta et similique perspiciatis. Hic labore adipisci itaque recusandae praesentium assumenda eum non vitae temporibus? Quaerat odio deserunt praesentium assumenda molestiae doloremque aperiam et.",
// playingField: Array(9).fill(null)
}

ReactDOM.render(<App  appData={appData}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
