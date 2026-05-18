<!-- generated-by: knogg -->
# Handoff → Codex

Project: {{ project.name }}
Stage: {{ focus.stage }}
Task: {{ focus.task }}
Status: {{ focus.status }}

## Constraints
{% for c in constraints %}- {{ c }}
{% endfor %}
## Next Actions
{% for a in next_actions %}- {{ a }}
{% endfor %}
## Summary
{{ handoff.summary }}
