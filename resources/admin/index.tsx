import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource-variable/ibm-plex-sans';
import './styles/admin.css';
import AdminApp, { AdminShellData } from './AdminApp';
import { renderAdminPage } from './PageRenderer';

const shellElement = document.getElementById('admin-shell');

if (shellElement) {
    const shellData = JSON.parse(shellElement.dataset.admin || '{}') as AdminShellData;
    ReactDOM.render(<AdminApp shellData={shellData} />, shellElement);
}

renderAdminPage();
