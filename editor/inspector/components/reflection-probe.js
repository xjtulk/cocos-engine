const { template, $, update } = require('./base');
// 排列时，相邻元素的间隔间距
const MARGIN = '4PX';

exports.template = template;
exports.$ = $;
exports.update = update;

const { setHidden, setDisabled, isMultipleInvalid } = require('../utils/prop');


exports.ready = function() {
    const $prop = document.createElement('ui-prop');
    this.$.componentContainer.before($prop);

    const $label = document.createElement('ui-label');
    $label.setAttribute('slot', 'label');
    $label.value = 'Generate';
    $prop.appendChild($label);

    const $button = document.createElement('ui-button');
    $button.setAttribute('slot', 'content');
    $button.setAttribute('class', 'blue');
    $button.innerText = 'Bake';
    $prop.appendChild($button);

    $button.addEventListener('confirm', async () => {
        console.log('confirm================');
    });
};


