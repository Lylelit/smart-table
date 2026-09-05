import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    Object.entries(indexes).forEach(([name, values]) => {
        elements[name].append(
            ...Object.values(values).map(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                return option;
            })
        );
    });

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            action.parentElement.querySelector('input').value = '';
            state[field] = '';
        }

        return data.filter(row => compare(row, state));
    }
}
