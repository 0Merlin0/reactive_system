import { ReactiveObject, isReactive, Effect } from "../reactive_lib.js";
import { ReactiveObjectComponentLib } from "../common/component_lib.js";

const reactive_component_lib = new ReactiveObjectComponentLib(isReactive, Effect);

const state = new ReactiveObject( {
    $first: 1,
    $second: 2,
    $log: false
});

state.$memo = () => state.$first + state.$second;

var text1 = reactive_component_lib.text(new ReactiveObject( {
    'value': state.$first,
    'onchange': (event) => { state.$first = Number(event.target.value);}
}));
var text2 = reactive_component_lib.text(new ReactiveObject( {
    'value': state.$second,
    'onchange': (event) => { state.$second = Number(event.target.value);}}));
var text3 = reactive_component_lib.text(new ReactiveObject( {
    $value : () => state.$first + state.$second
} ));

reactive_component_lib.add_to_main(text1, ' + ', text2, ' = ' , text3);

const button = reactive_component_lib.button( new ReactiveObject( {
    $textContent: () => 'Log: ' + state.$log,
    onclick: (_) => { state.$log = !state.$log }
} ));

reactive_component_lib.add_to_main('<br/>', button);

new Effect(() => {
    console.log("Log memo called");
    if (state.$log) {
        reactive_component_lib.add_to_main('<br/>' + state.$first + " + " + state.$second + " = " + state.$memo)
}});
