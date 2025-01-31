import { Signal, Effect, isReactive } from "../reactive_lib.js";
import { ComponentLib } from "../common/component_lib.js";

const component_lib = new ComponentLib(isReactive, Effect);

const cell1 = new Signal(1);
const cell2 = new Signal(2);

const memo = new Effect( () => cell1.value + cell2.value);

var text1 = component_lib.text({ 'value': cell1, 'onchange': (event) => { cell1.value = Number(event.target.value);}});
var text2 = component_lib.text({ 'value': cell2, 'onchange': (event) => { cell2.value = Number(event.target.value);}});
var text3 = component_lib.text({ 'value': memo});

component_lib.add_to_main(text1, ' + ', text2, ' = ' , text3);
