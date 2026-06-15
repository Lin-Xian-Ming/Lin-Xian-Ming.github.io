
// Simulate global scope
var global = globalThis;

// === js/bazi-data.js ===
/**
 * 八字命理数据大全
 * 集合滴天髓、子平、盲派、千里命稿等经典数据
 */

// ========== 天干地支基础 ==========
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const SHENG_XIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 天干五行
const GAN_WUXING = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 天干阴阳 (1=阳, 0=阴)
const GAN_YINYANG = {
  '甲': 1, '乙': 0, '丙': 1, '丁': 0, '戊': 1,
  '己': 0, '庚': 1, '辛': 0, '壬': 1, '癸': 0
};

// 地支五行
const ZHI_WUXING = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 地支藏干
const ZHI_CANG_GAN = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '戊', '庚'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
};

// ========== 六十甲子纳音 ==========
const LIUSHI_JIAZI = [
  { ganZhi: '甲子', nayin: '海中金', xu: 1 },
  { ganZhi: '乙丑', nayin: '海中金', xu: 2 },
  { ganZhi: '丙寅', nayin: '炉中火', xu: 3 },
  { ganZhi: '丁卯', nayin: '炉中火', xu: 4 },
  { ganZhi: '戊辰', nayin: '大林木', xu: 5 },
  { ganZhi: '己巳', nayin: '大林木', xu: 6 },
  { ganZhi: '庚午', nayin: '路旁土', xu: 7 },
  { ganZhi: '辛未', nayin: '路旁土', xu: 8 },
  { ganZhi: '壬申', nayin: '剑锋金', xu: 9 },
  { ganZhi: '癸酉', nayin: '剑锋金', xu: 10 },
  { ganZhi: '甲戌', nayin: '山头火', xu: 11 },
  { ganZhi: '乙亥', nayin: '山头火', xu: 12 },
  { ganZhi: '丙子', nayin: '涧下水', xu: 13 },
  { ganZhi: '丁丑', nayin: '涧下水', xu: 14 },
  { ganZhi: '戊寅', nayin: '城头土', xu: 15 },
  { ganZhi: '己卯', nayin: '城头土', xu: 16 },
  { ganZhi: '庚辰', nayin: '白蜡金', xu: 17 },
  { ganZhi: '辛巳', nayin: '白蜡金', xu: 18 },
  { ganZhi: '壬午', nayin: '杨柳木', xu: 19 },
  { ganZhi: '癸未', nayin: '杨柳木', xu: 20 },
  { ganZhi: '甲申', nayin: '泉中水', xu: 21 },
  { ganZhi: '乙酉', nayin: '泉中水', xu: 22 },
  { ganZhi: '丙戌', nayin: '屋上土', xu: 23 },
  { ganZhi: '丁亥', nayin: '屋上土', xu: 24 },
  { ganZhi: '戊子', nayin: '霹雳火', xu: 25 },
  { ganZhi: '己丑', nayin: '霹雳火', xu: 26 },
  { ganZhi: '庚寅', nayin: '松柏木', xu: 27 },
  { ganZhi: '辛卯', nayin: '松柏木', xu: 28 },
  { ganZhi: '壬辰', nayin: '长流水', xu: 29 },
  { ganZhi: '癸巳', nayin: '长流水', xu: 30 },
  { ganZhi: '甲午', nayin: '沙中金', xu: 31 },
  { ganZhi: '乙未', nayin: '沙中金', xu: 32 },
  { ganZhi: '丙申', nayin: '山下火', xu: 33 },
  { ganZhi: '丁酉', nayin: '山下火', xu: 34 },
  { ganZhi: '戊戌', nayin: '平地木', xu: 35 },
  { ganZhi: '己亥', nayin: '平地木', xu: 36 },
  { ganZhi: '庚子', nayin: '壁上土', xu: 37 },
  { ganZhi: '辛丑', nayin: '壁上土', xu: 38 },
  { ganZhi: '壬寅', nayin: '金箔金', xu: 39 },
  { ganZhi: '癸卯', nayin: '金箔金', xu: 40 },
  { ganZhi: '甲辰', nayin: '覆灯火', xu: 41 },
  { ganZhi: '乙巳', nayin: '覆灯火', xu: 42 },
  { ganZhi: '丙午', nayin: '天河水', xu: 43 },
  { ganZhi: '丁未', nayin: '天河水', xu: 44 },
  { ganZhi: '戊申', nayin: '大驿土', xu: 45 },
  { ganZhi: '己酉', nayin: '大驿土', xu: 46 },
  { ganZhi: '庚戌', nayin: '钗钏金', xu: 47 },
  { ganZhi: '辛亥', nayin: '钗钏金', xu: 48 },
  { ganZhi: '壬子', nayin: '桑柘木', xu: 49 },
  { ganZhi: '癸丑', nayin: '桑柘木', xu: 50 },
  { ganZhi: '甲寅', nayin: '大溪水', xu: 51 },
  { ganZhi: '乙卯', nayin: '大溪水', xu: 52 },
  { ganZhi: '丙辰', nayin: '沙中土', xu: 53 },
  { ganZhi: '丁巳', nayin: '沙中土', xu: 54 },
  { ganZhi: '戊午', nayin: '天上火', xu: 55 },
  { ganZhi: '己未', nayin: '天上火', xu: 56 },
  { ganZhi: '庚申', nayin: '石榴木', xu: 57 },
  { ganZhi: '辛酉', nayin: '石榴木', xu: 58 },
  { ganZhi: '壬戌', nayin: '大海水', xu: 59 },
  { ganZhi: '癸亥', nayin: '大海水', xu: 60 }
];

// 纳音速查 map
const NAYIN_MAP = {};
LIUSHI_JIAZI.forEach(item => { NAYIN_MAP[item.ganZhi] = item.nayin; });

// ========== 年上起月干表 ==========
// 甲己之年丙作首，乙庚之岁戊为头
// 丙辛之岁寻庚上，丁壬壬寅顺水流
// 若问戊癸何处去，甲寅之上好追求
const YUE_GAN_MAP = {
  '甲': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
  '己': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
  '乙': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
  '庚': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
  '丙': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
  '辛': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
  '丁': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  '壬': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  '戊': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
  '癸': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙']
};

// 月支序（寅为正月）
const YUE_ZHI = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];

// ========== 日上起时干表 ==========
// 甲己还加甲，乙庚丙作初
// 丙辛从戊起，丁壬庚子居
// 戊癸何方发，壬子是真途
const SHI_GAN_MAP = {
  '甲': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
  '己': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
  '乙': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
  '庚': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
  '丙': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
  '辛': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
  '丁': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
  '壬': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
  '戊': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  '癸': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
};

// 时支序（子时为0）
const SHI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// ========== 十神关系表 ==========
// 以日干为太极点，看各天干与日干的关系
const SHI_SHEN = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '偏官', '正官', '偏印', '正印'];

// 十神速查：日干 x 天干 => 十神
const SHI_SHEN_MAP = {};
function buildShiShenMap() {
  const ganIdx = { '甲':0,'乙':1,'丙':2,'丁':3,'戊':4,'己':5,'庚':6,'辛':7,'壬':8,'癸':9 };
  // 五行生克关系：同我/生我/我生/克我/我克
  const wuxingMap = { '甲木':0,'乙木':1,'丙火':2,'丁火':3,'戊土':4,'己土':5,'庚金':6,'辛金':7,'壬水':8,'癸水':9 };
  
  // 对于每个日干，计算与其他天干的十神关系
  TIAN_GAN.forEach(riGan => {
    SHI_SHEN_MAP[riGan] = {};
    const riWuxing = GAN_WUXING[riGan];
    const riYinyang = GAN_YINYANG[riGan];
    
    TIAN_GAN.forEach(gan => {
      const wuxing = GAN_WUXING[gan];
      const yinyang = GAN_YINYANG[gan];
      const sameYinYang = (riYinyang === yinyang);
      
      let shiShen;
      if (riWuxing === wuxing) {
        // 同五行 - 比劫
        shiShen = sameYinYang ? '比肩' : '劫财';
      } else if (wuxingShengWo(wuxing, riWuxing)) {
        // 生我者 - 印星
        shiShen = !sameYinYang ? '正印' : '偏印';
      } else if (wuxingShengWo(riWuxing, wuxing)) {
        // 我生者 - 食伤
        shiShen = sameYinYang ? '食神' : '伤官';
      } else if (wuxingKeWo(wuxing, riWuxing)) {
        // 克我者 - 官杀
        shiShen = !sameYinYang ? '正官' : '偏官';
      } else if (wuxingKeWo(riWuxing, wuxing)) {
        // 我克者 - 财星
        shiShen = !sameYinYang ? '正财' : '偏财';
      }
      SHI_SHEN_MAP[riGan][gan] = shiShen;
    });
  });
}

function wuxingShengWo(sheng, wo) {
  const shengCycle = { '木':'火', '火':'土', '土':'金', '金':'水', '水':'木' };
  return shengCycle[sheng] === wo;
}

function wuxingKeWo(ke, wo) {
  const keCycle = { '木':'土', '土':'水', '水':'火', '火':'金', '金':'木' };
  return keCycle[ke] === wo;
}

buildShiShenMap();

// ========== 节气日期（近似值，用于确定月份） ==========
// 每个节气的大致日期（月、日）
const JIE_QI_DATES = [
  { name: '立春', month: 2, day: 4 },
  { name: '惊蛰', month: 3, day: 6 },
  { name: '清明', month: 4, day: 5 },
  { name: '立夏', month: 5, day: 6 },
  { name: '芒种', month: 6, day: 6 },
  { name: '小暑', month: 7, day: 7 },
  { name: '立秋', month: 8, day: 8 },
  { name: '白露', month: 9, day: 8 },
  { name: '寒露', month: 10, day: 8 },
  { name: '立冬', month: 11, day: 8 },
  { name: '大雪', month: 12, day: 7 },
  { name: '小寒', month: 1, day: 6 }
];

// ========== 神煞速查表 ==========

// 天乙贵人（日干查）
const TIAN_YI_GUI_REN = {
  '甲': '丑未', '乙': '子申', '丙': '亥酉', '丁': '亥酉',
  '戊': '丑未', '己': '子申', '庚': '丑未', '辛': '午寅',
  '壬': '卯巳', '癸': '卯巳'
};

// 文昌贵人（日干查）
const WEN_CHANG = {
  '甲': '巳', '乙': '午', '丙': '申', '丁': '酉',
  '戊': '申', '己': '酉', '庚': '亥', '辛': '子',
  '壬': '寅', '癸': '卯'
};

// 禄神（日干查）
const LU_SHEN = {
  '甲': '寅', '乙': '卯', '丙': '巳', '丁': '午',
  '戊': '巳', '己': '午', '庚': '申', '辛': '酉',
  '壬': '亥', '癸': '子'
};

// 羊刃（日干查）
const YANG_REN = {
  '甲': '卯', '乙': '辰', '丙': '午', '丁': '未',
  '戊': '午', '己': '未', '庚': '酉', '辛': '戌',
  '壬': '子', '癸': '丑'
};

// 驿马（年/日支查）
const YI_MA = { '寅午戌': '申', '申子辰': '寅', '巳酉丑': '亥', '亥卯未': '巳' };

// 桃花/咸池（年/日支查）
const TAO_HUA = { '寅午戌': '卯', '申子辰': '酉', '巳酉丑': '午', '亥卯未': '子' };

// 华盖（年/日支查）
const HUA_GAI = { '寅午戌': '戌', '申子辰': '辰', '巳酉丑': '丑', '亥卯未': '未' };

// 将星（年/日支查）
const JIANG_XING = { '寅午戌': '午', '申子辰': '子', '巳酉丑': '酉', '亥卯未': '卯' };

// 孤辰（年支查）
const GU_CHEN = { '亥子丑': '寅', '寅卯辰': '巳', '巳午未': '申', '申酉戌': '亥' };

// 寡宿（年支查）
const GUA_SU = { '亥子丑': '戌', '寅卯辰': '丑', '巳午未': '辰', '申酉戌': '未' };

// 天德（月查）
const TIAN_DE = {
  '寅': '丁', '卯': '申', '辰': '壬', '巳': '辛',
  '午': '亥', '未': '甲', '申': '癸', '酉': '寅',
  '戌': '丙', '亥': '乙', '子': '巳', '丑': '庚'
};

// 月德（月查）
const YUE_DE = {
  '寅午戌': '丙', '申子辰': '壬', '亥卯未': '甲', '巳酉丑': '庚'
};

// 天赦日
const TIAN_SHE = ['戊寅', '甲午', '戊申', '甲子'];

// 十恶大败日
const SHI_E_DA_BAI = ['甲辰', '乙巳', '壬申', '丙申', '丁亥', '庚辰', '戊戌', '癸亥', '辛亥', '辛巳', '己丑'];

// 魁罡日
const KUI_GANG = ['庚辰', '庚戌', '壬辰', '戊戌'];

// 阴阳差错日
const YIN_YANG_CHA_CUO = ['丙子', '丁丑', '戊寅', '辛卯', '壬辰', '癸巳', '丙午', '丁未', '戊申', '辛酉', '壬戌', '癸亥'];

// 孤鸾煞
const GU_LUAN = ['乙巳', '丁巳', '辛亥', '戊申', '壬寅', '戊午', '壬子', '丙午'];

// ========== 地支六合 ==========
const DI_ZHI_LIU_HE = {
  '子丑': '土', '寅亥': '木', '卯戌': '火', '辰酉': '金', '巳申': '水', '午未': '土'
};

// ========== 地支三合局 ==========
const DI_ZHI_SAN_HE = {
  '申子辰': '水', '亥卯未': '木', '寅午戌': '火', '巳酉丑': '金'
};

// ========== 地支六冲 ==========
const DI_ZHI_LIU_CHONG = { '子': '午', '午': '子', '丑': '未', '未': '丑', '寅': '申', '申': '寅', '卯': '酉', '酉': '卯', '辰': '戌', '戌': '辰', '巳': '亥', '亥': '巳' };

// ========== 地支相刑 ==========
const DI_ZHI_XIANG_XING = {
  '寅巳': '无恩之刑', '巳申': '无恩之刑', '寅申': '无恩之刑',
  '丑戌': '恃势之刑', '戌未': '恃势之刑', '丑未': '恃势之刑',
  '子卯': '无礼之刑'
};

// ========== 十二长生 ==========
const CHANG_SHENG_TABLE = {
  '甲': ['亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌'],
  '乙': ['午', '巳', '辰', '卯', '寅', '丑', '子', '亥', '戌', '酉', '申', '未'],
  '丙': ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'],
  '丁': ['酉', '申', '未', '午', '巳', '辰', '卯', '寅', '丑', '子', '亥', '戌'],
  '戊': ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'],
  '己': ['酉', '申', '未', '午', '巳', '辰', '卯', '寅', '丑', '子', '亥', '戌'],
  '庚': ['巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰'],
  '辛': ['子', '亥', '戌', '酉', '申', '未', '午', '巳', '辰', '卯', '寅', '丑'],
  '壬': ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'],
  '癸': ['卯', '寅', '丑', '子', '亥', '戌', '酉', '申', '未', '午', '巳', '辰']
};

const CHANG_SHENG_NAMES = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];

// ========== 夫妻宫（日柱地支）分析参考 ==========
const RI_ZHI_FENXI = {
  '子': '子为桃花，日坐子水，配偶聪明灵秀，但子午卯酉为四正桃花，感情丰富，需防婚外情缘。',
  '丑': '丑为金库，日坐丑土，配偶稳重务实，性格较为固执，但丑中藏己癸辛，配偶内心丰富。',
  '寅': '寅为偏财、食神、七杀之库，日坐寅木，配偶有能力有魄力，独立性强，进取心旺盛。',
  '卯': '卯为四正桃花，日坐卯木，配偶相貌秀丽，感情细腻，但子卯相刑，需注意感情纠葛。',
  '辰': '辰为水库、天罗，日坐辰土，配偶性格豪爽但有城府，辰为龙，配偶有贵气。',
  '巳': '巳为偏印、比肩、偏财之合，日坐巳火，配偶热心多变，善于交际。',
  '午': '午为四正桃花，日坐午火，配偶热情大方，但午为羊刃，配偶性格刚烈。',
  '未': '未为木库，日坐未土，配偶温和善良，持家有道，但未为寡宿，需防孤独。',
  '申': '申为偏印、比肩、食神，日坐申金，配偶聪明多智，有学识，思辨能力強。',
  '酉': '酉为四正桃花，日坐酉金，配偶相貌俊美，口才极佳，但酉为桃花，需防感情多变。',
  '戌': '戌为火库、地网，日坐戌土，配偶忠诚可靠，执行力强，但性格稍急。',
  '亥': '亥为偏印、比肩，日坐亥水，配偶智慧通达，心地善良，有学识涵养。'
};

// ========== 孤辰寡宿 ==========

// ========== 命宫断诀 ==========
const MING_GONG_JU = {
  '子': '子宫天贵志不凡，自视清高在命间。得时国家能重用，失时贵人到进前。生来心慈面又软，晚年信奉佛教仙。',
  '丑': '丑宫天厄出生难，劳心劳力在命间。祖业家产难依靠，自力更生创家园。禄年中年一个样，晚年福禄胜从前。',
  '寅': '寅宫天权最聪明，能文能武在命中。中年就有权合柄，一生衣禄必享通。为人一生人缘好，博得领导来器重。',
  '卯': '卯宫天赦最慷慨，处事仗义来疏财。生来为人最抗上，虚伪之人合不来。好打人间不平事，净为人家耗钱财。',
  '辰': '辰宫天刚智谋多，处事总是返得着。此人多能又多变，一生婚姻有波折。为人生来最好事，背后净说人家错。',
  '巳': '巳宫天文命最佳，文学创作能振发。女命能把贵夫得，夫唱妻随享荣华。初年不如中年好，晚年富贵胜仙家。',
  '午': '午宫天福命最强，荣华富贵在命上。遇着大事能化小，遇着小事保安康。处事为人心肠软，如同佛道好心肠。',
  '未': '未宫天驿始不安，一生劳碌在命间。离祖成家为上策，自力更生创家园。为人心胸狭又窄，纵然人闲心不闲。',
  '申': '申宫天孤别早婚，早婚必是二婚人。男命离婚应再娶，女命必嫁二夫君。为人人缘还不错，一生能遇外通人。',
  '酉': '酉宫天秘有事非，仗义疏财把人围。生来为人贪心大，常为贪心好吃亏。事业经营走正路，以小失大把钱赔。',
  '戌': '戌宫天艺性平和，为人生来话不多。艺道成名为上策，生来不让人家说。此人财运倒不错，平平安安度生活。',
  '亥': '亥宫天寿有慈心，克己奉公能助人。走遍天下有人敬，此人本是大命人。福如东海长流水，寿比南山一老人。'
};

// ========== 十二神煞断流年 ==========
const SHIER_SHEN_SHA = [
  '太岁', '太阳', '丧门', '勾绞', '官符', '小耗', '岁破', '暴败', '白虎', '福德', '吊客', '病符'
];

// ========== 纳音五行解析 ==========
const NAYIN_FENXI = {
  '海中金': '海中金者，宝藏龙宫，珠孕蛟室。成器之金，需火炼方成，忌水多沉没。命带此金者，内涵深厚，外表不显，珍珠暗藏。',
  '炉中火': '炉中火者，天地为炉，阴阳为炭。热情奔放，创造力强，善于点燃他人热情。需木来添薪，忌水来浇灭。',
  '大林木': '大林木者，枝干参天，根系深广。胸襟宽广，志在四方，有领导才能。喜土培根，忌金来砍伐。',
  '路旁土': '路旁土者，平坦坚实，承载万物。性格稳重踏实，任劳任怨，但易被人轻视。喜火生助，忌木来克。',
  '剑锋金': '剑锋金者，锋芒毕露，锐不可当。性格刚直果断，执行力强，但易伤人伤己。需水磨砺，忌火熔毁。',
  '山头火': '山头火者，野火燎原，势头猛烈。性格激烈冲动，来得快去得快。喜木助燃，忌水扑灭。',
  '涧下水': '涧下水者，清澈流动，曲折前行。性格灵活多变，适应力强，善于迂回解决问题。喜金来生，忌土来堵。',
  '城头土': '城头土者，坚固高耸，护卫一方。性格忠诚可靠，有担当，能守护家人朋友。喜火来生，忌木来克。',
  '白蜡金': '白蜡金者，珍贵精细，润泽光华。性格细腻周到，精于算计，善于理财。喜水润泽，忌火熔化。',
  '杨柳木': '杨柳木者，柔韧飘逸，随风起舞。性格温和柔顺，善解人意，但易摇摆不定。喜水滋养，忌金砍伐。',
  '泉中水': '泉中水者，源源不断，生生不息。性格沉静深远，智慧内敛，后劲十足。喜金来生，忌土来堵。',
  '屋上土': '屋上土者，高居房顶，遮风挡雨。性格有保护欲，责任感强，但易居高临下。喜火来生，忌木来克。',
  '霹雳火': '霹雳火者，电闪雷鸣，惊天动地。性格火爆刚猛，有魄力善变革，但易大起大落。喜木助燃，忌水扑灭。',
  '松柏木': '松柏木者，岁寒不凋，坚韧挺拔。性格坚毅不屈，不畏艰难，品格高洁。喜水滋养，忌金砍伐。',
  '长流水': '长流水者，滔滔不绝，奔流不息。性格开朗外向，精力充沛，喜欢交游。喜金来生，忌土来堵。',
  '沙中金': '沙中金者，埋于沙砾，待淘而出。才华内敛，不轻易表露，需时机方能展现。喜火炼就，忌水冲散。',
  '山下火': '山下火者，暗处燃烧，温暖一方。性格外冷内热，不张扬但可靠。喜木来添，忌水浇灭。',
  '平地木': '平地木者，根基扎实，稳步成长。性格稳重踏实，按部就班，积少成多。喜水滋养，忌金砍伐。',
  '壁上土': '壁上土者，依附墙壁，装饰门面。性格善借外力，讲究体面，但根基不稳。喜火生助，忌木来克。',
  '金箔金': '金箔金者，薄如蝉翼，光彩照人。性格爱美讲究，追求精致，但需防虚有其表。喜水润泽，忌火熔化。',
  '覆灯火': '覆灯火者，灯内之火，光明内照。性格内秀，智慧之光不显于外，适合幕后工作。喜油（木）来续，忌风吹灭。',
  '天河水': '天河水者，银河倾泻，浩瀚无垠。性格胸怀宽广，想象力丰富，气象万千。喜金来生，忌土来堵。',
  '大驿土': '大驿土者，大道通衢，四通八达。性格善于交际，人脉广泛，信息灵通。喜火来生，忌木来克。',
  '钗钏金': '钗钏金者，首饰之金，装饰之物。性格爱美注重仪表，讲究品味，善于社交。喜水润泽，忌火熔化。',
  '桑柘木': '桑柘木者，蚕食之叶，奉献无私。性格甘于奉献，默默耕耘，有牺牲精神。喜水滋养，忌金砍伐。',
  '大溪水': '大溪水者，奔腾而下，势不可挡。性格豪爽直率，行动力强，不拐弯抹角。喜金来生，忌土来堵。',
  '沙中土': '沙中土者，松散流动，难以凝聚。性格松散随和，不喜拘束，但难成大器。喜火生助，忌木来克。',
  '天上火': '天上火者，日照中天，光明普照。性格光明磊落，热情大方，有领袖气质。喜木添薪，忌水浇灭。',
  '石榴木': '石榴木者，花果繁盛，子实累累。性格多子多福，人丁兴旺，善于传道授业。喜水滋养，忌金砍伐。',
  '大海水': '大海水者，汪洋浩瀚，包容万象。性格胸襟广阔，包容大度，有海纳百川之气概。喜金来生，忌土来堵。'
};

// ========== 三垣（胎元、命宫、身宫）速查参考 ==========

console.log('Bazi data loaded successfully.');

// === js/bazi-core.js ===
/**
 * 八字命盘核心计算引擎
 * 整合滴天髓、子平、盲派算法
 */

class BaziEngine {
  constructor() {
    this.dayGanZhiCache = null;
    this.cacheYear = null;
    this.cacheMonth = null;
    this.cacheDay = null;
  }

  /**
   * 计算完整的八字命盘
   * @param {number} year - 公历年
   * @param {number} month - 公历月 (1-12)
   * @param {number} day - 公历日
   * @param {number} hour - 时间 (0-23)
   * @param {number} minute - 分钟 (0-59)
   * @param {boolean} isMale - 性别（true=男 false=女）
   * @returns {object} 完整命盘数据
   */
  calculate(year, month, day, hour, minute, isMale) {
    // 根据出生时间调整日柱（23点后算次日）
    let adjustedDate = new Date(year, month - 1, day, hour, minute);
    let adjustedYear = adjustedDate.getFullYear();
    let adjustedMonth = adjustedDate.getMonth() + 1;
    let adjustedDay = adjustedDate.getDate();
    let adjustedHour = adjustedDate.getHours();
    
    // 计算四柱
    const yearPillar = this.calcYearPillar(adjustedYear, adjustedMonth, adjustedDay);
    const monthPillar = this.calcMonthPillar(adjustedYear, adjustedMonth, adjustedDay);
    const dayPillar = this.calcDayPillar(adjustedYear, adjustedMonth, adjustedDay);
    const hourPillar = this.calcHourPillar(dayPillar.gan, adjustedHour);
    
    // 日干
    const riGan = dayPillar.gan;
    
    // 地支藏干
    const cangGan = {
      year: ZHI_CANG_GAN[yearPillar.zhi],
      month: ZHI_CANG_GAN[monthPillar.zhi],
      day: ZHI_CANG_GAN[dayPillar.zhi],
      hour: ZHI_CANG_GAN[hourPillar.zhi]
    };
    
    // 纳音
    const nayin = {
      year: this.getNayin(yearPillar.ganZhi),
      month: this.getNayin(monthPillar.ganZhi),
      day: this.getNayin(dayPillar.ganZhi),
      hour: this.getNayin(hourPillar.ganZhi)
    };
    
    // 十神
    const shiShen = {
      year: SHI_SHEN_MAP[riGan][yearPillar.gan],
      month: SHI_SHEN_MAP[riGan][monthPillar.gan],
      day: SHI_SHEN_MAP[riGan][dayPillar.gan],
      hour: SHI_SHEN_MAP[riGan][hourPillar.gan]
    };
    
    // 十二长生（日干对应各柱地支）
    const changSheng = {
      year: this.getChangSheng(riGan, yearPillar.zhi),
      month: this.getChangSheng(riGan, monthPillar.zhi),
      day: this.getChangSheng(riGan, dayPillar.zhi),
      hour: this.getChangSheng(riGan, hourPillar.zhi)
    };
    
    // 空亡
    const kongWang = this.calcKongWang(dayPillar.ganZhi);
    
    // 神煞
    const shenSha = this.calcShenSha(riGan, yearPillar, monthPillar, dayPillar, hourPillar, adjustedYear);
    
    // 大运
    const daYun = this.calcDaYun(year, month, day, monthPillar, adjustedYear, adjustedMonth, adjustedDay, isMale);
    
    // 胎元、命宫、身宫
    const sanYuan = this.calcSanYuan(monthPillar, hourPillar);
    
    // 起运年龄
    const qiYunAge = this.calcQiYun(year, month, day, monthPillar, adjustedYear, adjustedMonth, adjustedDay, isMale);

    // 生肖
    const shengXiao = SHENG_XIAO[DI_ZHI.indexOf(yearPillar.zhi)];
    
    // 日柱五行
    const riWuxing = GAN_WUXING[riGan];
    
    // 五行统计
    const wuxingCount = this.countWuxing(yearPillar, monthPillar, dayPillar, hourPillar, cangGan);

    return {
      year, month, day, hour, minute, isMale,
      yearPillar, monthPillar, dayPillar, hourPillar,
      riGan, riWuxing, shengXiao,
      cangGan, nayin, shiShen, changSheng,
      kongWang, shenSha, daYun, sanYuan,
      qiYunAge, wuxingCount
    };
  }

  /**
   * 计算年柱
   * 以立春为界，立春前按上一年算
   */
  calcYearPillar(year, month, day) {
    // 立春通常在2月4日左右
    let effectiveYear = year;
    if (month < 2 || (month === 2 && day < 4)) {
      effectiveYear = year - 1;
    }
    
    const ganIdx = (effectiveYear - 4) % 10;
    const zhiIdx = (effectiveYear - 4) % 12;
    const gan = TIAN_GAN[ganIdx < 0 ? ganIdx + 10 : ganIdx];
    const zhi = DI_ZHI[zhiIdx < 0 ? zhiIdx + 12 : zhiIdx];
    
    return { gan, zhi, ganZhi: gan + zhi };
  }

  /**
   * 计算月柱
   * 以节气为界，正月为寅月（立春到惊蛰）
   */
  calcMonthPillar(year, month, day) {
    // 节气日期（近似）
    const jieQiDayMap = { 2:4, 3:6, 4:5, 5:6, 6:6, 7:7, 8:8, 9:8, 10:8, 11:8, 12:7, 1:6 };
    
    // 确定地支月份
    let yueZhiIdx;
    if (month === 1) {
      yueZhiIdx = (day >= 6) ? 0 : 11; // 小寒后为丑月(12), 否则还是子月(11)
    } else {
      const jqDay = jieQiDayMap[month] || 6;
      if (day >= jqDay) {
        yueZhiIdx = month - 2; // 立春后寅=0(正月), 惊蛰后卯=1(二月)...
      } else {
        yueZhiIdx = month - 3;
      }
    }
    
    if (yueZhiIdx < 0) yueZhiIdx += 12;
    
    const zhi = YUE_ZHI[yueZhiIdx];
    
    // 根据年干定月干
    const yearPillar = this.calcYearPillar(year, month, day);
    const gan = YUE_GAN_MAP[yearPillar.gan][yueZhiIdx];
    
    return { gan, zhi, ganZhi: gan + zhi };
  }

  /**
   * 计算日柱
   * 使用精确的数学算法：以1900-01-01为甲戌日（第11位）
   */
  calcDayPillar(year, month, day) {
    // 计算距离1900-01-01的天数
    const baseDate = new Date(1900, 0, 1);
    const targetDate = new Date(year, month - 1, day);
    let daysDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    
    // 1900-01-01 是甲戌日，在六十甲子中排第11位
    const baseIdx = 10; // 0-indexed: 甲戌是第10（0=甲子）
    let idx = (baseIdx + daysDiff) % 60;
    if (idx < 0) idx += 60;
    
    const gan = TIAN_GAN[idx % 10];
    const zhi = DI_ZHI[idx % 12];
    
    return { gan, zhi, ganZhi: gan + zhi };
  }

  /**
   * 计算时柱
   */
  calcHourPillar(riGan, hour) {
    // 确定时支：23-1为子时(0), 1-3为丑时(1), ...
    let shiZhiIdx;
    if (hour === 23 || hour === 0) {
      shiZhiIdx = 0; // 子时
    } else {
      shiZhiIdx = Math.floor((hour + 1) / 2);
    }
    
    const zhi = SHI_ZHI[shiZhiIdx];
    const gan = SHI_GAN_MAP[riGan][shiZhiIdx];
    
    return { gan, zhi, ganZhi: gan + zhi };
  }

  /**
   * 获取纳音
   */
  getNayin(ganZhi) {
    return NAYIN_MAP[ganZhi] || '未知';
  }

  /**
   * 获取十二长生状态
   */
  getChangSheng(gan, zhi) {
    const zhiIdx = DI_ZHI.indexOf(zhi);
    const changShengZhis = CHANG_SHENG_TABLE[gan];
    if (!changShengZhis) return '未知';
    const idx = changShengZhis.indexOf(zhi);
    if (idx === -1) return '未知';
    return CHANG_SHENG_NAMES[idx];
  }

  /**
   * 计算空亡
   * 根据日柱干支确定空亡的两个地支
   */
  calcKongWang(riGanZhi) {
    // 六十甲子中，每旬（10天干配10地支）有两个地支轮空
    const riGan = riGanZhi[0];
    const riZhi = riGanZhi[1];
    
    // 找到日干支在六十甲子中的位置
    let riIdx = -1;
    for (let i = 0; i < LIUSHI_JIAZI.length; i++) {
      if (LIUSHI_JIAZI[i].ganZhi === riGanZhi) {
        riIdx = i;
        break;
      }
    }
    
    if (riIdx === -1) return ['', ''];
    
    // 计算本旬起始位置
    const xunStart = Math.floor(riIdx / 10) * 10;
    
    // 本旬中已有的地支
    const usedZhis = [];
    for (let i = xunStart; i < xunStart + 10; i++) {
      usedZhis.push(LIUSHI_JIAZI[i].ganZhi[1]);
    }
    
    // 找出缺少的两个地支（空亡）
    const kongWangZhis = [];
    for (let i = 0; i < 12; i++) {
      const zhi = DI_ZHI[(DI_ZHI.indexOf(usedZhis[9]) + 1 + i) % 12];
      if (!usedZhis.includes(zhi) && kongWangZhis.length < 2) {
        kongWangZhis.push(zhi);
      }
    }
    
    return kongWangZhis;
  }

  /**
   * 计算神煞
   */
  calcShenSha(riGan, yearPillar, monthPillar, dayPillar, hourPillar, year) {
    const result = { ji: [], xiong: [], other: [] };
    const riZhi = dayPillar.zhi;
    const nianZhi = yearPillar.zhi;
    const yueZhi = monthPillar.zhi;
    const allZhis = [nianZhi, yueZhi, riZhi, hourPillar.zhi];
    const riGanZhi = dayPillar.ganZhi;
    
    // 天乙贵人
    const tianYi = TIAN_YI_GUI_REN[riGan] || '';
    const tianYiZhis = [tianYi[0], tianYi[1]];
    allZhis.forEach((zhi, idx) => {
      if (tianYiZhis.includes(zhi)) {
        result.ji.push(`${['年','月','日','时'][idx]}柱天乙贵人`);
      }
    });
    
    // 文昌
    const wenChangZhi = WEN_CHANG[riGan];
    allZhis.forEach((zhi, idx) => {
      if (zhi === wenChangZhi) {
        result.ji.push(`${['年','月','日','时'][idx]}柱文昌星`);
      }
    });
    
    // 禄神
    const luZhi = LU_SHEN[riGan];
    allZhis.forEach((zhi, idx) => {
      if (zhi === luZhi) {
        result.ji.push(`${['年','月','日','时'][idx]}柱禄神`);
      }
    });
    
    // 羊刃
    const yangRenZhi = YANG_REN[riGan];
    allZhis.forEach((zhi, idx) => {
      if (zhi === yangRenZhi) {
        result.xiong.push(`${['年','月','日','时'][idx]}柱羊刃`);
      }
    });
    
    // 驿马
    const findSanHeKey = (zhi) => {
      if ('寅午戌'.includes(zhi)) return '寅午戌';
      if ('申子辰'.includes(zhi)) return '申子辰';
      if ('巳酉丑'.includes(zhi)) return '巳酉丑';
      if ('亥卯未'.includes(zhi)) return '亥卯未';
      return '';
    };
    const yiMaZhi = YI_MA[findSanHeKey(riZhi)] || YI_MA[findSanHeKey(nianZhi)];
    allZhis.forEach((zhi, idx) => {
      if (zhi === yiMaZhi) result.ji.push(`${['年','月','日','时'][idx]}柱驿马星`);
    });
    
    // 桃花
    const taoHuaZhi = TAO_HUA[findSanHeKey(riZhi)] || TAO_HUA[findSanHeKey(nianZhi)];
    allZhis.forEach((zhi, idx) => {
      if (zhi === taoHuaZhi) result.other.push(`${['年','月','日','时'][idx]}柱桃花`);
    });
    
    // 华盖
    const huaGaiZhi = HUA_GAI[findSanHeKey(riZhi)] || HUA_GAI[findSanHeKey(nianZhi)];
    allZhis.forEach((zhi, idx) => {
      if (zhi === huaGaiZhi) result.ji.push(`${['年','月','日','时'][idx]}柱华盖星`);
    });
    
    // 孤辰
    const findGuGuaKey = (zhi) => {
      if ('亥子丑'.includes(zhi)) return '亥子丑';
      if ('寅卯辰'.includes(zhi)) return '寅卯辰';
      if ('巳午未'.includes(zhi)) return '巳午未';
      if ('申酉戌'.includes(zhi)) return '申酉戌';
      return '';
    };
    const guChenZhi = GU_CHEN[findGuGuaKey(nianZhi)];
    if (guChenZhi && allZhis.includes(guChenZhi)) result.xiong.push('命带孤辰');
    
    const guaSuZhi = GUA_SU[findGuGuaKey(nianZhi)];
    if (guaSuZhi && allZhis.includes(guaSuZhi)) result.xiong.push('命带寡宿');
    
    // 魁罡
    if (KUI_GANG.includes(riGanZhi)) result.ji.push('日柱魁罡格');
    
    // 十恶大败
    if (SHI_E_DA_BAI.includes(riGanZhi)) result.xiong.push('十恶大败日');
    
    // 孤鸾煞
    if (GU_LUAN.includes(riGanZhi)) result.xiong.push('孤鸾煞');
    
    // 阴阳差错
    if (YIN_YANG_CHA_CUO.includes(riGanZhi)) result.other.push('阴阳差错日');
    
    // 天赦
    if (TIAN_SHE.includes(riGanZhi)) result.ji.push('天赦日');
    
    // 将星
    const jiangXingZhi = JIANG_XING[findSanHeKey(riZhi)] || JIANG_XING[findSanHeKey(nianZhi)];
    allZhis.forEach((zhi, idx) => {
      if (zhi === jiangXingZhi) result.ji.push(`${['年','月','日','时'][idx]}柱将星`);
    });
    
    return result;
  }

  /**
   * 计算大运
   */
  calcDaYun(birthYear, birthMonth, birthDay, monthPillar, adjustedYear, adjustedMonth, adjustedDay, isMale) {
    const yearGan = TIAN_GAN[(adjustedYear - 4) % 10 < 0 ? (adjustedYear - 4) % 10 + 10 : (adjustedYear - 4) % 10];
    const isYangYear = GAN_YINYANG[yearGan] === 1;
    
    // 顺排：阳男阴女；逆排：阴男阳女
    const isShunPai = (isYangYear && isMale) || (!isYangYear && !isMale);
    
    // 起运月柱索引
    const yueZhiIdx = YUE_ZHI.indexOf(monthPillar.zhi);
    const yueGanIdx = TIAN_GAN.indexOf(monthPillar.gan);
    
    // 生成大运（10步）
    const daYunList = [];
    for (let i = 1; i <= 10; i++) {
      let newGanIdx, newZhiIdx;
      if (isShunPai) {
        newGanIdx = (yueGanIdx + i) % 10;
        newZhiIdx = (yueZhiIdx + i) % 12;
      } else {
        newGanIdx = (yueGanIdx - i) % 10;
        newZhiIdx = (yueZhiIdx - i) % 12;
        if (newGanIdx < 0) newGanIdx += 10;
        if (newZhiIdx < 0) newZhiIdx += 12;
      }
      
      const gan = TIAN_GAN[newGanIdx];
      const zhi = DI_ZHI[newZhiIdx];
      
      daYunList.push({
        ganZhi: gan + zhi,
        gan, zhi,
        startAge: 0, // 稍后填入
        nayin: this.getNayin(gan + zhi)
      });
    }
    
    return daYunList;
  }

  /**
   * 计算起运年龄
   * 阳男阴女顺数到下一个节气，阴男阳女逆数到上一个节气
   */
  calcQiYun(birthYear, birthMonth, birthDay, monthPillar, adjustedYear, adjustedMonth, adjustedDay, isMale) {
    const yearGan = TIAN_GAN[(adjustedYear - 4) % 10 < 0 ? (adjustedYear - 4) % 10 + 10 : (adjustedYear - 4) % 10];
    const isYangYear = GAN_YINYANG[yearGan] === 1;
    const isShun = (isYangYear && isMale) || (!isYangYear && !isMale);
    
    // 简化的起运计算：从生日到最近节气的天数除以3
    const jieQiDayMap = { 2:4, 3:6, 4:5, 5:6, 6:6, 7:7, 8:8, 9:8, 10:8, 11:8, 12:7, 1:6 };
    
    let targetMonth, targetDay;
    if (isShun) {
      // 顺排：找下一个节气
      targetMonth = adjustedMonth + 1;
      if (targetMonth > 12) targetMonth = 1;
      targetDay = jieQiDayMap[targetMonth] || 6;
    } else {
      // 逆排：找上一个节气
      targetMonth = adjustedMonth;
      targetDay = jieQiDayMap[adjustedMonth] || 6;
    }
    
    // 计算天数差
    const birthDate = new Date(adjustedYear, adjustedMonth - 1, adjustedDay);
    let targetDate;
    if (isShun) {
      targetDate = new Date(adjustedYear, targetMonth - 1, targetDay);
      if (targetDate <= birthDate) {
        targetDate = new Date(adjustedYear + 1, targetMonth - 1, targetDay);
      }
    } else {
      targetDate = new Date(adjustedYear, targetMonth - 1, targetDay);
      if (targetDate >= birthDate) {
        targetDate = new Date(adjustedYear - 1, targetMonth - 1, targetDay);
      }
    }
    
    let daysDiff = Math.abs(Math.floor((targetDate - birthDate) / (1000 * 60 * 60 * 24)));
    let age = daysDiff / 3;
    
    // 3天=1岁，1天=4个月
    if (age < 1) age = 1;
    
    const qiYunAge = Math.ceil(age);
    
    // 如果是顺排，从起运年龄开始，每10年换一运
    // 如果是逆排，也类似
    return { qiYunAge, isShunPai: isShun };
  }

  /**
   * 计算胎元、命宫、身宫（三垣）
   */
  calcSanYuan(monthPillar, hourPillar) {
    // 胎元：月干进位一，月支进位三
    const yueGanIdx = TIAN_GAN.indexOf(monthPillar.gan);
    const yueZhiIdx = YUE_ZHI.indexOf(monthPillar.zhi);
    
    const taiGan = TIAN_GAN[(yueGanIdx + 1) % 10];
    const taiZhi = YUE_ZHI[(yueZhiIdx + 3) % 12];
    
    // 命宫：子起正月逆查，生月支上起生时，顺查至卯
    const hourZhiIdx = SHI_ZHI.indexOf(hourPillar.zhi);
    const mingZhiIdx = (13 - yueZhiIdx + hourZhiIdx) % 12;
    const mingZhi = SHI_ZHI[mingZhiIdx];
    
    // 命宫天干
    const mingGan = YUE_GAN_MAP[monthPillar.gan][mingZhiIdx];
    
    // 身宫：子起正月顺查，生月支上起生时，逆推至酉
    const shenZhiIdx = (yueZhiIdx + hourZhiIdx + 5) % 12;
    const shenZhi = SHI_ZHI[shenZhiIdx];
    const shenGan = YUE_GAN_MAP[monthPillar.gan][shenZhiIdx];
    
    return {
      taiYuan: { ganZhi: taiGan + taiZhi, gan: taiGan, zhi: taiZhi },
      mingGong: { ganZhi: mingGan + mingZhi, gan: mingGan, zhi: mingZhi },
      shenGong: { ganZhi: shenGan + shenZhi, gan: shenGan, zhi: shenZhi }
    };
  }

  /**
   * 统计五行数量
   */
  countWuxing(yearPillar, monthPillar, dayPillar, hourPillar, cangGan) {
    const count = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
    
    // 天干五行
    [yearPillar.gan, monthPillar.gan, dayPillar.gan, hourPillar.gan].forEach(gan => {
      count[GAN_WUXING[gan]]++;
    });
    
    // 地支五行
    [yearPillar.zhi, monthPillar.zhi, dayPillar.zhi, hourPillar.zhi].forEach(zhi => {
      count[ZHI_WUXING[zhi]]++;
    });
    
    // 地支藏干（加权计算）
    Object.values(cangGan).forEach(gans => {
      gans.forEach((gan, idx) => {
        count[GAN_WUXING[gan]] += (idx === 0 ? 0.5 : 0.25);
      });
    });
    
    return count;
  }

  /**
   * 日主强弱判断
   */
  judgeDayMasterStrength(bazi) {
    const riGan = bazi.riGan;
    const riWuxing = bazi.riWuxing;
    const wc = bazi.wuxingCount;
    
    // 简单判断：得月令 + 同类多少
    const yueZhi = bazi.monthPillar.zhi;
    const yueWuxing = ZHI_WUXING[yueZhi];
    const deYueLing = (riWuxing === yueWuxing);
    
    // 印星（生我者）和比劫（同我者）的总数
    const tongLei = wc[riWuxing];
    
    // 月支藏干中是否含日主五行
    let hasRiWuxingInYueZhi = false;
    if (ZHI_CANG_GAN[yueZhi]) {
      hasRiWuxingInYueZhi = ZHI_CANG_GAN[yueZhi].some(g => GAN_WUXING[g] === riWuxing);
    }
    
    let score = 0;
    if (deYueLing) score += 3;
    if (hasRiWuxingInYueZhi) score += 2;
    if (tongLei >= 3) score += 2;
    else if (tongLei >= 2) score += 1;
    
    if (score >= 5) return '偏旺';
    if (score >= 3) return '中和偏旺';
    if (score >= 2) return '中和';
    if (score >= 1) return '中和偏弱';
    return '偏弱';
  }
}

// 导出引擎实例
const baziEngine = new BaziEngine();

console.log('Bazi Core Engine loaded successfully.');

// === js/bazi-analysis.js ===
/**
 * 八字分析引擎
 * 综合滴天髓、子平、盲派、千里命稿，生成详细命理分析
 */

class BaziAnalysisEngine {
  constructor() {
    this.engine = baziEngine;
  }

  /**
   * 生成完整命盘分析报告
   */
  generateReport(bazi) {
    const sections = [];
    
    sections.push(this.generateOverview(bazi));
    sections.push(this.generateDayMasterAnalysis(bazi));
    sections.push(this.generateWuxingAnalysis(bazi));
    sections.push(this.generateNayinAnalysis(bazi));
    sections.push(this.generateShiShenAnalysis(bazi));
    sections.push(this.generateShenShaAnalysis(bazi));
    sections.push(this.generateDaYunAnalysis(bazi));
    sections.push(this.generateMarriageAnalysis(bazi));
    sections.push(this.generateCareerAnalysis(bazi));
    sections.push(this.generateHealthAnalysis(bazi));
    sections.push(this.generateMingGongAnalysis(bazi));
    
    return sections.join('\n\n');
  }

  /**
   * 命盘总览
   */
  generateOverview(bazi) {
    const riGan = bazi.riGan;
    const riWuxing = bazi.riWuxing;
    const str = this.engine.judgeDayMasterStrength(bazi);
    const nayin = bazi.nayin.day;
    const shengxiao = bazi.shengXiao;
    
    let text = '═══════════════ 【命盘总览】 ═══════════════\n\n';
    text += `日主：${riGan}（${riWuxing}）  生肖：${shengxiao}\n`;
    text += `日柱纳音：${nayin}  日主强弱：${str}\n\n`;
    
    text += '【四柱排盘】\n';
    text += `┌───────┬────────┬────────┬────────┬────────┐\n`;
    text += `│  柱位  │  年柱  │  月柱  │  日柱  │  时柱  │\n`;
    text += `├───────┼────────┼────────┼────────┼────────┤\n`;
    text += `│ 天干  │   ${bazi.yearPillar.gan}    │   ${bazi.monthPillar.gan}    │   ${bazi.dayPillar.gan}    │   ${bazi.hourPillar.gan}    │\n`;
    text += `│ 地支  │   ${bazi.yearPillar.zhi}    │   ${bazi.monthPillar.zhi}    │   ${bazi.dayPillar.zhi}    │   ${bazi.hourPillar.zhi}    │\n`;
    text += `│ 藏干  │${bazi.cangGan.year.join('')}│${bazi.cangGan.month.join('')}│${bazi.cangGan.day.join('')}│${bazi.cangGan.hour.join('')}│\n`;
    text += `│ 纳音  │${bazi.nayin.year}│${bazi.nayin.month}│${bazi.nayin.day}│${bazi.nayin.hour}│\n`;
    text += `│ 十神  │${bazi.shiShen.year}│${bazi.shiShen.month}│ ${bazi.shiShen.day}│${bazi.shiShen.hour}│\n`;
    text += `│ 长生  │${bazi.changSheng.year}│${bazi.changSheng.month}│${bazi.changSheng.day}│${bazi.changSheng.hour}│\n`;
    text += `└───────┴────────┴────────┴────────┴────────┘\n`;
    
    // 三垣
    text += '\n【三垣】\n';
    text += `胎元：${bazi.sanYuan.taiYuan.ganZhi}  命宫：${bazi.sanYuan.mingGong.ganZhi}  身宫：${bazi.sanYuan.shenGong.ganZhi}\n`;
    text += `起运：${bazi.qiYunAge.qiYunAge}岁起运\n`;
    
    return text;
  }

  /**
   * 日主分析 - 结合滴天髓
   */
  generateDayMasterAnalysis(bazi) {
    const riGan = bazi.riGan;
    const riWuxing = bazi.riWuxing;
    const str = this.engine.judgeDayMasterStrength(bazi);
    
    let text = '\n═══════════════ 【日主分析·滴天髓】 ═══════════════\n\n';
    
    // 滴天髓十天干论述
    const diTianSui = {
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
    
    text += `【${riGan}日主赋】\n`;
    text += diTianSui[riGan] + '\n\n';
    
    // 日主强弱分析
    text += `【日主强弱】${str}\n`;
    
    if (str.includes('旺')) {
      text += '日主旺相，精力充沛，独立自主性强。身旺能任财官，但需防刚愎自用。\n';
      text += '喜克泄耗（官杀、食伤、财星），忌生扶（印星、比劫）。\n';
    } else if (str.includes('弱')) {
      text += '日主偏弱，性格柔顺，善于借助外力。身弱需印比扶持，喜得贵人相助。\n';
      text += '喜生扶（印星、比劫），忌克泄耗（官杀、食伤、财星）。\n';
    } else {
      text += '日主中和，性格平和圆融，适应力强，能屈能伸。\n';
      text += '五行平衡者，一生安稳，但大运流年会影响强弱走向。\n';
    }
    
    // 日柱地支分析
    const riZhi = bazi.dayPillar.zhi;
    if (RI_ZHI_FENXI[riZhi]) {
      text += '\n【日柱配偶宫】\n';
      text += RI_ZHI_FENXI[riZhi] + '\n';
    }
    
    return text;
  }

  /**
   * 五行分析
   */
  generateWuxingAnalysis(bazi) {
    const wc = bazi.wuxingCount;
    const riWuxing = bazi.riWuxing;
    
    let text = '\n═══════════════ 【五行分析】 ═══════════════\n\n';
    
    const wuxingNames = ['金', '木', '水', '火', '土'];
    const wuxingDesc = {
      '金': '主义，性刚烈，代表决断力和执行力',
      '木': '主仁，性温和，代表生长力和创造力',
      '水': '主智，性聪慧，代表智慧和变通力',
      '火': '主礼，性急躁，代表热情和行动力',
      '土': '主信，性厚重，代表诚信和包容力'
    };
    
    text += '五行分布：\n';
    wuxingNames.forEach(wx => {
      const val = Math.round(wc[wx] * 10) / 10;
      const bar = '█'.repeat(Math.round(val * 2));
      text += `  ${wx}：${bar} ${val}\n`;
    });
    
    // 五行缺失分析
    wuxingNames.forEach(wx => {
      if (wc[wx] < 0.5) {
        text += `\n⚠ ${wx}弱：${wuxingDesc[wx]}。${wx === riWuxing ? '日主五行弱，需印比帮扶。' : `命局缺${wx}，需大运流年补充。`}\n`;
      }
    });
    
    // 五行过旺分析
    wuxingNames.forEach(wx => {
      if (wc[wx] > 5) {
        text += `\n⚠ ${wx}过旺：${wuxingDesc[wx]}。五行偏枯，需注意对应方面的失衡。\n`;
      }
    });
    
    return text;
  }

  /**
   * 纳音分析
   */
  generateNayinAnalysis(bazi) {
    let text = '\n═══════════════ 【纳音分析】 ═══════════════\n\n';
    
    const nianNayin = bazi.nayin.year;
    const yueNayin = bazi.nayin.month;
    const riNayin = bazi.nayin.day;
    const shiNayin = bazi.nayin.hour;
    
    text += `年柱纳音：${nianNayin} - ${NAYIN_FENXI[nianNayin] || ''}\n\n`;
    text += `月柱纳音：${yueNayin} - ${NAYIN_FENXI[yueNayin] || ''}\n\n`;
    text += `日柱纳音：${riNayin} - ${NAYIN_FENXI[riNayin] || ''}\n\n`;
    text += `时柱纳音：${shiNayin} - ${NAYIN_FENXI[shiNayin] || ''}\n`;
    
    return text;
  }

  /**
   * 十神分析
   */
  generateShiShenAnalysis(bazi) {
    let text = '\n═══════════════ 【十神分析·子平】 ═══════════════\n\n';
    
    const riGan = bazi.riGan;
    const shiShenCount = {};
    ['year', 'month', 'day', 'hour'].forEach(pillar => {
      const ss = bazi.shiShen[pillar];
      shiShenCount[ss] = (shiShenCount[ss] || 0) + 1;
    });
    
    text += '十神分布：\n';
    SHI_SHEN.forEach(ss => {
      const count = shiShenCount[ss] || 0;
      text += `  ${ss}：${count}个\n`;
    });
    
    const shiShenAnalysis = {
      '比肩': '比肩多者，自我意识强，独立自主，但易与人竞争，朋友多而助力少。',
      '劫财': '劫财多者，为人讲义气，但易破财，不宜合作投资，需防朋友拖累。',
      '食神': '食神多者，聪明温厚，有口福，善于享受生活，有艺术天赋。',
      '伤官': '伤官多者，才华横溢，但锋芒毕露，易得罪人，女命需防婚姻不顺。',
      '偏财': '偏财多者，慷慨大方，善于抓住商机，有投机运，但不善守财。',
      '正财': '正财多者，勤劳务实，重视积蓄，对家庭负责，但过于节俭。',
      '偏官': '偏官（七杀）多者，有魄力有权威，事业心强，但压力大，需有制化。',
      '正官': '正官多者，遵纪守法，重视名誉，适合公职，但过于保守。',
      '偏印': '偏印多者，有特殊才能，思维独特，但孤僻寡合，与六亲缘薄。',
      '正印': '正印多者，仁慈善良，有学识，得长辈贵人相助，但依赖性强。'
    };
    
    text += '\n十神解读：\n';
    Object.entries(shiShenCount).forEach(([ss, count]) => {
      if (count >= 2 && shiShenAnalysis[ss]) {
        text += `  · ${ss}(${count}个)：${shiShenAnalysis[ss]}\n`;
      }
    });
    
    return text;
  }

  /**
   * 神煞分析
   */
  generateShenShaAnalysis(bazi) {
    let text = '\n═══════════════ 【神煞分析】 ═══════════════\n\n';
    
    const shenSha = bazi.shenSha;
    
    if (shenSha.ji.length > 0) {
      text += '【吉神】\n';
      shenSha.ji.forEach(s => { text += `  ☆ ${s}\n`; });
    }
    
    if (shenSha.xiong.length > 0) {
      text += '\n【凶煞】\n';
      shenSha.xiong.forEach(s => { text += `  ★ ${s}\n`; });
    }
    
    if (shenSha.other.length > 0) {
      text += '\n【其他】\n';
      shenSha.other.forEach(s => { text += `  · ${s}\n`; });
    }
    
    if (shenSha.ji.length === 0 && shenSha.xiong.length === 0 && shenSha.other.length === 0) {
      text += '命局神煞不多，以五行生克为主断之。\n';
    }
    
    // 神煞综合解读
    text += '\n【神煞综论】\n';
    if (shenSha.ji.some(s => s.includes('天乙贵人'))) {
      text += '命带天乙贵人，一生逢凶化吉，遇难成祥，贵人运佳。\n';
    }
    if (shenSha.ji.some(s => s.includes('文昌星'))) {
      text += '命带文昌，聪明好学，适合从事文化、教育、学术相关工作。\n';
    }
    if (shenSha.ji.some(s => s.includes('魁罡'))) {
      text += '命带魁罡，性格刚强，有领导才能，适合军警、管理岗位。\n';
    }
    if (shenSha.xiong.some(s => s.includes('孤辰') || s.includes('寡宿'))) {
      text += '命带孤辰寡宿，性格内向孤僻，不喜热闹，婚姻宜迟。\n';
    }
    if (shenSha.xiong.some(s => s.includes('十恶大败'))) {
      text += '日坐十恶大败，钱财易散，不宜投机，需谨慎理财。\n';
    }
    if (shenSha.other.some(s => s.includes('桃花'))) {
      text += '命带桃花，异性缘佳，但需防情缘纷扰，影响事业。\n';
    }
    
    return text;
  }

  /**
   * 大运分析
   */
  generateDaYunAnalysis(bazi) {
    let text = '\n═══════════════ 【大运分析·千里命稿】 ═══════════════\n\n';
    
    const qiYun = bazi.qiYunAge.qiYunAge;
    text += `起运年龄：${qiYun}岁\n\n`;
    text += '大运排盘：\n';
    
    bazi.daYun.forEach((yun, idx) => {
      const startAge = qiYun + idx * 10;
      const endAge = startAge + 9;
      yun.startAge = startAge;
      text += `  ${idx + 1}. ${startAge}-${endAge}岁  ${yun.ganZhi}（${yun.nayin}）\n`;
    });
    
    // 简单的大运吉凶判断
    const str = this.engine.judgeDayMasterStrength(bazi);
    const riWuxing = bazi.riWuxing;
    
    text += '\n【大运简析】\n';
    bazi.daYun.forEach((yun, idx) => {
      const yunWuxing = GAN_WUXING[yun.gan];
      let jiXiong = '平';
      
      if (str.includes('旺')) {
        if (yunWuxing === riWuxing || this.isYinXing(riWuxing, yunWuxing)) jiXiong = '忌';
        else jiXiong = '喜';
      } else if (str.includes('弱')) {
        if (yunWuxing === riWuxing || this.isYinXing(riWuxing, yunWuxing)) jiXiong = '喜';
        else jiXiong = '忌';
      }
      
      const startAge = qiYun + idx * 10;
      const endAge = startAge + 9;
      if (idx < 5) { // 只显示前5步大运的简析
        text += `  ${startAge}-${endAge}岁 ${yun.ganZhi}：${jiXiong === '喜' ? '喜运，顺遂' : jiXiong === '忌' ? '忌运，多阻' : '平运'}\n`;
      }
    });
    
    return text;
  }

  /**
   * 判断是否为印星（生我者）
   */
  isYinXing(riWuxing, otherWuxing) {
    const shengCycle = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
    return shengCycle[otherWuxing] === riWuxing;
  }

  /**
   * 婚姻分析
   */
  generateMarriageAnalysis(bazi) {
    let text = '\n═══════════════ 【婚姻分析·盲派】 ═══════════════\n\n';
    
    const riZhi = bazi.dayPillar.zhi;
    const riGan = bazi.riGan;
    const isMale = bazi.isMale;
    
    // 配偶星
    let peiOuXing;
    if (isMale) {
      peiOuXing = GAN_YINYANG[riGan] === 1 ? '正财' : '偏财';
    } else {
      peiOuXing = GAN_YINYANG[riGan] === 1 ? '正官' : '偏官';
    }
    
    text += `配偶星：${peiOuXing}\n`;
    text += `配偶宫：${riZhi}（${ZHI_WUXING[riZhi]}）\n\n`;
    
    // 盲派婚姻歌诀应用
    const shenSha = bazi.shenSha;
    const yueZhi = bazi.monthPillar.zhi;
    
    // 桃花判断
    if (shenSha.other.some(s => s.includes('桃花'))) {
      text += '【桃花入命】\n';
      text += '命带桃花，异性缘佳，感情生活丰富。但桃花过多，需防婚外情缘，影响婚姻稳定。\n';
      text += '盲派云："桃花一生多艳遇，是非林里反为家。"\n\n';
    }
    
    // 孤鸾煞
    if (shenSha.xiong.some(s => s.includes('孤鸾'))) {
      text += '【孤鸾煞】\n';
      text += '命犯孤鸾煞，婚恋多有波折。《三命通会》云："孤鸾犯日本无儿，一见官星得子奇。"\n';
      text += '建议晚婚，婚后需相互包容，方可白首偕老。\n\n';
    }
    
    // 阴阳差错
    if (shenSha.other.some(s => s.includes('阴阳差错'))) {
      text += '【阴阳差错日】\n';
      text += '阴阳差错日生人，婚姻易有波折，夫妻沟通需多用心。\n';
      text += '"阴阳差错不风流，花烛迎郎不自由。"\n\n';
    }
    
    // 日坐比劫
    const riZhiCangGan = ZHI_CANG_GAN[riZhi] || [];
    if (riZhiCangGan.some(g => SHI_SHEN_MAP[riGan][g] === '比肩' || SHI_SHEN_MAP[riGan][g] === '劫财')) {
      text += '【日坐比劫】\n';
      text += '日坐比劫，配偶性格独立刚强，夫妻易有争执，需相互忍让。\n\n';
    }
    
    // 综合建议
    text += '【婚姻综论】\n';
    text += `日主${riGan}，${isMale ? '男' : '女'}命，日坐${riZhi}。\n`;
    text += '婚姻需顺其自然，不可强求。择偶以性格相合为先，门当户对为次。\n';
    
    return text;
  }

  /**
   * 事业分析
   */
  generateCareerAnalysis(bazi) {
    let text = '\n═══════════════ 【事业分析】 ═══════════════\n\n';
    
    const shiShen = bazi.shiShen;
    const riWuxing = bazi.riWuxing;
    const riGan = bazi.riGan;
    
    text += '【适合行业】\n';
    
    // 根据五行推荐行业
    const wuxingCareers = {
      '金': '金融、法律、军警、机械、五金、汽车、牙医',
      '木': '教育、文化、出版、园艺、医药、纺织、设计',
      '水': '贸易、物流、航运、旅游、传媒、演艺、渔业',
      '火': '能源、餐饮、美容、化工、电子、互联网、娱乐',
      '土': '房地产、建筑、农业、矿产、仓储、陶瓷、中介'
    };
    
    text += `日主五行属${riWuxing}，适合行业：${wuxingCareers[riWuxing]}\n\n`;
    
    // 根据十神组合分析
    text += '【命局特点】\n';
    
    if (shiShen.year === '偏官' || shiShen.month === '偏官') {
      text += '年/月带七杀，有魄力有担当，适合创业、军警、管理岗位。\n';
    }
    if (shiShen.day === '偏官') {
      text += '日坐七杀，压力与机遇并存，需在压力中成长。\n';
    }
    if (shiShen.year === '正官' || shiShen.month === '正官') {
      text += '年/月带正官，适合公务员、事业单位、大企业等规范环境。\n';
    }
    if (shiShen.year === '食神' || shiShen.month === '食神') {
      text += '带食神星，有艺术天赋，适合创作、设计、美食等行业。\n';
    }
    if (shiShen.year === '伤官' || shiShen.month === '伤官') {
      text += '带伤官星，才华出众，适合技术、研发、自由职业。\n';
    }
    if (shiShen.year === '偏财' || shiShen.month === '偏财') {
      text += '带偏财星，有商业头脑，适合经商、投资、贸易。\n';
    }
    if (shiShen.year === '正财' || shiShen.month === '正财') {
      text += '带正财星，踏实肯干，适合稳定工作，收入稳定增长。\n';
    }
    if (shiShen.year === '正印' || shiShen.month === '正印') {
      text += '带正印星，好学上进，适合学术、教育、研究领域。\n';
    }
    if (shiShen.year === '偏印' || shiShen.month === '偏印') {
      text += '带偏印星，思维独特，适合技术研发、玄学、特殊技能领域。\n';
    }
    
    text += '\n【事业建议】\n';
    text += '事业发展需结合大运走势。青少年时期以学习积累为主，中年时期以发展为重，晚年宜守成。\n';
    
    return text;
  }

  /**
   * 健康分析
   */
  generateHealthAnalysis(bazi) {
    let text = '\n═══════════════ 【健康分析】 ═══════════════\n\n';
    
    const wc = bazi.wuxingCount;
    
    // 五行对应身体部位
    const wuxingHealth = {
      '金': '肺、气管、呼吸道、皮肤、牙齿、骨骼',
      '木': '肝胆、四肢、筋骨、神经系统',
      '水': '肾脏、泌尿系统、耳朵、生殖系统',
      '火': '心脏、血液、眼睛、小肠、循环系统',
      '土': '脾胃、消化系统、肌肉、皮肤'
    };
    
    text += '【五行健康提示】\n';
    ['金', '木', '水', '火', '土'].forEach(wx => {
      if (wc[wx] < 0.5) {
        text += `⚠ ${wx}弱：需注意${wuxingHealth[wx]}。\n`;
      }
      if (wc[wx] > 5) {
        text += `⚠ ${wx}过旺：${wuxingHealth[wx]}易出问题。\n`;
      }
    });
    
    text += '\n【盲派健康诀】\n';
    text += '"三垣之间有穿绝，身体不佳又多病。"\n';
    text += '"三者之间有相冲，一生奔波要走动。"\n';
    
    return text;
  }

  /**
   * 命宫分析
   */
  generateMingGongAnalysis(bazi) {
    let text = '\n═══════════════ 【命宫分析·盲派】 ═══════════════\n\n';
    
    const mingZhi = bazi.sanYuan.mingGong.zhi;
    if (MING_GONG_JU[mingZhi]) {
      text += `命宫在${mingZhi}：\n`;
      text += MING_GONG_JU[mingZhi] + '\n';
    }
    
    return text;
  }
}

// 导出分析引擎实例
const baziAnalysis = new BaziAnalysisEngine();

console.log('Bazi Analysis Engine loaded successfully.');
