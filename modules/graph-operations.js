import vis from "vis";

let network = undefined;

function initGraph(containerElement, onclick) {
    const options = {
        nodes: {
            shape: "circle",
            margin: 15,
            shapeProperties: {
                borderRadius: 20
            },
            shadow: {
                enabled: true,
                size: 3,
                x: 3,
                y: 3
            }
        },
        edges: {
            arrows: "to",
            color: {
                color: "#3e3e3e",
                hover: "#3e3e3e",
                highlight: "#3e3e3e",
                inherit: false
            },
            font: {
                align: "top"
            },
            width: 2
        },
        interaction: {
            hover: true
        }
    };

    network = new vis.Network(containerElement, {}, options);

    network.on("click", onclick);
}


function updateGraph(newData) {
    network.setData(newData);

    let newColorOptions = {
        groups: {
            "0": {
                color: "#83E083"
            },
            "1": {
                color: {
                    border: "#c53baf",
                    background: "#C991C0",
                    hover: {
                        border: "#c53baf",
                        background: "#ca7fbe"
                    },
                    highlight: {
                        border: "#ad1695",
                        background: "#ca7fbe"
                    }
                },
                font: {
                    color: "#ffffff"
                }
            },
            "2": {
                color: "#FF8E8E"
            }
        }
    };
    
    network.setOptions(newColorOptions);
}

export { initGraph, updateGraph };