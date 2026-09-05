import './fonts/ys-display/fonts.css'
import './style.css'

import {data as source} from "./data/dataset_1.js";

import {initData} from "./data.js";
import {processFormData} from "./lib/utils.js";

import {initTable} from "./components/table.js";
import {initPagination} from "./components/pagination.js";
import {initSorting} from "./components/sorting.js";
import {initFiltering} from "./components/filtering.js";
import {initSearching} from "./components/searching.js";

const {data, ...indexes} = initData(source);

function collectState() {
    const state = processFormData(new FormData(table.container));
    const rowsPerPage = parseInt(state.rowsPerPage);
    const page = parseInt(state.page ?? 1);

    return {
        ...state,
        rowsPerPage,
        page,
        total: [
            parseFloat(state.totalFrom),
            parseFloat(state.totalTo)
        ]
    };
}

function render(action) {
    const state = collectState();
    let result = data;

    result = search(result, state, action);
    result = filter(result, state, action);
    result = sort(result, state, action);
    result = paginate(result, state, action);

    table.render(result)
}

const table = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ['search', 'header', 'filter'],
    after: ['pagination']
}, render);

const search = initSearching('search');

const filter = initFiltering(table.filter.elements, {
    searchBySeller: indexes.sellers
});

const sort = initSorting([
    table.header.elements.sortByDate,
    table.header.elements.sortByTotal
]);

const paginate = initPagination(
    table.pagination.elements,
    (el, page, isCurrent) => {
        const input = el.querySelector('input');
        const label = el.querySelector('span');
        input.value = page;
        input.checked = isCurrent;
        label.textContent = page;
        return el;
    }
);

const app = document.querySelector('#app');
app.appendChild(table.container);

render();
