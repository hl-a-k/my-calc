import { fabric } from 'fabric';
import {Polygon, Box, point, Relations} from '@flatten-js/core';

var min = 99;
var max = 999999;
var polygonMode = true;
var pointArray = new Array();
var lineArray = new Array();
var activeLine;
var activeShape = false;
var canvas
let line;

function drawOutletRec(points, canvas) {
    let ps = []
    for (let {x, y} of points) {
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

    let width = x1 - x0;
    let height = y1 - y0;

    var rect = new fabric.Rect({
        left: x0,
        top: y0,
        originX: 'left',
        originY: 'top',
        width,
        height,
        fill: 'rgba(100,10,10,0.5)',
        transparentCorners: false
    });

    let rw = 10;
    let rh = 20;

    for (let i = 0; i < Math.floor( width / rw); i++)
        for (let j = 0; j < Math.floor( height / rh); j++) {
            let _rec = new Box(x0 + i * rw, y0 + j * rh, x0 + i * rw + rw, y0 + j * rh + rh)
            let fill =  'rgba(100,100,100,0.5)'
            if (Relations.inside(_rec, roof)) {
                fill = 'rgba(1,1,1,0.5)'
            }

            var rect = new fabric.Rect({
                left: x0 + i * rw,
                top: y0 + j * rh,
                originX: 'left',
                originY: 'top',
                width:  rw,
                height: rh,
                fill,
                transparentCorners: false
            });
            canvas.add(rect)
        }
    canvas.add(rect)
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
            fill: 'red',
            opacity: 1,
            hasBorders: false,
            hasControls: false
        });
        canvas.add(polygon);

        drawOutletRec(points, canvas)

        activeLine = null;
        activeShape = null;
        polygonMode = false;
        canvas.selection = true;
    }
};

export default prototypefabric;