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
    const FV = +state.PV * TVM.F.P(findPercentage(+state.IY), +state.N);
    document.getElementById('tvm-result').textContent = `Future Value: ${FV.toFixed(2)}`;
}

const button = document.getElementById("tvm-calculate")
button.onclick = () => calculateTVM() // setting on-click field in js instead of html
