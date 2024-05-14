import { TVM } from './src/tvm.js';
import { findPercentage } from './src/utils.js';

function createListeningObject(id) {
    let variable = { value: '' }
    document.getElementById(id).addEventListener('input', (event) => {
        variable.value = event.target.value;
        console.log(`${id}: ${variable.value}`);
    })

    return variable;
}

const pv = createListeningObject('PV')
const fv = createListeningObject('FV')
const pmt = createListeningObject('PMT')
const iy = createListeningObject('IY')
const n = createListeningObject('N')

function calculateTVM() {
    // const pv = parseFloat(document.getElementById('PV').value);
    // const pmt = parseFloat(document.getElementById('PMT').value);
    // const fv = parseFloat(document.getElementById('FV').value);
    // const iy = parseFloat(document.getElementById('IY').value);
    // const n = parseFloat(document.getElementById('N').value);
    // const FV = pv * TVM.F.P(findPercentage(iy), n);
    // document.getElementById('tvm-result').textContent = `Future Value: ${FV.toFixed(2)}`;
    console.info({
        pv: pv.value,
        fv,
        pmt: pmt.value,
        iy,
        n
    })
}

const button = document.getElementById("tvm-calculate")
button.onclick = () => calculateTVM() // setting on-click field in js instead of html
