import { playClick, playToggle, playUI } from "@/utils/uiSounds";
import { useCallback } from "react";

export function useSpringClick() {
	return useCallback(() => {
		playClick();
	}, []);
}

export function useSpringToggle() {
	return useCallback(() => {
		playToggle();
	}, []);
}

export function useUIFulfill() {
	return useCallback(() => {
		playUI("fulfill");
	}, []);
}

export function useUITransition() {
	return useCallback(() => {
		playUI("transition");
	}, []);
}
