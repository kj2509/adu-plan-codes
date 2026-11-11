// Site configuration — safe to edit by hand (build_data.py never overwrites it).
window.ADU_CONFIG = {
  "colleges": [
    {
      "code": "CAS",
      "name": "College of Arts and Sciences",
      "color": "#E31B2A",
      "aliases": []
    },
    {
      "code": "COB",
      "name": "College of Business",
      "color": "#2C333A",
      "aliases": []
    },
    {
      "code": "COE",
      "name": "College of Engineering",
      "color": "#B3121F",
      "aliases": []
    },
    {
      "code": "CHS",
      "name": "College of Health Sciences",
      "color": "#6B7280",
      "aliases": [
        "CoHS"
      ]
    },
    {
      "code": "COL",
      "name": "College of Law",
      "color": "#E9A23B",
      "aliases": [
        "CoL"
      ]
    }
  ],
  "levels": [
    {
      "name": "Bachelor",
      "pattern": "^Bachelor"
    },
    {
      "name": "Master",
      "pattern": "^(Master|Executive Master)"
    },
    {
      "name": "Doctorate",
      "pattern": "^Doctor"
    },
    {
      "name": "Diploma",
      "pattern": "Diploma"
    },
    {
      "name": "Associate",
      "pattern": "^Associate"
    }
  ],
  "min_start_year": 2017,
  "campuses": {"AD": "Abu Dhabi", "AA": "Al Ain", "DB": "Dubai"},
  "source": {
    "site": "advisor-studentsaduac.msappproxy.net",
    "scraped": "2026-11-11",
    "plan_sheet": "Acad_Program_Plan_codes_updated.xlsx"
  }
};
