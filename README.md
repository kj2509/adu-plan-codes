# ADU Curricula & Plan Codes

Live site: https://kj2509.github.io/adu-plan-codes/

A static page (no server, no build step at view time). `index.html` holds **only layout and logic**; every piece of data comes from the files in `data/`, which the page loads with `<script src>`. This works both on GitHub Pages and when `index.html` is opened directly from disk.

## Where each kind of data lives

| File | What it holds | How it changes |
|---|---|---|
| `data/plans.js` | One record per curriculum version: college, degree, version, curriculum link, PeopleSoft plan code, study plan + link. | **Generated** from `Acad_Program_Plan_codes_updated.xlsx` by `build_data.py`. Don't edit by hand. |
| `data/curricula.js` | Per curriculum page: total credits, footnotes and every course row (code, title, prerequisites, credits, section). | **Scraped** from advisor.adu.ac.ae (see "Refreshing course data"). Don't edit by hand. |
| `data/config.js` | Colleges (code, display name, colour, display order, aliases used in the Excel sheet), the rules that map a degree name to a level, and source info (site, date scraped). | **Hand-edited.** `build_data.py` creates it with defaults only if it is missing and never overwrites it. |
| `assets/adu_logo.jpg` | ADU logo (also used as the favicon). | Replace the file. |
| `index.html` | The page: layout, search, filters, effects. No data inside. | Code changes only. |
| `build_data.py` | Rebuilds `data/plans.js` from Excel and validates all data files (`--check`). | Needs Python 3 + `openpyxl`; no network. |

If `data/config.js` fails to load, the page still works: colleges appear under their codes (e.g. `CAS`) with a grey marker, and the Level filter is hidden. If `plans.js` or `curricula.js` fails to load, the page shows an error message.

## Editing plan codes

1. Edit `Acad_Program_Plan_codes_updated.xlsx` (Sheet1). Columns: A College, B Degree, C Curriculum version (hyperlinked to the curriculum page), D Plan code, E Study plan (hyperlinked to the PDF). Blank College/Degree cells inherit the value from the row above.
2. Rebuild and validate:
   ```
   pip install openpyxl
   python build_data.py Acad_Program_Plan_codes_updated.xlsx --check
   ```
3. Review the diff of `data/plans.js` (one record per line) and commit it.

`--check` on its own (`python build_data.py --check`) validates without rebuilding. It reports an **error** (exit code 1) when a plan's `curriculum_url` is not in `curricula.js`, a plan code is empty, or a `(degree, version)` pair appears twice. It reports a **warning** for `-` placeholder plan codes, colleges not listed in `config.js`, and curriculum pages no plan points to. It ends with a one-line summary (versions, programs, plan codes, pages, course rows).

## Refreshing course data

`data/curricula.js` is produced by the scraper/builder kept outside this repo (`build_site.py`). It reads each curriculum page on advisor.adu.ac.ae, then writes `data/curricula.js` (and `data/plans.js`) in the format below. After a re-scrape:
1. Update `source.scraped` in `data/config.js`.
2. Run `python build_data.py --check`.
3. Commit `data/curricula.js` (and `data/config.js`).

Note: `build_site.py` recreates the output folder from scratch and does not write `data/config.js`. After running it, run `python build_data.py --check` once so the default `config.js` is written again, or copy your edited `config.js` back in.

## Changing colleges, colours or levels

Edit `data/config.js`. Colleges are shown in the order they are listed. `aliases` maps spellings used in the Excel sheet (e.g. `CoHS`) to the code, and is applied when `build_data.py` rebuilds `plans.js`. Each level has a case-insensitive regular expression `pattern` that is tested against the degree name; the first match wins, and degrees that match no pattern count as "Other" (no chip).

## Data model

**`window.ADU_PLANS`**: array, one object per curriculum version, in sheet order. For each (college, degree), the last row is shown as "Latest".

| Field | Description |
|---|---|
| `college` | College code. Must match a `code` in `config.js` (e.g. `COE`). |
| `degree` | Program name as written in the sheet. Rows with the same college + degree are grouped as one program. |
| `version` | Curriculum version label (e.g. `Curriculum-as of Fall 23-24`). |
| `curriculum_url` | Link to the curriculum page; also the key into `ADU_CURRICULA`. May be empty. |
| `plan_code` | PeopleSoft academic plan code (e.g. `BSIT3`); empty or `-` if not set. |
| `study_plan` | Study plan label. |
| `study_plan_url` | Link to the study plan PDF; may be empty. |

**`window.ADU_CURRICULA`**: object keyed by curriculum URL.

| Field | Description |
|---|---|
| `total_credits` | Total credit hours as text (e.g. `"129"`), may be empty. |
| `notes` | Footnotes from the curriculum page (array of strings). |
| `courses` | Array of `[code, title, prerequisites, credits, section]`. `section` is the heading the course sits under, e.g. `University Requirements (42 cr)`. |

**`window.ADU_CONFIG`**

| Field | Description |
|---|---|
| `colleges[]` | `{code, name, color, aliases[]}` in display order. |
| `levels[]` | `{name, pattern}`: the level chip name, and a regex tested against `degree`. |
| `source` | `{site, scraped, plan_sheet}`. `site` is shown in the footer. `scraped` (YYYY-MM-DD) is shown as the footer tooltip. |

## Contact

For edits or issues, contact Kevin John — kevin.john@adu.ac.ae
