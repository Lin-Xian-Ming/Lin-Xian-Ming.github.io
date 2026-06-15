/**
 * 八字命盘核心计算引擎
 * 整合滴天髓、子平、盲派算法
 */

class BaziEngine {
  constructor() {
    this.dayGanZhiCache = null;
  }

  calculate(year, month, day, hour, minute, isMale) {
    let adjustedDate = new Date(year, month - 1, day, hour, minute);
    let dayPillarDate = new Date(year, month - 1, day);
    if (hour >= 23) {
      dayPillarDate = new Date(year, month - 1, day + 1);
    }
    let adjustedYear = adjustedDate.getFullYear();
    let adjustedMonth = adjustedDate.getMonth() + 1;
    let adjustedDay = adjustedDate.getDate();
    let adjustedHour = adjustedDate.getHours();

    const yearPillar = this.calcYearPillar(adjustedYear, adjustedMonth, adjustedDay);
    const monthPillar = this.calcMonthPillar(adjustedYear, adjustedMonth, adjustedDay);
    const dayPillar = this.calcDayPillar(dayPillarDate.getFullYear(), dayPillarDate.getMonth() + 1, dayPillarDate.getDate());
    const hourPillar = this.calcHourPillar(dayPillar.gan, adjustedHour);

    const riGan = dayPillar.gan;

    const cangGan = {
      year: ZHI_CANG_GAN[yearPillar.zhi],
      month: ZHI_CANG_GAN[monthPillar.zhi],
      day: ZHI_CANG_GAN[dayPillar.zhi],
      hour: ZHI_CANG_GAN[hourPillar.zhi]
    };

    const nayin = {
      year: this.getNayin(yearPillar.ganZhi),
      month: this.getNayin(monthPillar.ganZhi),
      day: this.getNayin(dayPillar.ganZhi),
      hour: this.getNayin(hourPillar.ganZhi)
    };

    const shiShen = {
      year: SHI_SHEN_MAP[riGan][yearPillar.gan],
      month: SHI_SHEN_MAP[riGan][monthPillar.gan],
      day: SHI_SHEN_MAP[riGan][dayPillar.gan],
      hour: SHI_SHEN_MAP[riGan][hourPillar.gan]
    };

    const changSheng = {
      year: this.getChangSheng(riGan, yearPillar.zhi),
      month: this.getChangSheng(riGan, monthPillar.zhi),
      day: this.getChangSheng(riGan, dayPillar.zhi),
      hour: this.getChangSheng(riGan, hourPillar.zhi)
    };

    const kongWang = this.calcKongWang(dayPillar.ganZhi);
    const shenSha = this.calcShenSha(riGan, yearPillar, monthPillar, dayPillar, hourPillar, adjustedYear);
    const daYun = this.calcDaYun(year, month, day, monthPillar, adjustedYear, adjustedMonth, adjustedDay, isMale);
    const sanYuan = this.calcSanYuan(monthPillar, hourPillar);
    const qiYunAge = this.calcQiYun(year, month, day, monthPillar, adjustedYear, adjustedMonth, adjustedDay, isMale);

    const shengXiao = SHENG_XIAO[DI_ZHI.indexOf(yearPillar.zhi)];
    const riWuxing = GAN_WUXING[riGan];
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

  calcYearPillar(year, month, day) {
    let effectiveYear = year;
    if (month < 2 || (month === 2 && day < 4)) {
      effectiveYear = year - 1;
    }
    const ganIdx = ((effectiveYear - 4) % 10 + 10) % 10;
    const zhiIdx = ((effectiveYear - 4) % 12 + 12) % 12;
    return { gan: TIAN_GAN[ganIdx], zhi: DI_ZHI[zhiIdx], ganZhi: TIAN_GAN[ganIdx] + DI_ZHI[zhiIdx] };
  }

  calcMonthPillar(year, month, day) {
    const jieQiDayMap = { 2: 4, 3: 6, 4: 5, 5: 6, 6: 6, 7: 7, 8: 8, 9: 8, 10: 8, 11: 8, 12: 7, 1: 6 };
    let yueZhiIdx;
    if (month === 1) {
      yueZhiIdx = (day >= 6) ? 11 : 10;
    } else {
      const jqDay = jieQiDayMap[month] || 6;
      yueZhiIdx = (day >= jqDay) ? (month - 2) : (month - 3);
    }
    if (yueZhiIdx < 0) yueZhiIdx += 12;
    const zhi = YUE_ZHI[yueZhiIdx];
    const yearPillar = this.calcYearPillar(year, month, day);
    const gan = YUE_GAN_MAP[yearPillar.gan][yueZhiIdx];
    return { gan, zhi, ganZhi: gan + zhi };
  }

  calcDayPillar(year, month, day) {
    // 2000/1/1 = 戊午 (index 54) - verified reference point
    const baseDate = Date.UTC(2000, 0, 1);
    const targetDate = Date.UTC(year, month - 1, day);
    let daysDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    const baseIdx = 54;
    let idx = ((baseIdx + daysDiff) % 60 + 60) % 60;
    return { gan: TIAN_GAN[idx % 10], zhi: DI_ZHI[idx % 12], ganZhi: TIAN_GAN[idx % 10] + DI_ZHI[idx % 12] };
  }

  calcHourPillar(riGan, hour) {
    let shiZhiIdx;
    if (hour === 23 || hour === 0) shiZhiIdx = 0;
    else shiZhiIdx = Math.floor((hour + 1) / 2);
    const zhi = SHI_ZHI[shiZhiIdx];
    const gan = SHI_GAN_MAP[riGan][shiZhiIdx];
    return { gan, zhi, ganZhi: gan + zhi };
  }

  getNayin(ganZhi) {
    return NAYIN_MAP[ganZhi] || '';
  }

  getChangSheng(gan, zhi) {
    const changShengZhis = CHANG_SHENG_TABLE[gan];
    if (!changShengZhis) return '';
    const idx = changShengZhis.indexOf(zhi);
    return idx === -1 ? '' : CHANG_SHENG_NAMES[idx];
  }

  calcKongWang(riGanZhi) {
    let riIdx = -1;
    for (let i = 0; i < LIUSHI_JIAZI.length; i++) {
      if (LIUSHI_JIAZI[i].ganZhi === riGanZhi) { riIdx = i; break; }
    }
    if (riIdx === -1) return ['', ''];
    const xunStart = Math.floor(riIdx / 10) * 10;
    const usedZhis = [];
    for (let i = xunStart; i < xunStart + 10; i++) {
      usedZhis.push(LIUSHI_JIAZI[i].ganZhi[1]);
    }
    const kongWangZhis = [];
    const startZhiIdx = DI_ZHI.indexOf(usedZhis[9]);
    for (let i = 1; i <= 12; i++) {
      const zhi = DI_ZHI[(startZhiIdx + i) % 12];
      if (!usedZhis.includes(zhi) && kongWangZhis.length < 2) {
        kongWangZhis.push(zhi);
      }
    }
    return kongWangZhis;
  }

  calcShenSha(riGan, yearPillar, monthPillar, dayPillar, hourPillar, year) {
    const result = { ji: [], xiong: [], other: [] };
    const riZhi = dayPillar.zhi;
    const nianZhi = yearPillar.zhi;
    const yueZhi = monthPillar.zhi;
    const allZhis = [nianZhi, yueZhi, riZhi, hourPillar.zhi];
    const zhuNames = ['年柱', '月柱', '日柱', '时柱'];
    const riGanZhi = dayPillar.ganZhi;

    // 天乙贵人
    const tianYi = TIAN_YI_GUI_REN[riGan] || '';
    const tianYiZhis = [tianYi[0], tianYi[1] || ''];
    allZhis.forEach((zhi, idx) => {
      if (tianYiZhis.includes(zhi)) result.ji.push(zhuNames[idx] + '天乙贵人');
    });

    // 文昌星
    const wenChangZhi = WEN_CHANG[riGan];
    allZhis.forEach((zhi, idx) => {
      if (zhi === wenChangZhi) result.ji.push(zhuNames[idx] + '文昌星');
    });

    // 禄神
    const luZhi = LU_SHEN[riGan];
    allZhis.forEach((zhi, idx) => {
      if (zhi === luZhi) result.ji.push(zhuNames[idx] + '禄神');
    });

    // 羊刃
    const yangRenZhi = YANG_REN[riGan];
    allZhis.forEach((zhi, idx) => {
      if (zhi === yangRenZhi) result.xiong.push(zhuNames[idx] + '羊刃');
    });

    // 驿马
    const findSanHeKey = (zhi) => {
      if ('寅午戌'.indexOf(zhi) >= 0) return '寅午戌';
      if ('申子辰'.indexOf(zhi) >= 0) return '申子辰';
      if ('巳酉丑'.indexOf(zhi) >= 0) return '巳酉丑';
      if ('亥卯未'.indexOf(zhi) >= 0) return '亥卯未';
      return '';
    };
    const yiMaZhi = YI_MA[findSanHeKey(riZhi)] || YI_MA[findSanHeKey(nianZhi)];
    allZhis.forEach((zhi, idx) => {
      if (zhi === yiMaZhi) result.ji.push(zhuNames[idx] + '驿马星');
    });

    // 桃花
    const taoHuaZhi = TAO_HUA[findSanHeKey(riZhi)] || TAO_HUA[findSanHeKey(nianZhi)];
    allZhis.forEach((zhi, idx) => {
      if (zhi === taoHuaZhi) result.other.push(zhuNames[idx] + '桃花');
    });

    // 华盖
    const huaGaiZhi = HUA_GAI[findSanHeKey(riZhi)] || HUA_GAI[findSanHeKey(nianZhi)];
    allZhis.forEach((zhi, idx) => {
      if (zhi === huaGaiZhi) result.ji.push(zhuNames[idx] + '华盖星');
    });

    // 将星
    const jiangXingZhi = JIANG_XING[findSanHeKey(riZhi)] || JIANG_XING[findSanHeKey(nianZhi)];
    allZhis.forEach((zhi, idx) => {
      if (zhi === jiangXingZhi) result.ji.push(zhuNames[idx] + '将星');
    });

    // 孤辰寡宿
    const findGuGuaKey = (zhi) => {
      if ('亥子丑'.indexOf(zhi) >= 0) return '亥子丑';
      if ('寅卯辰'.indexOf(zhi) >= 0) return '寅卯辰';
      if ('巳午未'.indexOf(zhi) >= 0) return '巳午未';
      if ('申酉戌'.indexOf(zhi) >= 0) return '申酉戌';
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

    // 天赦日
    if (TIAN_SHE.includes(riGanZhi)) result.ji.push('天赦日');

    return result;
  }

  calcDaYun(birthYear, birthMonth, birthDay, monthPillar, adjustedYear, adjustedMonth, adjustedDay, isMale) {
    const yearGan = TIAN_GAN[((adjustedYear - 4) % 10 + 10) % 10];
    const isYangYear = GAN_YINYANG[yearGan] === 1;
    const isShunPai = (isYangYear && isMale) || (!isYangYear && !isMale);
    const yueZhiIdx = DI_ZHI.indexOf(monthPillar.zhi);
    const yueGanIdx = TIAN_GAN.indexOf(monthPillar.gan);
    const daYunList = [];
    for (let i = 1; i <= 10; i++) {
      let newGanIdx, newZhiIdx;
      if (isShunPai) {
        newGanIdx = (yueGanIdx + i) % 10;
        newZhiIdx = (yueZhiIdx + i) % 12;
      } else {
        newGanIdx = ((yueGanIdx - i) % 10 + 10) % 10;
        newZhiIdx = ((yueZhiIdx - i) % 12 + 12) % 12;
      }
      const gan = TIAN_GAN[newGanIdx];
      const zhi = DI_ZHI[newZhiIdx];
      daYunList.push({
        ganZhi: gan + zhi,
        gan, zhi,
        startAge: 0,
        nayin: this.getNayin(gan + zhi)
      });
    }
    return daYunList;
  }

  calcQiYun(birthYear, birthMonth, birthDay, monthPillar, adjustedYear, adjustedMonth, adjustedDay, isMale) {
    const yearGan = TIAN_GAN[((adjustedYear - 4) % 10 + 10) % 10];
    const isYangYear = GAN_YINYANG[yearGan] === 1;
    const isShun = (isYangYear && isMale) || (!isYangYear && !isMale);
    const jieQiDayMap = { 2: 4, 3: 6, 4: 5, 5: 6, 6: 6, 7: 7, 8: 8, 9: 8, 10: 8, 11: 8, 12: 7, 1: 6 };
    const birthDate = new Date(Date.UTC(adjustedYear, adjustedMonth - 1, adjustedDay));
    let targetDate, targetYear = adjustedYear;
    if (isShun) {
      // 顺排：找出生后最近的下一个节气（可能是本月也可能是下月）
      var tm = adjustedMonth, td = jieQiDayMap[tm] || 6;
      targetDate = new Date(Date.UTC(targetYear, tm-1, td));
      if (targetDate <= birthDate) {
        tm = adjustedMonth + 1; if (tm > 12) { tm = 1; targetYear = adjustedYear + 1; }
        td = jieQiDayMap[tm] || 6;
        targetDate = new Date(Date.UTC(targetYear, tm-1, td));
      }
    } else {
      // 逆排：找出生前最近的上一个节气
      var tm2 = adjustedMonth, td2 = jieQiDayMap[tm2] || 6;
      targetDate = new Date(Date.UTC(adjustedYear, tm2 - 1, td2));
      if (targetDate >= birthDate) {
        tm2 = adjustedMonth - 1; if (tm2 < 1) { tm2 = 12; targetYear = adjustedYear - 1; }
        td2 = jieQiDayMap[tm2] || 6;
        targetDate = new Date(Date.UTC(targetYear, tm2 - 1, td2));
      }
    }
    // 精确天数（含小数）→ 精确起运年月日
    var preciseMs = Math.abs(targetDate - birthDate);
    var preciseDays = preciseMs / (1000 * 60 * 60 * 24);
    var qyYears = Math.floor(preciseDays / 3);
    var remainDays = preciseDays - qyYears * 3;
    var qyMonths = Math.floor(remainDays * 4);
    var remainAfterMonths = (remainDays * 4) - qyMonths;
    var qyDays = Math.floor(remainAfterMonths * 30 / 4);
    var remainAfterDays = (remainAfterMonths * 30 / 4) - qyDays;
    var qyHours = Math.floor(remainAfterDays * 24);
    if (qyMonths >= 12) { qyYears++; qyMonths -= 12; }
    var qyStr = qyYears > 0 ? qyYears + '岁' : '';
    if (qyMonths > 0) qyStr += qyMonths + '个月';
    if (qyDays > 0) qyStr += qyDays + '天';
    if (!qyStr) qyStr = '即将起运';
    return { qiYunAge: qyYears, years: qyYears, months: qyMonths, days: qyDays, hours: qyHours, qiYunStr: qyStr, isShunPai: isShun };
  }

  calcSanYuan(monthPillar, hourPillar) {
    const yueGanIdx = TIAN_GAN.indexOf(monthPillar.gan);
    const yueZhiIdx = YUE_ZHI.indexOf(monthPillar.zhi);
    const taiGan = TIAN_GAN[(yueGanIdx + 1) % 10];
    const taiZhi = YUE_ZHI[(yueZhiIdx + 3) % 12];
    const hourZhiIdx = SHI_ZHI.indexOf(hourPillar.zhi);
    const mingZhiIdx = (12 - yueZhiIdx + hourZhiIdx) % 12;
    const mingZhi = SHI_ZHI[mingZhiIdx];
    const mingGan = YUE_GAN_MAP[monthPillar.gan][mingZhiIdx];
    const shenZhiIdx = (yueZhiIdx - hourZhiIdx + 12) % 12;
    const shenZhi = SHI_ZHI[shenZhiIdx];
    const shenGan = YUE_GAN_MAP[monthPillar.gan][shenZhiIdx];
    return {
      taiYuan: { ganZhi: taiGan + taiZhi, gan: taiGan, zhi: taiZhi },
      mingGong: { ganZhi: mingGan + mingZhi, gan: mingGan, zhi: mingZhi },
      shenGong: { ganZhi: shenGan + shenZhi, gan: shenGan, zhi: shenZhi }
    };
  }

  countWuxing(yearPillar, monthPillar, dayPillar, hourPillar, cangGan) {
    const count = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
    [yearPillar.gan, monthPillar.gan, dayPillar.gan, hourPillar.gan].forEach(gan => {
      count[GAN_WUXING[gan]]++;
    });
    [yearPillar.zhi, monthPillar.zhi, dayPillar.zhi, hourPillar.zhi].forEach(zhi => {
      count[ZHI_WUXING[zhi]]++;
    });
    Object.values(cangGan).forEach(gans => {
      gans.forEach((gan, idx) => {
        count[GAN_WUXING[gan]] += (idx === 0 ? 0.5 : 0.25);
      });
    });
    return count;
  }

  judgeDayMasterStrength(bazi) {
    const riWuxing = bazi.riWuxing;
    const wc = bazi.wuxingCount;
    const yueZhi = bazi.monthPillar.zhi;
    const yueWuxing = ZHI_WUXING[yueZhi];
    const deYueLing = (riWuxing === yueWuxing);
    const tongLei = wc[riWuxing];
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

const baziEngine = new BaziEngine();
console.log('八字核心计算引擎就绪');
