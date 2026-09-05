import {rules, createComparison} from "../lib/compare.js";

export function initSearching(field) {
    const compare = createComparison(
        ['skipEmptyTargetValues'],
        [rules.searchMultipleFields(field, ['date', 'customer', 'seller'], false)]
    );

    return (data, state) => data.filter(row => compare(row, {
        [field]: state[field]
    }));
}
