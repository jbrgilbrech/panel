import React from 'react';
import { AdminCard, AdminField, AdminFormActions, AdminSplit } from '../components';

type Props = {
    action: string;
    location: { id: number; long: string; short: string };
    nodes: Array<{ fqdn: string; id: number; name: string; servers: number; viewUrl: string }>;
};

export default function LocationViewPage({ action, location, nodes }: Props) {
    const token = (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || '';
    return (
        <div className={'admin-grid'}>
            <AdminSplit>
                <AdminCard title={'Location Details'} className={'admin-card--primary'}>
                    <form action={action} method={'POST'}>
                        <input type={'hidden'} name={'_token'} value={token} />
                        <input type={'hidden'} name={'_method'} value={'PATCH'} />
                        <AdminField label={'Short Code'}>
                            <input type={'text'} name={'short'} className={'form-control'} defaultValue={location.short} />
                        </AdminField>
                        <AdminField label={'Description'}>
                            <textarea name={'long'} className={'form-control'} rows={4} defaultValue={location.long} />
                        </AdminField>
                        <AdminFormActions>
                            <button name={'action'} value={'delete'} className={'btn btn-sm btn-danger'}>Delete</button>
                            <button name={'action'} value={'edit'} className={'btn btn-sm btn-primary'}>Save</button>
                        </AdminFormActions>
                    </form>
                </AdminCard>
                <AdminCard title={'Nodes'}>
                    <div className={'admin-table-wrap'}>
                        <table className={'table table-hover'}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>FQDN</th>
                                    <th>Servers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nodes.map((node) => (
                                    <tr key={node.id}>
                                        <td><code>{node.id}</code></td>
                                        <td><a href={node.viewUrl}>{node.name}</a></td>
                                        <td><code>{node.fqdn}</code></td>
                                        <td>{node.servers}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </AdminCard>
            </AdminSplit>
        </div>
    );
}
