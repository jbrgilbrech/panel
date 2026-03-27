import React from 'react';
import { AdminCard, AdminFormActions } from '../components';

type Props = {
    action: string;
    permissions: { n: number; r: number; rw: number };
    resources: string[];
};

export default function ApiCreatePage({ action, permissions, resources }: Props) {
    const token = (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || '';

    return (
        <form method={'POST'} action={action}>
            <input type={'hidden'} name={'_token'} value={token} />
            <div className={'admin-split admin-split--wide'}>
                <AdminCard title={'Select Permissions'} className={'admin-card--primary'}>
                    <div className={'admin-table-wrap'}>
                        <table className={'table table-hover'}>
                            <tbody>
                                {resources.map((resource) => (
                                    <tr key={resource}>
                                        <td className={'strong'}>{resource.replace(/_/g, ' ')}</td>
                                        <td className={'text-center'}><label><input type={'radio'} name={`r_${resource}`} value={permissions.r} /> Read</label></td>
                                        <td className={'text-center'}><label><input type={'radio'} name={`r_${resource}`} value={permissions.rw} /> Read &amp; Write</label></td>
                                        <td className={'text-center'}><label><input type={'radio'} name={`r_${resource}`} value={permissions.n} defaultChecked /> None</label></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </AdminCard>
                <AdminCard title={'Details'} className={'admin-card--primary'}>
                    <div className={'form-group'}>
                        <label className={'control-label'} htmlFor={'memoField'}>Description</label>
                        <input id={'memoField'} type={'text'} name={'memo'} className={'form-control'} />
                    </div>
                    <p className={'text-muted'}>Once created, these credentials cannot be edited. Create a new key if you need different permissions later.</p>
                    <AdminFormActions>
                        <button type={'submit'} className={'btn btn-success btn-sm'}>Create Credentials</button>
                    </AdminFormActions>
                </AdminCard>
            </div>
        </form>
    );
}
