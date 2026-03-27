import React from 'react';
import { AdminCard } from '../components';

type UserRow = {
    avatar: string;
    canAccess: number;
    email: string;
    id: number;
    isAdmin: boolean;
    name: string;
    totpEnabled: boolean;
    username: string;
    viewUrl: string;
    ownedServersUrl: string;
    ownedServers: number;
};

type Props = {
    createUrl: string;
    paginationHtml: string | null;
    rows: UserRow[];
    search: string;
};

export default function UsersIndexPage({ createUrl, paginationHtml, rows, search }: Props) {
    return (
        <div className={'admin-grid'}>
            <AdminCard
                title={'User List'}
                toolbar={
                    <form action={''} method={'GET'} className={'admin-toolbar-form'}>
                        <input name={'filter[email]'} defaultValue={search} placeholder={'Search by email'} className={'admin-search'} />
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
                                <th>ID</th>
                                <th>Email</th>
                                <th>Client Name</th>
                                <th>Username</th>
                                <th className={'text-center'}>2FA</th>
                                <th className={'text-center'}>Servers Owned</th>
                                <th className={'text-center'}>Can Access</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <code>{user.id}</code>
                                    </td>
                                    <td>
                                        <a href={user.viewUrl}>{user.email}</a> {user.isAdmin && <i className={'fa fa-star text-yellow'} />}
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td className={'text-center'}>
                                        <i className={`fa ${user.totpEnabled ? 'fa-lock text-green' : 'fa-unlock text-red'}`} />
                                    </td>
                                    <td className={'text-center'}>
                                        <a href={user.ownedServersUrl}>{user.ownedServers}</a>
                                    </td>
                                    <td className={'text-center'}>{user.canAccess}</td>
                                    <td className={'text-center'}>
                                        <img src={user.avatar} style={{ height: 20 }} className={'img-circle'} alt={''} />
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
