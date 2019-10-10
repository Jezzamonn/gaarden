import Controller from './controller.js';
import Tone from 'tone';

let canvas = document.getElementById('canvas');
/** @type {!CanvasRenderingContext2D} */
let context = canvas.getContext('2d');

// Currently assuming square proportions.
const SIZE = 500;

let scale = 1;
let lastTime;
let controller;
let mouseDown = false;

function init() {
	lastTime = Date.now();
	controller = new Controller();

	handleResize();
	// Set up event listeners.
	window.addEventListener('resize', handleResize);
	// Kick off the update loop
	window.requestAnimationFrame(everyFrame);

	document.addEventListener('mousedown', (evt) => handleMouseDown({x: evt.clientX, y: evt.clientY }));
	document.addEventListener('mouseup', (evt) => handleMouseUp({x: evt.clientX, y: evt.clientY }));
	document.addEventListener('mousemove', (evt) => handleMouseMove({x: evt.clientX, y: evt.clientY }));
	document.addEventListener('touchstart', (evt) => {
		evt.preventDefault();
		handleMouseDown({x: evt.touches[0].clientX, y: evt.touches[0].clientY })
	});
	document.addEventListener('touchend', (evt) => {
		evt.preventDefault();
		handleMouseUp({x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY })
	});
	document.addEventListener('touchmove', (evt) => {
		evt.preventDefault();
		handleMouseMove({x: evt.touches[0].clientX, y: evt.touches[0].clientY })
	});
	
	window.Tone = Tone;
}

// TODO: Make tweak this to allow frame skipping for slow computers. Maybe.
function everyFrame() {
	update();
	render();
	requestAnimationFrame(everyFrame);
}

function update() {
	let curTime = Date.now();
	let dt = (curTime - lastTime) / 1000;
	controller.update(dt);
	lastTime = curTime;
}

function render() {
	// Clear the previous frame
	context.resetTransform();
	context.globalAlpha = 1;
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Set origin to middle and scale canvas
	context.translate(canvas.width / 2, canvas.height / 2);
	context.scale(scale, scale);

	controller.render(context);
}

function handleMouseDown(point) {
	mouseDown = true;
	if (Tone.context.state !== 'running') {
		Tone.context.resume();
	}

	const gamePoint = windowPointToGamePoint(point);
	controller.handleClick(gamePoint);

	handleMouseMove(point);
}

function handleMouseUp(point) {
	mouseDown = false;
	handleMouseMove(point);
}

function handleMouseMove(point) {
	const gamePoint = windowPointToGamePoint(point);
	controller.handleMouseMove(gamePoint, mouseDown);
}

function windowPointToGamePoint(p) {
	const pixelRatio = window.devicePixelRatio || 1;
	return {
		x: (p.x - window.innerWidth / 2) / (scale / pixelRatio),
		y: (p.y - window.innerHeight / 2) / (scale / pixelRatio),
	}
}

function handleResize(evt) {
	let pixelRatio = window.devicePixelRatio || 1;
	let width = window.innerWidth;
	let height = window.innerHeight;

	canvas.width = width * pixelRatio;
	canvas.height = height * pixelRatio;
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';

	// Math.max -> no borders (will cut off edges of the thing)
	// Math.min -> show all (with borders)
	// There are other options too :)
	scale = Math.min(canvas.width, canvas.height) / SIZE;

	render();
}

init();