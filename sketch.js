let saggio;
let nodes = [];


function preload() {
    saggio = loadJSON("book.json");
}

const width = 800;

const widthLimit = width - 20;

function setup() {
    createCanvas(width, 1200);
    textSize(16);
    textAlign(LEFT, TOP);
    buildNodes(saggio, 0, null);
    nodes[0].visible = true;
    nodes[0].root = true;
}

function draw() {
    background(255);
    let y = 20;

    function drawText(content, node) {

        console.log(mouseY)


        // Conta quante righe verranno visualizzate
        let words = content.split(' ');
        let line = '';
        let lineHeight = 24;
        let lines = 1;
        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            let w = textWidth(testLine);
            if (w > widthLimit) {
                lines++;
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }
        node.h += lines * lineHeight;

        // Se il mouse è sopra questo nodo, usa grassetto
        if (mouseY > y && mouseY < y + node.h && node.titolo) {
            textStyle(BOLD);
        } else {
            textStyle(NORMAL);
        }
        text(content, 20, y, widthLimit);  // 760 = larghezza massima

        y += node.h + 4;

        textStyle(NORMAL);
    }

    for (let node of nodes) {
        if (node.visible) {
            fill(0);
            node.y = y;
            node.h = 0;
            let indent = '-' + '      '.repeat(node.depth);
            if (node.titolo) {
                let content = `${indent} ${node.titolo}`;
                if (!node.expanded) {
                    content += `: ${node.riassunto}`
                }
                drawText(content, node);
            } else {
                let content = `${indent} ${node.riassunto}`
                drawText(content, node);
            }
            // if (!node.expanded) {
            //     content = `${indent} ${node.riassunto}`;
            //     drawText(content, node);
            // }

        }
    }
}

function mousePressed() {
    for (let node of nodes) {
        if (node.visible && mouseY > node.y && mouseY < node.y + node.h) {
            if (node.expanded) {
                // Collassa: nasconde tutti i figli ricorsivamente
                collapseChildren(node);
                node.expanded = false;
            } else {
                // Espande: mostra solo i figli diretti
                for (let child of node.children) {
                    child.visible = true;
                }
                node.expanded = true;
            }
        }
    }
}

function buildNodes(data, depth, parent) {
    let node = {
        titolo: data.titolo,
        riassunto: data.riassunto || "",
        depth: depth,
        children: [],
        visible: false,
        expanded: false,
        y: 0,
        h: 0
    };
    nodes.push(node);
    if (parent) parent.children.push(node);
    node.parent = parent;

    if (data.capitoli) {
        for (let c of data.capitoli) {
            buildNodes(c, depth + 1, node);
        }
    }
    if (data.paragrafi) {
        for (let p of data.paragrafi) {
            buildNodes(p, depth + 1, node);
        }
    }

    return node;
}

function collapseChildren(node) {
    for (let child of node.children) {
        child.visible = false;
        child.expanded = false;
        collapseChildren(child); // Ricorsivo
    }
}
