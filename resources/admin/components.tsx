import React from 'react';

export const AdminCard = ({
    children,
    className = '',
    title,
    toolbar,
}: {
    children: React.ReactNode;
    className?: string;
    title?: React.ReactNode;
    toolbar?: React.ReactNode;
}) => (
    <section className={`admin-card ${className}`.trim()}>
        {(title || toolbar) && (
            <header className={'admin-card__header'}>
                <div>{title && <h2 className={'admin-card__title'}>{title}</h2>}</div>
                {toolbar && <div className={'admin-card__toolbar'}>{toolbar}</div>}
            </header>
        )}
        <div className={'admin-card__body'}>{children}</div>
    </section>
);

export const StatusBadge = ({ children, tone }: { children: React.ReactNode; tone: 'danger' | 'success' | 'warning' }) => (
    <span className={`admin-status admin-status--${tone}`}>{children}</span>
);

export const AdminSplit = ({ children }: { children: React.ReactNode }) => <div className={'admin-split'}>{children}</div>;

export const AdminFormActions = ({ children }: { children: React.ReactNode }) => <div className={'admin-form-actions'}>{children}</div>;

export const AdminField = ({
    children,
    hint,
    label,
}: {
    children: React.ReactNode;
    hint?: React.ReactNode;
    label: React.ReactNode;
}) => (
    <div className={'form-group'}>
        <label className={'control-label'}>{label}</label>
        <div>{children}</div>
        {hint && <p className={'text-muted small'}>{hint}</p>}
    </div>
);
