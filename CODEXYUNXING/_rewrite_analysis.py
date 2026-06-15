# -*- coding: utf-8 -*-
out_path = r"D:\CODEXYUNXING\js\bazi-analysis.js"

report_code = r'''
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
    s.push(this.daYun(bazi));
    s.push(this.marriage(bazi));
    s.push(this.career(bazi));
    s.push(this.health(bazi));
    s.push(this.liuNian(bazi));
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
    '<tr><td class="col-label">四柱</td><td class="col-value">年 ' + r.yearPillar.ganZhi + '　月 ' + r.monthPillar.ganZhi + '　日 ' + r.dayPillar.ganZhi + '　时 ' + r.hourPillar.ganZhi + '</td></tr>' +
    '<tr><td class="col-label">藏干</td><td class="col-value">年 ' + r.cangGan.year.join('') + '　月 ' + r.cangGan.month.join('') + '　日 ' + r.cangGan.day.join('') + '　时 ' + r.cangGan.hour.join('') + '</td></tr>' +
    '<tr><td class="col-label">纳音</td><td class="col-value">' + r.nayin.year + '　' + r.nayin.month + '　' + r.nayin.day + '　' + r.nayin.hour + '</td></tr>' +
    '<tr><td class="col-label">三垣</td><td class="col-value">胎元 ' + r.sanYuan.taiYuan.ganZhi + '　命宫 ' + r.sanYuan.mingGong.ganZhi + '　身宫 ' + r.sanYuan.shenGong.ganZhi + '</td></tr>' +
    '<tr><td class="col-label">起运</td><td class="col-value">' + r.qiYunAge.qiYunAge + '岁起运</td></tr></table>';
  }

  dayMaster(bazi) {
    var riGan = bazi.riGan;
    var str = this.engine.judgeDayMasterStrength(bazi);
    var texts = {
      '甲': '甲木参天，脱胎要火。春不容金，秋不容土。火炽乘龙，水宕骑虎。地润天和，植立千古。',
      '乙': '乙木虽柔，刲羊解牛。怀丁抱丙，跨凤乘猴。虚湿之地，骑马亦忧。藤萝系甲，可春可秋。',
      '丙': '丙火猛烈，欺霜侮雪。能煅庚金，逢辛反怯。土众成慈，水猖显节。虎马犬乡，甲来焚灭。',
      '丁': '丁火柔中，内性昭融。抱乙而孝，合壬而忠。旺而不烈，衰而不穷。如有嫡母，可秋可冬。',
      '戊': '戊土固重，既中且正。静翕动辟，万物司命。水润物生，火燥物病。若在艮坤，怕冲宜静。',
      '己': '己土卑湿，中正蓄藏。不愁木盛，不畏水狂。火少火晦，金多金光。若要物旺，宜助宜帮。',
      '庚': '庚金带煞，刚健为最。得水而清，得火而锐。土润则生，土干则脆。能赢甲兄，输于乙妹。',
      '辛': '辛金软弱，温润而清。畏土之叠，乐水之盈。能扶社稷，能救生灵。热则喜母，寒则喜丁。',
      '壬': '壬水通河，能泄金气。刚中之德，周流不滞。通根透癸，冲天奔地。化则有情，从则相济。',
      '癸': '癸水至弱，达于天津。得龙而运，功化斯神。不愁火土，不论庚辛。合戊见火，化象斯真。'
    };
    var modern = {
      '甲': '甲木参天，志向远大，积极进取，有领导才能。为人正直，但有时过于固执。现代适合创业、管理、军警等需要魄力的领域。',
      '乙': '乙木柔韧，善于变通，适应能力强。思维敏捷，有艺术天赋，但有时缺乏决断力。现代适合艺术、设计、教育等行业。',
      '丙': '丙火猛烈，热情奔放，光明磊落。行事果断，富有感染力。现代适合能源、互联网、娱乐、公关等需要热情和行动的行业。',
      '丁': '丁火柔中，内性昭融。心思细腻，情感丰富。现代适合心理咨询、写作、研究等需要深度和敏感度的职业。',
      '戊': '戊土固重，沉稳可靠，诚信务实。责任心强，有大将之风。现代适合建筑、房地产、金融等需要稳重和坚持的行业。',
      '己': '己土卑湿，中正蓄藏。包容心强，精于策划。现代适合中介、策划、人力资源等需要协调能力的工作。',
      '庚': '庚金带煞，刚健果断。意志坚定，执行力强。现代适合军警、外科医生、工程师等需要果敢和精准的领域。',
      '辛': '辛金软弱，温润而清。聪明细致，审美能力强。现代适合珠宝设计、精密制造、法律、财务等需要细腻和精确的工作。',
      '壬': '壬水通河，智慧通达。胸怀宽广，善于谋略。现代适合贸易、物流、传媒、外交等需要宏大视野和灵活应变的领域。',
      '癸': '癸水至弱，达于天津。心思缜密，直觉敏锐。现代适合科研、数据分析、侦探、玄学等需要深入钻研和敏锐直觉的工作。'
    };
    var strAnalysis = str.indexOf('旺') >= 0 ? '日主旺相，精力充沛，能任财官。喜克泄耗（官杀、食伤、财星），忌生扶（印星、比劫）。' :
      str.indexOf('弱') >= 0 ? '日主偏弱，性格柔顺，善借外力。喜生扶（印星、比劫），忌克泄耗（官杀、食伤、财星）。' :
      '日主中和，性格平和圆融，适应力强，能屈能伸。大运流年影响较大。';
    
    return '<div class="analysis-section-header">二、日主分析 · 滴天髓</div>' +
    '<table class="analysis-table"><tr><th>项目</th><th>典籍原文</th><th>白话解读</th></tr>' +
    '<tr><td class="col-label">' + riGan + '日主赋</td><td class="col-classic">' + (texts[riGan]||'') + '</td><td class="col-modern">' + (modern[riGan]||'') + '</td></tr>' +
    '<tr><td class="col-label">强弱判断</td><td class="col-classic">子平云："旺者宜克宜泄，衰者喜扶喜助。"</td><td class="col-modern">' + strAnalysis + '</td></tr></table>';
  }

  wuxing(bazi) {
    var wc = bazi.wuxingCount;
    var names = ['金','木','水','火','土'];
    var descs = {
      '金': { classic: '主义，性刚烈。金赖土生，土多金埋；金能生水，水多金沉。', modern: '代表决断力、执行力、规则意识。金旺者适合法律、金融、管理。金弱者注意肺、皮肤健康，宜培养决断力。' },
      '木': { classic: '主仁，性温和。木赖水生，水多木漂；木能生火，火多木焚。', modern: '代表创造力、成长力、仁慈心。木旺者适合教育、文化、艺术。木弱者注意肝胆、情绪管理，宜多接触大自然。' },
      '水': { classic: '主智，性聪慧。水赖金生，金多水浊；水能生木，木多水缩。', modern: '代表智慧、变通力、沟通能力。水旺者适合贸易、传媒、外交。水弱者注意肾、泌尿系统，宜增强运动。' },
      '火': { classic: '主礼，性急躁。火赖木生，木多火炽；火能生土，土多火晦。', modern: '代表热情、行动力、礼仪。火旺者适合能源、娱乐、餐饮。火弱者注意心脏、循环系统，宜保持平和心态。' },
      '土': { classic: '主信，性厚重。土赖火生，火多土焦；土能生金，金多土虚。', modern: '代表诚信、包容力、稳定性。土旺者适合房地产、农业、仓储。土弱者注意脾胃、消化系统，宜规律作息。' }
    };
    var html = '<div class="analysis-section-header">三、五行分析</div><table class="analysis-table"><tr><th>五行</th><th>数量</th><th>典籍论述</th><th>白话解读</th></tr>';
    names.forEach(function(w) {
      var v = Math.round((wc[w]||0)*10)/10;
      html += '<tr><td class="col-label" style="color:' + WUXING_COLORS[w] + ';">' + WUXING_ICONS[w] + ' ' + w + '</td><td>' + v + '</td><td class="col-classic">' + descs[w].classic + '</td><td class="col-modern">' + descs[w].modern + '</td></tr>';
    });
    html += '</table>';
    return html;
  }

  nayin(bazi) {
    var html = '<div class="analysis-section-header">四、纳音分析</div><table class="analysis-table"><tr><th>柱位</th><th>干支</th><th>纳音</th><th>典籍释义</th><th>白话解读</th></tr>';
    ['year','month','day','hour'].forEach(function(p) {
      var names = ['年柱','月柱','日柱','时柱'];
      var i = ['year','month','day','hour'].indexOf(p);
      var gz = bazi[p+'Pillar'].ganZhi;
      var ny = bazi.nayin[p];
      var fx = NAYIN_FENXI[ny] || '暂无释义';
      var parts = fx.split('。');
      var classic = parts[0] + '。' + (parts[1]||'');
      var modern = parts.slice(2).join('。') || classic;
      html += '<tr><td class="col-label">' + names[i] + '</td><td>' + gz + '</td><td>' + ny + '</td><td class="col-classic">' + classic + '</td><td class="col-modern">' + modern + '</td></tr>';
    });
    html += '</table>';
    return html;
  }

  shiShen(bazi) {
    var sc = {};
    ['year','month','day','hour'].forEach(function(p) { var ss = bazi.shiShen[p]; sc[ss] = (sc[ss]||0) + 1; });
    var analysis = {
      '比肩': { classic: '比肩多者，自我意识强。比劫重重，财星受损。', modern: '独立自主，有竞争意识。适合创业、自由职业。但容易与人竞争，需学合作。' },
      '劫财': { classic: '劫财多者，为人讲义气。劫财夺财，不宜合伙。', modern: '社交能力强，人脉广。但易破财，不宜投资合作。适合销售、公关行业。' },
      '食神': { classic: '食神多者，温和善良。食神生财，富贵自天来。', modern: '有创造力，懂得享受。适合艺术、美食、内容创作。性格乐观豁达。' },
      '伤官': { classic: '伤官多者，才华横溢。伤官见官，为祸百端。', modern: '思维活跃，创新力强。适合技术、研发。但言辞锋利，注意人际关系。' },
      '偏财': { classic: '偏财多者，慷慨大方。偏财旺者，经商致富。', modern: '商业嗅觉敏锐，敢于冒险。适合投资、贸易。但不善守财，需控制风险。' },
      '正财': { classic: '正财多者，勤劳俭朴。正财为用，一生富足。', modern: '踏实肯干，重视积蓄。适合稳定工作。但过于保守，需适当开拓。' },
      '偏官': { classic: '七杀多者，有魄力有权威。杀旺身弱，终身疾苦。', modern: '领导力强，果断勇敢。适合管理、军警。但压力大，需注意健康和情绪管理。' },
      '正官': { classic: '正官多者，遵纪守法。官星宜清不宜杂。', modern: '正直可靠，适合公务员、大企业。但过于保守，需增加灵活性。' },
      '偏印': { classic: '偏印多者，思维独特。枭神夺食，六亲缘薄。', modern: '有特殊才能，专注力强。适合科研、技术。但孤僻寡合，需多与人交流。' },
      '正印': { classic: '正印多者，仁慈善良。印星护身，贵人相助。', modern: '学识渊博，得长辈帮助。适合教育、文化。但依赖性强，需培养独立性。' }
    };
    var html = '<div class="analysis-section-header">五、十神分析 · 子平法</div><table class="analysis-table"><tr><th>十神</th><th>数量</th><th>典籍论述</th><th>白话解读</th></tr>';
    SHI_SHEN.forEach(function(ss) {
      var ct = sc[ss] || 0;
      if (ct > 0) {
        var an = analysis[ss] || { classic:'', modern:'' };
        html += '<tr><td class="col-label">' + ss + '</td><td>' + ct + '个</td><td class="col-classic">' + an.classic + '</td><td class="col-modern">' + an.modern + '</td></tr>';
      }
    });
    html += '</table>';
    return html;
  }

  shenSha(bazi) {
    var html = '<div class="analysis-section-header">六、神煞分析</div><table class="analysis-table"><tr><th>类型</th><th>神煞名</th><th>所在柱位</th><th>典籍释义</th><th>白话解读</th></tr>';
    var all = [];
    bazi.shenSha.ji.forEach(function(s) { all.push({ type:'吉', name:s, isJi:true }); });
    bazi.shenSha.xiong.forEach(function(s) { all.push({ type:'凶', name:s, isJi:false }); });
    bazi.shenSha.other.forEach(function(s) { all.push({ type:'其他', name:s, isJi:false }); });
    all.forEach(function(item) {
      var parts = item.name.split(/(年柱|月柱|日柱|时柱)/);
      var zhuwei = parts.length > 1 ? parts[1] : '全局';
      var ssName = parts[parts.length-1] || item.name;
      var detail = getShenShaDetailExtended(ssName) || '';
      var detParts = detail.split('。');
      var classic = detParts[0] + '。';
      var modern = detParts.slice(1).join('。');
      html += '<tr><td><span class="shensha-tag ' + (item.isJi?'ji':'xiong') + '">' + item.type + '</span></td><td>' + ssName + '</td><td>' + zhuwei + '</td><td class="col-classic">' + classic + '</td><td class="col-modern">' + modern + '</td></tr>';
    });
    html += '</table>';
    return html;
  }

  daYun(bazi) {
    var qiYun = bazi.qiYunAge.qiYunAge;
    var isShun = bazi.qiYunAge.isShunPai;
    var str = this.engine.judgeDayMasterStrength(bazi);
    var html = '<div class="analysis-section-header">七、大运分析 · 千里命稿</div>';
    html += '<div class="summary-box"><h4>起运信息</h4><p>起运年龄：<strong>' + qiYun + '岁</strong>　排法：<strong>' + (isShun?'顺排（阳男/阴女）':'逆排（阴男/阳女）') + '</strong></p><p>千里命稿云："大运司十年之休咎，流年管一岁之吉凶。大运重地支，流年重天干。"</p></div>';
    html += '<table class="analysis-table"><tr><th>步</th><th>年龄</th><th>大运</th><th>十神</th><th>喜忌</th><th>典籍依据</th><th>白话解读</th></tr>';
    var riWx = bazi.riWuxing;
    var riGan = bazi.riGan;
    bazi.daYun.forEach(function(yun, idx) {
      var sa = qiYun + idx*10; var ea = sa+9;
      var yw = GAN_WUXING[yun.gan];
      var isXi = false;
      if (str.indexOf('旺') >= 0) isXi = (yw !== riWx);
      else if (str.indexOf('弱') >= 0) isXi = (yw === riWx);
      var dySS = SHI_SHEN_MAP[riGan][yun.gan];
      var pred = predictDaYunEvents(idx, bazi, qiYun);
      var classic = isXi ? '"大运逢喜，顺遂通达，贵人得助，事业有成。"' : '"大运逢忌，多有阻滞，需稳守待机，厚积薄发。"';
      html += '<tr><td>' + (idx+1) + '</td><td>' + sa + '-' + ea + '</td><td><strong>' + yun.ganZhi + '</strong></td><td>' + dySS + '</td><td class="' + (isXi?'yun-good':'yun-bad') + '">' + (isXi?'喜':'忌') + '</td><td class="col-classic">' + classic + '</td><td class="col-modern">' + pred.events.join('；') + '</td></tr>';
    });
    html += '</table>';
    return html;
  }

  marriage(bazi) {
    var riGan = bazi.riGan;
    var riZhi = bazi.dayPillar.zhi;
    var isMale = bazi.isMale;
    var peiOuXing = isMale ? (GAN_YINYANG[riGan]===1?'正财':'偏财') : (GAN_YINYANG[riGan]===1?'正官':'偏官');
    var html = '<div class="analysis-section-header">八、婚姻分析 · 盲派</div>';
    html += '<table class="analysis-table"><tr><th>项目</th><th>典籍原文</th><th>白话解读</th></tr>';
    html += '<tr><td class="col-label">配偶星</td><td class="col-classic">' + (isMale?'男命以财为妻':'女命以官为夫') + '</td><td class="col-modern">配偶星为<strong>' + peiOuXing + '</strong>。' + (isMale?'正财为妻子，偏财为情人或再婚之妻。':'正官为丈夫，偏官为情人或再婚之夫。') + '</td></tr>';
    html += '<tr><td class="col-label">配偶宫</td><td class="col-classic">日支为配偶宫，看婚姻之根基。</td><td class="col-modern">日坐<strong>' + riZhi + '</strong>，' + (RI_ZHI_FENXI[riZhi]||'') + '</td></tr>';
    html += '<tr><td class="col-label">经典歌诀</td><td class="col-classic">盲派云："桃花一生多艳遇，孤鸾犯日本无儿。"</td><td class="col-modern">桃花多者感情丰富但易有波折。孤鸾煞者婚姻宜迟。阴阳差错日生人夫妻沟通需多用心。</td></tr>';
    html += '</table>';
    return html;
  }

  career(bazi) {
    var riWx = bazi.riWuxing;
    var careers = { '金':'金融、法律、军警、机械、五金、汽车、牙医', '木':'教育、文化、出版、园艺、医药、纺织、设计', '水':'贸易、物流、航运、旅游、传媒、演艺、渔业', '火':'能源、餐饮、美容、化工、电子、互联网、娱乐', '土':'房地产、建筑、农业、矿产、仓储、陶瓷、中介' };
    var html = '<div class="analysis-section-header">九、事业分析</div>';
    html += '<table class="analysis-table"><tr><th>项目</th><th>典籍原文</th><th>白话解读</th></tr>';
    html += '<tr><td class="col-label">五行适合</td><td class="col-classic">"五行各有所主，金主义，木主仁，水主智，火主礼，土主信。"</td><td class="col-modern">日主属<strong>' + riWx + '</strong>，适合行业：' + careers[riWx] + '</td></tr>';
    html += '<tr><td class="col-label">十神指引</td><td class="col-classic">"财官印食，四吉神也；杀伤枭刃，四凶神也。吉神顺用，凶神逆用。"</td><td class="col-modern">年' + bazi.shiShen.year + '月' + bazi.shiShen.month + '日' + bazi.shiShen.day + '时' + bazi.shiShen.hour + '。四柱十神配合决定职业方向。</td></tr>';
    html += '<tr><td class="col-label">发展建议</td><td class="col-classic">"少年看年柱，中年看月柱，日柱主中年，时柱主晚年。"</td><td class="col-modern">青少年以学习积累为主，中年以事业发展为重，晚年宜守成传承。结合大运走势调整职业规划。</td></tr>';
    html += '</table>';
    return html;
  }

  health(bazi) {
    var wc = bazi.wuxingCount;
    var hMap = { '金':'肺、气管、皮肤、牙齿', '木':'肝胆、四肢、筋骨', '水':'肾脏、泌尿、耳朵', '火':'心脏、血液、眼睛', '土':'脾胃、消化、肌肉' };
    var hClassic = { '金':'金弱则肺气不足，金旺则骨骼坚硬。', '木':'木弱则肝胆不舒，木旺则四肢发达。', '水':'水弱则肾气亏损，水旺则泌尿畅通。', '火':'火弱则心血不足，火旺则面色红润。', '土':'土弱则脾胃不和，土旺则肌肉丰满。' };
    var html = '<div class="analysis-section-header">十、健康分析</div><table class="analysis-table"><tr><th>五行</th><th>典籍原文</th><th>白话解读</th><th>养生建议</th></tr>';
    ['金','木','水','火','土'].forEach(function(w) {
      var v = Math.round((wc[w]||0)*10)/10;
      var status = v < 1 ? '偏弱' : (v > 4 ? '偏旺' : '适中');
      var advice = v < 1 ? '宜补' + w + '：多食对应食物，穿着对应颜色，选择' + w + '属性行业。' : (v > 4 ? '宜泄' + w + '：避免过度强化，以克泄耗平衡。' : '保持现状，注意日常调理。');
      html += '<tr><td class="col-label" style="color:' + WUXING_COLORS[w] + ';">' + WUXING_ICONS[w] + ' ' + w + '(' + status + ')</td><td class="col-classic">' + hClassic[w] + '</td><td class="col-modern">主管：' + hMap[w] + '</td><td>' + advice + '</td></tr>';
    });
    html += '</table>';
    return html;
  }

  liuNian(bazi) {
    var year = new Date().getFullYear();
    var liuNian = calculateLiuNian(bazi, year);
    var predictions = predictLiuNianEventsDetailed(liuNian, bazi);
    var html = '<div class="analysis-section-header">十一、流年分析</div>';
    html += '<div class="summary-box"><h4>' + year + '年流年总论</h4><p>流年干支：<strong>' + liuNian.ganZhi + '</strong>（' + liuNian.wuxing + '）　十神：<strong>' + liuNian.shiShen + '</strong>　整体：<strong>' + (predictions.isXi?'吉运，顺势而为':'挑战，稳中求进') + '</strong></p></div>';
    html += '<table class="analysis-table"><tr><th>方面</th><th>典籍指引</th><th>具体预测</th></tr>';
    var cats = { career:'事业', wealth:'财运', marriage:'感情', education:'学业', health:'健康', general:'提示' };
    var classicMap = { career:'"官星为用则升迁，杀星为忌则多阻。"', wealth:'"财星为用得财易，劫财夺财败财多。"', marriage:'"桃花入运姻缘动，冲合配偶宫婚变。"', education:'"印星为用得文凭，文昌入运利考试。"', health:'"七杀攻身需防病，食神为用身体安。"', general:'"太岁当头坐，无喜恐有祸。太阳入运吉，丧门白虎凶。"' };
    Object.keys(cats).forEach(function(k) {
      var lines = predictions.details[k] || [];
      if (lines.length > 0) {
        html += '<tr><td class="col-label">' + cats[k] + '</td><td class="col-classic">' + (classicMap[k]||'') + '</td><td class="col-modern">' + lines.join('；') + '</td></tr>';
      }
    });
    html += '</table>';
    return html;
  }

  summary(bazi) {
    var riGan = bazi.riGan;
    var riWx = bazi.riWuxing;
    var str = this.engine.judgeDayMasterStrength(bazi);
    var html = '<div class="analysis-section-header">十二、综合总结</div>';
    html += '<div class="summary-box"><h4>命局总评</h4><p>日主<strong>' + riGan + '</strong>属<strong>' + riWx + '</strong>，生于' + bazi.shengXiao + '年，日主' + str + '。四柱十神配置为：年' + bazi.shiShen.year + '、月' + bazi.shiShen.month + '、日' + bazi.shiShen.day + '、时' + bazi.shiShen.hour + '。</p></div>';
    
    html += '<table class="analysis-table"><tr><th>典籍出处</th><th>典籍原文</th><th>白话解读</th></tr>';
    html += '<tr><td class="col-label">滴天髓</td><td class="col-classic">"欲识三元万法宗，先观帝载与神功。"</td><td class="col-modern">看命先看日主强弱与格局，此为论命之根基。此命日主' + str + '，' + (str.indexOf('旺')>=0?'能任财官，宜积极进取。':str.indexOf('弱')>=0?'需印比扶助，宜稳中求进。':'五行平衡，宜顺势而为。') + '</td></tr>';
    html += '<tr><td class="col-label">子平真诠</td><td class="col-classic">"论命之法，先观月令，次看日主，再论财官。"</td><td class="col-modern">月令为提纲，决定命局五行旺衰。' + bazi.monthPillar.zhi + '月为' + ZHI_WUXING[bazi.monthPillar.zhi] + '，' + (ZHI_WUXING[bazi.monthPillar.zhi]===riWx?'得月令之气，日主有根。':'与日主五行不同，需看整体配合。') + '</td></tr>';
    html += '<tr><td class="col-label">千里命稿</td><td class="col-classic">"大运重地支，流年重天干。运好不如年好。"</td><td class="col-modern">大运为十年大方向，流年为一岁之具体。大运吉则十年顺遂，流年凶则一年阻滞。当前为' + new Date().getFullYear() + '年，流年干支' + calculateLiuNian(bazi, new Date().getFullYear()).ganZhi + '。</td></tr>';
    html += '<tr><td class="col-label">盲派金口诀</td><td class="col-classic">"三垣之间有穿绝，身体不佳又多病。三者之间有相冲，一生奔波要走动。"</td><td class="col-modern">胎元、命宫、身宫之间的关系影响健康和运势。需注意三者之间的刑冲合害关系。</td></tr>';
    html += '</table>';
    
    html += '<div class="summary-box"><h4>人生建议</h4><p>1. 顺势而为——顺境积极进取，逆境稳守待机。<br>2. 发挥优势——命局强项十神重点发展，弱势领域弥补增强。<br>3. 趋吉避凶——吉年大胆开拓，凶年谨慎行事。<br>4. 命理参考——命理之学术供研究，真正命运掌握在自己手中。积极向上，克己修身，方为改运之根本。</p></div>';
    
    html += '<div class="quote-block">参考典籍：《滴天髓》《子平真诠》《三命通会》《千里命稿》《盲派金口诀》<br>命理之学，博大精深。仅供学习研究参考，不可迷信。</div>';
    return html;
  }
}

var baziAnalysis = new BaziAnalysisEngine();
console.log('八字分析引擎（HTML表格版）已加载');
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(report_code)
print("Analysis engine rewritten to HTML tables: " + str(len(report_code)) + " chars")
