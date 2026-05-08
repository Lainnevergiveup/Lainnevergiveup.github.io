#!/usr/bin/env python3
"""Build README.md from config.json — substitutes variables and removes empty optional sections.

Reads template from README.template.md, outputs to README.md.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

AUTO_DERIVE = {
    "ROW_TWITTER": "TWITTER",
    "ROW_ZHIHU": "ZHIHU",
    "ROW_BILIBILI": "BILIBILI",
    "ROW_LINKEDIN": "LINKEDIN",
    "ROW_GOOGLE_SCHOLAR": "GOOGLE_SCHOLAR",
    "ROW_ORCID": "ORCID",
    "ROW_HUGGINGFACE": "HUGGINGFACE",
    "ROW_KAGGLE": "KAGGLE",
    "CONTACT_EMAIL": "EMAIL",
    "CONTACT_BLOG": "BLOG",
    "CONTACT_TWITTER": "TWITTER",
}


def load_config():
    with open(ROOT / "config.json", encoding="utf-8") as f:
        raw = json.load(f)

    config = {k: v for k, v in raw.items() if not k.startswith("_")}

    for derived, parent in AUTO_DERIVE.items():
        config[derived] = config.get(parent, "")

    social_keys = [v for k, v in AUTO_DERIVE.items() if k.startswith("ROW_")]
    has_social = any(config.get(k, "").strip() for k in social_keys)
    config["SOCIAL_PLATFORMS"] = "yes" if has_social else ""

    nav_keys = [k for k in config if k.endswith("_NAV")]
    config["NAV_HUB"] = "yes" if any(config.get(k, "").strip() for k in nav_keys) else ""

    return config


def find_and_process_sections(content: str, config: dict) -> str:
    """Find all sections, process innermost first (shortest spans first), then outer."""

    # Collect all sections
    raw_sections = []
    for m in re.finditer(r"<!-- BEGIN:(\w+) -->", content):
        key = m.group(1)
        begin_start = m.start()
        begin_end = m.end()

        end_marker = f"<!-- END:{key} -->"
        end_pos = content.find(end_marker, begin_end)
        if end_pos == -1:
            continue
        full_end = end_pos + len(end_marker)
        span = full_end - begin_start

        raw_sections.append((key, begin_start, begin_end, end_pos, full_end, span))

    # Process innermost first: sort by span ascending (shortest = innermost)
    raw_sections.sort(key=lambda s: s[5])

    # Track position offsets caused by earlier edits
    # We'll use a different approach: rebuild the string piece by piece
    # Actually, let's just re-find sections after each edit since the content changes

    content_snapshot = content
    while True:
        # Re-find all sections in current content
        sections = []
        for m in re.finditer(r"<!-- BEGIN:(\w+) -->", content_snapshot):
            key = m.group(1)
            begin_start = m.start()
            begin_end = m.end()
            end_marker = f"<!-- END:{key} -->"
            end_pos = content_snapshot.find(end_marker, begin_end)
            if end_pos == -1:
                continue
            full_end = end_pos + len(end_marker)
            span = full_end - begin_start
            sections.append((key, begin_start, begin_end, end_pos, full_end, span))

        if not sections:
            break

        # Find the innermost section (shortest span)
        sections.sort(key=lambda s: s[5])
        key, begin_start, begin_end, end_start, end_end, _ = sections[0]

        if config.get(key, "").strip():
            # Keep: strip markers, keep inner content
            content_snapshot = (
                content_snapshot[:begin_start]
                + content_snapshot[begin_end:end_start]
                + content_snapshot[end_end:]
            )
        else:
            # Remove: delete entire block
            content_snapshot = (
                content_snapshot[:begin_start]
                + content_snapshot[end_end:]
            )

    return content_snapshot


def substitute_vars(content: str, config: dict) -> str:
    return re.sub(r"\{\{(\w+)\}\}", lambda m: config.get(m.group(1), ""), content)


def collapse_blank_lines(content: str) -> str:
    return re.sub(r"\n{3,}", "\n\n", content)


def main():
    config = load_config()
    template = (ROOT / "README.template.md").read_text(encoding="utf-8")

    result = find_and_process_sections(template, config)
    result = substitute_vars(result, config)
    result = collapse_blank_lines(result)

    (ROOT / "README.md").write_text(result, encoding="utf-8")
    print("README.md built successfully.")


if __name__ == "__main__":
    main()
