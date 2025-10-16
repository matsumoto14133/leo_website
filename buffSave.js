const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');
const radios = document.querySelectorAll('.buff-radio');
const groups = new Set([...radios].map(r => r.dataset.group));

// 保存処理
saveBtn.addEventListener('click', () => {
    if (confirm('前のデータに上書きされます。\n本当に保存しますか？')) {
        const data = {};

        // --- 通常の数値入力（class指定） ---
        document.querySelectorAll('.buff-input').forEach(input => {
            data[input.dataset.key] = input.value;
        });

        // --- ラジオボタン ---
        groups.forEach(group => {
        const selected = document.querySelector(`.buff-radio[data-group="${group}"]:checked`);
        if (selected) {
            data[group] = selected.value;
        }
        });

        // --- localStorageに保存 ---
        localStorage.setItem('buffData', JSON.stringify(data));
        alert('データを保存しました！');
    }
});


// 読み込み処理
loadBtn.addEventListener('click', () => {
    const saved = JSON.parse(localStorage.getItem('buffData'));
    if (!saved) {
        alert('保存データがありません');
        return;
    }

    // --- 通常の数値入力 ---
    document.querySelectorAll('.buff-input').forEach(input => {
        const key = input.dataset.key;
        if (saved[key] !== undefined) {
            input.value = saved[key];
        }
    });

    // --- ラジオボタン ---
    groups.forEach(group => {
        if (saved[group]) {
            const radio = document.querySelector(`.buff-radio[data-group="${group}"][value="${saved[group]}"]`);
            if (radio) radio.checked = true;
        }
    });

    alert('保存データを読み込みました！');
});
