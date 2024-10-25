import { createSignal, createMemo, isReactive } from "../reactive_lib.js";
import { ComponentLib } from "../common/component_lib.js";

const component_lib = new ComponentLib(isReactive);

const [cell1, setCell1] = createSignal(1);
const [cell2, setCell2] = createSignal(2);

const memo = createMemo( () => cell1() + cell2());

var text1 = component_lib.text({ 'value': cell1, 'onchange': (event) => { setCell1(Number(event.target.value));}});
var text2 = component_lib.text({ 'value': cell2, 'onchange': (event) => { setCell2(Number(event.target.value));}});
var text3 = component_lib.text({ 'value': memo});
var button = component_lib.button({ 'textContent': 'Update', 'onclick': (_) => { component_lib.update(text3); }});

component_lib.add_to_main(text1, ' + ', text2, ' = ' , text3, button);
