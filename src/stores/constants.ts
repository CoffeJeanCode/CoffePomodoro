import Coin from "../assets/Coin.aac";
import Interface from "../assets/Interface.mp3";
import Micellaneus from "../assets/Miscellaneus.mp3";
import Rise from "../assets/Rise.mp3";
import Shake from "../assets/Shake.mp3";

export const SCHEMA_KEYS = "1234567890".split("").map((key) => `digit${key}`);
export const DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
export const ALARMS = {
	Micellaneus: {
		title: "Micellaneus",
		url: Micellaneus,
		type: "alarm" as const,
	},
	Interface: { title: "Interface", url: Interface, type: "alarm" as const },
	Rise: { title: "Rise", url: Rise, type: "alarm" as const },
	Shake: { title: "Shake", url: Shake, type: "alarm" as const },
	Coin: { title: "Coin", url: Coin, type: "alarm" as const },
};
