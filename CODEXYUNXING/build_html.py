import os

OUT = r"D:\CODEXYUNXING\index.html"

def w(f, s):
    f.write(s + "\n")

with open(OUT, "w", encoding="utf-8") as f:
    w(f, '<!DOCTYPE html>')
    w(f, '<html lang="zh-CN">')
    w(f, '<head>')
    w(f, '<meta charset="UTF-8">')
    w(f, '<meta name="viewport" content="width=device-width, initial-scale=1.0">')
    w(f, '<title>八字命盘 - 四柱排盘与分析</title>')
    w(f, '<link rel="stylesheet" href="css/style.css">')
    w(f, '</head>')
    w(f, '<body>')
    w(f, '')
    # Header
    w(f, '<header class="site-header">')
    w(f, '  <h1>八字命盘</h1>')
    w(f, '  <p class="subtitle">四柱推命 · 纳音五行 · 十神分析 · 流年大运</p>')
    w(f, '  <div class="header-books">')
    w(f, '    <span>滴天髓</span><span>子平真诠</span><span>盲派金口诀</span><span>千里命稿</span>')
    w(f, '  </div>')
    w(f, '</header>')
    w(f, '')
    # Sidebar toggle
    w(f, '<button class="sidebar-toggle" id="sidebarToggle" onclick="toggleSidebar()" title="命例存档">命例存档</button>')
    w(f, '')
    # App container
    w(f, '<div class="app-container">')
    w(f, '  <aside class="sidebar" id="sidebar">')
    w(f, '    <div class="sidebar-header">命例存档</div>')
    w(f, '    <div class="sidebar-list" id="sidebarList"><div class="sidebar-empty">暂无存档命例<br>排盘后自动保存</div></div>')
    w(f, '  </aside>')
    w(f, '  <main class="main-content" id="mainContent">')
    w(f, '    <div class="container">')
    
    # Input section
    w(f, '      <section class="input-section" id="inputSection">')
    w(f, '        <h2>请输入出生信息</h2>')
    w(f, '        <div class="input-tabs">')
    w(f, '          <button class="input-tab active" onclick="switchInputMode(\'solar\')" id="tabSolar">阳历输入</button>')
    w(f, '          <button class="input-tab" onclick="switchInputMode(\'lunar\')" id="tabLunar">阴历输入</button>')
    w(f, '          <button class="input-tab" onclick="switchInputMode(\'direct\')" id="tabDirect">直接输入四柱</button>')
    w(f, '        </div>')
    w(f, '')
    # Solar panel
    w(f, '        <div class="input-panel active" id="panelSolar">')
    w(f, '          <div class="input-grid">')
    w(f, '            <div class="input-group"><label for="sName">姓名（可选）</label><input type="text" id="sName" placeholder="请输入姓名"></div>')
    w(f, '            <div class="input-group"><label for="sGender">性别</label><select id="sGender"><option value="male">男</option><option value="female">女</option></select></div>')
    w(f, '            <div class="input-group"><label for="sYear">出生年份</label><input type="number" id="sYear" placeholder="如1990" min="1900" max="2100" value="1990"></div>')
    w(f, '            <div class="input-group"><label for="sMonth">出生月份</label><select id="sMonth">')
    for i in range(1, 13):
        w(f, '              <option value="' + str(i) + '">' + str(i) + '月</option>')
    w(f, '            </select></div>')
    w(f, '            <div class="input-group"><label for="sDay">出生日</label><select id="sDay"></select></div>')
    w(f, '            <div class="input-group"><label for="sHour">出生时辰</label><select id="sHour">')
    hours = [(0,'子时 (23-01)'),(1,'丑时 (01-03)'),(3,'寅时 (03-05)'),(5,'卯时 (05-07)'),(7,'辰时 (07-09)'),(9,'巳时 (09-11)'),(11,'午时 (11-13)'),(13,'未时 (13-15)'),(15,'申时 (15-17)'),(17,'酉时 (17-19)'),(19,'戌时 (19-21)'),(21,'亥时 (21-23)'),(23,'夜子时 (23-00)')]
    for v, lbl in hours:
        w(f, '              <option value="' + str(v) + '">' + lbl + '</option>')
    w(f, '            </select></div>')
    w(f, '            <div class="input-group"><label for="sMinute">分钟</label><select id="sMinute"><option value="0">00分</option><option value="30">30分</option></select></div>')
    w(f, '            <div class="input-row-full"><button class="btn-generate" onclick="handleSolarSubmit()">排 盘 分 析</button></div>')
    w(f, '          </div>')
    w(f, '        </div>')
    w(f, '')
    
    print("Part 1 done")
