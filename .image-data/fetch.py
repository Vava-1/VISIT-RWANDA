#!/usr/bin/env python3
import subprocess, json, sys, time

queries = {
    "hero": "Rwanda land of thousand hills green terraced landscape aerial",
    "gorilla": "mountain gorilla silverback Rwanda Volcanoes National Park",
    "kigali": "Kigali city skyline Rwanda modern capital",
    "akagera": "Akagera National Park safari wildlife Rwanda",
    "nyungwe": "Nyungwe forest canopy walk bridge Rwanda",
    "kivu": "Lake Kivu Rwanda sunset boat islands",
    "coffee": "Rwanda coffee tea plantation green hills",
    "culture": "Rwanda traditional dance Intore performers culture",
    "memorial": "Rwanda genocide memorial Kigali monument",
    "convention": "Kigali Convention Centre dome building Rwanda",
    "cycling": "Tour of Rwanda cycling race cyclists mountains",
    "palace": "Rwanda Kings Palace Nyanza traditional royal",
    "market": "Rwanda Kigali market colorful crafts fabric",
    "gorillafam": "Rwanda golden monkey bamboo forest",
}

results = {}
for key, q in queries.items():
    for attempt in range(3):
        try:
            proc = subprocess.run(
                ["z-ai", "image-search", "-q", q, "-c", "2", "--no-rank"],
                capture_output=True, text=True, timeout=180
            )
            out = proc.stdout
            start = out.find('{')
            if start == -1:
                raise ValueError("No JSON in output")
            data = json.loads(out[start:])
            urls = [r["original_url"] for r in data.get("results", []) if r.get("original_url")]
            if urls:
                results[key] = urls
                print(f"OK {key}: {urls[0]}", flush=True)
                break
            else:
                raise ValueError("No results")
        except Exception as e:
            print(f"RETRY {key} (attempt {attempt+1}): {e}", flush=True)
            time.sleep(12)
    time.sleep(8)

with open("/home/z/my-project/.image-data/results.json", "w") as f:
    json.dump(results, f, indent=2)
print("ALL DONE", flush=True)
print(json.dumps(results, indent=2))
