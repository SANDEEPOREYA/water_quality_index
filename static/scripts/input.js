var counter = 0;
var array = [];

function add_param(count) {
    var unit;
    var value;
    var attrib;
    var select = document.getElementById(`select-${count}`).value;
    if (select != 'Select Parameter...' && array[count].indexOf(select) == -1) {
        var parent = document.getElementById(`form-${count}`);
        var div = document.createElement("DIV");
        div.setAttribute('class', "row mt-3");
        //values
        if (select == 'ph') {
            value = 8.6;
            div.setAttribute('id', "acid");
            attrib = "acid";
        }
        else if (select == 'turbidity') {
            value = 3.68;
            div.setAttribute('id', "turb");
            attrib = 'turb';
        }
        else if (select == 'temperature') {
            value = 11.85;
            div.setAttribute('id', "temp");
            attrib = 'temp';
        }
        else if (select == 'electrical_conductivity') {
            value = 447;
            div.setAttribute('id', "ec");
            attrib = 'ec';
        }
        else if (select == "hardness") {
            value = 94.19;
            div.setAttribute('id', "hard");
            attrib = 'hard';
        }
        else if (select == "alkalinity") {
            value = 28.92;
            div.setAttribute('id', "base");
            attrib = 'base';
        }
        else if (select == "dissolved_oxygen") {
            value = 9.39;
            div.setAttribute('id', "o2");
            attrib = 'o2';
        }
        else if (select == "biological_oxygen_demand") {
            value = 5.89;
            div.setAttribute('id', "bod");
            attrib = 'bod';
        }
        else if (select == "chemical_oxygen_demand") {
            value = 7.67;
            div.setAttribute('id', "cod");
            attrib = 'cod';
        }
        else if (select == "ammonium") {
            value = 0.085;
            div.setAttribute('id', "nh4");
            attrib = 'nh4';
        }
        else if (select == "nitrate") {
            value = 0.34;
            div.setAttribute('id', "no3");
            attrib = 'no3';
        }
        else if (select == "nitrite") {
            value = 0.007;
            div.setAttribute('id', "no2");
            attrib = 'no2';
        }
        else if (select == "phosphate") {
            value = 0.062;
            div.setAttribute('id', "po4");
            attrib = 'po4';
        }
        //units of parameters
        if (select == 'ph') {
            unit = '';
        }
        else if (select == 'turbidity') {
            unit = ' (in NTU)';
        }
        else if (select == 'temperature') {
            unit = ' (in &deg;C)';
        }
        else if (select == 'electrical_conductivity') {
            unit = ' (in S/m)';
        }
        else {
            unit = ' (in mg/l)';
        }

        if (select == 'ph') {
            html =  '<div class="d-flex flex-column">\
                        <label>'+ select.charAt(0).toLowerCase() + select.charAt(1).toUpperCase() + `${unit}` +'</label>\
                        <div class="d-flex">\
                            <input type="number" class="form-control" name="'+ select.split(' ').join('_') +'" value="'+ value +'">\
                            <button type="button" class="btn btn-danger" onclick="remove_parameter('+ attrib +', '+ count +', '+ select +')">\
                                <i class="fas fa-times"></i>\
                            </button>\
                        </div>\
                    </div>';
        }
        else {
            var str = select.replace(/_/g, ' ');
            html =  '<div class="d-flex flex-column">\
                        <label>'+ str.charAt(0).toUpperCase() + str.slice(1) + `${unit}` +'</label>\
                        <div class="d-flex">\
                            <input type="number" class="form-control" name="'+ select.split(' ').join('_') +'" value="'+ value +'">\
                            <button type="button" class="btn btn-danger" onclick="remove_parameter('+ attrib +', '+ count +', '+ select +')">\
                                <i class="fas fa-times"></i>\
                            </button>\
                        </div>\
                    </div>';
        }
        // console.log(count);
        div.innerHTML = html;
        if (array[count].length == 0) {
            parent.appendChild(div);
        }
        else {
            const existingNode = document.getElementById(`parameter-${count}`);
            parent.insertBefore(div, existingNode.nextSibling);
            console.log(existingNode);
        }
        array[count].push(select);
    }
    document.getElementById(`select-${count}`).value = 'Select Parameter...';
}

function remove_parameter(el, count, select) {
    el.remove();
    const result = array[count].filter(deleteSelect);
    function deleteSelect(temp) {
        return temp != select.name;
    }
    array[count] = result;
}



function add_form() {
    array[counter] = [];

    var parent = document.getElementById('parent');
    var div = document.createElement("DIV");
    div.setAttribute('class', 'card mb-3');
    div.setAttribute('id', `card-${counter}`)
    html =  '<div class="card-header h-50">\
            </div>\
            <div class="card-body">\
                <form id="form-'+ counter +'" method="POST" action="/output">\
                    <div class="row mt-3">\
                        <div class="col">\
                            <label>Latitude</label>\
                            <input type="number" class="form-control" name="latitude" value="24.3243">\
                        </div>\
                    </div>\
                    <div class="row mt-3">\
                        <div class="col">\
                            <label>Longitude</label>\
                            <input type="number" class="form-control" name="longitude" value="85.5216">\
                        </div>\
                    </div>\
                    <div class="d-flex justify-content-between mt-3" id=parameter-'+ counter +'>\
                        <select class="form-select form-select-sm w-75" id="select-'+ counter +'" aria-label=".form-select-sm example">\
                            <option selected disabled value="Select Parameter...">Select Parameter...</option>\
                            <option value="ph">pH</option>\
                            <option value="turbidity">Turbidity</option>\
                            <option value="temperature">Temperature</option>\
                            <option value="electrical_conductivity">Electrical Conductivity</option>\
                            <option value="hardness">Hardness</option>\
                            <option value="alkalinity">Alkalinity</option>\
                            <option value="dissolved_oxygen">Dissolved Oxygen</option>\
                            <option value="biological_oxygen_demand">Biological Oxygen Demand</option>\
                            <option value="chemical_oxygen_demand">Chemical Oxygen Demand</option>\
                            <option value="ammonium">Ammonium</option>\
                            <option value="nitrate">Nitrate</option>\
                            <option value="nitrite">Nitrite</option>\
                            <option value="phosphate">Phosphate</option>\
                        </select>\
                        <button type="button" class="btn btn-primary" onclick="add_param('+ counter +')">Add Parameter</button>\
                    </div>\
                </form>\
            </div>';
    div.innerHTML = html;
    parent.prepend(div);
    counter++;

    var btn = document.getElementById('btn');
    btn_html = '<button type="button" id="submit" class="btn btn-primary" style="margin-bottom: 3rem !important; margin-top: 1rem !important" onclick="submit();">Go</button>';
    btn.innerHTML = btn_html;
}

function remove_form() {
    if (document.getElementById('parent').hasChildNodes()) {
        counter--;
        document.getElementById(`card-${counter}`).remove();
        if (counter == 0) {
            let submit = document.getElementById("submit");
            document.getElementById('btn').removeChild(submit);
            window.location.reload();
        }
        // console.log(counter);
    }
}

function back() {
    window.history.go(-1);
}

async function submit() {
    const data = {};
    for (var i = 0; i < array.length; i++) {
        const obj = {};
        let form = document.getElementById(`form-${i}`);
        console.log(form.querySelectorAll("input"));
        form.querySelectorAll("input").forEach(input => {
            obj[`${input.name}`] = input.value;
            console.log(input.value);
        });
        let url = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${obj.latitude}&lon=${obj.longitude}`;
        let reverse_geocoding = await (await fetch(url)).json();
        obj["address"] = reverse_geocoding.features[0].properties.display_name;
        
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