# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (hot reload)
npm run build      # TypeScript check + Vite production build
npm run preview    # Preview production build
npm run lint       # Biome check on src/
npm run lint:fix   # Biome check with auto-fix
npm run format     # Biome format src/
```

No test suite is configured. Linting is done with **Biome** (not ESLint/Prettier).

Docker alternative:
```bash
docker-compose up  # Dev server on port 5321
```

## Architecture

**CoffePomodoro** is a Pomodoro timer SPA built with React + TypeScript + Zustand + Mantine.

### State Management (Zustand)

Five independent stores in `src/stores/states/`, each persisted to localStorage via Zustand's `persist` middleware with a `storeVersion` for migrations:

| Store | Responsibility |
|---|---|
| `useTimerState` | Countdown remaining, running status, session duration tracking |
| `useConfigState` | Alarm selection, volume, behavioral settings |
| `useInfoState` | Current mode (Pomodoro/ShortBreak/LongBreak), date, week, pomodoro count, favicon |
| `useStatsState` | Weekly statistics (time + sessions per weekday) |
| `useSchemasState` | Timer presets ("Work Session", "Reading", "Study") with per-schema configs |

Config state merges persisted data with defaults via a custom `merge` function to survive schema evolution. Each store has a `reset*` method. Stats auto-reset when the tracked week ends.

### Component Tree

```
App (MantineProvider, dark theme)
└── Home (lazy-loaded)
    ├── Timer — core UI with animated gradient background
    │   ├── TimerText, TimerControllers, TimerHeader, TimerInfo, TimerViewControls
    │   └── hooks/: useTimer (orchestrator), useTimerTick, useFullscreen, usePiP, useHotkeys
    ├── Settings (modal, 4 tabs: Timer, Notifications, Behavior, Schemas)
    ├── Stats (weekly chart via Chart.js / Observable Plot)
    ├── Helps (keyboard shortcuts modal)
    └── QuickMenu (floating mode switcher)
```

### Timer Logic

- `sessionSegmentTotalSeconds` — planned session length including ±minute adjustments; used for progress % and skip validation
- Progress = `((total - remaining) / total) * 100`, recalculated every tick
- Skip only counts toward stats if progress ≥ `skipCountsSessionMinProgressPercent`
- Auto-advance to next phase is configurable

### Schema System

Three built-in presets (Work Session 25/5/15, Reading 30/7/20, Study 45/10/20). Each schema is a full `Configuration` object with a unique ID. The active schema drives all timer durations. Schemas are user-editable.

### Key Conventions

- **Stores**: `useXxxState` (Zustand), located in `src/stores/states/`
- **Models**: TypeScript interfaces in `src/models/`; all exported from `src/models/index.ts`
- **Utils**: `src/utils/` — `time.util.ts`, `notification.utils.ts`, `normalizeConfiguration.ts`, etc.
- **Lazy loading**: Pages and major features use `React.lazy` + `Suspense`
- **Styling**: Mantine layout components; dynamic inline gradient styles in Timer tied to session progress
- **Hotkeys**: Space (play/pause), Ctrl+, (next), Ctrl+. (stop), F (fullscreen), P (PiP)
- **Notifications**: Desktop Notification API + `use-sound` hook with 4 preset alarm audio files in `src/assets/`
- **Path alias**: `@` maps to `src/` (configured in `vite.config.ts`)
