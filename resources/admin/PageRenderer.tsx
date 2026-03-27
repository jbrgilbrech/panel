import React from 'react';
import ReactDOM from 'react-dom';
import ApiCreatePage from './pages/ApiCreatePage';
import ApiIndexPage from './pages/ApiIndexPage';
import LocationViewPage from './pages/LocationViewPage';
import LocationsIndexPage from './pages/LocationsIndexPage';
import OverviewPage from './pages/OverviewPage';
import ServersIndexPage from './pages/ServersIndexPage';
import UserCreatePage from './pages/UserCreatePage';
import UsersIndexPage from './pages/UsersIndexPage';
import UserViewPage from './pages/UserViewPage';

const pages = {
    'api-create': ApiCreatePage,
    'api-index': ApiIndexPage,
    'location-view': LocationViewPage,
    'locations-index': LocationsIndexPage,
    overview: OverviewPage,
    'servers-index': ServersIndexPage,
    'user-create': UserCreatePage,
    'user-view': UserViewPage,
    'users-index': UsersIndexPage,
} as const;

export const renderAdminPage = () => {
    const pageElement = document.getElementById('admin-page-root');
    if (!pageElement) {
        return;
    }

    const page = pageElement.dataset.page as keyof typeof pages | undefined;
    const Component = page ? pages[page] : undefined;

    if (!Component) {
        return;
    }

    const props = JSON.parse(pageElement.dataset.props || '{}');
    ReactDOM.render(<Component {...props} />, pageElement);
};
