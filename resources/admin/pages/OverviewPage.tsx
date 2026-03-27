import React from 'react';
import { AdminCard } from '../components';

type Props = {
    currentVersion: string;
    discordUrl: string;
    donationsUrl: string;
    isLatest: boolean;
    latestVersion: string | null;
};

export default function OverviewPage({ currentVersion, discordUrl, donationsUrl, isLatest, latestVersion }: Props) {
    return (
        <div className={'admin-grid'}>
            <AdminCard className={`admin-card--${isLatest ? 'success' : 'danger'}`} title={'System Information'}>
                <p className={'admin-copy'}>
                    {isLatest ? (
                        <>
                            You are running Pterodactyl Panel version <code>{currentVersion}</code>. Your panel is up-to-date.
                        </>
                    ) : (
                        <>
                            Your panel is <strong>not up-to-date.</strong> The latest version is{' '}
                            <a href={`https://github.com/Pterodactyl/Panel/releases/v${latestVersion}`} target={'_blank'} rel={'noreferrer'}>
                                <code>{latestVersion}</code>
                            </a>{' '}
                            and you are currently running version <code>{currentVersion}</code>.
                        </>
                    )}
                </p>
            </AdminCard>

            <div className={'admin-action-grid'}>
                <a href={discordUrl} className={'admin-action-card admin-action-card--warning'}>
                    <i className={'fa fa-support'} />
                    <span>Get Help</span>
                    <small>via Discord</small>
                </a>
                <a href={'https://pterodactyl.io'} className={'admin-action-card admin-action-card--primary'}>
                    <i className={'fa fa-link'} />
                    <span>Documentation</span>
                    <small>Official guides</small>
                </a>
                <a href={'https://github.com/pterodactyl/panel'} className={'admin-action-card admin-action-card--primary'}>
                    <i className={'fa fa-github'} />
                    <span>GitHub</span>
                    <small>Source code</small>
                </a>
                <a href={donationsUrl} className={'admin-action-card admin-action-card--success'}>
                    <i className={'fa fa-money'} />
                    <span>Support the Project</span>
                    <small>Keep development going</small>
                </a>
            </div>
        </div>
    );
}
