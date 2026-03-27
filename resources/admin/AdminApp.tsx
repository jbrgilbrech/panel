import React, { useEffect, useState } from 'react';

type NavigationItem = {
    active: boolean;
    href: string;
    icon: string;
    label: string;
};

type NavigationSection = {
    items: NavigationItem[];
    label: string;
};

export type AdminShellData = {
    accountUrl: string;
    appName: string;
    avatar: string;
    csrfToken: string;
    currentTitle: string;
    logoutUrl: string;
    navigation: NavigationSection[];
    panelUrl: string;
    userName: string;
};

const moveChildren = (sourceId: string, targetId: string) => {
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);

    if (!source || !target) {
        return;
    }

    while (source.firstChild) {
        target.appendChild(source.firstChild);
    }
};

export default function AdminApp({ shellData }: { shellData: AdminShellData }) {
    const [navigationOpen, setNavigationOpen] = useState(false);
    const navigationItems = shellData.navigation.flatMap((section) => section.items);

    useEffect(() => {
        moveChildren('admin-header-source', 'admin-header-target');
        moveChildren('admin-flash-source', 'admin-flash-target');
        moveChildren('admin-content-source', 'admin-content-target');
    }, []);

    return (
        <div className={`admin-shell${navigationOpen ? ' admin-shell--nav-open' : ''}`}>
            {navigationOpen && (
                <button
                    className={'admin-shell__overlay'}
                    type={'button'}
                    aria-label={'Close navigation'}
                    onClick={() => setNavigationOpen(false)}
                />
            )}

            <header className={'admin-topbar'}>
                <div className={'admin-topbar__inner'}>
                    <div className={'admin-topbar__left'}>
                        <button
                            className={'admin-topbar__menu'}
                            type={'button'}
                            aria-label={'Toggle navigation'}
                            onClick={() => setNavigationOpen((open) => !open)}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                        <a href={shellData.panelUrl} className={'admin-topbar__brand'}>
                            {shellData.appName}
                        </a>
                    </div>

                    <div className={'admin-topbar__right'}>
                        <a href={shellData.panelUrl} className={'admin-topbar__icon'} title={'Client Area'}>
                            <i className={'fa fa-th-large'} />
                        </a>
                        <a href={shellData.accountUrl} className={'admin-topbar__icon'} title={'Account'}>
                            <img src={shellData.avatar} alt={''} className={'admin-topbar__avatar'} />
                        </a>
                        <form action={shellData.logoutUrl} method={'POST'} className={'admin-topbar__logout'}>
                            <input type={'hidden'} name={'_token'} value={shellData.csrfToken} />
                            <button type={'submit'} className={'admin-topbar__icon'} title={'Logout'}>
                                <i className={'fa fa-sign-out'} />
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <nav className={`admin-subnav${navigationOpen ? ' is-open' : ''}`}>
                <div className={'admin-subnav__inner'}>
                    {navigationItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`admin-subnav__link${item.active ? ' is-active' : ''}`}
                            onClick={() => setNavigationOpen(false)}
                        >
                            <i className={`fa ${item.icon}`} />
                            <span>{item.label}</span>
                        </a>
                    ))}
                </div>
            </nav>

            <main className={'admin-page'}>
                <div className={'admin-page__inner'}>
                    <section id={'admin-header-target'} className={'admin-page__header'} />
                    <section id={'admin-flash-target'} className={'admin-page__flash'} />
                    <section id={'admin-content-target'} className={'admin-page__content admin-legacy-content'} />
                </div>
            </main>
        </div>
    );
}
