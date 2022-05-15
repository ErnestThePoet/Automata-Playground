import {Network} from "vis-network";

let network = undefined;

export function initGraph(containerElement, onClick,dragEnd) {
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
        },
        physics: {
            enabled:false
        }
    };

    network = new Network(containerElement, {}, options);

    network.on("click", onClick);
    network.on("dragEnd", dragEnd);
}

export function updateGraph(nodes, edges) {
    // store previous view properties to avoid vis.js auto view move
    const previousScale = network.getScale();
    const previousViewPosition = network.getViewPosition();

    network.setData({ nodes, edges });

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

    // restore previous view properties
    network.moveTo({
        position: previousViewPosition,
        scale: previousScale,
        offset: { x: 0, y: 0 }
    });
}

export function getNodePosition(id) {
    return network.getPosition(id);
}