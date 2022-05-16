import { Network } from "vis-network";
import { GROUP_COLOR_OPTIONS } from "styles/graph-theme";

let network = undefined;

export function initGraph(containerElement, onClick,dragEnd) {
    const options = {
        nodes: {
            font: {
                color:"#000000",
                face:"Libre Baskerville"
            },
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
        groups:GROUP_COLOR_OPTIONS,
        edges: {
            arrows: "to",
            color: {
                color: "#3e3e3e",
                hover: "#3e3e3e",
                highlight: "#3e3e3e",
                inherit: false
            },
            font: {
                align: "top",
                face: "Libre Baskerville"
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