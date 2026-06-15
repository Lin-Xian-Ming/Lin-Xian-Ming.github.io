# -*- coding: utf-8 -*-
import os

HEADER = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>八字命盘 - 四柱排盘与分析</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="site-header">
  <h1>八字命盘</h1>
  <p class="subtitle">四柱推命 路 纳音五行 路 十神分析 路 流年大运</p>
  <div class="header-books">
    <span>滴天髓</span><span>子平真诠</span><span>盲派金口诀</span><span>千里命稿</span>
  </div>
</header>
<button class="sidebar-toggle" id="sidebarToggle" onclick="toggleSidebar()" title="命例存档">命例存档</button>
<div class="app-container">
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">命例存档</div>
    <div class="sidebar-list" id="sidebarList"><div class="sidebar-empty">暂无存档命例<br>排盘后自动保存</div></div>
  </aside>
  <main class="main-content" id="mainContent">
    <div class="container">
'''

INPUT_SECTION = '''
      <section class="input-section" id="inputSection">
        <h2>请输入出生信息</h2>
        <div class="input-tabs">
          <button class="input-tab active" onclick="switchInputMode('solar')" id="tabSolar">阳历输入</button>
          <button class="input-tab" onclick="switchInputMode('lunar')" id="tabLunar">阴历输入</button>
          <button class="input-tab" onclick="switchInputMode('direct')" id="tabDirect">直接输入四柱</button>
        </div>
        <div class="input-panel active" id="panelSolar">
          <div class="input-grid">
            <div class="input-group"><label for="sName">姓名（可选）</label><input type="text" id="sName" placeholder="请输入姓名"></div>
            <div class="input-group"><label for="sGender">性别</label><select id="sGender"><option value="male">男</option><option value="female">女</option></select></div>
            <div class="input-group"><label for="sYear">出生年份</label><input type="number" id="sYear" placeholder="如1990" min="1900" max="2100" value="1990"></div>
            <div class="input-group"><label for="sMonth">出生月份</label><select id="sMonth">'''
INPUT_SOLAR_MONTHS = ''.join(f'<option value="{i}">{i}月</option>' for i in range(1,13))
INPUT_SOLAR_DAYS = '''</select></div>
            <div class="input-group"><label for="sDay">出生日</label><select id="sDay"></select></div>
            <div class="input-group"><label for="sHour">出生时辰</label><select id="sHour">'''
INPUT_HOURS = '<option value="0">子时 (23-01)</option><option value="1">丑时 (01-03)</option><option value="3">寅时 (03-05)</option><option value="5">卯时 (05-07)</option><option value="7">辰时 (07-09)</option><option value="9">巳时 (09-11)</option><option value="11">午时 (11-13)</option><option value="13">未时 (13-15)</option><option value="15">申时 (15-17)</option><option value="17">酉时 (17-19)</option><option value="19">戌时 (19-21)</option><option value="21">亥时 (21-23)</option><option value="23">夜子时 (23-00)</option>'

footer = '''
    </div>
    <footer class="site-footer">
      <p>参考典籍：滴天髓 路 子平真诠 路 盲派金口诀 路 千里命稿 路 三命通会</p>
      <p>命理之学，博大精深。仅供参考研究，不可迷信。命运掌握在自己手中。</p>
    </footer>
  </main>
</div>
'''

SCRIPTS_START = '''
<script src="js/bazi-data.js"></script>
<script src="js/bazi-core.js"></script>
<script src="js/bazi-enhanced.js"></script>
<script src="js/bazi-analysis.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lunar-javascript@1.6.11/lunar.min.js" defer></script>
<script>
'''

print("Building HTML...")
# For now, just test we can write
with open(r"D:\CODEXYUNXING\_gen_test.py", "w", encoding="utf-8") as f:
    f.write("print('Generator works')")
print("Test file written")
