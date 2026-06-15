import re
with open(r"D:\CODEXYUNXING\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 找到 solar panel 中 sMinute 后面紧跟的 button 行
pattern = r'(<div class="input-group"><label for="sMinute">分钟</label><select id="sMinute"><option value="0">00分</option><option value="30">30分</option></select></div>\s*\n\s*)<div class="input-row-full">'
match = re.search(pattern, html)
if match:
    print("FOUND solar minute row at position:", match.start())
    # Show context
    ctx = html[match.start():match.start()+300]
    print(repr(ctx[:200]))
else:
    print("NOT FOUND - trying looser pattern")
    # Try looser
    idx = html.find('id="sMinute"')
    if idx >= 0:
        ctx = html[idx:idx+200]
        print(repr(ctx))
    else:
        print("sMinute not found at all")
