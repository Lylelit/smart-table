import {cloneTemplate} from "../lib/utils.js";

export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    [...before].reverse().forEach(name => {
        root[name] = cloneTemplate(name);
        root.container.prepend(root[name].container);
    });

    after.forEach(name => {
        root[name] = cloneTemplate(name);
        root.container.append(root[name].container);
    });

    root.container.addEventListener('change', (event) => {
        if (event.target.matches('select, input[type="radio"]')) {
            onAction();
        }
    });
    root.container.addEventListener('reset', () => setTimeout(onAction));
    root.container.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && event.target.matches('input[type="text"]')) {
            event.preventDefault();
            onAction();
        }
    });
    root.container.addEventListener('submit', (event) => {
        event.preventDefault();
        onAction(event.submitter);
    });

    const render = (data) => {
        const rows = data.map(item => {
            const row = cloneTemplate(rowTemplate);

            Object.keys(item).forEach(key => {
                if (row.elements[key]) {
                    row.elements[key].textContent = item[key];
                }
            });

            return row.container;
        });

        root.elements.rows.replaceChildren(...rows);
    }

    return {...root, render};
}
