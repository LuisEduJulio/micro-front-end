import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const mount = (props, el) => {
    ReactDOM.render(
        <App {...props} />,
        el
    )
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_table-root');

    if (devRoot) {
        mount({}, devRoot);
    }
}

export { mount };