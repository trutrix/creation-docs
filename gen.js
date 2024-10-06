const RECORD_TABLE_HEADER = ['ID', 'Name', 'Type', 'Tags'];


document.addEventListener('DOMContentLoaded', function () {

    let records = record_list();
    let native_types = record_list();

    let main = document.querySelector('main');

    add_table(records, main);



});


function add_table(records, main) {



    for (let record of records) {

        let h1 = document.createElement('h2');
        h1.innerText = `${record.id} - ${record.name}`;
        main.appendChild(h1);


        let table = document.createElement('table');
        table.classList.add('record_table');
        main.appendChild(table);

        let tr = document.createElement('tr');
        table.appendChild(tr);

        for (let ch of RECORD_TABLE_HEADER) {
            let th = document.createElement('th');
            tr.appendChild(th);
            th.textContent = ch;
        }

        for (let field of record.fields) {
            let tr = document.createElement('tr');
            table.appendChild(tr);

            td = document.createElement('td');
            tr.appendChild(td);
            td.textContent = field.id;

            td = document.createElement('td');
            tr.appendChild(td);
            td.textContent = field.name;

            td = document.createElement('td');
            tr.appendChild(td);


            if (field.type instanceof Object) {
                let s = "";
                for (let key in field.type) {
                    //console.log(field.type);
                    s += `${key}: ${field.type[key]}`;
                    if (key != Object.keys(field.type)[Object.keys(field.type).length - 1]) {
                        s += ', ';
                    }
                }
                td.textContent = `{ ${s} }`;
            } else {

                td.textContent = field.type;
            }

            td = document.createElement('td');
            tr.appendChild(td);
            if (field.tags) {
                td.textContent = field.tags.join(', ');
            }
        }
        main.appendChild(document.createElement('hr'));
    }
    
}