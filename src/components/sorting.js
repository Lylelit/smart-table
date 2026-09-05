import {sortCollection, sortMap} from "../lib/sort.js";

export function initSorting(buttons) {
    return (data, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            action.dataset.value = sortMap[action.dataset.value];
            field = action.dataset.field;
            order = action.dataset.value;

            buttons.forEach(button => {
                if (button.dataset.field !== action.dataset.field) {
                    button.dataset.value = 'none';
                }
            });
        } else {
            buttons.forEach(button => {
                if (button.dataset.value !== 'none') {
                    field = button.dataset.field;
                    order = button.dataset.value;
                }
            });
        }

        return sortCollection(data, field, order);
    }
}
