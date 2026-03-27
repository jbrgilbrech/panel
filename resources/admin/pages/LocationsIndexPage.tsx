import React from 'react';
import { AdminCard, AdminField, AdminFormActions } from '../components';

type Props = {
    createAction: string;
    locations: Array<{ id: number; long: string; nodes: number; servers: number; short: string; viewUrl: string }>;
};

export default function LocationsIndexPage({ createAction, locations }: Props) {
    const token = (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || '';

    return (
        <div className={'admin-grid'}>
            <AdminCard title={'Location List'}>
                <div className={'admin-table-wrap'}>
                    <table className={'table table-hover'}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Short Code</th>
                                <th>Description</th>
                                <th className={'text-center'}>Nodes</th>
                                <th className={'text-center'}>Servers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location) => (
                                <tr key={location.id}>
                                    <td><code>{location.id}</code></td>
                                    <td><a href={location.viewUrl}>{location.short}</a></td>
                                    <td>{location.long}</td>
                                    <td className={'text-center'}>{location.nodes}</td>
                                    <td className={'text-center'}>{location.servers}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminCard>
            <AdminCard title={'Create Location'} className={'admin-card--primary'}>
                <form action={createAction} method={'POST'}>
                    <input type={'hidden'} name={'_token'} value={token} />
                    <AdminField label={'Short Code'} hint={'Example: us.nyc.lvl3'}>
                        <input type={'text'} name={'short'} className={'form-control'} />
                    </AdminField>
                    <AdminField label={'Description'}>
                        <textarea name={'long'} className={'form-control'} rows={4} />
                    </AdminField>
                    <AdminFormActions>
                        <button type={'submit'} className={'btn btn-success btn-sm'}>Create</button>
                    </AdminFormActions>
                </form>
            </AdminCard>
        </div>
    );
}
