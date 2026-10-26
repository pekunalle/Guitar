import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Mic, c as Drum, i as Music2, l as BookOpen, n as Settings2, o as ListMusic, r as ScanSearch, s as Guitar } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-23Mlc_p3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SHARP = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B"
];
var FINNISH = [
	"C",
	"Cis",
	"D",
	"Dis",
	"E",
	"F",
	"Fis",
	"G",
	"Gis",
	"A",
	"B",
	"H"
];
var DEGREE = [
	"1",
	"b2",
	"2",
	"b3",
	"3",
	"4",
	"b5",
	"5",
	"b6",
	"6",
	"b7",
	"7"
];
var INTERVAL = [
	"P1",
	"p2",
	"s2",
	"p3",
	"s3",
	"p4",
	"tt",
	"p5",
	"p6",
	"s6",
	"p7",
	"s7"
];
function pcOf(n) {
	return (n % 12 + 12) % 12;
}
function noteName(pc, finnish) {
	return finnish ? FINNISH[pcOf(pc)] : SHARP[pcOf(pc)];
}
function noteWithOctave(midi, finnish) {
	return `${noteName(pcOf(midi), finnish)}${Math.floor(midi / 12) - 1}`;
}
function midiToFreq(midi) {
	return 440 * 2 ** ((midi - 69) / 12);
}
function freqToMidi(freq) {
	return 69 + 12 * Math.log2(freq / 440);
}
function degreeName(pc, root, spell) {
	const semi = pcOf(pc - root);
	if (semi === 6 && spell?.sharp4) return "#4";
	if (semi === 8 && spell?.sharp5) return "#5";
	return DEGREE[semi];
}
function intervalName(pc, root, spell) {
	const semi = pcOf(pc - root);
	if (semi === 6 && spell?.sharp4) return "#4";
	if (semi === 8 && spell?.sharp5) return "#5";
	return INTERVAL[semi];
}
function labelFor(pc, root, mode, finnish, spell) {
	if (mode === "note") return noteName(pc, finnish);
	if (mode === "degree") return degreeName(pc, root, spell);
	return intervalName(pc, root, spell);
}
function spellFromFormula(formula) {
	return {
		sharp4: formula.includes("#4"),
		sharp5: formula.includes("#5")
	};
}
function norm(value) {
	return value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
function midiOf(open, fret) {
	return open + fret;
}
var SINGLE = /* @__PURE__ */ new Set([
	3,
	5,
	7,
	9,
	15,
	17,
	19,
	21
]);
var DOUBLE = /* @__PURE__ */ new Set([12, 24]);
function MarkerDot({ mark }) {
	if (mark.kind === "empty") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `mark mark-${mark.kind}`,
		"data-long": mark.label.length > 2 ? "1" : "0",
		children: mark.label
	});
}
var Fretboard = (0, import_react.memo)(function Fretboard({ tuning, fretCount, leftHanded, finnish = false, marker, onPlay }) {
	const scrollRef = (0, import_react.useRef)(null);
	const frets = Array.from({ length: fretCount }, (_, i) => i + 1);
	const fretOrder = leftHanded ? [...frets].reverse() : frets;
	const rows = tuning.midi.map((open, stringIndex) => ({
		open,
		stringIndex
	})).reverse();
	(0, import_react.useEffect)(() => {
		const el = scrollRef.current;
		if (!el) return;
		const snap = () => {
			el.scrollLeft = leftHanded ? el.scrollWidth : 0;
		};
		snap();
		const id = requestAnimationFrame(snap);
		return () => cancelAnimationFrame(id);
	}, [
		leftHanded,
		fretCount,
		tuning.id
	]);
	const nut = (stringIndex) => {
		const mark = marker(stringIndex, 0);
		const midi = midiOf(tuning.midi[stringIndex], 0);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "nut-cell",
			"aria-label": mark.aria,
			onClick: () => onPlay(stringIndex, 0, midi),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkerDot, { mark })
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "neck-frame",
		"data-left": leftHanded ? "1" : "0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "string-gutter",
			"aria-hidden": "true",
			children: rows.map(({ open, stringIndex }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "string-label",
				children: noteName(open, finnish)
			}, stringIndex))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "neck-scroll",
			ref: scrollRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "neck",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inlay-layer",
					"aria-hidden": "true",
					children: [
						leftHanded ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nut-spacer" }),
						fretOrder.map((fret) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inlay-cell",
							children: [SINGLE.has(fret) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dot" }) : null, DOUBLE.has(fret) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dot dot-a" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dot dot-b" })] }) : null]
						}, fret)),
						leftHanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nut-spacer" }) : null
					]
				}), rows.map(({ stringIndex }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "string-row",
					"data-gauge": String(stringIndex),
					children: [
						leftHanded ? null : nut(stringIndex),
						fretOrder.map((fret) => {
							const mark = marker(stringIndex, fret);
							const midi = midiOf(tuning.midi[stringIndex], fret);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "fret-cell",
								"aria-label": mark.aria,
								onClick: () => onPlay(stringIndex, fret, midi),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkerDot, { mark })
							}, fret);
						}),
						leftHanded ? nut(stringIndex) : null
					]
				}, stringIndex))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fret-nums",
				"aria-hidden": "true",
				children: [
					leftHanded ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nut-spacer" }),
					fretOrder.map((fret) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fret-num",
						"data-mark": SINGLE.has(fret) || DOUBLE.has(fret) ? "1" : "0",
						children: fret
					}, fret)),
					leftHanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nut-spacer" }) : null
				]
			})]
		})]
	});
});
function PitchReadout({ heard, finnish, idle }) {
	const cents = heard ? Math.max(-50, Math.min(50, heard.cents)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Kuultu nuotti"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "readout-note",
				children: heard ? noteName(heard.pc, finnish) : "–"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted tabular-nums",
				children: heard ? noteWithOctave(heard.midi, finnish) : idle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cents-track mt-3",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cents-mid" }), heard ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "cents-needle",
					style: { left: `${50 + cents}%` }
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm tabular-nums text-muted",
				children: heard ? `${heard.cents > 0 ? "+" : ""}${heard.cents} senttiä` : "Keskilinja on puhdas vire"
			})
		]
	});
}
function micErrorText(error) {
	if (error === "denied") return "Mikrofoni estetty. Salli se selaimen kysyessä tai sivuston asetuksista.";
	if (error === "missing") return "Mikrofonia ei löytynyt.";
	if (error === "failed") return "Mikrofonia ei saatu käyttöön.";
	return null;
}
function rmsOf(buf) {
	let sum = 0;
	for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
	return Math.sqrt(sum / buf.length);
}
function parabolic(corr, lag) {
	const y1 = corr[lag - 1] ?? corr[lag];
	const y2 = corr[lag];
	const y3 = corr[lag + 1] ?? corr[lag];
	const denom = y1 - 2 * y2 + y3;
	if (Math.abs(denom) < 1e-8) return lag;
	return lag + (y1 - y3) / (2 * denom);
}
/** Autocorrelation pitch detector. Returns null when the signal is too quiet or unclear. */
function detectPitch(input, sampleRate) {
	const rms = rmsOf(input);
	if (rms < .012) return null;
	const factor = 2;
	const length = Math.floor(input.length / factor);
	if (length < 64) return null;
	const buf = new Float32Array(length);
	for (let i = 0; i < length; i++) buf[i] = (input[i * factor] + input[i * factor + 1]) * .5;
	const rate = sampleRate / factor;
	const minF = 55;
	const maxF = 1040;
	const minLag = Math.max(2, Math.floor(rate / maxF));
	const maxLag = Math.min(length - 3, Math.floor(rate / minF));
	if (maxLag <= minLag + 2) return null;
	const corr = new Float32Array(maxLag + 2);
	for (let lag = minLag; lag <= maxLag; lag++) {
		let sum = 0;
		let energy = 0;
		const step = 2;
		for (let i = 0; i < length - lag; i += step) {
			const a = buf[i];
			sum += a * buf[i + lag];
			energy += a * a;
		}
		corr[lag] = energy > 1e-8 ? sum / energy : 0;
	}
	let peakLag = -1;
	let peak = 0;
	for (let lag = minLag + 1; lag < maxLag; lag++) {
		const c = corr[lag];
		if (c > peak) peak = c;
		if (c >= .42 && c >= corr[lag - 1] && c >= corr[lag + 1] && c > corr[lag - 1] + .002) {
			peakLag = lag;
			peak = c;
			break;
		}
	}
	if (peakLag < 0 || peak < .42) return null;
	const freq = rate / parabolic(corr, peakLag);
	if (!Number.isFinite(freq) || freq < minF || freq > maxF) return null;
	const exact = freqToMidi(freq);
	const midi = Math.round(exact);
	const cents = Math.max(-99, Math.min(99, Math.round((exact - midi) * 100)));
	return {
		midi,
		pc: pcOf(midi),
		cents,
		freq,
		rms
	};
}
function usePitch(active, onStable) {
	const [heard, setHeard] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const onStableRef = (0, import_react.useRef)(onStable);
	const waveRef = (0, import_react.useRef)(null);
	onStableRef.current = onStable;
	(0, import_react.useEffect)(() => {
		if (!active) {
			setHeard(null);
			return;
		}
		let dead = false;
		let raf = 0;
		let audioCtx = null;
		const streamRef = { current: null };
		const tracker = {
			pc: -1,
			held: 0,
			fired: false,
			silent: 0
		};
		let lastUi = 0;
		const stopTracks = () => {
			streamRef.current?.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		};
		(async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ audio: {
					echoCancellation: false,
					noiseSuppression: false,
					autoGainControl: false
				} });
				if (dead) {
					stream.getTracks().forEach((track) => track.stop());
					return;
				}
				streamRef.current = stream;
				audioCtx = new AudioContext();
				const source = audioCtx.createMediaStreamSource(stream);
				const analyser = audioCtx.createAnalyser();
				analyser.fftSize = 2048;
				source.connect(analyser);
				const buf = new Float32Array(analyser.fftSize);
				const loop = () => {
					if (dead || !audioCtx) return;
					analyser.getFloatTimeDomainData(buf);
					if (!waveRef.current || waveRef.current.length !== buf.length) waveRef.current = new Float32Array(buf.length);
					waveRef.current.set(buf);
					const det = detectPitch(buf, audioCtx.sampleRate);
					const now = performance.now();
					if (!det) {
						tracker.silent += 1;
						if (tracker.silent > 12) {
							tracker.pc = -1;
							tracker.held = 0;
							tracker.fired = false;
						}
						if (tracker.silent === 4) setHeard(null);
					} else {
						tracker.silent = 0;
						if (now - lastUi > 80) {
							lastUi = now;
							setHeard(det);
						}
						if (Math.abs(det.cents) <= 35) {
							if (det.pc !== tracker.pc) {
								tracker.pc = det.pc;
								tracker.held = 1;
								tracker.fired = false;
							} else tracker.held += 1;
							if (!tracker.fired && tracker.held >= 9) {
								tracker.fired = true;
								onStableRef.current?.(det);
							}
						}
					}
					raf = requestAnimationFrame(loop);
				};
				setError(null);
				raf = requestAnimationFrame(loop);
			} catch (err) {
				if (dead) return;
				const name = err instanceof DOMException ? err.name : "";
				setError(name === "NotAllowedError" || name === "SecurityError" ? "denied" : name === "NotFoundError" ? "missing" : "failed");
			}
		})();
		return () => {
			dead = true;
			cancelAnimationFrame(raf);
			stopTracks();
			audioCtx?.close();
			waveRef.current = null;
		};
	}, [active]);
	return {
		heard,
		error,
		getWave: () => waveRef.current
	};
}
var ctx = null;
var metroGen = 0;
function getAudio() {
	if (!ctx) ctx = new AudioContext();
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function pluck(midi) {
	const c = getAudio();
	const freq = midiToFreq(midi);
	const sr = c.sampleRate;
	const len = Math.floor(sr * 1.15);
	const buffer = c.createBuffer(1, len, sr);
	const data = buffer.getChannelData(0);
	const period = Math.max(2, Math.round(sr / freq));
	for (let i = 0; i < period; i++) data[i] = (Math.random() * 2 - 1) * .55;
	for (let i = period; i < len; i++) {
		const a = data[i - period];
		const b = data[i - period + 1] ?? a;
		data[i] = (a + b) * .498 * .996;
	}
	const src = c.createBufferSource();
	src.buffer = buffer;
	const filter = c.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = Math.min(2800, freq * 8);
	const gain = c.createGain();
	gain.gain.value = .42;
	src.connect(filter);
	filter.connect(gain);
	gain.connect(c.destination);
	src.start();
}
function scheduleClick(c, when, accent) {
	const o = c.createOscillator();
	const g = c.createGain();
	o.type = "square";
	o.frequency.setValueAtTime(accent ? 1680 : 1080, when);
	g.gain.setValueAtTime(accent ? .16 : .07, when);
	g.gain.exponentialRampToValueAtTime(.001, when + .045);
	o.connect(g);
	g.connect(c.destination);
	o.start(when);
	o.stop(when + .05);
}
function startMetronome(bpm, beats, onVisual) {
	const c = getAudio();
	const id = ++metroGen;
	let next = c.currentTime + .08;
	let beat = 0;
	let timer = 0;
	const loop = () => {
		if (id !== metroGen) return;
		const horizon = c.currentTime + .28;
		while (next < horizon) {
			const accent = beat % beats === 0;
			scheduleClick(c, next, accent);
			const delay = Math.max(0, (next - c.currentTime) * 1e3);
			const shown = beat % beats;
			window.setTimeout(() => {
				if (id === metroGen) onVisual(shown);
			}, delay);
			next += 60 / bpm;
			beat += 1;
		}
		timer = window.setTimeout(loop, 50);
	};
	loop();
	return () => {
		metroGen += 1;
		window.clearTimeout(timer);
	};
}
var CHORD_CATS = [
	{
		id: "metal",
		label: "Metalli"
	},
	{
		id: "triad",
		label: "Kolmisoinnut"
	},
	{
		id: "seventh",
		label: "Septimit"
	},
	{
		id: "add",
		label: "Lisätyt"
	},
	{
		id: "all",
		label: "Kaikki"
	}
];
var CHORDS = [
	{
		id: "power",
		name: "Voimasointu",
		categories: ["metal"],
		intervals: [0, 7],
		formula: "1 5",
		tags: [
			"power",
			"5",
			"voima",
			"voimasointu",
			"metalli",
			"djent",
			"sabbath",
			"metallica",
			"palm",
			"chug"
		],
		hint: "Juuri ja kvintti. Ei terssiä, sopii molliin ja duuriin."
	},
	{
		id: "tritone",
		name: "Tritonus",
		categories: ["metal"],
		intervals: [0, 6],
		formula: "1 b5",
		tags: [
			"tritone",
			"tritonus",
			"slayer",
			"jannite",
			"dim",
			"diabolus"
		],
		hint: "Juuri ja b5. Yksi askel, ja riffi kuulostaa vaaralliselta."
	},
	{
		id: "min",
		name: "Molli",
		categories: ["metal", "triad"],
		intervals: [
			0,
			3,
			7
		],
		formula: "1 b3 5",
		tags: [
			"minor",
			"molli",
			"opeth",
			"sad"
		],
		hint: "Pieni kolmisointu."
	},
	{
		id: "maj",
		name: "Duuri",
		categories: ["triad"],
		intervals: [
			0,
			4,
			7
		],
		formula: "1 3 5",
		tags: ["major", "duuri"],
		hint: "Suuri kolmisointu. Metallissa usein vain kertosäkeessä."
	},
	{
		id: "dim",
		name: "Dimi",
		categories: ["metal", "triad"],
		intervals: [
			0,
			3,
			6
		],
		formula: "1 b3 b5",
		tags: [
			"dim",
			"diminished",
			"dimi",
			"jannite"
		],
		hint: "Pieni terssi ja vähennetty kvintti."
	},
	{
		id: "aug",
		name: "Ylinouseva",
		categories: ["triad"],
		intervals: [
			0,
			4,
			8
		],
		formula: "1 3 #5",
		tags: [
			"aug",
			"augmented",
			"ylinouseva"
		],
		hint: "Suuri terssi ja ylinouseva kvintti."
	},
	{
		id: "sus2",
		name: "Sus2",
		categories: ["metal", "add"],
		intervals: [
			0,
			2,
			7
		],
		formula: "1 2 5",
		tags: [
			"sus2",
			"avoin",
			"djent",
			"atmosphere",
			"moderni"
		],
		hint: "Terssin tilalla sekunti. Avoin moderni metalli."
	},
	{
		id: "sus4",
		name: "Sus4",
		categories: ["metal", "add"],
		intervals: [
			0,
			5,
			7
		],
		formula: "1 4 5",
		tags: [
			"sus4",
			"jannite",
			"purkaus"
		],
		hint: "Kvarttisuspensio. Purkautuu molliin tai duuriin."
	},
	{
		id: "min-b6",
		name: "Molli b6",
		categories: ["metal"],
		intervals: [
			0,
			3,
			8
		],
		formula: "1 b3 b6",
		tags: [
			"b6",
			"slayer",
			"harmoninen",
			"doom",
			"molli"
		],
		hint: "Harmonisen mollin väri: pieni terssi ja b6."
	},
	{
		id: "min7",
		name: "Molli7",
		categories: ["seventh"],
		intervals: [
			0,
			3,
			7,
			10
		],
		formula: "1 b3 5 b7",
		tags: [
			"m7",
			"minor7",
			"jazz",
			"opeth"
		],
		hint: "Molli ja pieni septimi."
	},
	{
		id: "dom7",
		name: "Dominanttiseiska",
		categories: ["seventh", "metal"],
		intervals: [
			0,
			4,
			7,
			10
		],
		formula: "1 3 5 b7",
		tags: [
			"7",
			"dominant",
			"blues",
			"seiska",
			"rock"
		],
		hint: "Duuri ja b7. Bluesrock ja kadenssi."
	},
	{
		id: "maj7",
		name: "Maj7",
		categories: ["seventh"],
		intervals: [
			0,
			4,
			7,
			11
		],
		formula: "1 3 5 7",
		tags: [
			"maj7",
			"jazz",
			"duuri"
		],
		hint: "Duuri ja suuri septimi."
	},
	{
		id: "m7b5",
		name: "Puolidimi",
		categories: ["seventh", "metal"],
		intervals: [
			0,
			3,
			6,
			10
		],
		formula: "1 b3 b5 b7",
		tags: [
			"m7b5",
			"half diminished",
			"half-diminished",
			"lokrinen",
			"jazz"
		],
		hint: "Lokrinen sointu. Kulkeva välisointu."
	},
	{
		id: "dim7",
		name: "Dim7",
		categories: ["seventh", "metal"],
		intervals: [
			0,
			3,
			6,
			9
		],
		formula: "1 b3 b5 bb7",
		tags: [
			"dim7",
			"diminished",
			"symmetrinen"
		],
		hint: "Symmetrinen. Sama sointu kolmen nauhan välein."
	},
	{
		id: "add9",
		name: "Add9",
		categories: ["add"],
		intervals: [
			0,
			2,
			4,
			7
		],
		formula: "1 2 3 5",
		tags: [
			"add9",
			"avoin",
			"duuri"
		],
		hint: "Duuri lisätyllä sekunnilla."
	},
	{
		id: "madd9",
		name: "Molli add9",
		categories: ["add", "metal"],
		intervals: [
			0,
			2,
			3,
			7
		],
		formula: "1 2 b3 5",
		tags: [
			"madd9",
			"minor add9",
			"opeth",
			"atmosphere",
			"doom"
		],
		hint: "Molli ja 9. Progen ja doomin avoin väri."
	}
];
function chordById(id) {
	return CHORDS.find((c) => c.id === id) ?? CHORDS[0];
}
function haystack$1(chord) {
	return norm([
		chord.name,
		chord.formula,
		chord.hint,
		...chord.tags,
		...chord.categories
	].join(" "));
}
function filterChords(cat, query) {
	const q = norm(query.trim());
	return CHORDS.filter((c) => {
		if (q) return haystack$1(c).includes(q);
		return cat === "all" || c.categories.includes(cat);
	});
}
function canonicalSlot(pc, tuning, fretCount) {
	let bestS = -1;
	let bestF = 99;
	const limit = Math.min(12, fretCount);
	for (let s = 0; s < tuning.midi.length; s++) {
		const open = tuning.midi[s];
		for (let f = 0; f <= limit; f++) {
			if (pcOf(open + f) !== pc) continue;
			if (f < bestF || f === bestF && s < bestS) {
				bestS = s;
				bestF = f;
			}
		}
	}
	return bestS >= 0 ? `${bestS}:${bestF}` : null;
}
function makeMarker(input) {
	const spell = spellFromFormula(input.formula);
	const toneSet = input.tones ? new Set(input.tones.map((i) => pcOf(input.root + i))) : null;
	const positional = /* @__PURE__ */ new Map();
	const placedPcs = /* @__PURE__ */ new Set();
	input.sequence.forEach((n, i) => {
		if (n.stringIndex == null || n.fret == null) return;
		positional.set(`${n.stringIndex}:${n.fret}`, i + 1);
		placedPcs.add(pcOf(n.pc));
	});
	const floating = /* @__PURE__ */ new Map();
	input.sequence.forEach((n, i) => {
		const pc = pcOf(n.pc);
		if (placedPcs.has(pc)) return;
		const slot = canonicalSlot(pc, input.tuning, input.fretCount);
		if (!slot || floating.has(slot)) return;
		floating.set(slot, i + 1);
	});
	return (stringIndex, fret) => {
		const open = input.tuning.midi[stringIndex];
		const midi = midiOf(open, fret);
		const pc = pcOf(midi);
		const key = `${stringIndex}:${fret}`;
		const name = noteName(pc, input.finnish);
		const place = fret === 0 ? "avoin" : `${fret}. nauha`;
		const base = `${`${noteName(open, input.finnish)}-kieli`}, ${place}, ${name}`;
		const inTone = Boolean(toneSet?.has(pc));
		const isRoot = inTone && pc === pcOf(input.root);
		const order = positional.get(key) ?? floating.get(key);
		const isTarget = input.target?.stringIndex === stringIndex && input.target.fret === fret;
		const isHeard = input.heardMidi != null && midi === input.heardMidi;
		if (isTarget) return {
			kind: "target",
			label: labelFor(pc, input.root, input.labelMode, input.finnish, spell),
			aria: `${base}, jahti`
		};
		if (order) return {
			kind: "seq",
			label: String(order),
			aria: `${base}, fraseen nuotti ${order}`
		};
		if (isHeard) return {
			kind: "heard",
			label: name,
			aria: `${base}, kuultu`
		};
		if (isRoot) return {
			kind: "root",
			label: labelFor(pc, input.root, input.labelMode, input.finnish, spell),
			aria: `${base}, juuri`
		};
		if (inTone) return {
			kind: "tone",
			label: labelFor(pc, input.root, input.labelMode, input.finnish, spell),
			aria: `${base}, skaalassa`
		};
		if (fret === 0) return {
			kind: "open",
			label: name,
			aria: base
		};
		return {
			kind: "empty",
			label: "",
			aria: base
		};
	};
}
var SCALE_CATS = [
	{
		id: "metal",
		label: "Metalli"
	},
	{
		id: "mode",
		label: "Moodit"
	},
	{
		id: "pent",
		label: "Pentatoniset"
	},
	{
		id: "jazz",
		label: "Jazz"
	},
	{
		id: "world",
		label: "Maailma"
	},
	{
		id: "all",
		label: "Kaikki"
	}
];
var SCALES = [
	{
		id: "phrygian",
		name: "Fryyginen",
		categories: ["metal", "mode"],
		intervals: [
			0,
			1,
			3,
			5,
			7,
			8,
			10
		],
		formula: "1 b2 b3 4 5 b6 b7",
		color: [
			1,
			3,
			8
		],
		prior: 1,
		modeIndex: 2,
		tags: [
			"phrygian",
			"fryyginen",
			"metalli",
			"riffi",
			"metallica",
			"tool",
			"gojira",
			"lamb of god",
			"megadeth",
			"slipknot",
			"rammstein",
			"djent"
		],
		hint: "Metalli-riffien perusskaala. b2 tekee soinnista heti pimeän."
	},
	{
		id: "phrygian-dominant",
		name: "Fryyginen dominantti",
		categories: ["metal"],
		intervals: [
			0,
			1,
			4,
			5,
			7,
			8,
			10
		],
		formula: "1 b2 3 4 5 b6 b7",
		color: [
			1,
			4,
			8
		],
		prior: .96,
		tags: [
			"phrygian dominant",
			"spanish",
			"hijaz",
			"fryyginen dominantti",
			"slayer",
			"nile",
			"behemoth",
			"yngwie",
			"children of bodom",
			"bodom",
			"arch enemy",
			"itainen"
		],
		hint: "Slayer- ja neoklassinen sävy. Harmonisen mollin viides moodi."
	},
	{
		id: "harmonic-minor",
		name: "Harmoninen molli",
		categories: ["metal"],
		intervals: [
			0,
			2,
			3,
			5,
			7,
			8,
			11
		],
		formula: "1 2 b3 4 5 b6 7",
		color: [
			3,
			8,
			11
		],
		prior: .94,
		tags: [
			"harmonic minor",
			"harmoninen",
			"molli",
			"yngwie",
			"neoclassical",
			"slayer",
			"iron maiden",
			"maiden",
			"children of bodom",
			"bodom",
			"arch enemy",
			"in flames",
			"nightwish",
			"opeth"
		],
		hint: "Nostettu septimi. Neoklassinen metalli ja dramaattinen kadenssi."
	},
	{
		id: "natural-minor",
		name: "Luonnollinen molli",
		categories: ["metal", "mode"],
		intervals: [
			0,
			2,
			3,
			5,
			7,
			8,
			10
		],
		formula: "1 2 b3 4 5 b6 b7",
		color: [
			3,
			8,
			10
		],
		prior: .98,
		modeIndex: 5,
		tags: [
			"aeolian",
			"aiolinen",
			"natural minor",
			"molli",
			"metallica",
			"iron maiden",
			"maiden",
			"black sabbath",
			"sabbath",
			"opeth",
			"trivium",
			"apocalyptica",
			"nightwish",
			"judas priest"
		],
		hint: "Aiolinen. Laaja molli ilman harmonisen mollin terävää septimiä."
	},
	{
		id: "minor-pent",
		name: "Mollipentatoninen",
		categories: ["metal", "pent"],
		intervals: [
			0,
			3,
			5,
			7,
			10
		],
		formula: "1 b3 4 5 b7",
		color: [3, 10],
		prior: .97,
		tags: [
			"pentatonic",
			"pentatoninen",
			"molli",
			"blues",
			"sabbath",
			"black sabbath",
			"pantera",
			"metallica",
			"alice in chains"
		],
		hint: "Viisi nuottia. Sabbath, Pantera ja klassinen riffimetalli."
	},
	{
		id: "blues",
		name: "Blues",
		categories: ["metal", "pent"],
		intervals: [
			0,
			3,
			5,
			6,
			7,
			10
		],
		formula: "1 b3 4 b5 5 b7",
		color: [
			3,
			6,
			10
		],
		prior: .82,
		tags: [
			"blues",
			"pentatoninen",
			"pantera",
			"sabbath",
			"black sabbath"
		],
		hint: "Mollipentatoninen plus b5. Likainen, bluespohjainen metalli."
	},
	{
		id: "dorian",
		name: "Doorinen",
		categories: ["metal", "mode"],
		intervals: [
			0,
			2,
			3,
			5,
			7,
			9,
			10
		],
		formula: "1 2 b3 4 5 6 b7",
		color: [3, 9],
		prior: .86,
		modeIndex: 1,
		tags: [
			"dorian",
			"doorinen",
			"iron maiden",
			"maiden",
			"opeth",
			"tool"
		],
		hint: "Molli, jossa suuri seksti. Maiden ja Opeth, ei täysin synkkä."
	},
	{
		id: "locrian",
		name: "Lokrinen",
		categories: ["metal", "mode"],
		intervals: [
			0,
			1,
			3,
			5,
			6,
			8,
			10
		],
		formula: "1 b2 b3 4 b5 b6 b7",
		color: [1, 6],
		prior: .7,
		modeIndex: 6,
		tags: [
			"locrian",
			"lokrinen",
			"djent",
			"meshuggah",
			"periphery",
			"diminished",
			"jannite"
		],
		hint: "b5 vie juuren alta. Djent ja dissonanssi."
	},
	{
		id: "dim-hw",
		name: "Puoli–kokosävel diminuutio",
		categories: ["metal"],
		intervals: [
			0,
			1,
			3,
			4,
			6,
			7,
			9,
			10
		],
		formula: "1 b2 b3 3 b5 5 6 b7",
		color: [
			1,
			3,
			6
		],
		prior: .72,
		tags: [
			"diminished",
			"diminuutio",
			"half whole",
			"half-whole",
			"djent",
			"meshuggah",
			"fear factory",
			"symmetrinen"
		],
		hint: "Symmetrinen kahdeksansävel. Meshuggah-henkinen jännite."
	},
	{
		id: "dim-wh",
		name: "Koko–puolisävel diminuutio",
		categories: ["metal"],
		intervals: [
			0,
			2,
			3,
			5,
			6,
			8,
			9,
			11
		],
		formula: "1 2 b3 4 b5 b6 6 7",
		color: [
			2,
			6,
			11
		],
		prior: .58,
		tags: [
			"diminished",
			"whole half",
			"dim7",
			"diminuutio",
			"jazz",
			"metalli"
		],
		hint: "Dim7 rakentuu tästä. Sama kuvio kolmen nauhan välein."
	},
	{
		id: "hungarian-minor",
		name: "Unkarilainen molli",
		categories: ["metal"],
		intervals: [
			0,
			2,
			3,
			6,
			7,
			8,
			11
		],
		formula: "1 2 b3 b5 5 b6 7",
		color: [
			3,
			6,
			11
		],
		prior: .6,
		tags: [
			"hungarian",
			"gypsy",
			"unkari",
			"mustalainen",
			"nile",
			"eksoottinen"
		],
		hint: "Harmoninen molli, jossa b5. Itäeurooppalainen metalli."
	},
	{
		id: "double-harmonic",
		name: "Kaksoisharmoninen",
		categories: ["metal"],
		intervals: [
			0,
			1,
			4,
			5,
			7,
			8,
			11
		],
		formula: "1 b2 3 4 5 b6 7",
		color: [
			1,
			4,
			11
		],
		prior: .64,
		tags: [
			"byzantine",
			"double harmonic",
			"kaksoisharmoninen",
			"nile",
			"behemoth",
			"itainen",
			"bysantti"
		],
		hint: "Kaksi ylinousevaa sekuntia. Bysantti, Nile, musta metalli."
	},
	{
		id: "oriental",
		name: "Itämainen",
		categories: ["metal", "world"],
		intervals: [
			0,
			1,
			4,
			5,
			6,
			9,
			10
		],
		formula: "1 b2 3 4 b5 6 b7",
		color: [
			1,
			4,
			6
		],
		prior: .48,
		tags: [
			"oriental",
			"itainen",
			"itämainen",
			"nile",
			"eksoottinen"
		],
		hint: "b2, suuri terssi ja b5. Lyhyt itämainen riffi."
	},
	{
		id: "persian",
		name: "Persialainen",
		categories: ["metal", "world"],
		intervals: [
			0,
			1,
			4,
			5,
			6,
			8,
			11
		],
		formula: "1 b2 3 4 b5 b6 7",
		color: [
			1,
			4,
			6,
			11
		],
		prior: .44,
		tags: [
			"persian",
			"persia",
			"persialainen",
			"nile",
			"eksoottinen"
		],
		hint: "Persialainen tetraordi eksoottiseen teemaan."
	},
	{
		id: "melodic-minor",
		name: "Melodinen molli",
		categories: ["metal", "jazz"],
		intervals: [
			0,
			2,
			3,
			5,
			7,
			9,
			11
		],
		formula: "1 2 b3 4 5 6 7",
		color: [
			3,
			9,
			11
		],
		prior: .6,
		tags: [
			"melodic minor",
			"melodinen",
			"jazz",
			"opeth",
			"neoclassical"
		],
		hint: "Suuri seksti ja septimi. Jazzmolli ja progemetalli."
	},
	{
		id: "ionian",
		name: "Duuri (jooninen)",
		categories: ["mode"],
		intervals: [
			0,
			2,
			4,
			5,
			7,
			9,
			11
		],
		formula: "1 2 3 4 5 6 7",
		color: [4, 11],
		prior: .74,
		modeIndex: 0,
		tags: [
			"major",
			"duuri",
			"ionian",
			"jooninen"
		],
		hint: "Tavallinen duuri. Metallissa useammin kertosäkeen valo."
	},
	{
		id: "lydian",
		name: "Lyydinen",
		categories: ["mode"],
		intervals: [
			0,
			2,
			4,
			6,
			7,
			9,
			11
		],
		formula: "1 2 3 #4 5 6 7",
		color: [6, 4],
		prior: .5,
		modeIndex: 3,
		tags: [
			"lydian",
			"lyydinen",
			"dream theater",
			"vai",
			"#4"
		],
		hint: "Duuri, jossa #4. Kelluva ja elokuvamainen."
	},
	{
		id: "mixolydian",
		name: "Miksolyydinen",
		categories: ["mode"],
		intervals: [
			0,
			2,
			4,
			5,
			7,
			9,
			10
		],
		formula: "1 2 3 4 5 6 b7",
		color: [4, 10],
		prior: .58,
		modeIndex: 4,
		tags: [
			"mixolydian",
			"miksolyydinen",
			"dominantti",
			"rock",
			"ac/dc",
			"acdc"
		],
		hint: "Duuri ja b7. Rock-riffi ja dominanttiseiska."
	},
	{
		id: "major-pent",
		name: "Duuripentatoninen",
		categories: ["pent"],
		intervals: [
			0,
			2,
			4,
			7,
			9
		],
		formula: "1 2 3 5 6",
		color: [4, 9],
		prior: .62,
		tags: [
			"pentatonic",
			"pentatoninen",
			"duuri",
			"country"
		],
		hint: "Duuri ilman kvarttia ja septimiä."
	},
	{
		id: "hirajoshi",
		name: "Hirajoshi",
		categories: ["world"],
		intervals: [
			0,
			2,
			3,
			7,
			8
		],
		formula: "1 2 b3 5 b6",
		color: [
			2,
			3,
			8
		],
		prior: .4,
		tags: [
			"hirajoshi",
			"japani",
			"japan",
			"koto"
		],
		hint: "Japanilainen pentatoninen. Lyhyt ja heti tunnistettava."
	},
	{
		id: "iwato",
		name: "Iwato",
		categories: ["world"],
		intervals: [
			0,
			1,
			5,
			6,
			10
		],
		formula: "1 b2 4 b5 b7",
		color: [1, 6],
		prior: .34,
		tags: [
			"iwato",
			"japani",
			"japan"
		],
		hint: "Synkkä japanilainen asteikko ilman terssiä ja kvinttiä."
	},
	{
		id: "harmonic-major",
		name: "Harmoninen duuri",
		categories: ["jazz"],
		intervals: [
			0,
			2,
			4,
			5,
			7,
			8,
			11
		],
		formula: "1 2 3 4 5 b6 7",
		color: [
			4,
			8,
			11
		],
		prior: .42,
		tags: [
			"harmonic major",
			"harmoninen duuri",
			"jazz"
		],
		hint: "Duuri, jossa b6. Yllättävä kadenssi."
	},
	{
		id: "lydian-dominant",
		name: "Lyydinen dominantti",
		categories: ["jazz"],
		intervals: [
			0,
			2,
			4,
			6,
			7,
			9,
			10
		],
		formula: "1 2 3 #4 5 6 b7",
		color: [6, 10],
		prior: .4,
		tags: [
			"lydian dominant",
			"mixolydian #4",
			"jazz",
			"melodinen molli"
		],
		hint: "Melodisen mollin neljäs moodi. #4 ja b7 yhdessä."
	},
	{
		id: "altered",
		name: "Alteroitu",
		categories: ["jazz"],
		intervals: [
			0,
			1,
			3,
			4,
			6,
			8,
			10
		],
		formula: "1 b2 b3 3 b5 b6 b7",
		color: [
			1,
			4,
			6
		],
		prior: .36,
		tags: [
			"altered",
			"superlocrian",
			"jazz",
			"dominantti"
		],
		hint: "Dominanttiseiskan alteroinnit. Jazzsoolon jännite."
	}
];
function scaleById(id) {
	return SCALES.find((s) => s.id === id) ?? SCALES[0];
}
function haystack(scale) {
	return norm([
		scale.name,
		scale.formula,
		scale.hint,
		...scale.tags,
		...scale.categories
	].join(" "));
}
function filterScales(cat, query) {
	const q = norm(query.trim());
	let list = SCALES.filter((s) => {
		if (q) return haystack(s).includes(q);
		return cat === "all" || s.categories.includes(cat);
	});
	if (!q && cat === "mode") list = [...list].sort((a, b) => (a.modeIndex ?? 99) - (b.modeIndex ?? 99));
	return list;
}
function uniquePcs(notes) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const n of notes) {
		const pc = pcOf(n.pc);
		if (seen.has(pc)) continue;
		seen.add(pc);
		out.push(pc);
	}
	return out;
}
function matchScales(notes) {
	const unique = uniquePcs(notes);
	if (unique.length < 2) return [];
	const first = pcOf(notes[0].pc);
	const last = pcOf(notes[notes.length - 1].pc);
	const lowest = pcOf(notes.reduce((a, b) => a.midi <= b.midi ? a : b).pc);
	const found = [];
	for (const scale of SCALES) for (let root = 0; root < 12; root++) {
		const set = new Set(scale.intervals.map((i) => (root + i) % 12));
		const outside = unique.filter((pc) => !set.has(pc));
		if (outside.length > 1) continue;
		const contained = outside.length === 0;
		const exact = contained && unique.length === scale.intervals.length;
		const colorInside = scale.color.filter((c) => unique.includes((root + c) % 12)).length;
		const colorHit = scale.color.length ? colorInside / scale.color.length : 0;
		const tightness = unique.length / scale.intervals.length;
		let score = contained ? 1 : .12;
		score += scale.prior * (contained ? .5 : .12);
		score += colorHit * (contained ? .9 : .35);
		score += tightness * .45;
		if (exact) score += 1.55;
		if (first === root) score += .14;
		if (last === root) score += .1;
		if (lowest === root) score += .12;
		if (!unique.includes(root)) score -= .2;
		found.push({
			scaleId: scale.id,
			root,
			score,
			contained,
			exact,
			outside,
			colorHit
		});
	}
	found.sort((a, b) => b.score - a.score);
	const contained = found.filter((m) => m.contained).slice(0, 8);
	if (contained.length >= 2) return contained;
	const near = found.filter((m) => !m.contained).slice(0, 3);
	return [...contained, ...near];
}
function pitchSetKey(scale, root) {
	return scale.intervals.map((i) => (root + i) % 12).sort((a, b) => a - b).join(".");
}
function motif(notes, root, finnish, spell) {
	const names = notes.map((n) => noteName(n.pc, finnish));
	const degrees = notes.map((n) => degreeName(n.pc, root, spell));
	return {
		notes: names.join(" → "),
		degrees: degrees.join(" ")
	};
}
function confidence(match, uniqueCount) {
	if (!match.contained) return "Melkein — yksi nuotti ulkona";
	if (match.exact) return "Täysi skaala";
	if (uniqueCount <= 3 || match.colorHit < .5) return "Mahdollinen — soita lisää, niin lista tarkentuu";
	return "Vahva osuma";
}
var TUNINGS = [
	{
		id: "standard",
		name: "Vakio E",
		midi: [
			40,
			45,
			50,
			55,
			59,
			64
		]
	},
	{
		id: "drop-d",
		name: "Drop D",
		midi: [
			38,
			45,
			50,
			55,
			59,
			64
		]
	},
	{
		id: "d-standard",
		name: "D-vire",
		midi: [
			38,
			43,
			48,
			53,
			57,
			62
		]
	},
	{
		id: "drop-c",
		name: "Drop C",
		midi: [
			36,
			43,
			48,
			53,
			57,
			62
		]
	},
	{
		id: "c-standard",
		name: "C-vire",
		midi: [
			36,
			41,
			46,
			51,
			55,
			60
		]
	},
	{
		id: "drop-b",
		name: "Drop B",
		midi: [
			35,
			42,
			47,
			52,
			56,
			61
		]
	},
	{
		id: "b-standard",
		name: "B-vire",
		midi: [
			35,
			40,
			45,
			50,
			54,
			59
		]
	},
	{
		id: "drop-a",
		name: "Drop A",
		midi: [
			33,
			40,
			45,
			50,
			54,
			59
		]
	},
	{
		id: "open-d",
		name: "Open D",
		midi: [
			38,
			45,
			50,
			54,
			57,
			62
		]
	},
	{
		id: "open-g",
		name: "Open G",
		midi: [
			38,
			43,
			50,
			55,
			59,
			62
		]
	},
	{
		id: "seven",
		name: "7-kielinen B",
		midi: [
			35,
			40,
			45,
			50,
			55,
			59,
			64
		]
	},
	{
		id: "seven-drop-a",
		name: "7 Drop A",
		midi: [
			33,
			40,
			45,
			50,
			55,
			59,
			64
		]
	},
	{
		id: "seven-drop-g",
		name: "7 Drop G",
		midi: [
			31,
			38,
			43,
			48,
			53,
			57,
			62
		]
	}
];
function tuningById(id) {
	return TUNINGS.find((t) => t.id === id) ?? TUNINGS[0];
}
var FRET_OK = [
	12,
	15,
	17,
	22,
	24
];
var KEY = "kitara-reeni-otelauta";
var lastSeq = {
	pc: -1,
	at: 0
};
var useKitara = create((set) => ({
	tab: "board",
	tuningId: "standard",
	root: 4,
	scaleId: "phrygian",
	chordId: "power",
	highlight: "scale",
	labelMode: "note",
	fretCount: 15,
	leftHanded: false,
	finnishNames: false,
	sequence: [],
	done: [],
	bpm: 80,
	beats: 4,
	huntBest: 0,
	setTab: (tab) => set({ tab }),
	setTuningId: (tuningId) => set({ tuningId }),
	setRoot: (root) => set({ root: pcOf(root) }),
	setScaleId: (scaleId) => set({
		scaleId,
		highlight: "scale"
	}),
	setChordId: (chordId) => set({
		chordId,
		highlight: "chord"
	}),
	setHighlight: (highlight) => set({ highlight }),
	setLabelMode: (labelMode) => set({ labelMode }),
	setFretCount: (fretCount) => set({ fretCount }),
	setLeftHanded: (leftHanded) => set({ leftHanded }),
	setFinnishNames: (finnishNames) => set({ finnishNames }),
	addSequence: (note) => set((s) => {
		const pc = pcOf(note.pc);
		const now = Date.now();
		if (lastSeq.pc === pc && now - lastSeq.at < 420) return s;
		lastSeq = {
			pc,
			at: now
		};
		return { sequence: [...s.sequence, {
			...note,
			pc,
			id: `${now.toString(36)}-${s.sequence.length}`
		}].slice(-16) };
	}),
	removeSequence: (id) => set((s) => ({ sequence: s.sequence.filter((n) => n.id !== id) })),
	clearSequence: () => set({ sequence: [] }),
	loadSequence: (notes) => set({ sequence: notes.slice(0, 16).map((n, i) => ({
		...n,
		pc: pcOf(n.pc),
		id: `ex-${i}`
	})) }),
	toggleDone: (id) => set((s) => ({ done: s.done.includes(id) ? s.done.filter((x) => x !== id) : [...s.done, id] })),
	setBpm: (bpm) => set({ bpm: Math.max(40, Math.min(220, Math.round(bpm))) }),
	setBeats: (beats) => set({ beats }),
	setHuntBest: (huntBest) => set({ huntBest }),
	applyMatch: (scaleId, root) => set({
		scaleId,
		root: pcOf(root),
		highlight: "scale",
		tab: "board"
	})
}));
function snapshot(s) {
	return {
		tab: s.tab,
		tuningId: s.tuningId,
		root: s.root,
		scaleId: s.scaleId,
		chordId: s.chordId,
		highlight: s.highlight,
		labelMode: s.labelMode,
		fretCount: s.fretCount,
		leftHanded: s.leftHanded,
		finnishNames: s.finnishNames,
		sequence: s.sequence,
		done: s.done,
		bpm: s.bpm,
		beats: s.beats,
		huntBest: s.huntBest
	};
}
var hydrated = false;
function hydrateKitara() {
	if (hydrated || typeof window === "undefined") return;
	hydrated = true;
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) {
			const data = JSON.parse(raw);
			useKitara.setState({
				tab: data.tab && [
					"board",
					"scales",
					"chords",
					"detect",
					"listen",
					"practice",
					"guide"
				].includes(data.tab) ? data.tab : "board",
				tuningId: data.tuningId && tuningById(data.tuningId).id === data.tuningId ? data.tuningId : "standard",
				root: typeof data.root === "number" ? pcOf(data.root) : 4,
				scaleId: data.scaleId && scaleById(data.scaleId).id === data.scaleId ? data.scaleId : "phrygian",
				chordId: data.chordId && chordById(data.chordId).id === data.chordId ? data.chordId : "power",
				highlight: data.highlight === "chord" ? "chord" : "scale",
				labelMode: data.labelMode === "degree" || data.labelMode === "interval" ? data.labelMode : "note",
				fretCount: data.fretCount && FRET_OK.includes(data.fretCount) ? data.fretCount : 15,
				leftHanded: Boolean(data.leftHanded),
				finnishNames: Boolean(data.finnishNames),
				sequence: Array.isArray(data.sequence) ? data.sequence.slice(0, 16) : [],
				done: Array.isArray(data.done) ? data.done.filter((x) => typeof x === "string") : [],
				bpm: typeof data.bpm === "number" ? data.bpm : 80,
				beats: typeof data.beats === "number" ? data.beats : 4,
				huntBest: typeof data.huntBest === "number" ? data.huntBest : 0
			});
		}
	} catch {}
	useKitara.subscribe((s) => {
		try {
			localStorage.setItem(KEY, JSON.stringify(snapshot(s)));
		} catch {}
	});
}
var LABELS$1 = [
	{
		id: "note",
		label: "Nuotti"
	},
	{
		id: "degree",
		label: "Aste"
	},
	{
		id: "interval",
		label: "Intervalli"
	}
];
var SLAYER = [
	{
		pc: 4,
		midi: 40
	},
	{
		pc: 5,
		midi: 41
	},
	{
		pc: 8,
		midi: 44
	},
	{
		pc: 9,
		midi: 45
	},
	{
		pc: 11,
		midi: 47
	}
];
var PENT = [
	{
		pc: 4,
		midi: 40
	},
	{
		pc: 7,
		midi: 43
	},
	{
		pc: 9,
		midi: 45
	},
	{
		pc: 11,
		midi: 47
	},
	{
		pc: 2,
		midi: 50
	}
];
function BoardView({ onSettings }) {
	const [listening, setListening] = (0, import_react.useState)(false);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const tab = useKitara((s) => s.tab);
	const tuningId = useKitara((s) => s.tuningId);
	const root = useKitara((s) => s.root);
	const scaleId = useKitara((s) => s.scaleId);
	const chordId = useKitara((s) => s.chordId);
	const highlight = useKitara((s) => s.highlight);
	const labelMode = useKitara((s) => s.labelMode);
	const fretCount = useKitara((s) => s.fretCount);
	const leftHanded = useKitara((s) => s.leftHanded);
	const finnishNames = useKitara((s) => s.finnishNames);
	const sequence = useKitara((s) => s.sequence);
	const setRoot = useKitara((s) => s.setRoot);
	const setScaleId = useKitara((s) => s.setScaleId);
	const setHighlight = useKitara((s) => s.setHighlight);
	const setLabelMode = useKitara((s) => s.setLabelMode);
	const setTab = useKitara((s) => s.setTab);
	const addSequence = useKitara((s) => s.addSequence);
	const removeSequence = useKitara((s) => s.removeSequence);
	const clearSequence = useKitara((s) => s.clearSequence);
	const loadSequence = useKitara((s) => s.loadSequence);
	const applyMatch = useKitara((s) => s.applyMatch);
	const tuning = tuningById(tuningId);
	const scale = scaleById(scaleId);
	const chord = chordById(chordId);
	const names = finnishNames ? FINNISH : SHARP;
	const metal = (0, import_react.useMemo)(() => filterScales("metal", ""), []);
	const phrase = tab === "detect";
	(0, import_react.useEffect)(() => {
		if (!phrase) setListening(false);
	}, [phrase]);
	const { heard, error } = usePitch(phrase && listening, (det) => {
		addSequence({
			pc: det.pc,
			midi: det.midi
		});
	});
	const matches = (0, import_react.useMemo)(() => phrase ? matchScales(sequence) : [], [phrase, sequence]);
	const unique = uniquePcs(sequence);
	const active = matches.find((m) => `${m.scaleId}:${m.root}` === picked) ?? matches[0] ?? null;
	const activeScale = active ? scaleById(active.scaleId) : null;
	const topKey = active && activeScale ? pitchSetKey(activeScale, active.root) : "";
	const shown = phrase && activeScale ? activeScale : highlight === "scale" ? scale : chord;
	const shownRoot = phrase && active ? active.root : root;
	const line = phrase && active && activeScale ? motif(sequence, active.root, finnishNames, spellFromFormula(activeScale.formula)) : null;
	const marker = (0, import_react.useMemo)(() => makeMarker({
		tuning,
		fretCount,
		root: shownRoot,
		finnish: finnishNames,
		labelMode,
		formula: shown.formula,
		tones: phrase && !activeScale ? null : shown.intervals,
		sequence: phrase ? sequence : [],
		heardMidi: phrase && heard && Math.abs(heard.cents) <= 45 ? heard.midi : null,
		target: null
	}), [
		tuning,
		fretCount,
		shownRoot,
		finnishNames,
		labelMode,
		shown,
		phrase,
		activeScale,
		sequence,
		heard
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			phrase ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Frase"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "title mt-1",
					children: "Mistä skaalasta?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Soita nuotteja peräkkäin, yksi kerrallaan. Napauta kaulaa tai käytä mikrofonia. Reeni kertoo, mihin skaalaan ne menevät."
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: tuning.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "title mt-1",
					children: [
						noteName(root, finnishNames),
						" ",
						shown.name
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "formula",
					children: shown.formula
				})
			] }),
			phrase ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						onClick: () => {
							setListening(false);
							setTab("board");
						},
						children: "Takaisin skaalaan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						"data-on": listening ? "1" : "0",
						onClick: () => setListening((v) => !v),
						children: listening ? "Pysäytä mikrofoni" : "Mikrofoni"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						onClick: () => {
							setPicked(null);
							loadSequence(SLAYER);
						},
						children: "Esimerkki Slayer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						onClick: () => {
							setPicked(null);
							loadSequence(PENT);
						},
						children: "Esimerkki pentatoninen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						disabled: sequence.length === 0,
						onClick: () => {
							setPicked(null);
							clearSequence();
						},
						children: "Tyhjennä"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "banner",
				onClick: () => setTab("detect"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kicker",
						children: "Frase"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block font-display text-2xl uppercase leading-none tracking-wide",
						children: "Soita nuotit — katso skaala"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm text-muted",
						children: sequence.length > 0 ? `Fraseessa on ${sequence.length} nuottia. Jatka siitä.` : "Napauta kaulaa järjestyksessä. Kokeile vaikka Slayerin E–F–G#–A–B."
					})
				]
			}),
			!phrase ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "row-scroll",
					"aria-label": "Juuri",
					children: names.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "choice",
						"data-on": root === i ? "1" : "0",
						onClick: () => setRoot(i),
						children: name
					}, name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row-scroll",
					"aria-label": "Metalliskaalat",
					children: [metal.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "chip",
						"data-on": highlight === "scale" && scaleId === item.id ? "1" : "0",
						onClick: () => {
							setScaleId(item.id);
							setHighlight("scale");
						},
						children: item.name
					}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "chip",
						onClick: () => setTab("scales"),
						children: "Kaikki skaalat"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn",
							"data-on": highlight === "scale" ? "1" : "0",
							onClick: () => setHighlight("scale"),
							children: "Skaala"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn",
							"data-on": highlight === "chord" ? "1" : "0",
							onClick: () => setHighlight("chord"),
							children: "Sointu"
						}),
						LABELS$1.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn",
							"data-on": labelMode === item.id ? "1" : "0",
							onClick: () => setLabelMode(item.id),
							children: item.label
						}, item.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn",
							onClick: onSettings,
							children: "Vire ja nauhat"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "legend",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch-root" }), " Juuri"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch-tone" }), " Skaalassa"] })]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Fraseesi · napauta nuottia poistaaksesi"
			}), sequence.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel mt-2 text-sm text-muted",
				children: "Ei vielä nuotteja. Kaksi eri säveltä riittää alkuun."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row-scroll mt-2",
				children: sequence.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "seq-chip",
					onClick: () => removeSequence(n.id),
					"aria-label": `Poista ${noteName(n.pc, finnishNames)}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i + 1 }), noteName(n.pc, finnishNames)]
				}, n.id))
			})] }),
			phrase && active && activeScale ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "verdict",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: confidence(active, unique.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "title mt-1",
						children: [
							noteName(active.root, finnishNames),
							" ",
							activeScale.name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "formula",
						children: activeScale.formula
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: active.contained ? "Nämä nuotit menevät tähän skaalaan." : `Lähin osuma. Ulkona: ${active.outside.map((pc) => noteName(pc, finnishNames)).join(", ")}.`
					}),
					line ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Järjestys "
							}),
							line.notes,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: " · asteet "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "formula",
								children: line.degrees
							})
						]
					}) : null
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fretboard, {
				tuning,
				fretCount,
				leftHanded,
				finnish: finnishNames,
				marker,
				onPlay: (stringIndex, fret, midi) => {
					pluck(midi);
					if (!phrase) return;
					setPicked(null);
					addSequence({
						pc: midi % 12,
						midi,
						stringIndex,
						fret
					});
				}
			}),
			phrase && micErrorText(error) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: micErrorText(error)
			}) : null,
			phrase && listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: heard ? `Kuultu ${noteName(heard.pc, finnishNames)} · ${heard.cents > 0 ? "+" : ""}${heard.cents} senttiä. Yksi sävel kerrallaan.` : "Soita yksi nuotti kerrallaan."
			}) : null,
			phrase && unique.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: unique.length === 0 ? "Napauta nauhoja järjestyksessä. Numerot jäävät kaulaan." : "Sama sävel ei vielä rajaa skaalaa. Soita toinen, eri nuotti."
			}) : null,
			phrase && active && activeScale ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: activeScale.hint
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-accent",
					onClick: () => applyMatch(active.scaleId, active.root),
					children: "Näytä koko skaala"
				})]
			}) : null,
			phrase && matches.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Muut skaalat, joihin nuotit mahtuvat"
				}), matches.slice(1, 6).map((m) => {
					const item = scaleById(m.scaleId);
					const same = pitchSetKey(item, m.root) === topKey;
					const on = active?.scaleId === m.scaleId && active.root === m.root;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "card-btn",
						"data-on": on ? "1" : "0",
						onClick: () => setPicked(`${m.scaleId}:${m.root}`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-xl uppercase tracking-wide",
							children: [
								noteName(m.root, finnishNames),
								" ",
								item.name
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-sm text-muted",
							children: [m.contained ? m.exact ? "Täysi skaala" : "Kaikki nuotit sisällä" : `Ulkona ${m.outside.map((pc) => noteName(pc, finnishNames)).join(", ")}`, same ? " · sama sävelistö, eri juuri" : ""]
						})]
					}, `${m.scaleId}-${m.root}`);
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: phrase ? "Otelauta näyttää parhaan osuman. Numerot ovat soittamasi järjestys. Mikrofoni kuulee yhden sävelen kerrallaan." : "Napauta nauhaa, niin se soi. Metalliskaalat ovat kaulan yläpuolella."
			})
		]
	});
}
function GuideView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "guide",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Opas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "title mt-1",
				children: "Asento, vire, riffi, nopeus"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "Lyhyt käytännön ohje metallikitaristille. Ei teoriaa teorian vuoksi."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Asento" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Kaula hieman yläviistoon. Sama korkeus seisten ja istuen — hihna ei saa laskea kitaraa syliin." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Peukalo kaulan takana, suunnilleen keskisormen kohdalla. Älä koukista sitä kaulan yli, ellei tarkoituksella vaimenna." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ranne suorana. Jos se taittuu, nosta kitaraa äläkä kurkota." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Frettisormi painaa heti nauhan takaa, sen verran että ääni on puhdas. Ylimääräinen voima syö nopeuden." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Vire" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Kuuntelu-välilehti näyttää nuotin ja sentit. Alle viisi senttiä riittää treeneihin, keikalla pyri lähelle nollaa." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Virittäessä soita yksi kieli kerrallaan. Muut kielet vaimentuvat, jos ne soivat mukana." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Drop-vireissä alikieli elää eniten. Tarkista se uudestaan, kun olet soittanut hetken." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Uudet kielet venyvät. Vedä kieliä varovasti ylös ja viritä uudestaan, kunnes ne pysyvät." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Metalliriffi" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Kämmenvaimennus: kämmenen reuna tallan päällä, ei keskellä kaulaa. Liika vaimennus tappaa sävelkorkeuden, liian vähän jättää räminän." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Fryyginen riffi alkaa usein avoimesta alikielestä ja 1. nauhan b2:sta. Se on E-juurella heti tunnistettava." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Gallop on kahdeksasosa ja kaksi kuudestoistaosaa. Maiden ja Priest elävät siitä. Aksentti on pitkällä nuotilla." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Voimasointu on juuri ja kvintti. Terssi puuttuu, siksi sama ote käy molliin ja duuriin." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Djent on lyhyt: tiukka vaimennus, sormi nousee heti, usein fryyginen tai lokrinen alikielillä. Älä anna nuotin soida yli." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pedaali tarkoittaa toistuvaa avointa alikieltä riffin välissä. Se pitää raskauden paikallaan, kun ylä-äänet liikkuvat." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Nopeus" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Metronomi on Reeni-välilehdellä. Nosta 4 bpm kerrallaan, ei kymmentä." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Harjoittele kahden iskun pätkä, ei koko sooloa. Kun pätkä on puhdas neljä tahtia, pidennä." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Vuorottelu tasajaossa alkaa alaslyönnistä. Jos aloitat ylhäältä, jako kääntyy ja käsi kiristyy." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Jännitys on nopeuden katto. Jos olkapää nousee, pysäytä ja pudota tempoa." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Kymmenen minuuttia puhdasta päivässä voittaa tunnin, jossa käsi tottuu virheisiin." })
			] })
		]
	});
}
function ScaleLibrary() {
	const [cat, setCat] = (0, import_react.useState)("metal");
	const [q, setQ] = (0, import_react.useState)("");
	const scaleId = useKitara((s) => s.scaleId);
	const setScaleId = useKitara((s) => s.setScaleId);
	const setTab = useKitara((s) => s.setTab);
	const list = (0, import_react.useMemo)(() => filterScales(cat, q), [cat, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "Skaalat"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "title mt-1",
			children: "Metalli ensin"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Haku katsoo nimen, kaavan ja bändin. Kokeile fryyginen, djent tai Slayer."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "field mt-3",
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Hae: fryyginen, djent, Slayer",
			"aria-label": "Hae skaaloja"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "row-scroll mt-3",
			children: SCALE_CATS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "chip",
				"data-on": !q && cat === item.id ? "1" : "0",
				onClick: () => {
					setCat(item.id);
					setQ("");
				},
				children: item.label
			}, item.id))
		}),
		q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [
				"Haku koko kirjastosta · ",
				list.length,
				" osumaa"
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-col gap-2",
			children: [list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel text-sm text-muted",
				children: "Ei osumia. Kokeile: molli, djent, Maiden."
			}) : null, list.map((scale) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "card-btn",
				"data-on": scale.id === scaleId ? "1" : "0",
				onClick: () => {
					setScaleId(scale.id);
					setTab("board");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl uppercase tracking-wide",
							children: scale.name
						}), scale.categories.includes("metal") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: "Metalli"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "formula",
						children: scale.formula
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm text-muted",
						children: scale.hint
					})
				]
			}, scale.id))]
		})
	] });
}
function ChordLibrary() {
	const [cat, setCat] = (0, import_react.useState)("metal");
	const [q, setQ] = (0, import_react.useState)("");
	const chordId = useKitara((s) => s.chordId);
	const setChordId = useKitara((s) => s.setChordId);
	const setTab = useKitara((s) => s.setTab);
	const list = (0, import_react.useMemo)(() => filterChords(cat, q), [cat, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "Soinnut"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "title mt-1",
			children: "Voima ensin"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Metallisoinnot ovat ensimmäisenä. Haku löytää myös djentin ja Slayerin."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "field mt-3",
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Hae: voimasointu, djent, dim",
			"aria-label": "Hae sointuja"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "row-scroll mt-3",
			children: CHORD_CATS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "chip",
				"data-on": !q && cat === item.id ? "1" : "0",
				onClick: () => {
					setCat(item.id);
					setQ("");
				},
				children: item.label
			}, item.id))
		}),
		q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [
				"Haku koko kirjastosta · ",
				list.length,
				" osumaa"
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-col gap-2",
			children: [list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel text-sm text-muted",
				children: "Ei osumia. Kokeile: molli, sus2, voima."
			}) : null, list.map((chord) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "card-btn",
				"data-on": chord.id === chordId ? "1" : "0",
				onClick: () => {
					setChordId(chord.id);
					setTab("board");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl uppercase tracking-wide",
							children: chord.name
						}), chord.categories.includes("metal") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: "Metalli"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "formula",
						children: chord.formula
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm text-muted",
						children: chord.hint
					})
				]
			}, chord.id))]
		})
	] });
}
function Waveform({ getWave }) {
	const ref = (0, import_react.useRef)(null);
	const getRef = (0, import_react.useRef)(getWave);
	getRef.current = getWave;
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		const draw = () => {
			raf = requestAnimationFrame(draw);
			const node = ref.current;
			if (!node) return;
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = node.clientWidth;
			const h = node.clientHeight;
			if (w < 2 || h < 2) return;
			const pw = Math.floor(w * dpr);
			const ph = Math.floor(h * dpr);
			if (node.width !== pw || node.height !== ph) {
				node.width = pw;
				node.height = ph;
			}
			const css = getComputedStyle(document.documentElement);
			const live = css.getPropertyValue("--color-primary").trim() || "#e23b24";
			const idle = css.getPropertyValue("--color-muted").trim() || "#b3a394";
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			const data = getRef.current();
			ctx.beginPath();
			ctx.lineWidth = 1.5;
			ctx.strokeStyle = data ? live : idle;
			if (!data) {
				ctx.moveTo(0, h / 2);
				ctx.lineTo(w, h / 2);
			} else {
				const step = Math.max(1, Math.floor(data.length / w));
				for (let x = 0; x < w; x++) {
					const v = data[Math.min(data.length - 1, x * step)] ?? 0;
					const y = h / 2 - Math.max(-1, Math.min(1, v)) * (h * .46);
					if (x === 0) ctx.moveTo(0, y);
					else ctx.lineTo(x, y);
				}
			}
			ctx.stroke();
		};
		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "wave",
		"aria-hidden": "true"
	});
}
function rollTarget(level, fretCount, midi, tones) {
	const max = level === 0 ? Math.min(3, fretCount) : level === 1 ? Math.min(7, fretCount) : fretCount;
	for (let i = 0; i < 40; i++) {
		const stringIndex = Math.floor(Math.random() * midi.length);
		const fret = Math.floor(Math.random() * (max + 1));
		const pc = pcOf(midi[stringIndex] + fret);
		if (!tones || tones.has(pc)) return {
			stringIndex,
			fret
		};
	}
	return {
		stringIndex: 0,
		fret: 0
	};
}
function ListenView() {
	const [listening, setListening] = (0, import_react.useState)(false);
	const [hunt, setHunt] = (0, import_react.useState)(false);
	const [level, setLevel] = (0, import_react.useState)(0);
	const [streak, setStreak] = (0, import_react.useState)(0);
	const [flash, setFlash] = (0, import_react.useState)(null);
	const [target, setTarget] = (0, import_react.useState)(null);
	const tuningId = useKitara((s) => s.tuningId);
	const root = useKitara((s) => s.root);
	const scaleId = useKitara((s) => s.scaleId);
	const chordId = useKitara((s) => s.chordId);
	const highlight = useKitara((s) => s.highlight);
	const labelMode = useKitara((s) => s.labelMode);
	const fretCount = useKitara((s) => s.fretCount);
	const leftHanded = useKitara((s) => s.leftHanded);
	const finnish = useKitara((s) => s.finnishNames);
	const huntBest = useKitara((s) => s.huntBest);
	const setHuntBest = useKitara((s) => s.setHuntBest);
	const tuning = tuningById(tuningId);
	const scale = scaleById(scaleId);
	const chord = chordById(chordId);
	const active = highlight === "scale" ? scale : chord;
	const toneSet = (0, import_react.useMemo)(() => new Set(active.intervals.map((i) => pcOf(root + i))), [active, root]);
	const succeed = (nextTarget) => {
		if (!nextTarget) return;
		const want = tuning.midi[nextTarget.stringIndex] + nextTarget.fret;
		return (midi) => {
			if (midi !== want) {
				setStreak(0);
				setFlash("miss");
				return;
			}
			setStreak((n) => {
				const value = n + 1;
				if (value > huntBest) setHuntBest(value);
				return value;
			});
			setFlash("hit");
			setTarget(rollTarget(level, fretCount, tuning.midi, toneSet));
		};
	};
	const { heard, error, getWave } = usePitch(listening, (det) => {
		if (!hunt || !target) return;
		if (Math.abs(det.cents) > 35) return;
		succeed(target)?.(det.midi);
	});
	const marker = (0, import_react.useMemo)(() => makeMarker({
		tuning,
		fretCount,
		root,
		finnish,
		labelMode,
		formula: active.formula,
		tones: active.intervals,
		sequence: [],
		heardMidi: heard && Math.abs(heard.cents) <= 45 ? heard.midi : null,
		target: hunt ? target : null
	}), [
		tuning,
		fretCount,
		root,
		finnish,
		labelMode,
		active,
		heard,
		hunt,
		target
	]);
	const place = target ? `${noteName(tuning.midi[target.stringIndex], finnish)}-kieli, ${target.fret === 0 ? "avoin" : `${target.fret}. nauha`} · ${noteName(pcOf(tuning.midi[target.stringIndex] + target.fret), finnish)}` : "Käynnistä jahti";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Kuuntelu"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "title mt-1",
					children: hunt ? "Nuottijahti" : "Vire ja nuotti"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Yksi sävel kerrallaan. Salli mikrofoni, kun selain kysyy. Jahdissa voit myös napauttaa merkityn paikan."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-primary",
					onClick: () => setListening((v) => !v),
					children: listening ? "Pysäytä" : "Kuuntele"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn",
					"data-on": hunt ? "1" : "0",
					onClick: () => {
						setHunt((v) => {
							const next = !v;
							if (next) {
								setTarget(rollTarget(level, fretCount, tuning.midi, toneSet));
								setStreak(0);
								setFlash(null);
							}
							return next;
						});
					},
					children: hunt ? "Jahti päällä" : "Nuottijahti"
				})]
			}),
			micErrorText(error) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: micErrorText(error)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PitchReadout, {
				heard: listening ? heard : null,
				finnish,
				idle: listening ? "Soita yksi nuotti" : "Mikrofoni ei ole päällä"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, { getWave }),
			hunt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Soita tämä"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl uppercase tracking-wide",
						children: place
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted tabular-nums",
						children: [
							"Putki ",
							streak,
							" · ennätys ",
							Math.max(huntBest, streak),
							flash === "hit" ? " · osuma" : flash === "miss" ? " · eri nuotti" : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "row-scroll mt-3",
						children: [
							0,
							1,
							2
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "choice",
							"data-on": level === n ? "1" : "0",
							onClick: () => {
								setLevel(n);
								setTarget(rollTarget(n, fretCount, tuning.midi, toneSet));
								setStreak(0);
								setFlash(null);
							},
							children: n === 0 ? "Alkeet" : n === 1 ? "Keski" : "Vaikea"
						}, n))
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fretboard, {
				tuning,
				fretCount,
				leftHanded,
				finnish,
				marker,
				onPlay: (stringIndex, fret, midi) => {
					pluck(midi);
					if (!hunt || !target) return;
					succeed(target)?.(midi);
				}
			})
		]
	});
}
var EXERCISES = [
	{
		id: "chrom",
		level: "Alkeet",
		title: "Kromaattinen nelikko",
		bpm: 60,
		beats: 4,
		scaleId: "phrygian",
		body: "Yksi sormi per nauha. Puhdas ääni ennen nopeutta.",
		steps: [
			"Soita 1–2–3–4 nauhaa alimmalla kielellä, neljäsosina.",
			"Siirry seuraavalle kielelle ilman taukoa käden asennossa.",
			"Peukalo pysyy kaulan takana, rannelinja suorana.",
			"Nosta metronomia vasta kun jokainen nuotti soi yhtä kovaa."
		]
	},
	{
		id: "pent-box",
		level: "Alkeet",
		title: "Mollipentatoninen laatikko",
		bpm: 70,
		beats: 4,
		scaleId: "minor-pent",
		body: "E-mollipentatoninen 5. nauhan asemassa. Juuri on 5. nauha.",
		steps: [
			"Aseta juuri E:ksi ja avaa mollipentatoninen otelaudalta.",
			"Soita laatikko ylös ja alas kahdeksasosina.",
			"Pidä sormet lähellä otelautaa, älä nosta niitä korville.",
			"Toista avoimella alikielellä pedaali väliin."
		]
	},
	{
		id: "power",
		level: "Alkeet",
		title: "Voimasointu ja kämmenvaimennus",
		bpm: 80,
		beats: 4,
		scaleId: "minor-pent",
		body: "Juuri ja kvintti. Kämmen kevyesti tallan päällä.",
		steps: [
			"Vaihda halutessasi Drop D:hen — alikieli ja A-kieli samassa otteessa.",
			"Chug kahdeksasosina. Vaimenna sen verran, että sävelkorkeus kuuluu.",
			"Siirrä otetta kaksi nauhaa kerrallaan, ranne ei kierry.",
			"Jätä väliin yksi iskunkohdan vaimennettu ghost-lyönti."
		]
	},
	{
		id: "b2",
		level: "Keskitaso",
		title: "Fryyginen b2-riffi",
		bpm: 90,
		beats: 4,
		scaleId: "phrygian",
		body: "Avoin alikieli ja heti 1. nauha. Metallin tutuin liike.",
		steps: [
			"Juuri E, skaala fryyginen, vakio- tai Drop D -vire.",
			"Soita avoin, 1. nauha, avoin, sitten 3. nauha.",
			"Palm mute vain avoimissa, 1. nauha saa soida.",
			"Lisää tritonus: 6. nauha samalla kielellä yllätysaksentiksi."
		]
	},
	{
		id: "harm",
		level: "Keskitaso",
		title: "Harmoninen molli, kolme per isku",
		bpm: 76,
		beats: 4,
		scaleId: "harmonic-minor",
		body: "Nostettu 7. aste tuntuu isolta loikalta. Soita se puhtaasti.",
		steps: [
			"E harmoninen molli, aloita 12. nauhalta tai avoimesta E:stä.",
			"Kolme nuottia per isku, vuorottelu alas-ylös-alas.",
			"Pysähdy b6–7–1 -liikkeeseen ja toista se hitaasti.",
			"Jos kielenvaihto sakkaa, harjoittele vain kahta kieltä."
		]
	},
	{
		id: "locrian",
		level: "Edistynyt",
		title: "Lokrinen pedaali",
		bpm: 100,
		beats: 4,
		scaleId: "locrian",
		body: "b5 alikielellä. Djent-henkinen, lyhyt ja tiukka.",
		steps: [
			"E lokrinen. Soita avoin ja b5 (6. nauha) vuorotellen.",
			"Pidä nuotit lyhyinä: nosta frettisormi heti lyönnin jälkeen.",
			"Lisää b2 (1. nauha) kolmanneksi säveleksi.",
			"Kokeile sama 7/8-tahtilajissa: aksentti joka seitsemäs."
		]
	},
	{
		id: "sixteenth",
		level: "Edistynyt",
		title: "Kuudestoistaosat yhdellä kielellä",
		bpm: 60,
		beats: 4,
		scaleId: "phrygian-dominant",
		body: "Hidas tempo, nopea jako. Vuorottelu ei saa kiristää.",
		steps: [
			"Yksi kieli, neljä nuottia per isku fryygisestä dominantista.",
			"Aloita aina alaslyönnillä. Metronomi on neljäsosa.",
			"Jos käsi jännittyy, pudota 4 bpm ja lyhennä pätkä kahteen iskuun.",
			"Nosta tempoa vasta kun 4 tahtia menee ilman harhalyöntiä."
		]
	}
];
var BEATS = [
	3,
	4,
	6,
	7
];
function PracticeView() {
	const done = useKitara((s) => s.done);
	const toggleDone = useKitara((s) => s.toggleDone);
	const bpm = useKitara((s) => s.bpm);
	const beats = useKitara((s) => s.beats);
	const setBpm = useKitara((s) => s.setBpm);
	const setBeats = useKitara((s) => s.setBeats);
	const setScaleId = useKitara((s) => s.setScaleId);
	const setTab = useKitara((s) => s.setTab);
	const [openId, setOpenId] = (0, import_react.useState)(EXERCISES[0].id);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [beat, setBeat] = (0, import_react.useState)(0);
	const exercise = EXERCISES.find((e) => e.id === openId) ?? EXERCISES[0];
	(0, import_react.useEffect)(() => {
		if (!running) return;
		setBeat(0);
		return startMetronome(bpm, beats, setBeat);
	}, [
		running,
		bpm,
		beats
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Reeni"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "title mt-1",
					children: "Harjoitus ja metronomi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Tehty ",
						done.length,
						"/",
						EXERCISES.length,
						". Nosta tempoa vasta kun pätkä on puhdas."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl uppercase tracking-wide tabular-nums",
							children: [bpm, " bpm"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-primary",
							onClick: () => setRunning((v) => !v),
							children: running ? "Pysäytä" : "Metronomi"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-3 w-full accent-primary",
						type: "range",
						min: 40,
						max: 200,
						value: bpm,
						"aria-label": "Tempo",
						onChange: (e) => setBpm(Number(e.target.value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: BEATS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "choice",
							"data-on": beats === n ? "1" : "0",
							onClick: () => setBeats(n),
							children: [n, " iskua"]
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						"aria-hidden": "true",
						children: Array.from({ length: beats }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "beat",
							"data-on": running && beat === i ? "1" : "0",
							children: i + 1
						}, i))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: EXERCISES.map((item) => {
					const on = item.id === exercise.id;
					const marked = done.includes(item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-btn",
						"data-on": on ? "1" : "0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "w-full text-left",
							onClick: () => setOpenId(item.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "kicker",
								children: [item.level, marked ? " · tehty" : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-display text-2xl uppercase tracking-wide",
								children: item.title
							})]
						}), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: item.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-2 list-decimal pl-5 text-sm text-muted",
									children: item.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: step }, step))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "btn",
											onClick: () => {
												setBpm(item.bpm);
												setBeats(item.beats);
												setRunning(true);
											},
											children: [
												"Aloita ",
												item.bpm,
												" bpm"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "btn",
											onClick: () => {
												setScaleId(item.scaleId);
												setTab("board");
											},
											children: "Avaa skaala"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "btn",
											"data-on": marked ? "1" : "0",
											onClick: () => toggleDone(item.id),
											children: marked ? "Tehty" : "Merkitse tehdyksi"
										})
									]
								})
							]
						}) : null]
					}, item.id);
				})
			})
		]
	});
}
var FRETS = [
	12,
	15,
	17,
	22,
	24
];
var LABELS = [
	{
		id: "note",
		label: "Nuotti"
	},
	{
		id: "degree",
		label: "Aste"
	},
	{
		id: "interval",
		label: "Intervalli"
	}
];
function SettingsSheet({ open, onClose }) {
	const ref = (0, import_react.useRef)(null);
	const tuningId = useKitara((s) => s.tuningId);
	const root = useKitara((s) => s.root);
	const labelMode = useKitara((s) => s.labelMode);
	const fretCount = useKitara((s) => s.fretCount);
	const leftHanded = useKitara((s) => s.leftHanded);
	const finnishNames = useKitara((s) => s.finnishNames);
	const setTuningId = useKitara((s) => s.setTuningId);
	const setRoot = useKitara((s) => s.setRoot);
	const setLabelMode = useKitara((s) => s.setLabelMode);
	const setFretCount = useKitara((s) => s.setFretCount);
	const setLeftHanded = useKitara((s) => s.setLeftHanded);
	const setFinnishNames = useKitara((s) => s.setFinnishNames);
	const names = finnishNames ? FINNISH : SHARP;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		ref.current?.focus();
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sheet-back",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet",
			role: "dialog",
			"aria-label": "Säädöt",
			tabIndex: -1,
			ref,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "title text-3xl",
						children: "Säädöt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						onClick: onClose,
						children: "Sulje"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-sm text-muted",
					htmlFor: "tuning",
					children: "Vire"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: "tuning",
					className: "field mt-1",
					value: tuningId,
					onChange: (e) => setTuningId(e.target.value),
					children: TUNINGS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: t.id,
						children: [t.name, t.midi.length === 7 ? " · 7 kieltä" : ""]
					}, t.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Juuri"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "row-scroll mt-1",
					children: names.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "choice",
						"data-on": root === i ? "1" : "0",
						onClick: () => setRoot(i),
						children: name
					}, name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Merkinnät otelaudalla"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "row-scroll mt-1",
					children: LABELS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "choice",
						"data-on": labelMode === item.id ? "1" : "0",
						onClick: () => setLabelMode(item.id),
						children: item.label
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Nauhat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "row-scroll mt-1",
					children: FRETS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "choice",
						"data-on": fretCount === n ? "1" : "0",
						onClick: () => setFretCount(n),
						children: n
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						"data-on": leftHanded ? "1" : "0",
						onClick: () => setLeftHanded(!leftHanded),
						children: leftHanded ? "Vasenkätinen päällä" : "Vasenkätinen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						"data-on": finnishNames ? "1" : "0",
						onClick: () => setFinnishNames(!finnishNames),
						children: finnishNames ? "Nimet: H ja Cis" : "Nimet: B ja C#"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Vasenkätinen peilaa kaulan: satula siirtyy oikealle, korkein kieli pysyy ylhäällä."
				})
			]
		})
	});
}
var NAV = [
	{
		id: "board",
		label: "Ote",
		icon: Guitar
	},
	{
		id: "scales",
		label: "Skaalat",
		icon: ListMusic
	},
	{
		id: "chords",
		label: "Soinnut",
		icon: Music2
	},
	{
		id: "detect",
		label: "Frase",
		icon: ScanSearch
	},
	{
		id: "listen",
		label: "Kuuntelu",
		icon: Mic
	},
	{
		id: "practice",
		label: "Reeni",
		icon: Drum
	}
];
function Shell() {
	const tab = useKitara((s) => s.tab);
	const setTab = useKitara((s) => s.setTab);
	const [settings, setSettings] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrateKitara();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "jewel",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl uppercase leading-none tracking-widest",
							children: "Kitara Reeni"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Metallin otelauta"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"data-on": tab === "guide" ? "1" : "0",
						"aria-label": "Opas",
						onClick: () => setTab(tab === "guide" ? "board" : "guide"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": "Säädöt",
						onClick: () => setSettings(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { size: 20 })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "app-main",
				children: [
					tab === "board" || tab === "detect" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardView, { onSettings: () => setSettings(true) }) : null,
					tab === "scales" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleLibrary, {}) : null,
					tab === "chords" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChordLibrary, {}) : null,
					tab === "listen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenView, {}) : null,
					tab === "practice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeView, {}) : null,
					tab === "guide" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideView, {}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "nav",
				"aria-label": "Päänavigaatio",
				children: NAV.map((item) => {
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "nav-btn",
						"data-on": tab === item.id ? "1" : "0",
						onClick: () => setTab(item.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), item.label]
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSheet, {
				open: settings,
				onClose: () => setSettings(false)
			})
		]
	});
}
var SplitComponent = Shell;
//#endregion
export { SplitComponent as component };
