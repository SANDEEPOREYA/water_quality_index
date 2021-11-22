/* 
   vs => standard values
   vi => ideal values 
*/

const vs = {
    ph: 9.06,
    turb: 5,
    temp: 25,
    ec: 1500,
    hardness: 500,
    alkalinity: 120,
    do: 8,
    bod: 4,
    cod: 25,
    nh4: 0.2,
    no3: 5,
    no2: 1,
    po4: 0.65,
    f: 1
};

const vi = {
    ph: 7,
    turb: 0,
    temp: 0,
    ec: 0,
    hardness: 0,
    alkalinity: 0,
    do: 14.6,
    bod: 0,
    cod: 0,
    nh4: 0,
    no3: 0,
    no2: 0,
    po4: 0,
    f: 0
};

function calculate_wqi(va) {
    // wi => unit weight
    // qi => quality rating
    // pro_sum_qi_wi => sum(qi * wi)
    // sum_wi => sum(wi)

    let wi = {};
    let qi = {};
    let del = [];
    let sum_wi = 0;
    let pro_sum_qi_wi = 0;
    let k = 0;
    
    for (let i in va) {
        if (isNaN(va[i])) {
            del.push(i);
        }
    }
    
    del.forEach((item) => {
        delete va[item];
    });

    for (let i in va) {
        k += Math.pow(vs[i], -1);
    }
    k = Math.pow(k, -1);
    for (let i in va) {
        let temp = (k/vs[i]);
        temp = Number(temp.toFixed(6));
        wi[i] = temp;
    }

    for (let i in va) {
        let temp = ((( va[i] - vi[i] )/( vs[i] - vi[i] )) * 100);
        temp = Number(temp.toFixed(6));
        qi[i] = temp;
    }

    for (let i in va) {
        sum_wi += wi[i];
        pro_sum_qi_wi += (qi[i] * wi[i]);
    }
    return (pro_sum_qi_wi/sum_wi);
}

module.exports = calculate_wqi;