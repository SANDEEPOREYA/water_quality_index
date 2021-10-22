var counter = 0;
var array = [];

function add_param(count) {
    var unit;
    var select = document.getElementById(`select-${count}`).value;
    if (select != 'Select Parameter...' && array[count].indexOf(select) == -1) {
        var form = document.getElementById(`form-${count}`);
        var div = document.createElement("DIV");
        div.setAttribute('class', 'row mt-3');
        //units of parameters
        if (select == 'latitude' || select == 'longitude' || select == 'ph') {
            unit = '';
        }
        else if (select == 'turbidity') {
            unit = ' (in NTU)';
        }
        else if (select == 'temperature') {
            unit = ' (in &deg;C)';
        }
        else if (select == 'electrical conductivity') {
            unit = ' (in S/m)';
        }
        else {
            unit = ' (in mg/l)';
        }
        if (select == 'ph') {
            html =  '<div class="col">\
                    <label>'+ select.charAt(0).toLowerCase() + select.charAt(1).toUpperCase() + `${unit}` +'</label>\
                    <input type="number" class="form-control" name="'+ select.split(' ').join('_') +'">\
                </div>';
        }
        else {
            html =  '<div class="col">\
                    <label>'+ select.charAt(0).toUpperCase() + select.slice(1) + `${unit}` +'</label>\
                    <input type="number" class="form-control" name="'+ select.split(' ').join('_') +'">\
                </div>';
        }
        
        div.innerHTML = html;
        form.appendChild(div);
        array[count].push(select);
    }
}

function add_form() {
    array[counter] = [];
    var parent = document.getElementById('parent');
    var div = document.createElement("DIV");
    div.setAttribute('class', 'card mb-3');
    div.setAttribute('id', `card-${counter}`)
    html =  '<div class="card-header">\
                <h5>Input Parameter Form - '+ (counter + 1) +'</h5>\
            </div>\
            <div class="card-body">\
                <div class="container d-flex justify-content-between">\
                    <select class="form-select form-select-sm w-75" id="select-'+ counter +'" aria-label=".form-select-sm example">\
                        <option selected disabled>Select Parameter...</option>\
                        <option value="latitude">Latitude</option>\
                        <option value="longitude">Longitude</option>\
                        <option value="ph">pH</option>\
                        <option value="turbidity">Turbidity</option>\
                        <option value="temperature">Temperature</option>\
                        <option value="electrical conductivity">Electrical Conductivity</option>\
                        <option value="hardness">Hardness</option>\
                        <option value="alkalinity">Alkalinity</option>\
                        <option value="dissolved oxygen">Dissolved Oxygen</option>\
                        <option value="biological oxygen demand">Biological Oxygen Demand</option>\
                        <option value="chemical oxygen demand">Chemical Oxygen Demand</option>\
                        <option value="ammonium">Ammonium</option>\
                        <option value="nitrate">Nitrate</option>\
                        <option value="nitrite">Nitrite</option>\
                        <option value="phosphate">Phosphate</option>\
                    </select>\
                    <button type="button" class="btn btn-primary" onclick="add_param('+ counter +')">Add Parameter</button>\
                </div>\
                <form id="form-'+ counter +'" method="POST" action="/output"></form>\
            </div>';
    div.innerHTML = html;
    parent.appendChild(div);
    counter++;

    var btn = document.getElementById('btn');
    btn_html = '<button type="button" class="btn btn-primary" style="margin-bottom: 3rem !important; margin-top: 1rem !important" onclick="submit()">Submit</button>';
    btn.innerHTML = btn_html;
}

function remove_form() {
    if (document.getElementById('parent').hasChildNodes()) {
        document.getElementById(`card-${counter - 1}`).remove();
        if (counter == 1) {
            document.getElementById('btn').innerHTML = "";
        }
        counter--;
        console.log(counter);
    }
}

async function submit() {
    const data = {};
    for (var i = 0; i < array.length; i++) {
        const obj = {};
        var form = document.getElementById(`form-${i}`);
        form.querySelectorAll("input").forEach(input => {
            obj[`${input.name}`] = input.value;
        });
        data[`${i}`] = obj;
    }

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const res = await fetch('/output', options);
    const json = await res.json();
    localStorage.setItem('json', JSON.stringify(json));
    window.location = '/output';
}