import { canvas, ctx } from "./script";

export function drawCircle(x,y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.stroke();
    console.log(x,y, radius)
    console.log('here circles')
}

export function drawCross(x,y, size) {
    ctx.beginPath();

    ctx.moveTo(x-size/2, y-size/2);
    ctx.lineTo(x+size/2, y+size/2);

    ctx.moveTo(x+size/2, y-size/2);
    ctx.lineTo(x-size/2, y+size/2);
    ctx.stroke();
}