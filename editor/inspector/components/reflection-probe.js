const { template, $, update } = require('./base');
// 排列时，相邻元素的间隔间距
const MARGIN = '4PX';

exports.template = template;
exports.$ = $;
exports.update = update;

const { setHidden, setDisabled, isMultipleInvalid } = require('../utils/prop');

exports.ready = function() {
    // Handling in-line displayed attributes

    this.elements = {
        generate: {
            ready(element) {
                const $checkbox = element.querySelector('ui-checkbox[slot="content"]');

                const $generate = document.createElement('ui-button');
                $generate.setAttribute('style', `margin-right: ${MARGIN}`);
                $generate.setAttribute('slot', 'content');
                $generate.setAttribute('class', 'blue');
                $generate.setAttribute('tooltip', 'i18n:ENGINE.components.reflection_probe.generate_tips');
                const $generateLabel = document.createElement('ui-label');
                $generateLabel.setAttribute('value', 'i18n:ENGINE.components.reflection_probe.generate');
                $generate.appendChild($generateLabel);
                $checkbox.after($generate);

                // Hack: ui-button has extra events that are passed up to ui-prop ;
                $generate.addEventListener('change', (event) => {
                    console.log("change============");
                    event.stopPropagation();
                    Editor.Message.send('scene', 'snapshot');
                });

                $generate.addEventListener('confirm', async (event) => {
                    console.log("confirm============");
                    event.stopPropagation();

                    Editor.Message.send('scene', 'snapshot');
                });
                this.$.generateButton = $generate;
            },
            update(element, dump) {
            },
        },
    };
};
