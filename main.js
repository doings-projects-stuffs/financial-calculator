import { TVM } from "./src/tvm.js";
import { findPercentage } from "./src/utils.js";

const tvmVariables = {
    PV: {
        description: "Present Value",
        value: "",
    },
    FV: {
        description: "Future Value",
        value: "",
    },
    PMT: {
        description: "Payment",
        value: "",
    },
    IY: {
        description: "Interest Rate",
        value: "",
    },
    N: {
        description: "Periods",
        value: "",
    },
};

const tvmResult = document.getElementById("tvm-result");

for (const key in tvmVariables) {
    document.getElementById(key).addEventListener("input", (event) => {
        tvmVariables[key].value = event.target.value;
        console.log(`${key}: ${tvmVariables[key]}`);
    });
}

function calculateTVM() {
    tvmResult.textContent = "";
    let missingVariable = null;

    /**
     * @type {HTMLInputElement | null}
     */
    let ioBox = null;

    for (const variableName in tvmVariables) {
        if (tvmVariables[variableName].value === "") {
            if (missingVariable === null) {
                missingVariable = variableName;
            } else {
                // If more than one variable is missing, we'll do a different functionality
                tvmResult.textContent = "Please provide all but one variable.";
                return;
            }
        }
    }
    try {
        const iy = findPercentage(getInput("IY"));
        const n = getInput("N");
        // TODO: depending on if the two provided variables are contradicting when computing final value output an error or not
        switch (missingVariable) {
            case "PV": {
                let pv = 0;
                if (tvmVariables.FV.value) {
                    const fv = Number(tvmVariables.FV.value);
                    const pvFromFV = fv * TVM.P.F(iy, n);
                    pv += pvFromFV;
                }
                if (tvmVariables.PMT.value) {
                    const pmt = Number(tvmVariables.PMT.value);
                    const pvFromA = pmt * TVM.P.A(iy, n);
                    pv += pvFromA;
                }
                tvmVariables.PV.value = String(pv);

                ioBox = document.getElementById("PV");
                ioBox.value = tvmVariables.PV.value;
                break;
            }
            case "FV": {
                let fv = 0;
                if (tvmVariables.PV.value) {
                    const pv = Number(tvmVariables.PV.value);
                    const fvFromPV = pv * TVM.F.P(iy, n);
                    fv += fvFromPV;
                }
                if (tvmVariables.PMT.value) {
                    const pmt = Number(tvmVariables.PMT.value);
                    const fvFromA = pmt * TVM.F.A(iy, n);
                    fv += fvFromA;
                }
                tvmVariables.FV.value = String(fv);

                ioBox = document.getElementById("FV");
                ioBox.value = tvmVariables.FV.value;
                break;
            }
            case "PMT": {
                let pmt = 0;
                if (tvmVariables.FV.value) {
                    const fv = Number(tvmVariables.FV.value);
                    pmt += fv * TVM.A.F(iy, n);
                }
                if (tvmVariables.PV.value) {
                    const pv = Number(tvmVariables.PV.value);
                    pmt += pv * TVM.A.P(iy, n);
                }
                tvmVariables.PMT.value = String(pmt);

                ioBox = document.getElementById("PMT");
                ioBox.value = tvmVariables.PMT.value;
                break;
            }
            // case "IY": {

            // }
            // case "N": {

            // }
            default: {
                throw new Error(`WTF!? ${missingVariable}`);
            }
        }
    } catch (error) {
        console.error(error);
        tvmResult.textContent = "An error occurred during calculation.";
    }
}

/**
 * @param {keyof tvmVariables} key
 */
function getInput(key) {
    const value = tvmVariables[key].value;
    if (value) {
        return Number(value);
    } else {
        throw new Error(`Variable ${key} must be a defined number.`);
    }
}

const button = document.getElementById("tvm-calculate");
button.onclick = () => calculateTVM(); // setting on-click field in js instead of html
