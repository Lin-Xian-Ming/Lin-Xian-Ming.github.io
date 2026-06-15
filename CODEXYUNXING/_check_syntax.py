import re

with open(r"D:\CODEXYUNXING\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Extract inline script (between <script> and </script>)
script_start = html.index("<script>\nvar currentInputMode")
script_end = html.index("</script>\n</body>")
script = html[script_start:script_end]

# Count braces
d = 0
for ch in script:
    if ch == '{': d += 1
    elif ch == '}': d -= 1
print(f"Brace balance: {d} (should be 0)")

# Count parens
p = 0
for ch in script:
    if ch == '(': p += 1
    elif ch == ')': p -= 1
print(f"Paren balance: {p} (should be 0)")

# Count brackets
b = 0
for ch in script:
    if ch == '[': b += 1
    elif ch == ']': b -= 1
print(f"Bracket balance: {b} (should be 0)")

# Find ALL function definitions
fn_starts = [m.start() for m in re.finditer(r'function\s+(\w+)', script)]
for s in fn_starts:
    name = re.match(r'function\s+(\w+)', script[s:]).group(1)
    # Find matching brace
    d2 = 0
    started = False
    end = s
    for i in range(s, len(script)):
        if script[i] == '{':
            d2 += 1
            started = True
        elif script[i] == '}':
            d2 -= 1
            if started and d2 == 0:
                end = i + 1
                break
    if started and d2 == 0:
        print(f"  {name}: OK ({end - s} chars)")
    else:
        print(f"  {name}: BRACE MISMATCH (depth={d2})")

print("\nChecking for potential issues...")
# Check for template literal backticks
bt_count = script.count('`')
print(f"Backtick count: {bt_count}")

# Check for << or >> in wrong places
print(f"Triple >: {script.count('>>>')}")
print(f"Triple <: {script.count('<<<')}")
