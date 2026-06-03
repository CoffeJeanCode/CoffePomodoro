export const translations = {
	en: {
		app: {
			title: "Coffe Pomodoro",
		},
		timer: {
			control: {
				play: "Start",
				pause: "Pause",
				skipBreak: "Skip break (N)",
				skipBreakLabel: "Skip break",
				intentionFulfilled: "Mark intention as fulfilled (S)",
				intentionFulfilledLabel: "Intention Fulfilled",
			},
			intention: {
				prompt: "What will you focus on?",
				placeholder: "One clear intention…",
				begin: "Begin focus",
				save: "Save",
				cancel: "Cancel",
			},
			progress: {
				ends: "ends",
				editIntention: "Click your intention to edit",
				sessionProgress: "Session progress",
				sessionProgressEdit: "Session progress",
				horizonNotStarted: "The cycle has not started yet",
				horizonEndsAt: "The cycle ends at {{time}}",
				starting: "Starting",
				flowing: "Flowing",
				deepening: "Deepening",
				windingDown: "Winding down",
				almostDone: "Almost done",
				complete: "{{percent}}% complete",
			},
			header: {
				subtract: "Subtract {{minutes}} (−)",
				add: "Add {{minutes}} (+)",
				oneMinute: "1 minute",
				xMinutes: "{{count}} minutes",
			},
			complete: {
				focusComplete: "Focus block complete",
				takeBreath:
					"Take a breath. Continue when you are ready for a break, or end here.",
				continueToBreak: "Continue to break",
				endForNow: "End for now",
			},
			intentionComplete: {
				fulfilled: "Intention fulfilled",
				efficiencyBonus:
					"Efficiency bonus: +{{minutes}} min extra for mental recovery",
				capturedThoughts: "Captured thoughts",
				discard: "Discard",
				copy: "Copy",
				confirmToClose: "Confirm to close the cycle and move to break",
				closeCycle: "Close cycle",
				stayFocused: "Stay focused",
			},
			fatigue: {
				cycleReached:
					"Fatigue cycle reached. Consider a longer break next time if you lost focus.",
				focusComplete: "Focus block complete",
				takeBreath:
					"Take a breath. Continue when you are ready for a break, or end here.",
			},
			text: {
				breathe: "Breathe",
			},
			notification: {
				focusComplete: "Focus complete",
				modeEnded: "{{mode}} ended",
				focusBody: "Time to step away and recover.",
				breakBody: "Back to focus when you are ready.",
			},
		},
		mode: {
			focus: "Focus",
			shortBreak: "Short break",
			longBreak: "Long break",
		},
		brainDump: {
			title: "Scratch pad",
			placeholder: "Jot it down…",
			hint: "Enter to save · Shift+Enter for new line · Esc to close",
			closeLabel: "Close scratch pad",
			tooltip: "Scratch pad (Ctrl+Shift+D)",
			ariaLabel: "Open scratch pad",
		},
		controls: {
			pipOpen: "Close Picture-in-Picture (Shift+I)",
			pipClosed: "Picture-in-Picture (Shift+I)",
			fullscreenExit: "Exit full screen (F)",
			fullscreenEnter: "Full screen (F)",
			pipAria: "Picture in picture",
			fullscreenAria: "Full screen",
		},
		break: {
			longRest: "Let the screen fade. Rest without watching the clock.",
			shortRest: "No clock — just rest.",
			endRest: "End rest",
			extendedBreak: "Extended break +{{minutes}} min for early completion",
			efficiencyBonus:
				"Efficiency bonus: +{{minutes}} min extra for mental recovery",
			deepRest: "Look away · Stretch · Do nothing",
			quickRest: "Breathe · Release · Recover",
			showSuggestions: "Show suggestions",
			hideSuggestions: "Hide suggestions",
		},
		settings: {
			button: "Settings",
			title: "Settings",
			editingPreset: "Editing preset:",
			tabs: {
				timer: "Timer",
				behavior: "Behavior",
				notifications: "Notifications",
				schemas: "Schemas",
				data: "Data",
				language: "Language",
			},
			discard: "Discard",
			save: "Save changes",
			timer: {
				work: "Work Timer",
				shortBreak: "Short Break Timer",
				longBreak: "Long Break Timer",
				pomodorosPerLongBreak: "Pomodoros per long break",
				sessionPreview: "Session Preview",
			},
			behavior: {
				autoPlay: "Auto-play next timer",
				on: "ON",
				off: "OFF",
				adjustStep: "Session adjust step (minutes)",
				skipThreshold: "Count skipped work toward stats after progress (%)",
			},
			notifications: {
				preview: "Preview alarm",
				alarm: "Alarm",
				volume: "Volume",
				desktop: "Desktop notifications",
				on: "ON",
				off: "OFF",
			},
			schemas: {
				newSchema: "New Schema",
				presets: "Presets",
				selectPreset: "Select a preset…",
				noPresets: "No presets found",
				schemaName: "Schema name",
				deletePreset: "Delete preset",
				addSchema: "Add Schema",
			},
			language: {
				label: "Interface Language",
				en: "English",
				es: "Español",
			},
			visualMode: {
				label: "Timer Core Style",
				ripples: "Wireframe Ripples",
				stardust: "Stardust",
				enso: "Zen Enso",
			},
			data: {
				exportTitle: "Export your data",
				exportDesc:
					"Download all your settings, stats, schemas, and Brain Dump notes as a JSON file.",
				exportButton: "Export JSON",
				importTitle: "Import data",
				importDesc:
					"Restore from a previously exported backup file. This will overwrite all current data.",
				importPlaceholder: "Select backup file",
				importButton: "Import",
				importFailed: "Import failed",
				importSuccess: "Import successful",
				importReloading: "Data restored. Reloading...",
			},
		},
		stats: {
			button: "Week Stats",
			title: "Focus Stats",
			noData: "No sessions this week yet. Start a Pomodoro to see your stats!",
			streak: "Streak",
			best: "Best: {{value}}",
			completion: "Completion",
			thisWeek: "This week",
			sessions: "{{count}} sessions",
			vsLastWeek: "vs last week",
			comparable: "comparable",
			firstWeek: "first week",
			dailySessions: "Daily sessions",
			bestTimeOfDay: "Best time of day",
			chart: {
				days: "Days",
				sessions: "Sessions",
			},
		},
		quickMenu: {
			preset: "Preset",
		},
		helps: {
			button: "Helps",
			title: "Helps",
			replay: "Replay tutorial",
			hotkeys: "Hotkeys",
			main: "Main",
			sections: {
				flowState: "Flow State",
				breakIdeas: "Break Ideas",
				soundscapes: "Soundscapes",
			},
			items: {
				focusRing:
					"Focus without urgency — progress is the ring, not words or countdowns",
				setIntention:
					"Set an intention before each session instead of chasing countdowns",
				endTime:
					"End time appears below the ring only while the timer is running",
				doubleClick: "Double-click to update your intention",
				scratchPad:
					"Ctrl+Shift+D opens the scratch pad (bottom-right) — jot thoughts without leaving focus",
				shortNap: "Short Nap",
				cleanUp: "Clean Up",
				meditate: "Meditate",
				posture: "Posture",
				goOutside: "Go outside",
				stretches: "Stretches",
				miniExercise: "Mini exercise",
				rain: "Rain — steady background for deep concentration",
				waves: "Waves — rhythmic presence to anchor attention",
				wind: "Wind — open space for creative flow",
			},
			hotkeyActions: {
				toggle: "Toggle timer (play / pause)",
				skip: "Skip to next segment",
				end: "End session (focus) or skip (break)",
				adjust: "Adjust session length for this cycle",
				fullscreen: "Toggle full screen",
				pip: "Toggle Picture-in-Picture",
				preset: "Quick-select a preset schema",
			},
		},
		onboarding: {
			skip: "Skip for now",
			next: "Next",
			tryIt: "Click it to continue",
			stepLabel: "Step {{current}} of {{total}}",
			welcome: {
				eyebrow: "Welcome",
				title: "Focus without the clock",
				body: "No countdown here.",
				highlight: "Set an intention, let a calm ring carry you.",
				cta: "Begin my first focus",
			},
			rhythm: {
				eyebrow: "Your rhythm",
				title: "How are you working today?",
				body: "Change it anytime with right-click.",
				highlight: "Pick the depth for this moment.",
				presets: {
					deep: {
						label: "Deep Immersion",
						meta: "90 / 20",
						desc: "Flow state, complex work",
					},
					sustained: {
						label: "Sustained Rhythm",
						meta: "52 / 17",
						desc: "Steady execution, no burnout",
					},
					quick: {
						label: "Quick Start",
						meta: "25 / 5",
						desc: "Beat friction, small tasks",
					},
				},
			},
			intention: {
				eyebrow: "Your anchor",
				title: "Name one intention",
				body: "This replaces the countdown.",
				highlight: "Type your focus below, then Begin focus.",
			},
			ring: {
				eyebrow: "You're in focus",
				title: "Watch the ring, not the seconds",
				body: "The ring fills on its own and shows when the cycle ends.",
				highlight: "No numbers. No urgency.",
			},
			settings: {
				eyebrow: "Make it yours",
				title: "Settings",
				body: "Durations, alarms, themes and behavior.",
				highlight: "Open it anytime to tune your sessions.",
			},
			brainDump: {
				eyebrow: "Stay in flow",
				title: "Brain Dump",
				body: "A stray thought during focus?",
				highlight: "Drop it here without leaving the session.",
			},
			endDay: {
				eyebrow: "Close the loop",
				title: "End Day",
				body: "Done for the day?",
				highlight: "Run the shutdown ritual to clear your mind.",
			},
		},
		tutorial: {
			step1:
				"Choose your rhythm. Right-click anywhere for quick presets, or open Settings to customize. Deep Immersion (90m) for complex work, Quick Start (25m) for fast tasks.",
			step2:
				"Define a single goal before you start. Write your intention above and click 'Begin focus'.",
			step3:
				"Distracted? Open the Brain Dump (Ctrl+Shift+D or the brain icon) to clear your mind without losing focus.",
			skip: "Skip tutorial",
			step: "Step {{current}} of {{total}}",
		},
		quests: {
			title: "Calibrate Your Environment",
			subtitle: "Complete each quest to unlock flow",
			presetSelected:
				"Find your rhythm: select a preset in Settings or Quick Menu",
			intentionSet: "Plant your anchor: write your intention and begin focus",
			brainDumpUsed:
				"Empty your mind: open Brain Dump and jot a thought while the timer runs",
			victory: "Environment calibrated. Enjoy your focus.",
			closeAndStart: "Close & start",
		},
		language: {
			switchTo: "Switch to Spanish",
			current: "EN",
		},
		shutdown: {
			endDay: "End day",
			endDayTooltip: "End your workday",
			lockMessage: "Day complete. Your attention is free. See you tomorrow.",
			lockSub: "Reload the app tomorrow to start fresh.",
			triageTitle: "Empty your mental inbox",
			consolidateTitle: "Today's intentions",
			triageBody:
				"Process what you captured today. Export it wherever you keep it and clear the inbox to free your short-term memory.",
			inboxClear: "The inbox is clear. Your mind is unloaded.",
			copyAll: "Copy all",
			clearInbox: "Clear inbox",
			continue: "Continue",
			consolidateBody:
				"These are the intentions you gave your full attention today.",
			noIntentions:
				"You didn't mark any intentions complete today. You still deserve rest.",
			consolidateClosing:
				"What deserved your attention, received it. That's enough for today.",
			powerDown: "Power down and close the day",
		},
		energy: {
			title: "Energy Check",
			body: "You've completed several high-intensity cycles in a row. Take a moment to scan your mind and eyes before continuing.",
			continue: "I still have clarity",
			downshift: "I need a break",
		},
		dataDropZone: {
			importing: "Importing backup…",
			success: "Data restored. Reloading…",
			failed: "Import failed",
			dropTitle: "Drop your backup to import",
			dropSub: "Release a .json file to restore your data",
		},
		install: {
			tooltip: "Install app for distraction-free focus",
			label: "Install",
		},
		persistence: {
			healthy: "Data saved locally",
			unhealthy: "Storage issue — export your data",
		},
		breakSuggestions: {
			short: [
				"Look away from the screen",
				"Stretch your body",
				"Drink some water",
				"Take three deep breaths",
			],
			long: [
				"Step away from the screen",
				"Close your eyes for a moment",
				"Do nothing for a while",
				"Gentle movement or fresh air",
			],
		},
	},
	es: {
		app: {
			title: "Coffe Pomodoro",
		},
		timer: {
			control: {
				play: "Iniciar",
				pause: "Pausa",
				skipBreak: "Saltar descanso (N)",
				skipBreakLabel: "Saltar descanso",
				intentionFulfilled: "Marcar intención cumplida (S)",
				intentionFulfilledLabel: "Intención cumplida",
			},
			intention: {
				prompt: "¿En qué te enfocarás?",
				placeholder: "Una intención clara…",
				begin: "Comenzar enfoque",
				save: "Guardar",
				cancel: "Cancelar",
			},
			progress: {
				ends: "termina",
				editIntention: "Haz clic en tu intención para editar",
				sessionProgress: "Progreso de la sesión",
				sessionProgressEdit: "Progreso de la sesión",
				horizonNotStarted: "El ciclo aún no ha comenzado",
				horizonEndsAt: "El ciclo termina a las {{time}}",
				starting: "Comenzando",
				flowing: "Fluyendo",
				deepening: "Profundizando",
				windingDown: "Finalizando",
				almostDone: "Casi listo",
				complete: "{{percent}}% completado",
			},
			header: {
				subtract: "Restar {{minutes}} (−)",
				add: "Añadir {{minutes}} (+)",
				oneMinute: "1 minuto",
				xMinutes: "{{count}} minutos",
			},
			complete: {
				focusComplete: "Bloque de enfoque completado",
				takeBreath:
					"Respira. Continúa cuando estés listo para un descanso o termina aquí.",
				continueToBreak: "Ir al descanso",
				endForNow: "Terminar por ahora",
			},
			intentionComplete: {
				fulfilled: "Intención cumplida",
				efficiencyBonus:
					"Bonus por eficiencia: +{{minutes}} min extra para recuperación mental",
				capturedThoughts: "Pensamientos capturados",
				discard: "Descartar",
				copy: "Copiar",
				confirmToClose: "Confirma para cerrar el ciclo e ir al descanso",
				closeCycle: "Cerrar ciclo",
				stayFocused: "Seguir enfocado",
			},
			fatigue: {
				cycleReached:
					"Ciclo de fatiga alcanzado. Considera un descanso más largo la próxima vez si perdiste el foco.",
				focusComplete: "Bloque de enfoque completado",
				takeBreath:
					"Respira. Continúa cuando estés listo para un descanso o termina aquí.",
			},
			text: {
				breathe: "Respira",
			},
			notification: {
				focusComplete: "Enfoque completado",
				modeEnded: "{{mode}} terminado",
				focusBody: "Es hora de alejarte y recuperarte.",
				breakBody: "Vuelve al enfoque cuando estés listo.",
			},
		},
		mode: {
			focus: "Enfoque",
			shortBreak: "Descanso corto",
			longBreak: "Descanso largo",
		},
		brainDump: {
			title: "Bloc de notas",
			placeholder: "Escríbelo…",
			hint: "Enter para guardar · Shift+Enter nueva línea · Esc para cerrar",
			closeLabel: "Cerrar bloc de notas",
			tooltip: "Bloc de notas (Ctrl+Shift+D)",
			ariaLabel: "Abrir bloc de notas",
		},
		controls: {
			pipOpen: "Cerrar Picture-in-Picture (Shift+I)",
			pipClosed: "Picture-in-Picture (Shift+I)",
			fullscreenExit: "Salir de pantalla completa (F)",
			fullscreenEnter: "Pantalla completa (F)",
			pipAria: "Picture in picture",
			fullscreenAria: "Pantalla completa",
		},
		break: {
			longRest:
				"Deja que la pantalla se desvanezca. Descansa sin mirar el reloj.",
			shortRest: "Sin reloj — solo descansa.",
			endRest: "Terminar descanso",
			extendedBreak:
				"Descanso extendido +{{minutes}} min por finalización temprana",
			efficiencyBonus:
				"Bonus por eficiencia: +{{minutes}} min extra para recuperación mental",
			deepRest: "Mira lejos · Estírate · No hagas nada",
			quickRest: "Respira · Suelta · Recupérate",
			showSuggestions: "Mostrar sugerencias",
			hideSuggestions: "Ocultar sugerencias",
		},
		settings: {
			button: "Ajustes",
			title: "Ajustes",
			editingPreset: "Editando preset:",
			tabs: {
				timer: "Temporizador",
				behavior: "Comportamiento",
				notifications: "Notificaciones",
				schemas: "Esquemas",
				data: "Datos",
				language: "Idioma",
			},
			discard: "Descartar",
			save: "Guardar cambios",
			timer: {
				work: "Temporizador de trabajo",
				shortBreak: "Descanso corto",
				longBreak: "Descanso largo",
				pomodorosPerLongBreak: "Pomodoros por descanso largo",
				sessionPreview: "Vista previa",
			},
			behavior: {
				autoPlay: "Auto-reproducir siguiente",
				on: "SÍ",
				off: "NO",
				adjustStep: "Ajuste de paso (minutos)",
				skipThreshold: "Contar saltos en estadísticas tras progreso (%)",
			},
			notifications: {
				preview: "Vista previa",
				alarm: "Alarma",
				volume: "Volumen",
				desktop: "Notificaciones de escritorio",
				on: "SÍ",
				off: "NO",
			},
			schemas: {
				newSchema: "Nuevo esquema",
				presets: "Presets",
				selectPreset: "Selecciona un preset…",
				noPresets: "No se encontraron presets",
				schemaName: "Nombre del esquema",
				deletePreset: "Eliminar preset",
				addSchema: "Añadir esquema",
			},
			language: {
				label: "Idioma de la interfaz",
				en: "English",
				es: "Español",
			},
			visualMode: {
				label: "Estilo del núcleo",
				ripples: "Ondas wireframe",
				stardust: "Polvo estelar",
				enso: "Enso zen",
			},
			data: {
				exportTitle: "Exportar datos",
				exportDesc:
					"Descarga ajustes, estadísticas, esquemas y notas del Brain Dump como JSON.",
				exportButton: "Exportar JSON",
				importTitle: "Importar datos",
				importDesc:
					"Restaura desde un respaldo exportado. Sobrescribirá todos los datos actuales.",
				importPlaceholder: "Seleccionar archivo de respaldo",
				importButton: "Importar",
				importFailed: "Error al importar",
				importSuccess: "Importación exitosa",
				importReloading: "Datos restaurados. Recargando...",
			},
		},
		stats: {
			button: "Estadísticas",
			title: "Estadísticas de enfoque",
			noData:
				"Aún no hay sesiones esta semana. ¡Inicia un Pomodoro para ver tus estadísticas!",
			streak: "Racha",
			best: "Mejor: {{value}}",
			completion: "Finalización",
			thisWeek: "Esta semana",
			sessions: "{{count}} sesiones",
			vsLastWeek: "vs semana pasada",
			comparable: "comparable",
			firstWeek: "primera semana",
			dailySessions: "Sesiones diarias",
			bestTimeOfDay: "Mejor momento del día",
			chart: {
				days: "Días",
				sessions: "Sesiones",
			},
		},
		quickMenu: {
			preset: "Preset",
		},
		helps: {
			button: "Ayuda",
			title: "Ayuda",
			replay: "Repetir tutorial",
			hotkeys: "Atajos",
			main: "Principales",
			sections: {
				flowState: "Estado de flujo",
				breakIdeas: "Ideas para descanso",
				soundscapes: "Paisajes sonoros",
			},
			items: {
				focusRing:
					"Concéntrate sin urgencia — el progreso es el anillo, no las palabras",
				setIntention: "Establece una intención antes de cada sesión",
				endTime:
					"La hora de finalización aparece solo mientras el temporizador corre",
				doubleClick: "Doble clic para actualizar tu intención",
				scratchPad:
					"Ctrl+Shift+D abre el bloc de notas — apunta ideas sin perder el foco",
				shortNap: "Siesta corta",
				cleanUp: "Ordena",
				meditate: "Medita",
				posture: "Postura",
				goOutside: "Sal afuera",
				stretches: "Estírate",
				miniExercise: "Mini ejercicio",
				rain: "Lluvia — fondo constante para concentración profunda",
				waves: "Olas — presencia rítmica para anclar la atención",
				wind: "Viento — espacio abierto para flujo creativo",
			},
			hotkeyActions: {
				toggle: "Iniciar / Pausar",
				skip: "Saltar al siguiente segmento",
				end: "Terminar sesión o saltar descanso",
				adjust: "Ajustar duración de la sesión",
				fullscreen: "Pantalla completa",
				pip: "Picture-in-Picture",
				preset: "Seleccionar preset rápido",
			},
		},
		onboarding: {
			skip: "Saltar por ahora",
			next: "Siguiente",
			tryIt: "Púlsalo para continuar",
			stepLabel: "Paso {{current}} de {{total}}",
			welcome: {
				eyebrow: "Bienvenido",
				title: "Bienvenido a Coffe Pomodoro",
				body: "Aquí no hay cuenta regresiva.",
				highlight: "Define una intención y deja que el anillo te lleve.",
				cta: "Comenzar mi primer enfoque",
			},
			rhythm: {
				eyebrow: "Tu ritmo",
				title: "¿Cómo trabajas hoy?",
				body: "Puedes cambiarlo cuando quieras con clic derecho.",
				highlight: "Elige la profundidad para este momento.",
				presets: {
					deep: {
						label: "Inmersión Profunda",
						meta: "90 / 20",
						desc: "Estado de flujo, trabajo complejo",
					},
					sustained: {
						label: "Ritmo Sostenido",
						meta: "52 / 17",
						desc: "Ejecución constante, sin agotarte",
					},
					quick: {
						label: "Inicio Rápido",
						meta: "25 / 5",
						desc: "Vence la fricción, tareas cortas",
					},
				},
			},
			intention: {
				eyebrow: "Tu ancla",
				title: "Nombra una intención",
				body: "Esto reemplaza la cuenta regresiva.",
				highlight: "Escribe tu enfoque abajo y pulsa Comenzar enfoque.",
			},
			ring: {
				eyebrow: "Estás enfocado",
				title: "Mira el anillo, no los segundos",
				body: "El anillo se llena solo y muestra cuándo termina el ciclo.",
				highlight: "Sin números. Sin urgencia.",
			},
			settings: {
				eyebrow: "Hazlo tuyo",
				title: "Ajustes",
				body: "Duraciones, alarmas, temas y comportamiento.",
				highlight: "Ábrelo cuando quieras para afinar tus sesiones.",
			},
			brainDump: {
				eyebrow: "Sigue en flujo",
				title: "Brain Dump",
				body: "¿Un pensamiento suelto durante el enfoque?",
				highlight: "Suéltalo aquí sin salir de la sesión.",
			},
			endDay: {
				eyebrow: "Cierra el ciclo",
				title: "Terminar día",
				body: "¿Terminaste por hoy?",
				highlight: "Ejecuta el ritual de cierre para despejar tu mente.",
			},
		},
		tutorial: {
			step1:
				"Elige tu ritmo. Haz clic derecho para presets rápidos, o abre Settings para personalizar. Deep Immersion (90m) para trabajo complejo, Quick Start (25m) para tareas rápidas.",
			step2:
				"Define un objetivo único antes de empezar. Escribe tu intención arriba y haz clic en 'Comenzar enfoque'.",
			step3:
				"¿Te distrajiste? Abre el Brain Dump (Ctrl+Shift+D o el ícono de cerebro) para vaciar tu mente sin perder el foco.",
			skip: "Saltar tutorial",
			step: "Paso {{current}} de {{total}}",
		},
		quests: {
			title: "Calibra tu Entorno",
			subtitle: "Completa cada misión para desbloquear el flujo",
			presetSelected:
				"Encuentra tu ritmo: selecciona un preset en Ajustes o Menú Rápido",
			intentionSet:
				"Planta tu ancla: escribe tu intención y comienza el enfoque",
			brainDumpUsed:
				"Vacía tu mente: abre el Brain Dump y apunta un pensamiento mientras el reloj corre",
			victory: "Entorno calibrado. Disfruta tu enfoque.",
			closeAndStart: "Cerrar y comenzar",
		},
		language: {
			switchTo: "Cambiar a inglés",
			current: "ES",
		},
		shutdown: {
			endDay: "Terminar día",
			endDayTooltip: "Termina tu jornada",
			lockMessage: "Día completo. Tu atención es libre. Nos vemos mañana.",
			lockSub: "Recarga la app mañana para empezar de nuevo.",
			triageTitle: "Vacía tu bandeja mental",
			consolidateTitle: "Intenciones de hoy",
			triageBody:
				"Procesa lo que capturaste hoy. Expórtalo donde lo guardes y limpia la bandeja para liberar tu memoria a corto plazo.",
			inboxClear: "La bandeja está limpia. Tu mente está descargada.",
			copyAll: "Copiar todo",
			clearInbox: "Limpiar bandeja",
			continue: "Continuar",
			consolidateBody:
				"Estas son las intenciones a las que diste tu plena atención hoy.",
			noIntentions:
				"No marcaste intenciones completadas hoy. Aun así mereces descanso.",
			consolidateClosing:
				"Lo que merecía tu atención, la recibió. Eso es suficiente por hoy.",
			powerDown: "Apagar y cerrar el día",
		},
		energy: {
			title: "Evaluación de energía",
			body: "Has completado varios ciclos de alta intensidad seguidos. Tómate un momento para escanear tu mente y tus ojos antes de continuar.",
			continue: "Aún tengo claridad",
			downshift: "Necesito una pausa",
		},
		dataDropZone: {
			importing: "Importando respaldo…",
			success: "Datos restaurados. Recargando…",
			failed: "Error al importar",
			dropTitle: "Suelta tu respaldo para importar",
			dropSub: "Suelta un archivo .json para restaurar tus datos",
		},
		install: {
			tooltip: "Instala la app para un enfoque sin distracciones",
			label: "Instalar",
		},
		persistence: {
			healthy: "Datos guardados localmente",
			unhealthy: "Problema de almacenamiento — exporta tus datos",
		},
		breakSuggestions: {
			short: [
				"Mira lejos de la pantalla",
				"Estira tu cuerpo",
				"Bebe agua",
				"Tres respiraciones profundas",
			],
			long: [
				"Aléjate de la pantalla",
				"Cierra los ojos un momento",
				"No hagas nada por un rato",
				"Movimiento suave o aire fresco",
			],
		},
	},
} as const;

export type Language = keyof typeof translations;
export type TranslationDict = (typeof translations)[Language];
