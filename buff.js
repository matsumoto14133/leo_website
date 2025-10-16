
function sumByClass(className) {
    let total = 0;
    document.querySelectorAll(`.${className}`).forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    return total;
}

function plusOne(x) {
    x = (x+100)/100;
    return x;
}

function returnPercent(x) {
    x = (x-1)*100;
    return x;
}

function printResults(resultIds, results) {
    for (let i = 0; i < resultIds.length; i++) {
        const element = document.getElementById(resultIds[i]);
        const sign = resultIds === resultId.debuff.all ? '' : '+';
        if (element) {
            element.textContent = sign + results[i].toFixed(2) + '%';
        }
    }
}

const calculateBtn = document.getElementById('calculate-btn');
const resultId = {
  final: {
    in:    ["in-attack-result", "in-defense-result", "in-kill-result", "in-hp-result"],
    ca:    ["ca-attack-result", "ca-defense-result", "ca-kill-result", "ca-hp-result"],
    ar:    ["ar-attack-result", "ar-defense-result", "ar-kill-result", "ar-hp-result"]
  },
  sum: {
    in:    ["in-attack-sum-result", "in-defense-sum-result", "in-kill-sum-result", "in-hp-sum-result"],
    ca:    ["ca-attack-sum-result", "ca-defense-sum-result", "ca-kill-sum-result", "ca-hp-sum-result"],
    ar:    ["ar-attack-sum-result", "ar-defense-sum-result", "ar-kill-sum-result", "ar-hp-sum-result"],
    all:   ["all-attack-sum-result", "all-defense-sum-result", "all-kill-sum-result", "all-hp-sum-result"]
  },
  times: {
    all:   ["all-attack-times-result", "all-defense-times-result", "all-kill-times-result", "all-hp-times-result"]
  },
  debuff: {
    all:   ["all-attack-debuff-result", "all-defense-debuff-result", "all-kill-debuff-result", "all-hp-debuff-result"]
  }
};

calculateBtn.addEventListener('click', () => {
    // 加算バフの取得（クラスでまとめて加算）
    const caSumAttack = sumByClass('ca-sum-attack');
    const caSumDefense = sumByClass('ca-sum-defense');
    const caSumKill = sumByClass('ca-sum-kill');
    const caSumHp = sumByClass('ca-sum-hp');
    const inSumAttack = sumByClass('in-sum-attack');
    const inSumDefense = sumByClass('in-sum-defense');
    const inSumKill = sumByClass('in-sum-kill');
    const inSumHp = sumByClass('in-sum-hp');
    const arSumAttack = sumByClass('ar-sum-attack');
    const arSumDefense = sumByClass('ar-sum-defense');
    const arSumKill = sumByClass('ar-sum-kill');
    const arSumHp = sumByClass('ar-sum-hp');
    const allSumAttack = sumByClass('all-sum-attack');
    const allSumDefense = sumByClass('all-sum-defense');
    const allSumKill = sumByClass('all-sum-kill');
    const allSumHp = sumByClass('all-sum-hp');

    // 乗算バフの取得
    // ダイヤバフ
    const aBuff = parseFloat(document.querySelector('input[name="a-buff"]:checked').value) || 0.0;
    const dBuff = parseFloat(document.querySelector('input[name="d-buff"]:checked').value) || 0.0;
    const kBuff = parseFloat(document.querySelector('input[name="k-buff"]:checked').value) || 0.0;
    const hBuff = parseFloat(document.querySelector('input[name="h-buff"]:checked').value) || 0.0;
    // 役職、モードチェック
    const post = parseFloat(document.querySelector('input[name="post"]:checked').value) || 0.0;
    const mode = document.querySelector('input[name="mode"]:checked').value;

    // 専用スキルバフ、集結or防衛バフ
    let skillAttackBuff, skillDefenseBuff, skillKillBuff, skillHpBuff;
    let dABuff = 0.0;
    let dDBuff = 0.0;
    if (mode === 'S') {
        skillAttackBuff = parseFloat(document.getElementById('all-times-attack-s').value) || 0.0;
        skillDefenseBuff = parseFloat(document.getElementById('all-times-defense-s').value) || 0.0;
        skillKillBuff = parseFloat(document.getElementById('all-times-kill-s').value) || 0.0;
        skillHpBuff = parseFloat(document.getElementById('all-times-hp-s').value) || 0.0;
    } else if (mode === 'D') {
        skillAttackBuff = parseFloat(document.getElementById('all-times-attack-d').value) || 0.0;
        skillDefenseBuff = parseFloat(document.getElementById('all-times-defense-d').value) || 0.0;
        skillKillBuff = parseFloat(document.getElementById('all-times-kill-d').value) || 0.0;
        skillHpBuff = parseFloat(document.getElementById('all-times-hp-d').value) || 0.0;
        dABuff = 10.0;
        dDBuff = 10.0;
    } else if (mode === 'solo') {
        skillAttackBuff = 0.0;
        skillDefenseBuff = 0.0;
        skillKillBuff = 0.0;
        skillHpBuff = 0.0;
    }

    // 役職バフ
    let postAttackBuff = 0.0;
    let postKillBuff = 0.0;
    if (post === 8.0) {
        postAttackBuff = 8.0;
    } else if (post === 15.0) {
        postKillBuff = 15.0;
    }

    const allTimesAttack = returnPercent(plusOne(aBuff)*plusOne(skillAttackBuff)*plusOne(dABuff)*plusOne(postAttackBuff));
    const allTimesDefense = returnPercent(plusOne(dBuff)*plusOne(skillDefenseBuff)*plusOne(dDBuff));
    const allTimesKill = returnPercent(plusOne(kBuff)*plusOne(skillKillBuff)*plusOne(postKillBuff));
    const allTimesHp = returnPercent(plusOne(hBuff)*plusOne(skillHpBuff));

    // 敵側のデバフの取得
    const phDebuff = parseFloat(document.querySelector('input[name="ph-debuff"]:checked').value)*(-1) || 0.0;
    const pkDebuff = parseFloat(document.querySelector('input[name="pk-debuff"]:checked').value)*(-1) || 0.0;
    const aDebuff = parseFloat(document.querySelector('input[name="a-debuff"]:checked').value)*(-1) || 0.0;
    const dDebuff = parseFloat(document.querySelector('input[name="d-debuff"]:checked').value)*(-1) || 0.0;

    // 最終計算
    const resultInAttack = returnPercent(plusOne(inSumAttack + allSumAttack) * plusOne(allTimesAttack) * plusOne(aDebuff));
    const resultInDefense = returnPercent(plusOne(inSumDefense + allSumDefense) * plusOne(allTimesDefense) * plusOne(dDebuff));
    const resultInKill = returnPercent(plusOne(inSumKill + allSumKill) * plusOne(allTimesKill) * plusOne(pkDebuff));
    const resultInHp = returnPercent(plusOne(inSumHp + allSumHp) * plusOne(allTimesHp) * plusOne(phDebuff));

    const resultCaAttack = returnPercent(plusOne(caSumAttack + allSumAttack) * plusOne(allTimesAttack) * plusOne(aDebuff));
    const resultCaDefense = returnPercent(plusOne(caSumDefense + allSumDefense) * plusOne(allTimesDefense) * plusOne(dDebuff));
    const resultCaKill = returnPercent(plusOne(caSumKill + allSumKill) * plusOne(allTimesKill) * plusOne(pkDebuff));
    const resultCaHp = returnPercent(plusOne(caSumHp + allSumHp) * plusOne(allTimesHp) * plusOne(phDebuff));

    const resultArAttack = returnPercent(plusOne(arSumAttack + allSumAttack) * plusOne(allTimesAttack) * plusOne(aDebuff));
    const resultArDefense = returnPercent(plusOne(arSumDefense + allSumDefense) * plusOne(allTimesDefense) * plusOne(dDebuff));
    const resultArKill = returnPercent(plusOne(arSumKill + allSumKill) * plusOne(allTimesKill) * plusOne(pkDebuff));
    const resultArHp = returnPercent(plusOne(arSumHp + allSumHp) * plusOne(allTimesHp) * plusOne(phDebuff));

    // 結果の表示
    const finalResults = [
        [resultInAttack, resultInDefense, resultInKill, resultInHp],
        [resultCaAttack, resultCaDefense, resultCaKill, resultCaHp],
        [resultArAttack, resultArDefense, resultArKill, resultArHp]
    ];
    const sumResults = [
        [inSumAttack, inSumDefense, inSumKill, inSumHp],
        [caSumAttack, caSumDefense, caSumKill, caSumHp],
        [arSumAttack, arSumDefense, arSumKill, arSumHp],
        [allSumAttack, allSumDefense, allSumKill, allSumHp]
    ];
    const timesResults = [
        [allTimesAttack, allTimesDefense, allTimesKill, allTimesHp]
    ];
    const debuffResults = [
        [aDebuff, dDebuff, pkDebuff, phDebuff]
    ];

    printResults(resultId.final.in, finalResults[0]);
    printResults(resultId.final.ca, finalResults[1]);
    printResults(resultId.final.ar, finalResults[2]);
    printResults(resultId.sum.in, sumResults[0]);
    printResults(resultId.sum.ca, sumResults[1]);
    printResults(resultId.sum.ar, sumResults[2]);
    printResults(resultId.sum.all, sumResults[3]);
    printResults(resultId.times.all, timesResults[0]);
    printResults(resultId.debuff.all, debuffResults[0]);
});