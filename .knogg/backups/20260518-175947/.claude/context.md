<!-- generated-by: knogg -->
# Handoff → Claude Code

Project: CoffePomodoro
Stage: Stage 0
Task: Project bootstrap
Status: in_progress

## Constraints
- React 18 + TypeScript + Vite SPA; Zustand for state, Mantine 7 for UI — keep the client-only architecture
- Lint and format with Biome only (npm run lint / format); no ESLint/Prettier and no automated test suite yet
- Respect five persisted Zustand stores (timer, config, info, stats, schemas) with storeVersion migrations — do not collapse or cross-wire store boundaries
- Use @ path alias to src/; lazy-load pages and major features with React.lazy + Suspense
- Timer logic must honor sessionSegmentTotalSeconds, progress-based skip rules, and schema-driven durations from useSchemasState

## Next Actions
- Populate .knogg/core/ (index.yml, architecture.yml, style_guides.yml) from AGENTS.md and src/ layout
- Write plans/master_plan.yml with Stage 0–2 milestones for vault bootstrap and ongoing app work
- Trim plans/tool_registry.yml and configure agent_registry + roles for Cursor frontend workflow
- Run knogg init --agents-md --force and customize AGENTS.md (commands, structure, standards)
- knogg sync --force, then knogg doctor + knogg agents doctor + knogg brief show

## Summary
