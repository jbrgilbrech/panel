import React from 'react';
import { AdminCard, AdminField, AdminFormActions, AdminSplit } from '../components';

type Props = {
    deleteAction: string;
    languages: Array<{ key: string; value: string; selected: boolean }>;
    updateAction: string;
    user: {
        canDelete: boolean;
        email: string;
        name_first: string;
        name_last: string;
        root_admin: boolean;
        username: string;
    };
};

export default function UserViewPage({ deleteAction, languages, updateAction, user }: Props) {
    const token = (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || '';

    return (
        <div className={'admin-grid'}>
            <form method={'post'} action={updateAction}>
                <input type={'hidden'} name={'_token'} value={token} />
                <input type={'hidden'} name={'_method'} value={'PATCH'} />
                <AdminSplit>
                    <AdminCard title={'Identity'} className={'admin-card--primary'}>
                        <AdminField label={'Email'}>
                            <input type={'email'} name={'email'} defaultValue={user.email} className={'form-control'} />
                        </AdminField>
                        <AdminField label={'Username'}>
                            <input type={'text'} name={'username'} defaultValue={user.username} className={'form-control'} />
                        </AdminField>
                        <AdminField label={'Client First Name'}>
                            <input type={'text'} name={'name_first'} defaultValue={user.name_first} className={'form-control'} />
                        </AdminField>
                        <AdminField label={'Client Last Name'}>
                            <input type={'text'} name={'name_last'} defaultValue={user.name_last} className={'form-control'} />
                        </AdminField>
                        <AdminField label={'Default Language'} hint={'The default language to use when rendering the Panel for this user.'}>
                            <select name={'language'} className={'form-control'}>
                                {languages.map((language) => (
                                    <option key={language.key} value={language.key} selected={language.selected}>
                                        {language.value}
                                    </option>
                                ))}
                            </select>
                        </AdminField>
                        <AdminFormActions>
                            <input type={'submit'} value={'Update User'} className={'btn btn-primary btn-sm'} />
                        </AdminFormActions>
                    </AdminCard>
                    <div className={'admin-stack'}>
                        <AdminCard title={'Password'}>
                            <AdminField label={'Password'} hint={`Leave blank to keep this user's password the same.`}>
                                <input type={'password'} name={'password'} className={'form-control'} />
                            </AdminField>
                        </AdminCard>
                        <AdminCard title={'Permissions'}>
                            <AdminField label={'Administrator'} hint={`Setting this to 'Yes' gives a user full administrative access.`}>
                                <select name={'root_admin'} className={'form-control'} defaultValue={user.root_admin ? '1' : '0'}>
                                    <option value={'0'}>No</option>
                                    <option value={'1'}>Yes</option>
                                </select>
                            </AdminField>
                        </AdminCard>
                    </div>
                </AdminSplit>
            </form>
            <AdminCard title={'Delete User'} className={'admin-card--danger'}>
                <p className={'admin-copy'}>There must be no servers associated with this account in order for it to be deleted.</p>
                <AdminFormActions>
                    <form action={deleteAction} method={'POST'}>
                        <input type={'hidden'} name={'_token'} value={token} />
                        <input type={'hidden'} name={'_method'} value={'DELETE'} />
                        <input type={'submit'} disabled={!user.canDelete} className={'btn btn-sm btn-danger'} value={'Delete User'} />
                    </form>
                </AdminFormActions>
            </AdminCard>
        </div>
    );
}
