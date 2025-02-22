import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Modal} from '../Modal';
import type {ModalProps} from '../Modal';

export default {
    title: 'Components/Overlays/Modal',
    component: Modal,
} as Meta;

export const Default: StoryFn<ModalProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Modal {...props} open={open} onClose={() => setOpen(false)}>
                <div style={{padding: 10}}>Modal content</div>
            </Modal>
            <div
                style={{
                    width: '100%',
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={() => setOpen(true)}>Show</Button>
            </div>
        </React.Fragment>
    );
};
