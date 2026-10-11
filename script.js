
const gate = document.getElementById("gate");
const inputA = document.getElementById("inputA");
const inputB = document.getElementById("inputB");
const inputBLabel = document.getElementById("inputBLabel");
const output = document.getElementById("output");
const explanation = document.getElementById("explanation");
const gateSymbol = document.getElementById("gateSymbol");

function calculate() {
    const a = Number(inputA.textContent);
    const b = Number(inputB.textContent);
    const selectedGate = gate.value;
   
const gateText = document.getElementById("gateText");
const gateShape = document.getElementById("gateShape");

gateText.textContent = selectedGate;

const shapes = {
    AND: "M65 10 L100 10 A40 40 0 0 1 100 90 L65 90 Z",
    OR: "M60 10 Q100 10 140 50 Q100 90 60 90 Q85 50 60 10 Z",
    NOT: "M65 10 L135 50 L65 90 Z",
    NAND: "M65 10 L95 10 A35 35 0 0 1 95 90 L65 90 Z",
    NOR: "M60 10 Q100 10 130 50 Q100 90 60 90 Q85 50 60 10 Z",
    XOR: "M70 10 Q95 50 70 90 M60 10 Q100 10 140 50 Q100 90 60 90 Q85 50 60 10 Z",
    XNOR: "M70 10 Q95 50 70 90 M60 10 Q100 10 130 50 Q100 90 60 90 Q85 50 60 10 Z"
};

gateShape.setAttribute("d", shapes[selectedGate]);

const inversionCircle = document.getElementById("inversionCircle");

inversionCircle.style.display =
    ["NAND", "NOR", "XNOR", "NOT"].includes(selectedGate)
        ? "block"
        : "none";




    let result;

    switch (selectedGate) {
        case "AND":
            result = a && b;
            break;
        case "OR":
            result = a || b;
            break;
        case "NOT":
            result = a ? 0 : 1;
            break;
        case "NAND":
            result = (a && b) ? 0 : 1;
            break;
        case "NOR":
            result = (a || b) ? 0 : 1;
            break;
        case "XOR":
            result = a !== b ? 1 : 0;
            break;
        case "XNOR":
            result = a === b ? 1 : 0;
            break;
    }

    output.textContent = result;

    inputBLabel.style.display =
        selectedGate === "NOT" ? "none" : "flex";

    explanation.textContent =
        selectedGate === "NOT"
            ? `NOT(${a}) = ${result}`
            : `${selectedGate}(${a}, ${b}) = ${result}`;
}

inputA.addEventListener("click", () => {
    inputA.textContent = inputA.textContent === "0" ? "1" : "0";
    calculate();
});

inputB.addEventListener("click", () => {
    inputB.textContent = inputB.textContent === "0" ? "1" : "0";
    calculate();
});

gate.addEventListener("change", calculate);
gate.addEventListener("change", generateTruthTable);

function generateTruthTable() {
    const body = document.getElementById("truthTableBody");
    const selectedGate = gate.value;

    body.innerHTML = "";

    const combinations = selectedGate === "NOT"
        ? [[0], [1]]
        : [[0, 0], [0, 1], [1, 0], [1, 1]];

    combinations.forEach(inputs => {
        const a = inputs[0];
        const b = inputs[1] ?? 0;

        let result;

        switch (selectedGate) {
            case "AND": result = a && b; break;
            case "OR": result = a || b; break;
            case "NOT": result = a ? 0 : 1; break;
            case "NAND": result = (a && b) ? 0 : 1; break;
            case "NOR": result = (a || b) ? 0 : 1; break;
            case "XOR": result = a !== b ? 1 : 0; break;
            case "XNOR": result = a === b ? 1 : 0; break;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${a}</td>
            ${selectedGate === "NOT" ? "" : `<td>${b}</td>`}
            <td>${result}</td>
        `;
        body.appendChild(row);
    });
}

gate.addEventListener("change", generateTruthTable);

generateTruthTable();

calculate();