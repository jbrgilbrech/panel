import React from 'react';
import { AdminCard, StatusBadge } from '../components';

type ServerRow = {
    actionUrl: string;
    connection: string;
    node: { name: string; url: string };
    owner: { username: string; url: string };
    status: 'active' | 'installing' | 'suspended';
    uuid: string;
    uuidShort: string;
    viewUrl: string;
    name: string;
};

type Props = {
    createUrl: string;
    paginationHtml: string | null;
    rows: ServerRow[];
    search: string;
};

export default function ServersIndexPage({ createUrl, paginationHtml, rows, search }: Props) {
    return (
        <div className={'admin-grid'}>
            <AdminCard
                title={'Server List'}
                toolbar={
                    <form action={''} method={'GET'} className={'admin-toolbar-form'}>
                        <input name={'filter[*]'} defaultValue={search} placeholder={'Search servers'} className={'admin-search'} />
                        <button type={'submit'} className={'btn btn-default'}>
                            <i className={'fa fa-search'} />
                        </button>
                        <a href={createUrl} className={'btn btn-primary'}>
                            Create New
                        </a>
                    </form>
                }
            >
                <div className={'admin-table-wrap'}>
                    <table className={'table table-hover'}>
                        <thead>
                            <tr>
                                <th>Server Name</th>
                                <th>UUID</th>
                                <th>Owner</th>
                                <th>Node</th>
                                <th>Connection</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((server) => (
                                <tr key={server.uuidShort}>
                                    <td>
                                        <a href={server.viewUrl}>{server.name}</a>
                                    </td>
                                    <td>
                                        <code title={server.uuid}>{server.uuid}</code>
                                    </td>
                                    <td>
                                        <a href={server.owner.url}>{server.owner.username}</a>
                                    </td>
                                    <td>
                                        <a href={server.node.url}>{server.node.name}</a>
                                    </td>
                                    <td>
                                        <code>{server.connection}</code>
                                    </td>
                                    <td className={'text-center'}>
                                        {server.status === 'active' && <StatusBadge tone={'success'}>Active</StatusBadge>}
                                        {server.status === 'installing' && <StatusBadge tone={'warning'}>Installing</StatusBadge>}
                                        {server.status === 'suspended' && <StatusBadge tone={'danger'}>Suspended</StatusBadge>}
                                    </td>
                                    <td className={'text-center'}>
                                        <a className={'btn btn-xs btn-default'} href={server.actionUrl}>
                                            <i className={'fa fa-wrench'} />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {paginationHtml && <div className={'admin-pagination'} dangerouslySetInnerHTML={{ __html: paginationHtml }} />}
            </AdminCard>
        </div>
    );
}
