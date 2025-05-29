  function rollDice(n) {
    if (n <= 0 || !Number.isInteger(n)) {
      throw new Error("A dobások száma pozitív egész legyen.");
    }

    const vals = [];
    for (let i = 0; i < n; i++) {
      vals.push(Math.floor(Math.random() * 6) + 1);
    }

    const sum = vals.reduce((a, b) => a + b, 0);
    const avg = sum / vals.length;

    const counts = {};
    vals.forEach(v => counts[v] = (counts[v] || 0) + 1);
    const maxCount = Math.max(...Object.values(counts));
    const modes = Object.keys(counts)
      .filter(key => counts[key] === maxCount)
      .map(Number);

    const sorted = [...vals].sort((a, b) => a - b);
    let median;
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    return {
      rolls: vals,
      average: avg,
      modes: modes,
      median: median
    };
  }

  const rollBtn = document.getElementById("rollBtn");
  const rollCountInput = document.getElementById("rollCount");
  const resultsEl = document.getElementById("results");
  const errorMsg = document.getElementById("errorMsg");

  rollBtn.addEventListener("click", () => {
    errorMsg.textContent = "";
    resultsEl.textContent = "";

    const n = Number(rollCountInput.value);

    try {
      const result = rollDice(n);
      resultsEl.textContent += `Dobott számok: ${result.rolls.join(", ")}\n`;
      resultsEl.textContent += `Átlag: ${result.average.toFixed(2)}\n`;
      resultsEl.textContent += `Módusz(ok): ${result.modes.join(", ")}\n`;
      resultsEl.textContent += `Medián: ${result.median}\n`;
    } catch (e) {
      errorMsg.textContent = e.message;
    }
  });