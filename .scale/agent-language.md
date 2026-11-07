# SCALE Agent Language Policy

Language: zh
Display name: Chinese (Simplified)
Agents: codex, claude-code, cursor, qoder, cline, windsurf

## Required Behavior

- The agent must respond to the user in Chinese (Simplified) unless the user explicitly asks for another language.
- Generated user-facing documents should use Chinese (Simplified) by default.
- Code identifiers, commands, package names, file paths, and logs should keep their original spelling.
- If a third-party tool returns output in another language, summarize it in Chinese (Simplified) and keep exact commands unchanged.
