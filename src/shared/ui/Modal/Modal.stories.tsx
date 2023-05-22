import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae id perferendis perspiciatis provident, quia ratione sed voluptate. Error expedita vel veniam vero voluptatum. Culpa cum cupiditate distinctio eos id minima odio officia soluta veritatis vero. Architecto atque cumque laudantium molestias porro! Alias cum deleniti distinctio eius expedita fuga, illum nam nihil quia quo recusandae voluptatem. Aspernatur, nulla vel! Aperiam autem consectetur culpa eligendi hic ipsum iste libero mollitia nam odio, repellat, sunt suscipit veritatis. Architecto consectetur doloribus exercitationem hic incidunt iusto labore magnam, nesciunt nulla omnis possimus rem reprehenderit rerum sapiente sed sequi tempora temporibus tenetur ullam unde velit voluptatibus?',
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae id perferendis perspiciatis provident, quia ratione sed voluptate. Error expedita vel veniam vero voluptatum. Culpa cum cupiditate distinctio eos id minima odio officia soluta veritatis vero. Architecto atque cumque laudantium molestias porro! Alias cum deleniti distinctio eius expedita fuga, illum nam nihil quia quo recusandae voluptatem. Aspernatur, nulla vel! Aperiam autem consectetur culpa eligendi hic ipsum iste libero mollitia nam odio, repellat, sunt suscipit veritatis. Architecto consectetur doloribus exercitationem hic incidunt iusto labore magnam, nesciunt nulla omnis possimus rem reprehenderit rerum sapiente sed sequi tempora temporibus tenetur ullam unde velit voluptatibus?',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
