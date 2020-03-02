import '@storybook/addon-backgrounds/register';
import '@storybook/addon-links/register';
import '@storybook/addon-notes/register';
import '@storybook/addon-console';
import '@storybook/addon-viewport/register';
import 'addon-contexts/register';
import 'storybook-dark-mode/register';
import addons from '@storybook/addons';
// import '@storybook/addon-jest/register';
// import '@storybook/addon-actions/register';

setTimeout(function () {
    addons.elements.tab["storybookjs/notes/panel"].title = "文档";
}, 180);
