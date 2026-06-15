/**
 * 八字增强模块 - 颜色系统、流年流月、详细分析
 */

// ========== 五行颜色系统 ==========
var WUXING_COLORS = {
  '金': '#DAA520',  // 金色
  '木': '#228B22',  // 绿色
  '水': '#1B4F72',  // 蓝色
  '火': '#C0392B',  // 红色
  '土': '#8B4513'   // 褐色
};

var WUXING_COLORS_LIGHT = {
  '金': '#FFF8DC',
  '木': '#F0FFF0',
  '水': '#F0F8FF',
  '火': '#FFF5F5',
  '土': '#FFF8F0'
};

var WUXING_COLORS_BORDER = {
  '金': '#DAA520',
  '木': '#90EE90',
  '水': '#87CEEB',
  '火': '#F5B7B1',
  '土': '#DEB887'
};

var WUXING_ICONS = {
  '金': '⚜',
  '木': '🌿',
  '水': '💧',
  '火': '🔥',
  '土': '⛰'
};

var WUXING_NAMES = {
  '金': '金属',
  '木': '木属',
  '水': '水属',
  '火': '火属',
  '土': '土属'
};

// ========== 流年计算引擎 ==========
function calculateLiuNian(bazi, targetYear) {
  var nianGanIdx = (targetYear - 4) % 10;
  if (nianGanIdx < 0) nianGanIdx += 10;
  var nianZhiIdx = (targetYear - 4) % 12;
  if (nianZhiIdx < 0) nianZhiIdx += 12;
  
  var liuNianGan = TIAN_GAN[nianGanIdx];
  var liuNianZhi = DI_ZHI[nianZhiIdx];
  var liuNianGanZhi = liuNianGan + liuNianZhi;
  
  // 流年与日主的关系
  var riGan = bazi.riGan;
  var liuNianShiShen = SHI_SHEN_MAP[riGan][liuNianGan];
  
  // 流年五行
  var liuNianWuxing = GAN_WUXING[liuNianGan];
  
  // 流年纳音
  var liuNianNayin = NAYIN_MAP[liuNianGanZhi] || '';
  
  // 流年与各柱关系
  var interactions = [];
  var pillars = [
    { name: '年柱', gz: bazi.yearPillar.ganZhi, gan: bazi.yearPillar.gan, zhi: bazi.yearPillar.zhi },
    { name: '月柱', gz: bazi.monthPillar.ganZhi, gan: bazi.monthPillar.gan, zhi: bazi.monthPillar.zhi },
    { name: '日柱', gz: bazi.dayPillar.ganZhi, gan: bazi.dayPillar.gan, zhi: bazi.dayPillar.zhi },
    { name: '时柱', gz: bazi.hourPillar.ganZhi, gan: bazi.hourPillar.gan, zhi: bazi.hourPillar.zhi }
  ];
  
  pillars.forEach(function(p) {
    // 天干关系
    var ganRelation = SHI_SHEN_MAP[riGan][liuNianGan];
    
    // 天合地合
    var tianHe = isTianGanHe(liuNianGan, p.gan);
    var diHe = isDiZhiHe(liuNianZhi, p.zhi);
    var diChong = DI_ZHI_LIU_CHONG[liuNianZhi] === p.zhi;
    
    interactions.push({
      pillar: p.name,
      ganRelation: ganRelation,
      tianHe: tianHe,
      diHe: diHe,
      diChong: diChong,
      isDayZhu: (p.name === '日柱')
    });
  });
  
  // 流年神煞
  var liuNianShenSha = [];
  var nianZhi = bazi.yearPillar.zhi;
  var riZhi = bazi.dayPillar.zhi;
  
  // 驿马
  var sanHeKey = getSanHeKey(riZhi);
  if (YI_MA[sanHeKey] === liuNianZhi) liuNianShenSha.push('驿马');
  
  // 桃花
  if (TAO_HUA[sanHeKey] === liuNianZhi) liuNianShenSha.push('桃花');
  
  // 天乙贵人
  var tianYiStr = TIAN_YI_GUI_REN[riGan] || '';
  if (tianYiStr.includes(liuNianZhi)) liuNianShenSha.push('天乙贵人');
  
  return {
    year: targetYear,
    ganZhi: liuNianGanZhi,
    gan: liuNianGan,
    zhi: liuNianZhi,
    wuxing: liuNianWuxing,
    nayin: liuNianNayin,
    shiShen: liuNianShiShen,
    interactions: interactions,
    shenSha: liuNianShenSha
  };
}

function getSanHeKey(zhi) {
  if ('寅午戌'.indexOf(zhi) >= 0) return '寅午戌';
  if ('申子辰'.indexOf(zhi) >= 0) return '申子辰';
  if ('巳酉丑'.indexOf(zhi) >= 0) return '巳酉丑';
  if ('亥卯未'.indexOf(zhi) >= 0) return '亥卯未';
  return '';
}

function isTianGanHe(g1, g2) {
  var heMap = { '甲己':true, '己甲':true, '乙庚':true, '庚乙':true, '丙辛':true, '辛丙':true, '丁壬':true, '壬丁':true, '戊癸':true, '癸戊':true };
  return heMap[g1 + g2] || false;
}

function isDiZhiHe(z1, z2) {
  var combo = z1 + z2;
  var comboR = z2 + z1;
  return (DI_ZHI_LIU_HE[combo] || DI_ZHI_LIU_HE[comboR]) ? true : false;
}

// ========== 流月计算引擎 ==========
function calculateLiuYue(bazi, targetYear, targetMonth) {
  // 月份地支（寅月=正月，通常是2月立春后）
  var yueZhiIdx = targetMonth - 2; // 1月=丑(11), 2月=寅(0)...
  if (yueZhiIdx < 0) yueZhiIdx += 12;
  var yueZhi = YUE_ZHI[yueZhiIdx];
  
  // 流年年干
  var nianGanIdx = (targetYear - 4) % 10;
  if (nianGanIdx < 0) nianGanIdx += 10;
  var nianGan = TIAN_GAN[nianGanIdx];
  
  // 月干
  var yueGan = YUE_GAN_MAP[nianGan][yueZhiIdx];
  var yueGanZhi = yueGan + yueZhi;
  
  // 与日主的关系
  var riGan = bazi.riGan;
  var shiShen = SHI_SHEN_MAP[riGan][yueGan];
  var wuxing = GAN_WUXING[yueGan];
  
  // 与日柱地支的关系
  var riZhi = bazi.dayPillar.zhi;
  var diChong = DI_ZHI_LIU_CHONG[yueZhi] === riZhi;
  var diHe = isDiZhiHe(yueZhi, riZhi);
  
  return {
    year: targetYear,
    month: targetMonth,
    ganZhi: yueGanZhi,
    gan: yueGan,
    zhi: yueZhi,
    wuxing: wuxing,
    shiShen: shiShen,
    diChong: diChong,
    diHe: diHe
  };
}

// ========== 流年详细事件预测 ==========
function predictLiuNianEvents(liuNian, bazi) {
  var events = [];
  var riWuxing = bazi.riWuxing;
  var liuNianWuxing = liuNian.wuxing;
  var str = baziEngine.judgeDayMasterStrength(bazi);
  var isWang = str.indexOf('旺') >= 0;
  var isRuo = str.indexOf('弱') >= 0;
  
  // 判断流年喜忌
  var isXi = false;
  if (isWang) {
    isXi = (liuNianWuxing !== riWuxing); // 身旺喜克泄耗
  } else if (isRuo) {
    isXi = (liuNianWuxing === riWuxing); // 身弱喜生扶
  }
  
  // 流年十神事件
  switch(liuNian.shiShen) {
    case '正官':
      events.push(isXi ? '事业发展顺利，有升职、获得认可的机会' : '工作压力增大，需注意与上级关系');
      events.push(isXi ? '人际关系和谐，适合拓展社交圈' : '谨防口舌是非，言行需谨慎');
      break;
    case '偏官':
      events.push(isXi ? '事业有突破性进展，适合开拓新领域' : '职场竞争激烈，小人暗算，注意防范');
      events.push('适合健身锻炼，增强体质，化解煞气');
      break;
    case '正财':
      events.push(isXi ? '财运稳定增长，正职收入提升' : '开销增大，需控制支出，避免冲动消费');
      events.push(isXi ? '适合储蓄、理财规划' : '不宜大额投资，保守理财为宜');
      break;
    case '偏财':
      events.push(isXi ? '意外之财，投资运佳，适合副业发展' : '投机易亏损，谨防金钱陷阱，不熟不做');
      events.push(isXi ? '人际关系活跃，社交带来机遇' : '容易因朋友破财，借贷需谨慎');
      break;
    case '食神':
      events.push('创造力旺盛，适合学习、创作、艺术活动');
      events.push('心情愉悦，口福佳，适合旅行休闲');
      events.push(isXi ? '才华得到认可，有展现自我的机会' : '容易懒散，需保持自律');
      break;
    case '伤官':
      events.push('思维活跃，有新想法新创意');
      events.push(isXi ? '才华横溢，适合创业、创新项目' : '言辞犀利易得罪人，注意沟通方式');
      events.push('适合技术学习、进修深造');
      break;
    case '正印':
      events.push(isXi ? '贵人运强，得到长辈、领导帮助' : '过于依赖他人，需增强独立性');
      events.push('适合学习深造、考取证书');
      events.push('家庭关系和睦，适合购房置业');
      break;
    case '偏印':
      events.push('适合学习特殊技能、研究型工作');
      events.push(isXi ? '有独特创意和灵感' : '容易胡思乱想，需保持心理平衡');
      events.push('玄学、哲学、心理学方面有感悟');
      break;
    case '比肩':
      events.push(isXi ? '朋友助力，团队合作顺利' : '竞争加剧，容易被同事超越');
      events.push('精力充沛，适合开展新计划');
      events.push('注意兄弟姐妹关系维护');
      break;
    case '劫财':
      events.push(isXi ? '人脉拓展，合作共赢' : '易破财，不宜与人合伙投资');
      events.push('社交活跃，但需防范小人');
      events.push(isXi ? '团队项目有进展' : '注意合同纠纷、财务分歧');
      break;
  }
  
  // 流年神煞事件
  liuNian.shenSha.forEach(function(ss) {
    switch(ss) {
      case '驿马': events.push('驿马星动，适合出行、搬家、换工作，动中求财'); break;
      case '桃花': events.push('桃花入运，异性缘佳，单身者有望脱单，已婚者需把握分寸'); break;
      case '天乙贵人': events.push('天乙贵人照命，遇事有人帮，逢凶化吉'); break;
    }
  });
  
  // 天地冲合
  liuNian.interactions.forEach(function(inter) {
    if (inter.diChong && inter.isDayZhu) {
      events.push('流年冲日柱，此年变动较大，可能搬家、换工作、感情变动');
    }
    if (inter.diHe && inter.isDayZhu) {
      events.push('流年合日柱，此年有新的合作、新的关系或新的机遇');
    }
    if (inter.tianHe && inter.isDayZhu) {
      events.push('流年天干合日主，有贵人相助，事情有转机');
    }
  });
  
  return {
    isXi: isXi,
    events: events
  };
}

// ========== 大运详细事件预测 ==========
function predictDaYunEvents(daYunStep, bazi, qiYunAge) {
  var startAge = qiYunAge + daYunStep * 10;
  var endAge = startAge + 9;
  var yunGanZhi = bazi.daYun[daYunStep].ganZhi;
  var yunGan = bazi.daYun[daYunStep].gan;
  var yunWuxing = GAN_WUXING[yunGan];
  var riWuxing = bazi.riWuxing;
  var str = baziEngine.judgeDayMasterStrength(bazi);
  var isWang = str.indexOf('旺') >= 0;
  var isRuo = str.indexOf('弱') >= 0;
  var isXi = false;
  
  if (isWang) isXi = (yunWuxing !== riWuxing);
  else if (isRuo) isXi = (yunWuxing === riWuxing);
  
  var events = [];
  
  // 根据年龄段和运程给出预测
  if (startAge < 20) {
    if (isXi) {
      events.push('青少年时期顺遂，学业进步，得到师长喜爱');
      events.push('身体健康，精力充沛，适合培养特长');
    } else {
      events.push('青少年时期多波折，学业需加倍努力');
      events.push('注意身体健康，避免运动伤害');
    }
  } else if (startAge < 35) {
    if (isXi) {
      events.push('事业起步顺利，有机会进入理想行业');
      events.push('财运渐入佳境，适合积累第一桶金');
      events.push('感情方面有机遇，适合谈婚论嫁');
    } else {
      events.push('事业起步艰难，需脚踏实地打好基础');
      events.push('注意职场人际关系，避免与人冲突');
      events.push('感情方面宜缓不宜急，晚婚为佳');
    }
  } else if (startAge < 50) {
    if (isXi) {
      events.push('事业达到高峰，有升职或创业成功的机会');
      events.push('财运亨通，适合投资理财扩大资产');
      events.push('家庭稳定，子女运势良好');
    } else {
      events.push('中年危机显现，事业需稳中求进');
      events.push('注意身体健康，定期体检');
      events.push('家庭关系需要更多经营与沟通');
    }
  } else if (startAge < 65) {
    if (isXi) {
      events.push('事业仍有发展，经验丰富受人尊重');
      events.push('财运稳定，适合保守理财');
      events.push('子女成才，家庭和睦');
    } else {
      events.push('事业宜守不宜攻，退居二线为佳');
      events.push('注意慢性病，养生保健需重视');
      events.push('为子女之事操心较多');
    }
  } else {
    if (isXi) {
      events.push('晚运亨通，安享晚年，身体健康');
      events.push('子女孝顺，家庭幸福美满');
    } else {
      events.push('晚年需注意健康，保持乐观心态');
      events.push('宜清静修养，不宜操劳');
    }
  }
  
  return {
    ageRange: startAge + '-' + endAge + '岁',
    isXi: isXi,
    events: events
  };
}

// ========== 十神详解（现代版） ==========
function getShiShenDetail(shiShenName, wuxing) {
  var details = {
    '比肩': {
      nature: '自我意识强，独立自主，有竞争意识',
      modern: '适合创业、自由职业、竞技体育。在现代社会中，比肩代表个人品牌、自我实现。',
      career: '运动员、创业者、自由职业者、个体户',
      relationship: '朋友多但知心少，需要学会合作与分享',
      advice: '发挥独立优势，同时学习团队协作',
      strength: '执行力强，有主见，不依赖他人',
      weakness: '固执己见，不善合作，容易树敌'
    },
    '劫财': {
      nature: '讲义气，社交能力强，但容易破财',
      modern: '适合销售、公关、社交型工作。在现代社会中代表社交网络、人脉资源。',
      career: '销售、公关、经纪人、社群运营',
      relationship: '人缘好但需防范损友，不宜与人合伙',
      advice: '善用人脉但不依赖人脉，保持财务独立',
      strength: '社交能力强，人脉广，重情义',
      weakness: '容易受人牵连破财，判断力受情感影响'
    },
    '食神': {
      nature: '温和善良，有创造力，享受生活',
      modern: '适合艺术、美食、设计、内容创作。在现代社会代表创意经济、内容IP。',
      career: '艺术家、设计师、厨师、作家、自媒体',
      relationship: '性格温和，异性缘佳，懂得浪漫',
      advice: '发挥创意天赋，将兴趣变成事业',
      strength: '创造力强，乐观豁达，有艺术天赋',
      weakness: '容易满足现状，缺乏进取心，过于安逸'
    },
    '伤官': {
      nature: '才华横溢，聪明机智，锋芒毕露',
      modern: '适合科技、研发、咨询、演讲。在现代社会代表技术创新、知识付费。',
      career: '程序员、科学家、咨询师、演说家、发明家',
      relationship: '理想主义，对伴侣要求高，女命需注意婚姻',
      advice: '收敛锋芒，学会换位思考，以柔克刚',
      strength: '智商高，创新能力强，不拘一格',
      weakness: '恃才傲物，言辞犀利，容易得罪人'
    },
    '偏财': {
      nature: '慷慨大方，商业头脑，投机意识强',
      modern: '适合投资、贸易、金融、互联网商业。在现代社会代表资本运作、风口投资。',
      career: '投资人、商人、金融从业者、电商',
      relationship: '慷慨大方但感情不够专一，需注意家庭稳定',
      advice: '把握机遇但控制风险，不熟不做',
      strength: '商业嗅觉敏锐，敢于冒险，交际广泛',
      weakness: '财运起伏大，不善守财，投机心理重'
    },
    '正财': {
      nature: '勤劳节俭，重视积蓄，对家庭负责',
      modern: '适合稳定工作、财务管理、公务员。在现代社会代表工资收入、稳定资产。',
      career: '会计师、公务员、银行职员、工程师',
      relationship: '重视家庭，对伴侣忠诚，是可靠的另一半',
      advice: '适度消费享受生活，过于节俭反而限制发展',
      strength: '踏实可靠，理财能力强，责任心重',
      weakness: '过于保守，缺乏冒险精神，格局受限'
    },
    '偏官': {
      nature: '有魄力，有权威，事业心强，刚毅果敢',
      modern: '适合管理、军警、创业、竞争性行业。在现代社会代表领导力、危机处理。',
      career: '企业高管、军官、警察、创业者、律师',
      relationship: '控制欲较强，需要学习温柔对待伴侣',
      advice: '压力即动力，学会减压和情绪管理',
      strength: '领导力强，果断勇敢，不畏挑战',
      weakness: '压力大，容易焦虑，人际关系紧张'
    },
    '正官': {
      nature: '遵纪守法，重视名誉，正直守信',
      modern: '适合公务员、大型企业、教育、法律。在现代社会代表职业经理人、合规管理。',
      career: '公务员、教师、法官、企业管理者',
      relationship: '对感情认真负责，是理想的结婚对象',
      advice: '保持原则的同时增加灵活性，适当变通',
      strength: '正直可靠，有责任心，受人尊敬',
      weakness: '过于保守，缺乏变通，错失机遇'
    },
    '偏印': {
      nature: '有特殊才能，思维独特，善于钻研',
      modern: '适合科研、玄学、心理、小众领域。在现代社会代表极客精神、深度专业。',
      career: '研究员、命理师、心理咨询师、技术专家',
      relationship: '与六亲缘薄，需要主动维护家庭关系',
      advice: '将独特思维转化为实用价值，多与人交流',
      strength: '思维深刻，有特殊天赋，专注力强',
      weakness: '孤僻寡合，不善交际，与社会脱节'
    },
    '正印': {
      nature: '仁慈善良，有学识，得贵人相助',
      modern: '适合教育、医疗、文化、公益事业。在现代社会代表知识传承、社会服务。',
      career: '教师、医生、作家、慈善工作者',
      relationship: '温和体贴，家庭观念强，与长辈关系好',
      advice: '在依赖贵人帮助的同时，也要培养独立性',
      strength: '善良正直，学识渊博，贵人多助',
      weakness: '依赖性强，缺乏主见，容易被人利用'
    }
  };
  
  return details[shiShenName] || null;
}

// ========== 神煞详解（现代版） ==========
function getShenShaDetail(shenShaName) {
  var details = {
    '天乙贵人': '最吉之神，代表贵人运。在现代社会中，天乙贵人可理解为"关键时刻遇到对的人"——可能是导师、投资人、合作伙伴。遇到天乙贵人年，适合社交拓展、寻求合作。',
    '文昌星': '主学业、文化、考试运。现代版：适合参加考试、考取证书、写作发表、学习新技能。文昌星入命或入运，学业事业有突破性进展。',
    '禄神': '主福禄、收入、享受。现代版：正财运佳，工资收入稳定，有加薪机会。禄神在位，衣食无忧。',
    '驿马': '主动、迁移、变化。现代版：适合出差、旅行、换工作、搬家。驿马动则有机遇，不动则错过。现代人驿马年适合拓展海外市场、跨城市发展。',
    '桃花': '主人缘、异性缘、艺术。现代版：社交活跃，魅力提升。单身者桃花运佳，已婚者需把握边界。也代表艺术创作灵感充沛。',
    '华盖': '主孤独、智慧、艺术。现代版：适合独立研究、创作、深度思考。华盖入命者适合做学者、艺术家、程序员等需要专注力的工作。不太适合销售等社交型工作。',
    '将星': '主领导力、权力、决断。现代版：适合管理岗位、创业。将星到位时，决策果断，能掌控大局。但需防独断专行。',
    '羊刃': '主刚强、竞争、血光。现代版：竞争力强，适合竞技、军警、外科医生等需要"锋利"特质的职业。但需注意人身安全和法律纠纷。羊刃年不宜冲动决策。',
    '孤辰': '主孤独、独立、晚婚。现代版：享受独处时光，适合自由职业。婚姻宜晚，早婚多波折。现代社会中对独身主义者反而是优势。',
    '寡宿': '主内向、安静、独居。现代版：适合远程办公、独立创作。社交欲望低，享受安静生活。不必强求社交，顺其自然。',
    '魁罡': '主刚毅、果断、领导力。现代版：天生的领导者，有魄力有担当。适合创业、管理、军警。但需注意刚极易折，学会柔性管理。',
    '十恶大败': '主破财、浪费、不善理财。现代版：需要建立强制储蓄习惯，避免冲动消费和投机。适合请专业理财顾问管理财务。',
    '孤鸾煞': '主婚姻波折、晚婚。现代版：对感情要求高，不将就。建议晚婚（30岁后），婚前充分了解对方。现代社会中不婚也是一种选择。',
    '阴阳差错': '主婚姻不顺、沟通困难。现代版：夫妻之间需加强沟通，学习两性相处之道。可以寻求婚姻咨询帮助。'
  };
  
  return details[shenShaName] || null;
}

console.log('Enhanced Bazi module loaded.');

// ========== 历史记录管理 ==========
var MAX_HISTORY = 10;

function saveBaziHistory(name, gender, year, month, day, hour, minute, isMale, inputMode, bazi) {
  try {
    var history = loadBaziHistory();
    var entry = {
      id: Date.now(),
      name: name,
      gender: gender,
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      isMale: isMale,
      inputMode: inputMode,
      riGanZhi: bazi.dayPillar.ganZhi,
      riWuxing: bazi.riWuxing,
      shengXiao: bazi.shengXiao,
      timestamp: new Date().toLocaleString('zh-CN')
    };
    // 去重：相同出生时间的记录不重复添加
    var exists = history.find(function(h) {
      return h.year == year && h.month == month && h.day == day && h.hour == hour && h.minute == minute && h.isMale == isMale;
    });
    if (!exists) {
      history.unshift(entry);
      if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);
      localStorage.setItem('bazi_history', JSON.stringify(history));
    }
    // 同时保存最后一条用于自动恢复
    localStorage.setItem('bazi_last', JSON.stringify({
      name: name, gender: gender, year: year, month: month, day: day, hour: hour, minute: minute, isMale: isMale, inputMode: inputMode
    }));
    return history;
  } catch(e) {
    console.error('保存历史失败:', e);
    return [];
  }
}

function loadBaziHistory() {
  try {
    var saved = localStorage.getItem('bazi_history');
    return saved ? JSON.parse(saved) : [];
  } catch(e) {
    return [];
  }
}

function deleteBaziEntry(id) {
  try {
    var history = loadBaziHistory();
    history = history.filter(function(h) { return h.id !== id; });
    localStorage.setItem('bazi_history', JSON.stringify(history));
    return history;
  } catch(e) {
    return [];
  }
}

function loadLastBazi() {
  try {
    var saved = localStorage.getItem('bazi_last');
    return saved ? JSON.parse(saved) : null;
  } catch(e) {
    return null;
  }
}

// ========== 直接四柱排盘 ==========
function calculateFromPillars(yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi, isMale) {
  var yearPillar = { gan: yearGan, zhi: yearZhi, ganZhi: yearGan + yearZhi };
  var monthPillar = { gan: monthGan, zhi: monthZhi, ganZhi: monthGan + monthZhi };
  var dayPillar = { gan: dayGan, zhi: dayZhi, ganZhi: dayGan + dayZhi };
  var hourPillar = { gan: hourGan, zhi: hourZhi, ganZhi: hourGan + hourZhi };
  var riGan = dayGan;
  var riWuxing = GAN_WUXING[riGan];
  
  var cangGan = {
    year: ZHI_CANG_GAN[yearZhi],
    month: ZHI_CANG_GAN[monthZhi],
    day: ZHI_CANG_GAN[dayZhi],
    hour: ZHI_CANG_GAN[hourZhi]
  };
  
  var nayin = {
    year: NAYIN_MAP[yearGan + yearZhi] || '',
    month: NAYIN_MAP[monthGan + monthZhi] || '',
    day: NAYIN_MAP[dayGan + dayZhi] || '',
    hour: NAYIN_MAP[hourGan + hourZhi] || ''
  };
  
  var shiShen = {
    year: SHI_SHEN_MAP[riGan][yearGan],
    month: SHI_SHEN_MAP[riGan][monthGan],
    day: SHI_SHEN_MAP[riGan][dayGan],
    hour: SHI_SHEN_MAP[riGan][hourGan]
  };
  
  var changSheng = {
    year: getChangShengSimple(riGan, yearZhi),
    month: getChangShengSimple(riGan, monthZhi),
    day: getChangShengSimple(riGan, dayZhi),
    hour: getChangShengSimple(riGan, hourZhi)
  };
  
  // 计算神煞
  var shenSha = baziEngine.calcShenSha(riGan, yearPillar, monthPillar, dayPillar, hourPillar, new Date().getFullYear());
  
  // 计算大运（使用年柱推算）
  var yearGanIdx = TIAN_GAN.indexOf(yearGan);
  var isYangYear = GAN_YINYANG[yearGan] === 1;
  var isShunPai = (isYangYear && isMale) || (!isYangYear && !isMale);
  var yueGanIdx = TIAN_GAN.indexOf(monthGan);
  var yueZhiIdx = DI_ZHI.indexOf(monthZhi);
  var daYunList = [];
  for (var i = 1; i <= 10; i++) {
    var newGanIdx, newZhiIdx;
    if (isShunPai) {
      newGanIdx = (yueGanIdx + i) % 10;
      newZhiIdx = (yueZhiIdx + i) % 12;
    } else {
      newGanIdx = ((yueGanIdx - i) % 10 + 10) % 10;
      newZhiIdx = ((yueZhiIdx - i) % 12 + 12) % 12;
    }
    var dyg = TIAN_GAN[newGanIdx];
    var dyz = DI_ZHI[newZhiIdx];
    daYunList.push({ ganZhi: dyg + dyz, gan: dyg, zhi: dyz, startAge: 0, nayin: NAYIN_MAP[dyg + dyz] || '' });
  }
  
  // 三垣（简化计算）
  var shenZhiIdx = (yueZhiIdx - SHI_ZHI.indexOf(hourZhi) + 12) % 12;
  var shenZhi = SHI_ZHI[shenZhiIdx];
  var shenGan = YUE_GAN_MAP[monthGan][shenZhiIdx];
  var taiGan = TIAN_GAN[(yueGanIdx + 1) % 10];
  var taiZhi = YUE_ZHI[(yueZhiIdx + 3) % 12];
  var mingZhiIdx = (12 - yueZhiIdx + SHI_ZHI.indexOf(hourZhi)) % 12;
  var mingZhi = SHI_ZHI[mingZhiIdx];
  var mingGan = YUE_GAN_MAP[monthGan][mingZhiIdx];
  
  var sanYuan = {
    taiYuan: { ganZhi: taiGan + taiZhi, gan: taiGan, zhi: taiZhi },
    mingGong: { ganZhi: mingGan + mingZhi, gan: mingGan, zhi: mingZhi },
    shenGong: { ganZhi: shenGan + shenZhi, gan: shenGan, zhi: shenZhi }
  };
  
  var wuxingCount = baziEngine.countWuxing(yearPillar, monthPillar, dayPillar, hourPillar, cangGan);
  var shengXiao = SHENG_XIAO[DI_ZHI.indexOf(yearZhi)];
  
  var bazi = {
    year: 0, month: 0, day: 0, hour: 0, minute: 0, isMale: isMale,
    yearPillar: yearPillar, monthPillar: monthPillar, dayPillar: dayPillar, hourPillar: hourPillar,
    riGan: riGan, riWuxing: riWuxing, shengXiao: shengXiao,
    cangGan: cangGan, nayin: nayin, shiShen: shiShen, changSheng: changSheng,
    kongWang: baziEngine.calcKongWang(dayPillar.ganZhi), shenSha: shenSha, daYun: daYunList, sanYuan: sanYuan,
    qiYunAge: { qiYunAge: 1, isShunPai: isShunPai }, wuxingCount: wuxingCount,
    isDirectPillar: true
  };
  
  // 再计算强度
  return bazi;
}

function getChangShengSimple(gan, zhi) {
  var changShengZhis = CHANG_SHENG_TABLE[gan];
  if (!changShengZhis) return '';
  var idx = changShengZhis.indexOf(zhi);
  return idx === -1 ? '' : CHANG_SHENG_NAMES[idx];
}

// ========== 增强流年预测（分类） ==========
function predictLiuNianEventsDetailed(liuNian, bazi) {
  var riWuxing = bazi.riWuxing;
  var liuNianWuxing = liuNian.wuxing;
  var str = baziEngine.judgeDayMasterStrength(bazi);
  var isWang = str.indexOf('旺') >= 0;
  var isRuo = str.indexOf('弱') >= 0;
  var isXi = false;
  if (isWang) { isXi = (liuNianWuxing !== riWuxing); }
  else if (isRuo) { isXi = (liuNianWuxing === riWuxing); }
  
  var details = { career: [], wealth: [], marriage: [], education: [], health: [], general: [] };
  
  switch(liuNian.shiShen) {
    case '正官':
      if (isXi) {
        details.career.push('事业有晋升机会，领导赏识，适合争取更高职位');
        details.marriage.push('感情稳定，单身者可能遇到合适的对象');
      } else {
        details.career.push('工作压力增大，注意与上级沟通方式，避免正面冲突');
        details.health.push('压力导致睡眠不佳，需注意调节');
      }
      details.general.push('正官流年，宜规范行事，遵守规则');
      break;
    case '偏官':
      if (isXi) {
        details.career.push('事业突破年，适合创业或开拓新领域');
        details.career.push('魄力与执行力增强，能克服困难');
      } else {
        details.career.push('竞争激烈，职场易遇小人，谨防暗算');
        details.health.push('七杀攻身，注意意外伤害，不宜冒险');
      }
      details.general.push('七杀流年，变动较大，宜主动求变化解');
      break;
    case '正财':
      if (isXi) {
        details.wealth.push('正财稳定增长，适合储蓄和长期投资');
        details.career.push('工作收入有提升，努力就有回报');
      } else {
        details.wealth.push('开销增大，需控制不必要的支出');
        details.wealth.push('不宜大额投资，以保守理财为主');
      }
      details.marriage.push(isXi ? '感情稳定，适合谈婚论嫁' : '为家庭开销操心，注意财务沟通');
      break;
    case '偏财':
      if (isXi) {
        details.wealth.push('投资运佳，有意外之财或副业收入');
        details.wealth.push('适合拓展收入渠道，尝试新项目');
      } else {
        details.wealth.push('投机易亏损，谨防金钱陷阱');
        details.wealth.push('容易因朋友破财，借贷需谨慎');
      }
      details.general.push('偏财流年，机遇与风险并存');
      break;
    case '食神':
      details.general.push('食神流年，心情愉悦，创造力提升');
      details.education.push('学习能力强，适合学习新技能');
      details.health.push('口福佳，但需注意饮食健康');
      details.career.push(isXi ? '才华得到认可，有展现自我的机会' : '容易懒散，需保持自律');
      break;
    case '伤官':
      details.general.push('伤官流年，思维活跃，创新意识强');
      details.education.push('适合技术钻研、学术研究');
      if (isXi) {
        details.career.push('才华横溢，适合创业或独立项目');
      } else {
        details.career.push('言辞犀利易得罪人，注意职场人际关系');
        details.marriage.push('女命伤官年需注意夫妻沟通，避免争执');
      }
      break;
    case '正印':
      details.education.push('学习运强，适合考证、进修、深造');
      details.general.push(isXi ? '贵人运强，长辈缘佳' : '容易依赖他人，需增强独立性');
      if (isXi) details.career.push('得领导赏识，有晋升或调动机会');
      details.marriage.push('家庭关系和睦，适合处理与长辈有关事宜');
      break;
    case '偏印':
      details.education.push('适合学习特殊技能或深度研究');
      details.general.push('偏印流年，思维独特，有创新灵感');
      if (!isXi) details.health.push('容易胡思乱想，需保持心理平衡');
      break;
    case '比肩':
      if (isXi) {
        details.career.push('朋友助力，团队合作顺利');
        details.general.push('精力充沛，适合开启新计划');
      } else {
        details.career.push('竞争加剧，同事关系紧张');
        details.wealth.push('容易因朋友或合伙而失财');
      }
      break;
    case '劫财':
      if (isXi) {
        details.general.push('人脉拓展，社交活跃');
        details.career.push('合作机会增多');
      } else {
        details.wealth.push('劫财流年，易破财，不宜合伙投资');
        details.marriage.push('注意感情中有竞争者出现');
      }
      break;
  }
  
  // 流年神煞补充
  liuNian.shenSha.forEach(function(ss) {
    switch(ss) {
      case '驿马': details.general.push('驿马动，适合出行、搬家、换工作'); break;
      case '桃花': details.marriage.push('桃花入运，异性缘佳，单身者有望脱单'); break;
      case '天乙贵人': details.general.push('贵人照命，遇难有救，逢凶化吉'); break;
    }
  });
  
  // 天地冲合补充
  liuNian.interactions.forEach(function(inter) {
    if (inter.diChong && inter.isDayZhu) {
      details.general.push('流年冲日柱，变动较大，可能搬家、换工作或感情变动');
    }
    if (inter.diHe && inter.isDayZhu) {
      details.general.push('流年合日柱，有新的合作或机遇出现');
    }
  });
  
  return { isXi: isXi, details: details };
}

// ========== 流月详细预测 ==========
function generateLiuYueDetail(bazi, year, month) {
  var liuYue = calculateLiuYue(bazi, year, month);
  var yueSS = liuYue.shiShen;
  var riGan = bazi.riGan;
  var riWx = bazi.riWuxing;
  var yueWx = liuYue.wuxing;
  
  var lines = [];
  
  // 基础运势
  if (yueSS === '正官') {
    lines.push('事业方面有变动或压力，宜谨慎应对，遵守规章制度。');
    if (liuYue.diChong) lines.push('本月为变动之月，宜静不宜动，避免重大决策。');
    if (liuYue.diHe) lines.push('本月有贵人出现或合作机遇，适合拓展人脉。');
    lines.push('婚姻感情：正官月对女命有利，感情进展顺利。');
  } else if (yueSS === '偏官') {
    lines.push('事业竞争激烈，有挑战也有机遇，魄力是关键。');
    if (liuYue.diChong) lines.push('注意职场小人，谨防暗算，行事需低调。');
    lines.push('健康方面：七杀月注意意外伤害，不宜进行高风险活动。');
    lines.push('学业方面：适合攻克难题，但需注意劳逸结合。');
  } else if (yueSS === '正财') {
    lines.push('财运稳定，正职收入有保障，适合储蓄规划。');
    lines.push('事业方面：努力就有回报，踏实工作有奖金或加薪机会。');
    lines.push('婚姻感情：男命正财月，桃花运佳，适合约会增进感情。');
    lines.push('学业：适合学习理财知识或实用技能。');
  } else if (yueSS === '偏财') {
    lines.push('财运活跃，投资运或副业收入有机会，但风险并存。');
    lines.push('事业方面：适合拓展业务、商务谈判，但不宜冒进。');
    lines.push('婚姻感情：社交活跃，但需注意把握尺度，避免烂桃花。');
    lines.push('学业：适合学习新领域知识，但容易分散注意力。');
  } else if (yueSS === '食神') {
    lines.push('心情愉悦舒畅，创造力旺盛，适合艺术创作和表达。');
    lines.push('事业方面：思路清晰，适合做策划、方案、创意类工作。');
    lines.push('财运：口福佳，但也容易在吃喝玩乐上花费较多。');
    lines.push('婚姻感情：食神月感情甜蜜，适合浪漫约会和旅行。');
    lines.push('学业：学习效率高，记忆力好，适合备考。');
  } else if (yueSS === '伤官') {
    lines.push('思维活跃，创新意识强，适合开展新项目或学习新技术。');
    lines.push('事业方面：才华得到展现，但需注意言辞，避免得罪人。');
    lines.push('财运：有创意变现的机会，但投资需谨慎。');
    lines.push('婚姻感情：女命伤官月需注意沟通，避免因小事争吵。');
    lines.push('学业：适合钻研技术难题，理解力强但耐心不足。');
  } else if (yueSS === '正印') {
    lines.push('贵人运强，适合学习进修，得长辈或领导帮助。');
    lines.push('事业方面：工作中有人指点，适合推进需要审批的项目。');
    lines.push('财运：财运平稳，适合做长期理财规划。');
    lines.push('婚姻感情：家庭关系和睦，适合处理房产、家庭事务。');
    lines.push('学业：学习运极佳，考试运好，适合备考考证。');
  } else if (yueSS === '偏印') {
    lines.push('思维独特，有创新灵感，适合独立研究和深入思考。');
    lines.push('事业方面：适合做研究、分析、技术攻关类工作。');
    lines.push('财运：财运一般，不宜投机，适合学习理财知识。');
    lines.push('婚姻感情：偏印月容易沉浸在自己的世界，需多关注伴侣。');
    lines.push('学业：适合深入学习专业领域，但有钻牛角尖的倾向。');
  } else if (yueSS === '比肩') {
    lines.push('精力充沛，竞争意识增强，适合开展需要体力和毅力的工作。');
    lines.push('事业方面：团队合作中有表现机会，但需注意同事关系。');
    lines.push('财运：财运一般，不宜合伙投资，适合独立决策。');
    lines.push('婚姻感情：比肩月容易自我中心，需多为对方着想。');
    lines.push('学业：适合参加竞赛或挑战性学习，但需注意合作精神。');
  } else if (yueSS === '劫财') {
    lines.push('社交活跃，人脉拓展，但需注意财务安全。');
    lines.push('事业方面：适合团队协作，但谨防同事抢功。');
    lines.push('财运：劫财月易破财，不宜借贷或大额消费。');
    lines.push('婚姻感情：注意感情中的竞争关系，增强信任。');
    lines.push('学业：适合小组学习，但需保持独立思考。');
  }
  
  // 地支冲合补充
  if (liuYue.diChong) {
    lines.push('本月月支与日支相冲，变动较多，适合主动调整计划，化被动为主动。');
  }
  if (liuYue.diHe) {
    lines.push('本月月支与日支相合，合作运势强，适合谈合作、签合同。');
  }
  
  return lines;
}

console.log('八字增强模块（含历史管理和详细预测）已加载');

// ========== 地支六害 ==========
var DI_ZHI_LIU_HAI = {
  '子未': '害', '未子': '害',
  '丑午': '害', '午丑': '害',
  '寅巳': '害', '巳寅': '害',
  '卯辰': '害', '辰卯': '害',
  '申亥': '害', '亥申': '害',
  '酉戌': '害', '戌酉': '害'
};

// ========== 地支三会 ==========
var DI_ZHI_SAN_HUI = {
  '寅卯辰': '木', '巳午未': '火', '申酉戌': '金', '亥子丑': '水'
};

// ========== 天干五合化气 ==========
var TIAN_GAN_WU_HE = {
  '甲己': '土', '己甲': '土',
  '乙庚': '金', '庚乙': '金',
  '丙辛': '水', '辛丙': '水',
  '丁壬': '木', '壬丁': '木',
  '戊癸': '火', '癸戊': '火'
};

// ========== 地支合冲刑害分析函数 ==========
function analyzeDiZhiRelation(zhi1, zhi2) {
  var relations = [];
  // 六合
  var combo = zhi1 + zhi2;
  var comboR = zhi2 + zhi1;
  if (DI_ZHI_LIU_HE[combo] || DI_ZHI_LIU_HE[comboR]) {
    relations.push({ type: '合', detail: '六合化' + (DI_ZHI_LIU_HE[combo] || DI_ZHI_LIU_HE[comboR]) });
  }
  // 六冲
  if (DI_ZHI_LIU_CHONG[zhi1] === zhi2) {
    relations.push({ type: '冲', detail: '六冲' });
  }
  // 相刑
  if (DI_ZHI_XIANG_XING[combo]) {
    relations.push({ type: '刑', detail: DI_ZHI_XIANG_XING[combo] });
  }
  if (DI_ZHI_XIANG_XING[comboR]) {
    relations.push({ type: '刑', detail: DI_ZHI_XIANG_XING[comboR] });
  }
  // 六害
  if (DI_ZHI_LIU_HAI[combo]) {
    relations.push({ type: '害', detail: '六害' });
  }
  return relations;
}

// ========== 扩展神煞计算 ==========
function extendShenSha(bazi) {
  var riGan = bazi.riGan;
  var riZhi = bazi.dayPillar.zhi;
  var nianZhi = bazi.yearPillar.zhi;
  var yueZhi = bazi.monthPillar.zhi;
  var riGanZhi = bazi.dayPillar.ganZhi;
  var allZhis = [nianZhi, yueZhi, riZhi, bazi.hourPillar.zhi];
  var zhuNames = ['年柱', '月柱', '日柱', '时柱'];
  var result = bazi.shenSha;

  // 学堂
  var xtZhi = XUE_TANG[riGan];
  allZhis.forEach(function(z, i) { if (z === xtZhi) result.ji.push(zhuNames[i] + '学堂'); });
  
  // 词馆
  var cgZhi = CI_GUAN[riGan];
  allZhis.forEach(function(z, i) { if (z === cgZhi) result.ji.push(zhuNames[i] + '词馆'); });
  
  // 金舆
  var jyZhi = JIN_YU[riGan];
  allZhis.forEach(function(z, i) { if (z === jyZhi) result.ji.push(zhuNames[i] + '金舆'); });
  
  // 亡神
  var findKey = function(z) { if ('寅午戌'.indexOf(z) >= 0) return '寅午戌'; if ('申子辰'.indexOf(z) >= 0) return '申子辰'; if ('巳酉丑'.indexOf(z) >= 0) return '巳酉丑'; if ('亥卯未'.indexOf(z) >= 0) return '亥卯未'; return ''; };
  var wsZhi = WANG_SHEN[findKey(riZhi)] || WANG_SHEN[findKey(nianZhi)];
  allZhis.forEach(function(z, i) { if (z === wsZhi) result.xiong.push(zhuNames[i] + '亡神'); });
  
  // 劫煞
  var jsZhi = JIE_SHA[findKey(riZhi)] || JIE_SHA[findKey(nianZhi)];
  allZhis.forEach(function(z, i) { if (z === jsZhi) result.xiong.push(zhuNames[i] + '劫煞'); });
  
  // 灾煞
  var zsZhi = ZAI_SHA[findKey(riZhi)] || ZAI_SHA[findKey(nianZhi)];
  allZhis.forEach(function(z, i) { if (z === zsZhi) result.xiong.push(zhuNames[i] + '灾煞'); });
  
  // 红鸾
  var hlZhi = HONG_LUAN[nianZhi];
  allZhis.forEach(function(z, i) { if (z === hlZhi) result.ji.push(zhuNames[i] + '红鸾'); });
  
  // 天喜
  var txZhi = TIAN_XI[nianZhi];
  allZhis.forEach(function(z, i) { if (z === txZhi) result.ji.push(zhuNames[i] + '天喜'); });
  
  // 太极贵人
  var tjZhis = TAI_JI[riGan] || '';
  allZhis.forEach(function(z, i) { if (tjZhis.indexOf(z) >= 0) result.ji.push(zhuNames[i] + '太极贵人'); });
  
  // 福星贵人
  var fxZhi = FU_XING[riGan] || '';
  allZhis.forEach(function(z, i) { if (fxZhi.indexOf(z) >= 0) result.ji.push(zhuNames[i] + '福星贵人'); });
  
  // 金神
  if (JIN_SHEN.indexOf(riGanZhi) >= 0) result.ji.push('日柱金神');
  
  // 三奇贵人
  var dayGans = [bazi.yearPillar.gan, bazi.monthPillar.gan, bazi.dayPillar.gan].sort().join('');
  if (dayGans === '甲庚戊' || dayGans === '乙丙丁' || dayGans === '辛壬癸') result.ji.push('命带三奇贵人');
  
  // 天德贵人（月支查）
  var tdGan = TIAN_DE[yueZhi];
  ['year','month','day','hour'].forEach(function(p, i) {
    if (bazi[p + 'Pillar'].gan === tdGan) result.ji.push(zhuNames[i] + '天德贵人');
  });
  
  // 月德贵人（月支三合局查）
  var findYueDeKey = function(z) { if ('寅午戌'.indexOf(z) >= 0) return '寅午戌'; if ('申子辰'.indexOf(z) >= 0) return '申子辰'; if ('亥卯未'.indexOf(z) >= 0) return '亥卯未'; if ('巳酉丑'.indexOf(z) >= 0) return '巳酉丑'; return ''; };
  var ydGan = YUE_DE[findYueDeKey(yueZhi)];
  if (ydGan) {
    ['year','month','day','hour'].forEach(function(p, i) {
      if (bazi[p + 'Pillar'].gan === ydGan) result.ji.push(zhuNames[i] + '月德贵人');
    });
  }
  
  // 六秀日
  if (LIU_XIU.indexOf(riGanZhi) >= 0) result.ji.push('六秀日');
  
  // 十灵日
  if (SHI_LING.indexOf(riGanZhi) >= 0) result.ji.push('十灵日');
  
  // 日德
  if (RI_DE.indexOf(riGanZhi) >= 0) result.ji.push('日德格');
  
  // 八专
  var baZhuanCheck = [bazi.yearPillar.ganZhi, bazi.monthPillar.ganZhi, riGanZhi, bazi.hourPillar.ganZhi];
  baZhuanCheck.forEach(function(gz, i) {
    if (BA_ZHUAN.indexOf(gz) >= 0 && i !== 2) result.other.push(zhuNames[i] + '八专');
  });
  
  // 九丑
  if (JIU_CHOU.indexOf(riGanZhi) >= 0) result.xiong.push('九丑日');
  


  // 天罗地网
  if (nianZhi === '戌' || nianZhi === '亥') {
    allZhis.forEach(function(z, i) { if (z === '辰' || z === '巳') result.xiong.push(zhuNames[i] + '天罗'); });
  }
  if (nianZhi === '辰' || nianZhi === '巳') {
    allZhis.forEach(function(z, i) { if (z === '戌' || z === '亥') result.xiong.push(zhuNames[i] + '地网'); });
  }
  
  // 空亡标记为神煞
  if (bazi.kongWang && bazi.kongWang.length > 0) {
    allZhis.forEach(function(z, i) {
      if (bazi.kongWang.indexOf(z) >= 0) result.xiong.push(zhuNames[i] + '空亡');
    });
  }
  
  // 将全局神煞标记到具体柱位
  var prefixGlobal = function(shenshaName, pillarIdx) {
    var globalShenshas = {
      '命带孤辰': '孤辰', '命带寡宿': '寡宿', '日柱魁罡格': '魁罡',
      '十恶大败日': '十恶大败', '孤鸾煞': '孤鸾煞', '阴阳差错日': '阴阳差错',
      '日柱金神': '金神', '命带三奇贵人': '三奇贵人',
      '六秀日': '六秀', '十灵日': '十灵', '日德格': '日德', '九丑日': '九丑'
    };
    for (var gk in globalShenshas) {
      var idx = result.ji.indexOf(gk);
      if (idx >= 0) { result.ji[idx] = zhuNames[pillarIdx] + globalShenshas[gk]; }
      idx = result.xiong.indexOf(gk);
      if (idx >= 0) { result.xiong[idx] = zhuNames[pillarIdx] + globalShenshas[gk]; }
      idx = result.other.indexOf(gk);
      if (idx >= 0) { result.other[idx] = zhuNames[pillarIdx] + globalShenshas[gk]; }
    }
  };
  // 全局神煞标记到日柱
  prefixGlobal('all', 2);

  return result;
}

// ========== 扩展神煞详解 ==========
function getShenShaDetailExtended(ssName) {
  var details = {
    '学堂': '主学业、文化、科甲。命带学堂者聪明好学，适合学术研究、教育行业。古代视为科甲之星，现代可理解为学历高、学习能力强。',
    '词馆': '主文采、口才、语言能力。命带词馆者善于表达，适合写作、演讲、翻译、法律等领域。词馆与学堂同现时，文采出众。',
    '金舆': '主交通、车辆之福。古代为帝王车驾之象，现代命带金舆者易得好车，出行便利，或从事与汽车、交通相关的行业。',
    '亡神': '主心神不宁、意外之灾。命带亡神者容易精神紧张，需注意心理健康。但也主灵性高，适合从事玄学、心理学等。有制则吉，无制则需防范意外。',
    '劫煞': '主劫夺、破财、意外。命带劫煞者需注意财务安全，防盗防骗。但也主应变能力强，在危机中能找到出路。逢吉神可解。',
    '灾煞': '主灾祸、疾病、横事。命带灾煞者需特别注意人身安全，避免高风险活动。但灾煞逢将星可化煞为权，转危为机。',
    '红鸾': '主喜事、婚姻、添丁。红鸾星动之年，适合结婚、生子。命带红鸾者人缘佳，婚姻较早或有美满姻缘。',
    '天喜': '主喜庆、吉事、良缘。与红鸾类似但偏重于已经发生的喜事。命带天喜者性格开朗乐观，常有好运眷顾。',
    '太极贵人': '主贵人运、逢凶化吉。命带太极贵人者一生有贵人相助，关键时刻能化险为夷。也主聪明灵秀，有特殊才能。',
    '福星贵人': '主福气、食禄、安逸。命带福星者一生衣食无忧，性格乐观豁达。古代为有福之命，现代则为生活质量高、享受人生。',
    '金神': '金神入命，破坏力与创造力并存。性格刚烈果断，适合军警、外科医生等需要"锋利"特质的职业。但需有水制，否则过于刚猛易折。',
    '三奇贵人': '主非凡之才、特殊机遇。三奇贵人入命者，才华出众，常有出人意料的成就。天上三奇甲戊庚，地上三奇乙丙丁，人中三奇壬癸辛。',
    '天德贵人': '月德之助，逢凶化吉之星。命带天德者得天地护佑，灾难不侵。性格正直善良，有道德操守。',
    '月德贵人': '主贵人扶助、防灾解难。月德入命者心地善良，乐于助人，自然得人回报。与天德并见时，贵气倍增。',
    '六秀日': '主聪明秀气、容貌出众。六秀日生人智商高，学习能力强，多数长相端庄。适合文化、艺术、教育等行业。',
    '十灵日': '主灵气、直觉、玄学天赋。十灵日生人对玄学、宗教有特殊感悟力，直觉敏锐。适合从事命理、中医、心理咨询等行业。',
    '日德': '主品德高尚、性格温和。日德格者为人正直，品行优良，有君子之风。凡事以德服人，受人尊敬。',
    '八专': '主专注、专一、但也主偏执。八专入柱者在该方面有特别的执着和投入。年柱八专祖上专一，月柱八专事业专注，时柱八专子女专精。',
    '九丑': '主貌美但婚姻波折。九丑日生人大多容貌出众，但感情路上多坎坷。需晚婚或历经挫折后方得美满。'
  };
  return details[ssName] || getShenShaDetail(ssName) || null;
}

// ========== 五言独步大运流年分析引擎 ==========
var WUYAN_DUBU_QUOTES = [
  '有病方为贵，无伤不是奇。格中如去病，财禄两相随。',
  '寅卯多金丑，贫富高低走。南地怕逢申，北方休见酉。',
  '建禄生提月，财官喜透天。不宜身再旺，惟喜茂财源。',
  '土厚多逢火，归金旺遇秋。冬天水木泛，名利总虚浮。',
  '甲乙生居卯，金多反吉祥。不宜重见杀，火地得衣粮。',
  '火忌西方酉，金沉怕水乡。木神休见午，水到卯中伤。',
  '土宿休行亥，临官在巳宫。南方根有旺，西北莫相逢。',
  '阴日朝阳格，无根月建辰。西方还有贵，惟怕火来侵。',
  '乙木生居酉，莫逢全巳丑。富贵坎离宫，贫穷坤艮守。',
  '有杀只论杀，无杀方论用。只要去杀星，不怕提纲重。'
];

// 病药分析：找出命局中的"病"与"药"
function analyzeBingYao(bazi) {
  var riWx = bazi.riWuxing;
  var str = baziEngine.judgeDayMasterStrength(bazi);
  var wc = bazi.wuxingCount;
  var bing = [];  // 病：命局中的问题
  var yao = [];   // 药：解决问题的五行
  
  // 判断病的来源
  var isWang = str.indexOf('旺') >= 0;
  var isRuo = str.indexOf('弱') >= 0;
  
  if (isWang) {
    // 身旺之病：比劫印星过旺
    bing.push({ element: riWx, reason: '日主过旺，比劫为病', type: '身旺' });
    if (wc[riWx] >= 3) bing.push({ element: riWx, reason: '比劫重重，竞争激烈', type: '比劫旺' });
    // 药：官杀克身、食伤泄身、财星耗身
    ['金','木','水','火','土'].forEach(function(w) {
      if (w !== riWx) {
        // 克我者（官杀）为药
        if ((w === '金' && riWx === '木') || (w === '火' && riWx === '金') || (w === '水' && riWx === '火') || (w === '土' && riWx === '水') || (w === '木' && riWx === '土')) {
          yao.push({ element: w, reason: '官杀克身，以' + w + '为药', type: '官杀制比劫' });
        }
        // 我生者（食伤）为药
        if ((riWx === '木' && w === '火') || (riWx === '火' && w === '土') || (riWx === '土' && w === '金') || (riWx === '金' && w === '水') || (riWx === '水' && w === '木')) {
          yao.push({ element: w, reason: '食伤泄秀，以' + w + '为药', type: '食伤泄身' });
        }
        // 我克者（财星）为药
        if ((riWx === '木' && w === '土') || (riWx === '土' && w === '水') || (riWx === '水' && w === '火') || (riWx === '火' && w === '金') || (riWx === '金' && w === '木')) {
          yao.push({ element: w, reason: '财星耗身，以' + w + '为药', type: '财星耗身' });
        }
      }
    });
  } else if (isRuo) {
    // 身弱之病：官杀食伤财星过旺
    bing.push({ element: riWx, reason: '日主过弱，身不胜任', type: '身弱' });
    // 找最旺的克泄耗元素
    var maxWx = '';
    var maxVal = 0;
    ['金','木','水','火','土'].forEach(function(w) { if (w !== riWx && (wc[w]||0) > maxVal) { maxVal = wc[w]||0; maxWx = w; } });
    if (maxWx) bing.push({ element: maxWx, reason: maxWx + '过旺，克泄日主', type: '克泄过重' });
    // 药：印星生身、比劫帮身
    yao.push({ element: riWx, reason: '比劫帮身，以' + riWx + '为药', type: '比劫扶身' });
    // 生我者（印星）为药
    var shengMap = { '木':'水', '火':'木', '土':'火', '金':'土', '水':'金' };
    var yinElement = shengMap[riWx];
    if (yinElement) yao.push({ element: yinElement, reason: '印星生身，以' + yinElement + '为药', type: '印星扶身' });
  }
  
  return { bing: bing, yao: yao, isWang: isWang, isRuo: isRuo };
}

// 通关分析：找出相战的五行及其通关元素
function analyzeTongGuan(bazi) {
  var wc = bazi.wuxingCount;
  var tongGuan = [];
  // 通关映射：两个相克的五行，通关元素为生被克者且克克者
  var tongMap = {
    '金木': { conflict: '金木相战', resolver: '水', desc: '金克木，水可通关（金生水，水生木）' },
    '木土': { conflict: '木土相战', resolver: '火', desc: '木克土，火可通关（木生火，火生土）' },
    '土水': { conflict: '土水相战', resolver: '金', desc: '土克水，金可通关（土生金，金生水）' },
    '水火': { conflict: '水火相战', resolver: '木', desc: '水克火，木可通关（水生木，木生火）' },
    '火金': { conflict: '火金相战', resolver: '土', desc: '火克金，土可通关（火生土，土生金）' }
  };
  
  var elements = ['金','木','水','火','土'];
  for (var i = 0; i < elements.length; i++) {
    for (var j = i+1; j < elements.length; j++) {
      var e1 = elements[i], e2 = elements[j];
      if ((wc[e1]||0) >= 2 && (wc[e2]||0) >= 2) {
        var key = e1 + e2;
        var keyR = e2 + e1;
        var info = tongMap[key] || tongMap[keyR];
        if (info) {
          tongGuan.push({ e1: e1, e2: e2, conflict: info.conflict, resolver: info.resolver, desc: info.desc, e1Val: wc[e1]||0, e2Val: wc[e2]||0 });
        }
      }
    }
  }
  return tongGuan;
}

// 大运与五言独步结合分析
function analyzeDaYunWuYan(bazi, daYunStep) {
  var yun = bazi.daYun[daYunStep];
  var yunWx = GAN_WUXING[yun.gan];
  var riWx = bazi.riWuxing;
  var bingYao = analyzeBingYao(bazi);
  var str = baziEngine.judgeDayMasterStrength(bazi);
  
  var isYao = false;
  var isBing = false;
  var yaoMatch = '';
  var bingMatch = '';
  
  // 检查大运五行是否带药
  bingYao.yao.forEach(function(y) {
    if (y.element === yunWx) { isYao = true; yaoMatch = y.reason; }
  });
  
  // 检查大运五行是否增病
  bingYao.bing.forEach(function(b) {
    if (b.element === yunWx) { isBing = true; bingMatch = b.reason; }
  });
  
  // 选择合适的五言独步引用
  var quote = WUYAN_DUBU_QUOTES[daYunStep % WUYAN_DUBU_QUOTES.length];
  
  return {
    yunGanZhi: yun.ganZhi,
    yunWx: yunWx,
    isYao: isYao,
    isBing: isBing,
    yaoMatch: yaoMatch,
    bingMatch: bingMatch,
    quote: quote
  };
}


// ========== 八字格局分析引擎 ==========
// 综合《子平真诠》《滴天髓》《三命通会》《千里命稿》

// 格局文献引用
var GEJU_QUOTES = {
  '子平真诠': '八字用神，专求月令。以日干配月令地支，而生克不同，格局分焉。',
  '滴天髓': '欲识三元万法宗，先观帝载与神功。',
  '三命通会': '看命之法，先看月令，次看日主，再看格局。格局定则贵贱分，用神明则吉凶判。',
  '千里命稿': '格局者，八字之纲领也。格局清则贵，格局浊则贱。'
};

// 格局详解（典籍+白话）
var GEJU_DETAIL = {
  '正官格': { classic: '正官格者，月令正官透干。官星为贵气，喜财印相随，忌伤官冲克。《子平真诠》云："官星宜清不宜杂，一官独贵，双官多劳。"', modern: '正官格的人遵纪守法，重视名誉，适合公务员、大型企业、法律等规范环境。正官得财印辅助则贵气更重，事业有成。' },
  '七杀格': { classic: '七杀格者，月令七杀透干。杀星为权威，喜食伤制杀或印星化杀。《五言独步》云："有杀只论杀，无杀方论用。"', modern: '七杀格的人有魄力有担当，适合军警、创业、管理岗位。七杀需制化，否则压力过大。有食伤制杀则转危为安，有印星化杀则化煞为权。' },
  '正财格': { classic: '正财格者，月令正财透干。财为养命之源，喜食伤生财，忌比劫夺财。《子平真诠》云："财星宜藏不宜露，露则易夺。"', modern: '正财格的人勤劳务实，重视积蓄，适合稳定工作。正财得食伤生助则财源不断，得官星护卫则财不被劫。' },
  '偏财格': { classic: '偏财格者，月令偏财透干。偏财慷慨，喜官星护卫，忌比劫分夺。《滴天髓》云："偏财慷慨，仗义疏财。"', modern: '偏财格的人有商业头脑，慷慨大方，适合经商、投资、贸易。偏财得官星保护则财源稳定，逢食伤则财源广进。' },
  '正印格': { classic: '正印格者，月令正印透干。印为生气，喜官杀生印，忌财星破印。《子平真诠》云："印星护身，贵人相助。"', modern: '正印格的人仁慈善良，有学识涵养，适合教育、文化、学术等文职工作。正印得官星则贵气重，得比肩则学识渊博。' },
  '偏印格': { classic: '偏印格者，月令偏印透干。偏印独特，喜财星制印，忌食神被夺。《三命通会》云："枭神夺食，六亲缘薄。"', modern: '偏印格的人有特殊才能，思维独特，适合科研、技术、玄学等需要深度专注的领域。偏印需财星制衡，否则孤僻寡合。' },
  '食神格': { classic: '食神格者，月令食神透干。食神温和，喜财星流通，忌偏印夺食。《子平真诠》云："食神生财，富贵自天来。"', modern: '食神格的人温和善良，有创造力，懂享受，适合艺术、美食、设计等行业。食神生财则财源广进，食神制杀则灾祸远离。' },
  '伤官格': { classic: '伤官格者，月令伤官透干。伤官才华，喜印星制伤，忌正官被伤。《滴天髓》云："伤官见官，为祸百端。"', modern: '伤官格的人才华出众，聪明机智，适合技术、研发、创意等行业。伤官需印星约束，否则锋芒太露易得罪人。女命伤官格注意婚姻。' },
  '建禄格': { classic: '建禄格者，日主之禄在月令。身旺而建禄，喜财官食伤，忌印比帮扶。《子平真诠》云："建禄生提月，财官喜透天。"', modern: '建禄格的人精力充沛，独立自主，有强烈的自我意识。身旺建禄需财官来平衡，否则自我意识过强，不易与人合作。' },
  '月刃格': { classic: '月刃格者，日主之羊刃在月令。刃为刚强，喜官杀制刃，忌冲克。《三命通会》云："羊刃驾杀，功名显达。"', modern: '月刃格的人性格刚烈，果断勇猛，适合军警、外科医生等需要魄力的职业。羊刃需官杀制约，否则刚极易折，注意人身安全。' },
  '从强格': { classic: '从强格者，日主极旺，全局生扶，无克泄。顺其旺势而行。《滴天髓》云："从强之势，顺之则吉，逆之则凶。"', modern: '从强格的人气势磅礴，一往无前。适合在自己擅长的领域深耕，不宜逆势而为。行运喜生扶，忌克泄耗。' },
  '从弱格': { classic: '从弱格者，日主极弱，全局克泄，无生扶。弃命从势而行。《滴天髓》云："从弱之势，亦喜顺行，不喜逆运。"', modern: '从弱格的人善于顺应环境变化，灵活变通。适合随大势而为，不宜固执己见。行运喜克泄耗，忌生扶帮身。' },
  '化气格': { classic: '化气格者，天干五合化气成功，以化神为用。《三命通会》云："化气得时，富贵非常。"', modern: '化气格的人有特殊的机遇和变化能力，一生可能有重大转折。需化神得时得地，方可真正成功。' },
  '两神成象格': { classic: '两神成象格者，八字中两种五行力量相当，形成特殊格局。《滴天髓》云："两气合而成象，象不可破也。"', modern: '两神成象的人在某两个方面有突出才能，适合在两个领域间跨界发展。格局不可破坏，否则失去优势。' }
};

// 格局定盘：根据月令透干确定格局
function determineGeJu(bazi) {
  var riGan = bazi.riGan;
  var yueZhi = bazi.monthPillar.zhi;
  var yueGan = bazi.monthPillar.gan;
  var allGans = [bazi.yearPillar.gan, bazi.monthPillar.gan, bazi.dayPillar.gan, bazi.hourPillar.gan];
  
  // 月令藏干
  var cangGan = ZHI_CANG_GAN[yueZhi] || [];
  
  // 先检查特殊格局
  var special = checkSpecialGeJu(bazi, riGan, yueZhi, allGans);
  if (special) return special;
  
  // 正格：月令藏干透出天干者取为格
  var result = determineNormalGeJu(riGan, yueZhi, allGans, cangGan, bazi);
  
  // 格局用神分析
  var yongShen = determineYongShen(bazi, result.name);
  
  return {
    name: result.name,
    type: result.type || '正格',
    yueLing: yueZhi,
    touGan: result.touGan || '',
    shiShen: result.shiShen || '',
    yongShen: yongShen,
    classic: result.classic || '',
    modern: result.modern || '',
    source: result.source || ''
  };
}

// 正格判断
function determineNormalGeJu(riGan, yueZhi, allGans, cangGan, bazi) {
  var riWx = GAN_WUXING[riGan];
  var luShen = LU_SHEN[riGan];   // 日主禄位
  var yangRen = YANG_REN[riGan]; // 日主羊刃
  
  // 建禄格：月令为日主禄位
  if (yueZhi === luShen) {
    var detail = GEJU_DETAIL['建禄格'];
    return { name: '建禄格', type: '正格', touGan: yueZhi, shiShen: '比肩', classic: detail.classic, modern: detail.modern, source: '子平真诠' };
  }
  
  // 月刃格/阳刃格：月令为日主羊刃
  if (yueZhi === yangRen) {
    var detail2 = GEJU_DETAIL['月刃格'];
    return { name: '月刃格', type: '正格', touGan: yueZhi, shiShen: '劫财', classic: detail2.classic, modern: detail2.modern, source: '三命通会' };
  }
  
  // 月令藏干透出取格：优先取透出天干者
  for (var i = 0; i < cangGan.length; i++) {
    var cg = cangGan[i];
    if (allGans.indexOf(cg) >= 0) {
      var ss = SHI_SHEN_MAP[riGan][cg];
      var gejuName = getGeJuName(ss);
      if (gejuName) {
        var detail3 = GEJU_DETAIL[gejuName] || {};
        return { name: gejuName, type: '正格', touGan: cg, shiShen: ss, classic: detail3.classic || '', modern: detail3.modern || '', source: '子平真诠' };
      }
    }
  }
  
  // 若无透出，取月令本气（第一个藏干）
  var mainCG = cangGan[0];
  if (mainCG) {
    var ss2 = SHI_SHEN_MAP[riGan][mainCG];
    var gejuName2 = getGeJuName(ss2);
    if (gejuName2) {
      var detail4 = GEJU_DETAIL[gejuName2] || {};
      return { name: gejuName2, type: '正格（本气）', touGan: mainCG + '(藏)', shiShen: ss2, classic: detail4.classic || '', modern: detail4.modern || '', source: '三命通会' };
    }
  }
  
  return { name: '杂格', type: '待定', touGan: '', shiShen: '', classic: '格局未明，需结合大运流年细看。', modern: '此命局月令藏干不透，格局较杂，需看整体配合和行运走向。' };
}

// 十神转格局名称
function getGeJuName(shiShen) {
  var map = {
    '正官': '正官格', '偏官': '七杀格',
    '正财': '正财格', '偏财': '偏财格',
    '正印': '正印格', '偏印': '偏印格',
    '食神': '食神格', '伤官': '伤官格'
  };
  return map[shiShen] || null;
}

// 特殊格局检查
function checkSpecialGeJu(bazi, riGan, yueZhi, allGans) {
  var str = baziEngine.judgeDayMasterStrength(bazi);
  var wc = bazi.wuxingCount;
  var riWx = bazi.riWuxing;
  
  // 从强格：日主极旺（偏旺），全局无克泄
  if (str === '偏旺') {
    var hasKeXie = false;
    ['金','木','水','火','土'].forEach(function(w) {
      if (w !== riWx && (wc[w]||0) >= 1) {
        // 检查是否为克泄
        var keMap = { '木土':true, '土水':true, '水火':true, '火金':true, '金木':true };
        var xieMap = { '木火':true, '火土':true, '土金':true, '金水':true, '水木':true };
        if (keMap[riWx + w] || xieMap[riWx + w]) hasKeXie = true;
      }
    });
    if (!hasKeXie) {
      var detail = GEJU_DETAIL['从强格'];
      return { name: '从强格', type: '变格', touGan: '', shiShen: '', classic: detail.classic, modern: detail.modern, source: '滴天髓' };
    }
  }
  
  // 从弱格：日主极弱（偏弱），全局无生扶
  if (str === '偏弱') {
    var hasShengFu = (wc[riWx]||0) >= 1;
    var shengMap = { '木':'水', '火':'木', '土':'火', '金':'土', '水':'金' };
    var yinWx = shengMap[riWx];
    if (yinWx && (wc[yinWx]||0) >= 1) hasShengFu = true;
    
    if (!hasShengFu) {
      var detail2 = GEJU_DETAIL['从弱格'];
      return { name: '从弱格', type: '变格', touGan: '', shiShen: '', classic: detail2.classic, modern: detail2.modern, source: '滴天髓' };
    }
  }
  
  // 化气格：检查天干五合
  var hePairs = { '甲己':'土', '乙庚':'金', '丙辛':'水', '丁壬':'木', '戊癸':'火' };
  for (var i = 0; i < allGans.length; i++) {
    for (var j = i+1; j < allGans.length; j++) {
      var combo = allGans[i] + allGans[j];
      var comboR = allGans[j] + allGans[i];
      if (hePairs[combo] || hePairs[comboR]) {
        var huaWx = hePairs[combo] || hePairs[comboR];
        // 化神需得月令
        if (ZHI_WUXING[yueZhi] === huaWx) {
          var detail3 = GEJU_DETAIL['化气格'];
          return { name: '化气格（' + (combo.length===2?combo:comboR) + '化' + huaWx + '）', type: '变格', touGan: '', shiShen: '', classic: detail3.classic, modern: detail3.modern, source: '三命通会' };
        }
      }
    }
  }
  
  // 魁罡格
  if (KUI_GANG.indexOf(bazi.dayPillar.ganZhi) >= 0) {
    return { name: '魁罡格', type: '变格', touGan: bazi.dayPillar.ganZhi, shiShen: '', classic: '魁罡格者，庚辰、庚戌、壬辰、戊戌四日。性格刚强果断，有领导才能。《三命通会》云："魁罡四日最为先，叠叠相逢掌大权。"', modern: '魁罡格的人天生有领导气质，刚毅果断，适合军警、管理、创业。但需防刚极易折，学会柔性管理。', source: '三命通会' };
  }
  
  // 金神格
  if (['乙丑','己巳','癸酉'].indexOf(bazi.dayPillar.ganZhi) >= 0) {
    return { name: '金神格', type: '变格', touGan: bazi.dayPillar.ganZhi, shiShen: '', classic: '金神格者，乙丑、己巳、癸酉三日。金神入火乡，富贵天下响。《三命通会》云："金神遇火，威震边疆。"', modern: '金神格的人破坏力与创造力并存，性格刚烈果断，适合军警、外科、工程师等需要锋锐特质的职业。喜火来锻炼，忌水来沉没。', source: '三命通会' };
  }
  
  // 日德格
  if (['甲寅','丙辰','戊辰','庚辰','壬戌'].indexOf(bazi.dayPillar.ganZhi) >= 0) {
    return { name: '日德格', type: '变格', touGan: bazi.dayPillar.ganZhi, shiShen: '', classic: '日德格者，甲寅、丙辰、戊辰、庚辰、壬戌五日。性格温和，品德高尚。《三命通会》云："日德均和，慈善之心。"', modern: '日德格的人品行端正，为人正直善良，有君子之风。凡事以德服人，受人尊敬，适合教育、公益、文化等行业。', source: '三命通会' };
  }
  
  return null; // 无特殊格局
}

// 用神分析
function determineYongShen(bazi, gejuName) {
  var str = baziEngine.judgeDayMasterStrength(bazi);
  var riWx = bazi.riWuxing;
  
  var yongShenMap = {
    '正官格': { wang: '财印', ruo: '印比', desc: '正官格喜财印相随，财生官、印护官。' },
    '七杀格': { wang: '食伤', ruo: '印比', desc: '七杀格喜食伤制杀或印星化杀。' },
    '正财格': { wang: '食伤', ruo: '比劫', desc: '正财格喜食伤生财，不宜比劫夺财。' },
    '偏财格': { wang: '食伤', ruo: '比劫', desc: '偏财格喜食伤生财，得官星护卫。' },
    '正印格': { wang: '财官', ruo: '官杀', desc: '正印格喜官杀生印，忌财星破印。' },
    '偏印格': { wang: '财星', ruo: '比劫', desc: '偏印格喜财星制印，忌食神被夺。' },
    '食神格': { wang: '财星', ruo: '比劫', desc: '食神格喜财星流通，忌偏印夺食。' },
    '伤官格': { wang: '印星', ruo: '比劫', desc: '伤官格喜印星制伤，忌正官被伤。' },
    '建禄格': { wang: '财官食伤', ruo: '印比', desc: '建禄格喜财官食伤克泄耗。' },
    '月刃格': { wang: '官杀', ruo: '印比', desc: '月刃格喜官杀制刃。' }
  };
  
  var info = yongShenMap[gejuName] || { wang: '视格局而定', ruo: '视格局而定', desc: '需结合具体命局分析。' };
  var isWang = str.indexOf('旺') >= 0;
  
  return {
    yongShen: isWang ? info.wang : info.ruo,
    desc: info.desc,
    classic: isWang ? '身旺宜克泄耗' : '身弱宜生扶帮'
  };
}


// ========== 小运计算引擎 ==========
// 《渊海子平》：小运起于时柱，阳男阴女顺行，阴男阳女逆行，一岁一运
function calculateXiaoYun(bazi, age) {
  var isMale = bazi.isMale;
  var hourGan = bazi.hourPillar.gan;
  var hourZhi = bazi.hourPillar.zhi;
  var yearGan = bazi.yearPillar.gan;
  var isYangYear = GAN_YINYANG[yearGan] === 1;
  var isShun = (isYangYear && isMale) || (!isYangYear && !isMale);
  
  var ganIdx = TIAN_GAN.indexOf(hourGan);
  var zhiIdx = DI_ZHI.indexOf(hourZhi);
  
  var step = age;
  if (step < 0) step = 0;
  
  if (isShun) {
    ganIdx = (ganIdx + step) % 10;
    zhiIdx = (zhiIdx + step) % 12;
  } else {
    ganIdx = ((ganIdx - step) % 10 + 10) % 10;
    zhiIdx = ((zhiIdx - step) % 12 + 12) % 12;
  }
  
  var gan = TIAN_GAN[ganIdx];
  var zhi = DI_ZHI[zhiIdx];
  var ganZhi = gan + zhi;
  
  return {
    ganZhi: ganZhi,
    gan: gan,
    zhi: zhi,
    wuxing: GAN_WUXING[gan],
    nayin: NAYIN_MAP[ganZhi] || '',
    shiShen: SHI_SHEN_MAP[bazi.riGan] ? SHI_SHEN_MAP[bazi.riGan][gan] : ''
  };
}

// 获取当前小运（基于当前年龄）
function getCurrentXiaoYun(bazi) {
  var birthYear = bazi.isDirectPillar ? 1970 : bazi.year;
  var currentYear = new Date().getFullYear();
  var age = currentYear - birthYear + 1; // 虚岁
  return calculateXiaoYun(bazi, age);
}



