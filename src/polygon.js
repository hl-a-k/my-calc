import { fabric } from 'fabric';
import { Polygon, Box, point, Relations } from '@flatten-js/core';

var min = 99;
var max = 999999;
var polygonMode = true;
var pointArray = new Array();
var lineArray = new Array();
var activeLine;
var activeShape = false;
var canvas
let line;

function count(x0, y0, x1, y1, dx, dy, rw, rh, roof) {
    let x = x0 - dx;
    let y = y0 - dy;
    let cnt = 0;
    for (let i = 0; x + (i + 1) * rw <= x1; i++)
        for (let j = 0; y + (j + 1) * rh <= y1; j++) {
            let _rec = new Box(x + i * rw, y + j * rh, x + i * rw + rw, y + j * rh + rh)
            if (Relations.inside(_rec, roof)) {
                cnt++
            }
        }

    return cnt;

}

function layout(points, canvas) {
    let ps = []
    for (let { x, y } of points) {
        ps.push(point(x, y))
    }
    let roof = new Polygon(ps)

    let { x: x0, y: y0 } = points[0];
    let { x: x1, y: y1 } = points[0];

    for (let i = 1; i < points.length; i++) {
        let { x: tx, y: ty } = points[i];
        x0 = Math.min(x0, tx);
        x1 = Math.max(x1, tx);

        y0 = Math.min(y0, ty);
        y1 = Math.max(y1, ty);
    }
    let rw = 10;
    let rh = 20;

    let mx_cnt = 0;
    let best_x = x0;
    let best_y = y0;

    for (let dx = 0; dx < rw; dx++) {
        for (let dy = 0; dy < rh; dy++) {
            let cnt = count(x0, y0, x1, y1, dx, dy, rw, rh, roof);
            if (cnt > mx_cnt) {
                mx_cnt = cnt;
                best_x = x0 - dx;
                best_y = y0 - dy;
            }
        }
    }

    console.log(best_x, best_y, x0, y0, mx_cnt)

    for (let i = 0; best_x + (i + 1) * rw <= x1; i++)
        for (let j = 0; best_y + (j + 1) * rh <= y1; j++) {
            let _rec = new Box(best_x + i * rw, best_y + j * rh, best_x + i * rw + rw, best_y + j * rh + rh)
            
            if (Relations.inside(_rec, roof)) {
                let fill = 'rgba(1,1,1,0.5)'
                var rect = new fabric.Rect({
                    left: best_x + i * rw,
                    top: best_y + j * rh,
                    originX: 'left',
                    originY: 'top',
                    width: rw,
                    height: rh,
                    fill,
                    transparentCorners: false
                });
                canvas.add(rect)
            }
        }
}

var prototypefabric = new function (ref) {
    this.initCanvas = function (ref) {
        canvas = window._canvas = new fabric.Canvas(ref);

        canvas.on('mouse:down', function (options) {
            if (options.target && options.target.id == pointArray[0].id) {
                prototypefabric.polygon.generatePolygon(pointArray);
            }
            if (polygonMode) {
                prototypefabric.polygon.addPoint(options);
            }
        });
        canvas.on('mouse:up', function (options) {

        });
        canvas.on('mouse:move', function (options) {
            if (activeLine && activeLine.class == "line") {
                var pointer = canvas.getPointer(options.e);
                activeLine.set({ x2: pointer.x, y2: pointer.y });

                var points = activeShape.get("points");
                points[pointArray.length] = {
                    x: pointer.x,
                    y: pointer.y
                }
                activeShape.set({
                    points: points
                });
                canvas.renderAll();
            }
            canvas.renderAll();
        });
    };
};


prototypefabric.polygon = {
    drawPolygon: function () {
        polygonMode = true;
        pointArray = new Array();
        lineArray = new Array();
        activeLine;
    },
    addPoint: function (options) {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var id = new Date().getTime() + random;
        var circle = new fabric.Circle({
            radius: 5,
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 0.5,
            left: (options.e.layerX / canvas.getZoom()),
            top: (options.e.layerY / canvas.getZoom()),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX: 'center',
            originY: 'center',
            id: id
        });
        if (pointArray.length == 0) {
            circle.set({
                fill: 'red'
            })
        }
        var points = [(options.e.layerX / canvas.getZoom()), (options.e.layerY / canvas.getZoom()), (options.e.layerX / canvas.getZoom()), (options.e.layerY / canvas.getZoom())];
        line = new fabric.Line(points, {
            strokeWidth: 2,
            fill: '#999999',
            stroke: '#999999',
            class: 'line',
            originX: 'center',
            originY: 'center',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false
        });
        if (activeShape) {
            var pos = canvas.getPointer(options.e);
            var points = activeShape.get("points");
            points.push({
                x: pos.x,
                y: pos.y
            });
            var polygon = new fabric.Polygon(points, {
                stroke: '#333333',
                strokeWidth: 1,
                fill: '#cccccc',
                opacity: 0.1,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false
            });
            canvas.remove(activeShape);
            canvas.add(polygon);
            activeShape = polygon;
            canvas.renderAll();
        }
        else {
            var polyPoint = [{ x: (options.e.layerX / canvas.getZoom()), y: (options.e.layerY / canvas.getZoom()) }];
            var polygon = new fabric.Polygon(polyPoint, {
                stroke: '#333333',
                strokeWidth: 1,
                fill: '#cccccc',
                opacity: 0.1,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false
            });
            activeShape = polygon;
            canvas.add(polygon);
        }
        activeLine = line;

        pointArray.push(circle);
        lineArray.push(line);

        canvas.add(line);
        canvas.add(circle);
        canvas.selection = false;
    },
    generatePolygon: function (pointArray) {
        var points = new Array();
        pointArray.forEach(point => {
            points.push({
                x: point.left,
                y: point.top
            });
            canvas.remove(point);
        })
        lineArray.forEach(line => {
            canvas.remove(line);
        })

        canvas.remove(activeShape).remove(activeLine);
        var polygon = new fabric.Polygon(points, {
            stroke: '#333333',
            strokeWidth: 0.5,
            fill: '#798f1a',
            opacity: 1,
            hasBorders: false,
            hasControls: false
        });
        canvas.add(polygon);

        layout(points, canvas)

        activeLine = null;
        activeShape = null;
        polygonMode = false;
        canvas.selection = true;
    }
};

export default prototypefabric;