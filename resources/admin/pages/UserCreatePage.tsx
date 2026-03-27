import React from 'react';
import { AdminCard, AdminField, AdminFormActions, AdminSplit } from '../components';

type Props = {
    action: string;
    languages: Array<{ key: string; value: string; selected: boolean }>;
    old: {
        email?: string;
        name_first?: string;
        name_last?: string;
        password?: string;
        username?: string;
    };
};

export default function UserCreatePage({ action, languages, old }: Props) {
    return (
        <form method={'post'} action={action}>
            <AdminSplit>
                <AdminCard title={'Identity'} className={'admin-card--primary'}>
                    <input type={'hidden'} name={'_token'} value={(document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || ''} />
                    <AdminField label={'Email'}>
                        <input type={'text'} autoComplete={'off'} name={'email'} defaultValue={old.email || ''} className={'form-control'} />
                    </AdminField>
                    <AdminField label={'Username'}>
                        <input type={'text'} autoComplete={'off'} name={'username'} defaultValue={old.username || ''} className={'form-control'} />
                    </AdminField>
                    <AdminField label={'Client First Name'}>
                        <input type={'text'} autoComplete={'off'} name={'name_first'} defaultValue={old.name_first || ''} className={'form-control'} />
                    </AdminField>
                    <AdminField label={'Client Last Name'}>
                        <input type={'text'} autoComplete={'off'} name={'name_last'} defaultValue={old.name_last || ''} className={'form-control'} />
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
                        <input type={'submit'} value={'Create User'} className={'btn btn-success btn-sm'} />
                    </AdminFormActions>
                </AdminCard>

                <div className={'admin-stack'}>
                    <AdminCard title={'Permissions'}>
                        <AdminField label={'Administrator'} hint={`Setting this to 'Yes' gives a user full administrative access.`}>
                            <select name={'root_admin'} className={'form-control'}>
                                <option value={'0'}>No</option>
                                <option value={'1'}>Yes</option>
                            </select>
                        </AdminField>
                    </AdminCard>
                    <AdminCard title={'Password'}>
                        <div className={'alert alert-info'}>
                            Providing a user password is optional. New user emails prompt users to create a password the first time they login.
                        </div>
                        <AdminField label={'Password'}>
                            <input type={'password'} name={'password'} className={'form-control'} defaultValue={old.password || ''} />
                        </AdminField>
                    </AdminCard>
                </div>
            </AdminSplit>
        </form>
    );
}
