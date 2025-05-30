import Interface from "../assets/Interface.mp3";
import Micellaneus from "../assets/Miscellaneus.mp3";
import Rise from "../assets/Rise.mp3";
import Shake from "../assets/Shake.mp3";
import Coin from "../assets/Coin.aac";

export const SCHEMA_KEYS = "1234567890".split("").map(key => `digit${key}`);
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
	Micellaneus: { title: "Micellaneus", url: Micellaneus },
	Interface: { title: "Interface", url: Interface },
	Rise: { title: "Rise", url: Rise },
	Shake: { title: "Shake", url: Shake },
	Coin: { title: "Coin", url: Coin },
};
