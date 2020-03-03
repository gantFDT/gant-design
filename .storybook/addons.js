import addons from '@storybook/addons';
import '@storybook/addon-backgrounds/register';
import '@storybook/addon-links/register';
import '@storybook/addon-notes/register';
import '@storybook/addon-console';
import '@storybook/addon-viewport/register';
import 'addon-contexts/register';
import 'storybook-dark-mode/register';
import { STORY_RENDERED } from '@storybook/core-events';
// import '@storybook/addon-jest/register';
// import '@storybook/addon-actions/register';

addons.register('hackCanvasText', api => {
    api.on(STORY_RENDERED, story => {
        let simpleContents = document.getElementsByClassName('simplebar-content')
        for (let i = 0; i < simpleContents.length; i++) {
            let btn = simpleContents[i].querySelector('button');
            btn.innerText == 'Canvas' && (btn.innerText = '示例')
        }
    })
})

setTimeout(function () {
    addons.elements.tab["storybookjs/notes/panel"].title = "文档";
}, 180);
