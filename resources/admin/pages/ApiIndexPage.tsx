import React from 'react';
import { AdminCard } from '../components';

type Props = {
    createUrl: string;
    keys: Array<{
        created: string;
        createdBy: { url: string; username: string };
        display: string;
        identifier: string;
        lastUsed: string | null;
        memo: string;
        revokeUrl: string;
    }>;
};

export default function ApiIndexPage({ createUrl, keys }: Props) {
    const token = (document.querySelector('meta[name=_token]') as HTMLMetaElement)?.content || '';

    const revoke = async (url: string, row: HTMLTableRowElement | null) => {
        if (!window.confirm('Revoke this API key?')) return;
        const response = await fetch(url, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': token } });
        if (!response.ok) {
            window.alert('Failed to revoke API key.');
            return;
        }
        row?.remove();
    };

    return (
        <div className={'admin-grid'}>
            <AdminCard title={'Credentials List'} toolbar={<a href={createUrl} className={'btn btn-sm btn-primary'}>Create New</a>}>
                <div className={'admin-table-wrap'}>
                    <table className={'table table-hover'}>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Memo</th>
                                <th>Last Used</th>
                                <th>Created</th>
                                <th>Created by</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {keys.map((key) => (
                                <tr key={key.identifier} ref={undefined}>
                                    <td><code>{key.display}</code></td>
                                    <td>{key.memo}</td>
                                    <td>{key.lastUsed || '-'}</td>
                                    <td>{key.created}</td>
                                    <td><a href={key.createdBy.url}>{key.createdBy.username}</a></td>
                                    <td>
                                        <button
                                            type={'button'}
                                            className={'btn btn-xs btn-danger'}
                                            onClick={(event) => revoke(key.revokeUrl, event.currentTarget.closest('tr'))}
                                        >
                                            <i className={'fa fa-trash-o'} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminCard>
        </div>
    );
}
