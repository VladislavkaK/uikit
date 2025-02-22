import * as React from 'react';

import {Envelope, Xmark} from '@gravity-ui/icons';

import {Avatar} from '../Avatar';
import {Icon} from '../Icon';
import {block} from '../utils/cn';

import i18n from './i18n';
import type {UserLabelProps} from './types';

import './UserLabel.scss';

const b = block('user-label');

export const UserLabel = React.forwardRef<HTMLDivElement, UserLabelProps>(
    (
        {
            type = 'person',
            avatar,
            children,
            view = 'outlined',
            onClick,
            onCloseClick,
            className,
            style,
            qa,
            size = 's',
        },
        ref,
    ) => {
        const clickable = Boolean(onClick);
        const closeable = Boolean(onCloseClick);
        const MainComponent = clickable ? 'button' : 'div';

        let avatarView: React.ReactNode = null;

        let avatarProps;
        if (typeof avatar === 'string') {
            avatarProps = {
                imgUrl: avatar,
            };
        } else if (avatar && !React.isValidElement(avatar)) {
            avatarProps = avatar;
        } else if (!avatar && typeof children === 'string') {
            avatarProps = {
                text: children,
            };
        }

        switch (type) {
            case 'email':
                avatarView = <Avatar icon={Envelope} {...(avatarProps || {})} size={size} />;
                break;
            case 'empty':
                avatarView = null;
                break;
            case 'person':
            default:
                if (React.isValidElement(avatar)) {
                    avatarView = avatar;
                } else if (avatarProps) {
                    avatarView = <Avatar {...avatarProps} size={size} />;
                }
                break;
        }

        return (
            <div
                className={b(
                    {
                        view,
                        empty: !avatarView,
                        clickable,
                        closeable,
                        size,
                    },
                    className,
                )}
                style={style}
                data-qa={qa}
                ref={ref}
            >
                <MainComponent
                    className={b('main')}
                    type={clickable ? 'button' : undefined}
                    onClick={onClick}
                >
                    {avatarView ? <div className={b('avatar')}>{avatarView}</div> : null}
                    <div className={b('text')}>{children}</div>
                </MainComponent>
                {onCloseClick ? (
                    <button
                        className={b('close')}
                        type="button"
                        aria-label={i18n('label_remove-button')}
                        onClick={onCloseClick}
                    >
                        <Icon className={b('close-icon')} data={Xmark} size={12} />
                    </button>
                ) : null}
            </div>
        );
    },
);

UserLabel.displayName = 'UserLabel';
