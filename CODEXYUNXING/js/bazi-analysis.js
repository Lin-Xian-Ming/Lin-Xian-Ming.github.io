/**
 * 八字分析引擎
 */

class BaziAnalysisEngine {
  constructor() { this.engine = baziEngine; }

  generateReport(bazi) {
    var s = [];
    s.push(this.overview(bazi));
    s.push(this.dayMaster(bazi));
    s.push(this.wuxing(bazi));
    s.push(this.nayin(bazi));
    s.push(this.shiShen(bazi));
    s.push(this.shenSha(bazi));
    s.push(this.shenShaSummary(bazi));
    s.push(this.daYun(bazi));
    s.push(this.marriage(bazi));
    s.push(this.career(bazi));
    s.push(this.health(bazi));
    s.push(this.liuNian(bazi));
    s.push(this.geJu(bazi));
    s.push(this.summary(bazi));
    return s.join('');
  }

  overview(bazi) {
    var r = bazi;
    return '<div class="analysis-section-header">一、命盘总览</div>' +
    '<table class="analysis-table"><tr><th class="col-label">项目</th><th class="col-value">内容</th></tr>' +
    '<tr><td class="col-label">日主</td><td class="col-value"><span style="color:' + WUXING_COLORS[r.riWuxing] + ';font-size:1.2rem;font-weight:700;">' + r.riGan + '</span>（' + r.riWuxing + '）</td></tr>' +
    '<tr><td class="col-label">生肖</td><td class="col-value">' + r.shengXiao + '</td></tr>' +
    '<tr><td class="col-label">日柱纳音</td><td class="col-value">' + r.nayin.day + '</td></tr>' +
    '<tr><td class="col-label">日主强弱</td><td class="col-value">' + this.engine.judgeDayMasterStrength(r) + '</td></tr>' +
    '<tr><td class="col-label">四柱</td><td class="col-value">年 ' + r.yearPillar.ganZhi + '  月 ' + r.monthPillar.ganZhi + '  日 ' + r.dayPillar.ganZhi + '  时 ' + r.hourPillar.ganZhi + '</td></tr>' +
    '<tr><td class="col-label">藏干</td><td class="col-value">年 ' + r.cangGan.year.join('') + '  月 ' + r.cangGan.month.join('') + '  日 ' + r.cangGan.day.join('') + '  时 ' + r.cangGan.hour.join('') + '</td></tr>' +
    '<tr><td class="col-label">纳音</td><td class="col-value">' + r.nayin.year + '  ' + r.nayin.month + '  ' + r.nayin.day + '  ' + r.nayin.hour + '</td></tr>' +
    '<tr><td class="col-label">三垣</td><td class="col-value">胎元 ' + r.sanYuan.taiYuan.ganZhi + '  命宫 ' + r.sanYuan.mingGong.ganZhi + '  身宫 ' + r.sanYuan.shenGong.ganZhi + '</td></tr>' +
    '<tr><td class="col-label">起运</td><td class="col-value">' + (r.qiYunAge.qiYunStr || (r.qiYunAge.qiYunAge + '岁')) + '</td></tr></table>';
  }

  dayMaster(bazi) {
    var riGan = bazi.riGan;
    var str = this.engine.judgeDayMasterStrength(bazi);
    var texts = { '甲':'甲木参天，脱胎要火。春不容金，秋不容土。', '乙':'乙木虽柔，刲羊解牛。怀丁抱丙，跨凤乘猴。', '丙':'丙火猛烈，欺霜侮雪。能煅庚金，逢辛反怯。', '丁':'丁火柔中，内性昭融。抱乙而孝，合壬而忠。', '戊':'戊土固重，既中且正。静翕动辟，万物司命。', '己':'己土卑湿，中正蓄藏。不愁木盛，不畏水狂。', '庚':'庚金带煞，刚健为最。得水而清，得火而锐。', '辛':'辛金软弱，温润而清。畏土之叠，乐水之盈。', '壬':'壬水通河，能泄金气。刚中之德，周流不滞。', '癸':'癸水至弱，达于天津。得龙而运，功化斯神。' };
    var modern = { '甲':'甲木参天，志向远大，积极进取，有领导才能。适合创业、管理。', '乙':'乙木柔韧，善于变通，适应力强。有艺术天赋。', '丙':'丙火猛烈，热情奔放，光明磊落。适合能源、互联网。', '丁':'丁火柔中，心思细腻，情感丰富。适合心理咨询、写作。', '戊':'戊土固重，沉稳可靠，诚信务实。适合建筑、房地产。', '己':'己土卑湿，包容心强，精于策划。适合中介、HR。', '庚':'庚金带煞，刚健果断，执行力强。适合军警、外科。', '辛':'辛金软弱，聪明细致，审美力强。适合设计、法律。', '壬':'壬水通河，智慧通达，胸怀宽广。适合贸易、传媒。', '癸':'癸水至弱，心思缜密，直觉敏锐。适合科研、分析。' };
    var strAnalysis = str.indexOf('旺') >= 0 ? '日主旺相，精力充沛，能任财官。喜克泄耗，忌生扶。' : (str.indexOf('弱') >= 0 ? '日主偏弱，性格柔顺，善借外力。喜生扶，忌克泄耗。' : '日主中和，适应力强，大运流年影响较大。');
    return '<div class="analysis-section-header">二、日主分析 · 滴天髓</div>' + '<table class="analysis-table"><tr><th>项目</th><th>典籍原文</th><th>白话解读</th></tr>' + '<tr><td class="col-label">' + riGan + '日主赋</td><td class="col-classic">' + (texts[riGan]||'') + '</td><td class="col-modern">' + (modern[riGan]||'') + '</td></tr>' + '<tr><td class="col-label">强弱判断</td><td class="col-classic">子平云："旺者宜克宜泄，衰者喜扶喜助。"</td><td class="col-modern">' + strAnalysis + '</td></tr></table>';
  }

  wuxing(bazi) {
    var wc = bazi.wuxingCount;
    var names = ['金','木','水','火','土'];
    var descs = { '金':{classic:'金主义，性刚烈。金赖土生，土多金埋。',modern:'代表决断力、执行力。金旺者适合法律金融。金弱者注意肺、皮肤。'}, '木':{classic:'木主仁，性温和。木赖水生，水多木漂。',modern:'代表创造力、成长力。木旺者适合文化艺术。木弱者注意肝胆。'}, '水':{classic:'水主智，性聪慧。水赖金生，金多水浊。',modern:'代表智慧、变通力。水旺者适合贸易传媒。水弱者注意肾。'}, '火':{classic:'火主礼，性急躁。火赖木生，木多火炽。',modern:'代表热情、行动力。火旺者适合能源餐饮。火弱者注意心脏。'}, '土':{classic:'土主信，性厚重。土赖火生，火多土焦。',modern:'代表诚信、包容力。土旺者适合房地产农业。土弱者注意脾胃。'} };
    var html = '<div class="analysis-section-header">三、五行分析</div><table class="analysis-table"><tr><th>五行</th><th>数量</th><th>典籍论述</th><th>白话解读</th></tr>';
    names.forEach(function(w) { var v = Math.round((wc[w]||0)*10)/10; html += '<tr><td class="col-label" style="color:' + WUXING_COLORS[w] + ';">' + WUXING_ICONS[w] + ' ' + w + '</td><td>' + v + '</td><td class="col-classic">' + descs[w].classic + '</td><td class="col-modern">' + descs[w].modern + '</td></tr>'; });
    html += '</table>';
    return html;
  }

  nayin(bazi) {
    var html = '<div class="analysis-section-header">四、纳音分析</div><table class="analysis-table"><tr><th>柱位</th><th>干支</th><th>纳音</th><th>典籍释义</th></tr>';
    ['year','month','day','hour'].forEach(function(p,i) { var names2 = ['年柱','月柱','日柱','时柱']; var gz = bazi[p+'Pillar'].ganZhi; var ny = bazi.nayin[p]; var fx = NAYIN_FENXI[ny] || ''; html += '<tr><td class="col-label">' + names2[i] + '</td><td>' + gz + '</td><td>' + ny + '</td><td class="col-classic">' + fx + '</td></tr>'; });
    html += '</table>';
    return html;
  }

  shiShen(bazi) {
    var sc = {}; ['year','month','day','hour'].forEach(function(p) { var ss = bazi.shiShen[p]; sc[ss] = (sc[ss]||0) + 1; });
    var analysis = { '比肩':{classic:'比肩多者，自我意识强。',modern:'独立自主，适合创业、自由职业。'}, '劫财':{classic:'劫财多者，为人讲义气。',modern:'社交能力强，但易破财。'}, '食神':{classic:'食神多者，温和善良。',modern:'有创造力，适合艺术、美食。'}, '伤官':{classic:'伤官多者，才华横溢。',modern:'思维活跃，适合技术研发。'}, '偏财':{classic:'偏财多者，慷慨大方。',modern:'商业嗅觉敏锐，适合经商。'}, '正财':{classic:'正财多者，勤劳俭朴。',modern:'踏实肯干，适合稳定工作。'}, '偏官':{classic:'七杀多者，有魄力。',modern:'领导力强，适合管理、军警。'}, '正官':{classic:'正官多者，遵纪守法。',modern:'正直可靠，适合公务员。'}, '偏印':{classic:'偏印多者，思维独特。',modern:'有特殊才能，适合科研。'}, '正印':{classic:'正印多者，仁慈善良。',modern:'学识渊博，适合教育、文化。'} };
    var html = '<div class="analysis-section-header">五、十神分析 · 子平法</div><table class="analysis-table"><tr><th>十神</th><th>数量</th><th>典籍论述</th><th>白话解读</th></tr>';
    SHI_SHEN.forEach(function(ss) { var ct = sc[ss]||0; if (ct>0) { var an = analysis[ss]||{classic:'',modern:''}; html += '<tr><td class="col-label">' + ss + '</td><td>' + ct + '个</td><td class="col-classic">' + an.classic + '</td><td class="col-modern">' + an.modern + '</td></tr>'; } });
    html += '</table>';
    return html;
  }

  shenSha(bazi) {
    var html = '<div class="analysis-section-header">六、神煞分析</div><table class="analysis-table"><tr><th>类型</th><th>神煞名</th><th>典籍释义</th></tr>';
    var all = [];
    bazi.shenSha.ji.forEach(function(s) { all.push({type:'吉',name:s}); });
    bazi.shenSha.xiong.forEach(function(s) { all.push({type:'凶',name:s}); });
    bazi.shenSha.other.forEach(function(s) { all.push({type:'其他',name:s}); });
    all.forEach(function(item) {
      var detail = getShenShaDetailExtended(item.name.replace(/^(年柱|月柱|日柱|时柱)/,'')) || '';
      html += '<tr><td><span class="shensha-tag ' + (item.type==='吉'?'ji':'xiong') + '">' + item.type + '</span></td><td>' + item.name + '</td><td class="col-classic">' + detail + '</td></tr>';
    });
    html += '</table>';
    return html;
  }

  shenShaSummary(bazi) {
    var html = '<div class="analysis-section-header">七、神煞汇总</div><table class="analysis-table"><tr><th>柱位</th><th>吉神（' + bazi.shenSha.ji.length + '）</th><th>凶煞（' + bazi.shenSha.xiong.length + '）</th><th>其他</th></tr>';
    ['年柱','月柱','日柱','时柱'].forEach(function(pn) {
      var ji = bazi.shenSha.ji.filter(function(s) { return s.indexOf(pn) >= 0; }).map(function(s) { return s.replace(pn, ''); });
      var xiong = bazi.shenSha.xiong.filter(function(s) { return s.indexOf(pn) >= 0; }).map(function(s) { return s.replace(pn, ''); });
      var other = bazi.shenSha.other.filter(function(s) { return s.indexOf(pn) >= 0; }).map(function(s) { return s.replace(pn, ''); });
      html += '<tr><td class="col-label">' + pn + '</td><td style="color:#C0392B;">' + (ji.length>0?ji.join('、'):'—') + '</td><td style="color:#7D6608;">' + (xiong.length>0?xiong.join('、'):'—') + '</td><td>' + (other.length>0?other.join('、'):'—') + '</td></tr>';
    });
    html += '</table>';
    return html;
  }

  daYun(bazi) {
    var qiYun = bazi.qiYunAge.qiYunAge;
    var isShun = bazi.qiYunAge.isShunPai;
    var str = this.engine.judgeDayMasterStrength(bazi);
    var riWx = bazi.riWuxing;
    var riGan = bazi.riGan;
    var html = '<div class="analysis-section-header">八、大运分析 · 千里命稿</div>';
    html += '<div class="summary-box"><p>起运：<strong>' + (bazi.qiYunAge.qiYunStr || (qiYun+'岁')) + '</strong>  排法：<strong>' + (isShun?'顺排（阳男/阴女）':'逆排（阴男/阳女）') + '</strong></p></div>';
    html += '<table class="analysis-table"><tr><th>步</th><th>年龄</th><th>大运</th><th>十神</th><th>喜忌</th><th>预测</th></tr>';
    bazi.daYun.forEach(function(yun, idx) {
      var sa = qiYun + idx*10; var ea = sa+9;
      var yw = GAN_WUXING[yun.gan];
      var isXi = false;
      if (str.indexOf('旺') >= 0) isXi = (yw !== riWx);
      else if (str.indexOf('弱') >= 0) isXi = (yw === riWx);
      var dySS = SHI_SHEN_MAP[riGan][yun.gan];
      var pred = predictDaYunEvents(idx, bazi, qiYun);
      html += '<tr><td>' + (idx+1) + '</td><td>' + sa + '-' + ea + '</td><td><strong>' + yun.ganZhi + '</strong></td><td>' + dySS + '</td><td class="' + (isXi?'yun-good':'yun-bad') + '">' + (isXi?'喜':'忌') + '</td><td style="font-size:0.8rem;">' + pred.events.join('；') + '</td></tr>';
    });
    html += '</table>';
    return html;
  }

  marriage(bazi) {
    var riGan = bazi.riGan; var riZhi = bazi.dayPillar.zhi; var isMale = bazi.isMale;
    var peiOuXing = isMale ? (GAN_YINYANG[riGan]===1?'正财':'偏财') : (GAN_YINYANG[riGan]===1?'正官':'偏官');
    return '<div class="analysis-section-header">九、婚姻分析 · 盲派</div><table class="analysis-table"><tr><th>项目</th><th>典籍原文</th><th>白话解读</th></tr>' +
    '<tr><td class="col-label">配偶星</td><td class="col-classic">' + (isMale?'男命以财为妻':'女命以官为夫') + '</td><td class="col-modern">配偶星为<strong>' + peiOuXing + '</strong></td></tr>' +
    '<tr><td class="col-label">配偶宫</td><td class="col-classic">日支为配偶宫</td><td class="col-modern">日坐<strong>' + riZhi + '</strong>，' + (RI_ZHI_FENXI[riZhi]||'') + '</td></tr></table>';
  }

  career(bazi) {
    var riWx = bazi.riWuxing;
    var careers = { '金':'金融、法律、军警、机械、汽车、牙医', '木':'教育、文化、出版、园艺、医药、设计', '水':'贸易、物流、航运、旅游、传媒、演艺', '火':'能源、餐饮、美容、化工、电子、互联网', '土':'房地产、建筑、农业、矿产、仓储、陶瓷' };
    return '<div class="analysis-section-header">十、事业分析</div><table class="analysis-table"><tr><th>项目</th><th>典籍原文</th><th>白话解读</th></tr>' +
    '<tr><td class="col-label">适合行业</td><td class="col-classic">五行各有所主</td><td class="col-modern">日主属<strong>' + riWx + '</strong>，适合：' + careers[riWx] + '</td></tr></table>';
  }

  health(bazi) {
    var wc = bazi.wuxingCount;
    var hMap = { '金':'肺、气管、皮肤', '木':'肝胆、四肢、筋骨', '水':'肾脏、泌尿、耳朵', '火':'心脏、血液、眼睛', '土':'脾胃、消化、肌肉' };
    var html = '<div class="analysis-section-header">十一、健康分析</div><table class="analysis-table"><tr><th>五行</th><th>典籍原文</th><th>白话解读</th></tr>';
    ['金','木','水','火','土'].forEach(function(w) {
      var v = Math.round((wc[w]||0)*10)/10;
      var status = v < 1 ? '偏弱' : (v > 4 ? '偏旺' : '适中');
      html += '<tr><td class="col-label" style="color:' + WUXING_COLORS[w] + ';">' + WUXING_ICONS[w] + ' ' + w + '(' + status + ')</td><td class="col-classic">五行平衡则健康</td><td class="col-modern">主管：' + hMap[w] + '</td></tr>';
    });
    html += '</table>';
    return html;
  }

  liuNian(bazi) {
    var year = new Date().getFullYear();
    var liuNian = calculateLiuNian(bazi, year);
    var predictions = predictLiuNianEventsDetailed(liuNian, bazi);
    var html = '<div class="analysis-section-header">十二、流年分析</div>';
    html += '<div class="summary-box"><p>' + year + '年流年：<strong>' + liuNian.ganZhi + '</strong>（' + liuNian.wuxing + '）十神：<strong>' + liuNian.shiShen + '</strong></p></div>';
    html += '<table class="analysis-table"><tr><th>方面</th><th>具体预测</th></tr>';
    var cats = { career:'事业', wealth:'财运', marriage:'感情', education:'学业', health:'健康', general:'提示' };
    Object.keys(cats).forEach(function(k) { var lines = predictions.details[k]||[]; if (lines.length>0) html += '<tr><td class="col-label">' + cats[k] + '</td><td class="col-modern">' + lines.join('；') + '</td></tr>'; });
    html += '</table>';
    return html;
  }


  geJu(bazi) {
    var geju = determineGeJu(bazi);
    var html = '<div class="analysis-section-header">十三、八字格局 · 子平真诠</div>';
    html += '<div class="summary-box"><h4>' + geju.name + '（' + (geju.type||'') + '）</h4>';
    html += '<p>月令：' + geju.yueLing + '  透干：' + (geju.touGan||'无') + '  十神：' + (geju.shiShen||'') + '</p></div>';
    html += '<div class="quote-block"><strong>' + (geju.source||'子平真诠') + '：</strong>' + (geju.classic||'') + '</div>';
    return html;
  }

  summary(bazi) {
    var riGan = bazi.riGan; var riWx = bazi.riWuxing; var str = this.engine.judgeDayMasterStrength(bazi);
    var html = '<div class="analysis-section-header">十四、综合总结</div>';
    html += '<div class="summary-box"><h4>命局总评</h4><p>日主<strong>' + riGan + '</strong>属<strong>' + riWx + '</strong>，生于' + bazi.shengXiao + '年，日主' + str + '。</p></div>';
    html += '<table class="analysis-table"><tr><th>典籍出处</th><th>典籍原文</th><th>白话解读</th></tr>';
    html += '<tr><td class="col-label">滴天髓</td><td class="col-classic">欲识三元万法宗，先观帝载与神功。</td><td class="col-modern">此命日主' + str + '。</td></tr>';
    html += '<tr><td class="col-label">子平真诠</td><td class="col-classic">论命之法，先观月令，次看日主，再论财官。</td><td class="col-modern">月令' + bazi.monthPillar.zhi + '为' + ZHI_WUXING[bazi.monthPillar.zhi] + '。</td></tr>';
    html += '<tr><td class="col-label">渊海子平</td><td class="col-classic">大运起于月柱，顺逆分于阴阳。</td><td class="col-modern">当前' + new Date().getFullYear() + '年。</td></tr>';
    html += '</table>';
    html += '<div class="summary-box"><h4>人生建议</h4><p>1. 顺势而为——顺境积极进取，逆境稳守待机。<br>2. 发挥优势——命局强项十神重点发展。<br>3. 趋吉避凶——吉年大胆开拓，凶年谨慎行事。<br>4. 命自我立——命运掌握在自己手中，积极向上，克己修身。</p></div>';
    html += '<div class="quote-block">参考典籍：《滴天髓》《子平真诠》《三命通会》《渊海子平》《千里命稿》《盲派金口诀》<br>命理之学，博大精深。仅供学习研究参考，不可迷信。</div>';
    return html;
  }
}




var baziAnalysis = new BaziAnalysisEngine();
console.log('八字分析引擎已加载');


