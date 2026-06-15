import re

with open(r'D:\CODEXYUNXING\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

script_start = html.index('<script>\nvar currentInputMode')
script_end = html.index('</script>\n</body>')
script = html[script_start:script_end]

# 大括号平衡
d = 0
for ch in script:
    if ch == '{': d += 1
    elif ch == '}': d -= 1
print(f'Brace: {d}')

# 括号平衡
p = 0
for ch in script:
    if ch == '(': p += 1
    elif ch == ')': p -= 1
print(f'Paren: {p}')

# 查找所有函数并检查闭合
for m in re.finditer(r'function\s+(\w+)', script):
    name = m.group(1)
    d2 = 0; started = False; end = m.start()
    for i in range(m.start(), len(script)):
        if script[i] == '{': d2 += 1; started = True
        elif script[i] == '}':
            d2 -= 1
            if started and d2 == 0: end = i + 1; break
    status = 'OK' if (started and d2 == 0) else f'MISMATCH(depth={d2})'
    print(f'  {name}: {status} ({end - m.start()} chars)')
