import { TVM } from './src/tvm.js';
import { findPercentage } from './src/utils.js';

const state = {
    PV: '',
    FV: '',
    PMT: '',
    IY: '',
    N: ''
}

for (const key in state) {
    document.getElementById(key).addEventListener('input', (event) => {
        state[key] = event.target.value;
        console.log(`${key}: ${state[key]}`);
    })
}

function calculateTVM() {
    // const pv = parseFloat(document.getElementById('PV').value);
    // const pmt = parseFloat(document.getElementById('PMT').value);
    // const fv = parseFloat(document.getElementById('FV').value);
    // const iy = parseFloat(document.getElementById('IY').value);
    // const n = parseFloat(document.getElementById('N').value);
    // const FV = pv * TVM.F.P(findPercentage(iy), n);
    // document.getElementById('tvm-result').textContent = `Future Value: ${FV.toFixed(2)}`;
    console.info(state)
}

const button = document.getElementById("tvm-calculate")
button.onclick = () => calculateTVM() // setting on-click field in js instead of html
