import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => <div style={{ padding: 100 }}><Story /></div>,
    ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    items: [
        { content: '123dqsasadas', value: '1' },
        { content: '123dqsasadas', value: '2' },
    ],
    value: '1',
};

export const topLeft = Template.bind({});
topLeft.args = {
    items: [
        { content: '123dqsasadas', value: '1' },
        { content: '123dqsasadas', value: '2' },
    ],
    direction: 'top left',
    value: '1',
};

export const topRight = Template.bind({});
topRight.args = {
    items: [
        { content: '123dqsasadas', value: '1' },
        { content: '123dqsasadas', value: '2' },
    ],
    direction: 'top right',
    value: '1',
};

export const bottomLeft = Template.bind({});
bottomLeft.args = {
    items: [
        { content: '123dqsasadas', value: '1' },
        { content: '123dqsasadas', value: '2' },
    ],
    direction: 'bottom left',
    value: '1',
};

export const bottomRight = Template.bind({});
bottomRight.args = {
    items: [
        { content: '123dqsasadas', value: '1' },
        { content: '123dqsasadas', value: '2' },
    ],
    direction: 'bottom right',
    value: '1',
};
