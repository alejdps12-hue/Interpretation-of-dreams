const dreamForm = document.querySelector("#dreamForm");
const dreamInput = document.querySelector("#dreamInput");
const dreamOutput = document.querySelector("#dreamOutput");
const sampleDreamButton = document.querySelector("#sampleDream");
const clearDreamButton = document.querySelector("#clearDream");
const historyList = document.querySelector("#historyList");
const clearHistoryButton = document.querySelector("#clearHistory");

const symbolMap = [
  { keywords: ["물", "바다", "파도", "비"], meaning: "감정의 파도가 출렁입니다. 최근의 감정이 정리되길 바라는 마음이 드러납니다." },
  { keywords: ["길", "도로", "교차로", "갈림길"], meaning: "선택의 순간이 다가옵니다. 한 방향을 택하면 다른 가능성을 놓친다는 긴장감이 있습니다." },
  { keywords: ["날다", "비행", "하늘"], meaning: "자유를 향한 욕구가 커지고 있습니다. 동시에 책임도 함께 떠올립니다." },
  { keywords: ["집", "방", "문"], meaning: "내면의 안전지대가 주제가 됩니다. 새로운 공간은 아직 탐색하지 않은 마음의 방입니다." },
  { keywords: ["불", "빛", "등대"], meaning: "방향을 잡고 싶은 욕구가 강합니다. 당신의 기준이 더 분명해지고 있습니다." },
  { keywords: ["숲", "나무", "길 잃다"], meaning: "불확실한 환경 속에서 길을 찾고 있습니다. 감각을 믿으라는 신호일 수 있습니다." },
];

const insightLines = [
  "꿈의 서사는 무의식이 현재의 균형을 조정하려는 방식입니다.",
  "상징이 선명할수록 마음속 핵심 주제가 간결하게 드러납니다.",
  "감정의 강도는 일상의 피로 혹은 갈망을 반영하는 경우가 많습니다.",
  "장소의 질감은 현실에서 느끼는 안정감의 수준을 비추기도 합니다.",
  "인물의 역할은 내면에서 자신이 맡고 있는 태도를 나타낼 수 있습니다.",
];

const integrationLines = [
  "해석은 정답이 아니라 자기 이해를 돕는 거울에 가깝습니다.",
  "하나의 상징에 여러 의미가 겹칠 수 있으며 그 겹침이 핵심입니다.",
  "불편한 장면일수록 현재의 중요한 감정이 숨어 있는 경우가 많습니다.",
  "꿈의 흐름은 현실에서 미뤄둔 결정을 비추는 경우가 있습니다.",
  "감정이 바뀌는 순간이 심리 전환의 중심이 됩니다.",
];

const closureLines = [
  "오늘의 해석은 감정의 정리를 돕는 임시 지도입니다.",
  "동일한 장면이 반복될수록 주제가 더 명료해집니다.",
  "해석을 짧게 요약할수록 핵심이 드러납니다.",
  "짧은 문장으로 정리해두면 다음 기록과 연결하기 쉽습니다.",
  "지금의 해석은 새로운 선택을 위한 방향 표시가 됩니다.",
];

const historyStorageKey = "dreamInterpretationHistory";
const maxHistoryItems = 12;

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char];
  });

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "기록됨" : date.toLocaleString("ko-KR");
};

const loadHistory = () => {
  try {
    const raw = localStorage.getItem(historyStorageKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("해석 기록 불러오기 실패:", error);
    return [];
  }
};

const saveHistory = (items) => {
  localStorage.setItem(historyStorageKey, JSON.stringify(items));
};

const renderHistory = (items) => {
  if (!historyList) {
    return;
  }
  if (!items.length) {
    historyList.innerHTML = `<p class="muted">아직 저장된 해석이 없습니다.</p>`;
    return;
  }
  historyList.innerHTML = items
    .map((item, index) => {
      const snippet = item.text.length > 64 ? `${item.text.slice(0, 64)}…` : item.text;
      return `
        <button class="history-item" type="button" data-index="${index}" data-text="${encodeURIComponent(item.text)}">
          <span class="history-snippet">${escapeHtml(snippet)}</span>
          <span class="history-meta">${formatTimestamp(item.createdAt)}</span>
        </button>
      `;
    })
    .join("");
};

const emotionMap = [
  { keywords: ["두려움", "무서", "불안", "떨림", "공포", "위협"], meaning: "불확실한 상황에 대한 경계심이 커져 있습니다." },
  { keywords: ["설렘", "기쁨", "행복", "웃음", "즐거움"], meaning: "기대감이 커지고 새로운 가능성에 마음이 열려 있습니다." },
  { keywords: ["분노", "화", "짜증", "폭발"], meaning: "억눌린 감정이 표면으로 올라오고 있습니다." },
  { keywords: ["슬픔", "눈물", "그리움", "허전"], meaning: "상실감이나 회복이 필요한 부분이 드러납니다." },
  { keywords: ["평온", "안정", "고요", "차분"], meaning: "내면의 중심이 잡히고 회복의 흐름이 이어집니다." },
];

const settingMap = [
  { keywords: ["바다", "호수", "강", "물"], meaning: "감정의 깊이를 비추는 배경입니다." },
  { keywords: ["숲", "산", "나무"], meaning: "본능과 직관이 강조됩니다." },
  { keywords: ["도시", "건물", "거리", "골목"], meaning: "사회적 역할과 관계가 주제입니다." },
  { keywords: ["집", "방", "문"], meaning: "안전지대와 내면의 경계가 나타납니다." },
  { keywords: ["학교", "시험", "수업"], meaning: "평가, 준비, 성장 과제가 떠오릅니다." },
];

const characterMap = [
  { keywords: ["가족", "엄마", "아빠", "부모", "형", "누나", "동생"], meaning: "가까운 관계의 기대나 부담이 투영됩니다." },
  { keywords: ["친구", "연인", "파트너"], meaning: "관계의 친밀함과 거리감이 동시에 드러납니다." },
  { keywords: ["모르는", "낯선", "陌生"], meaning: "익숙하지 않은 감정이나 새로운 면모를 상징합니다." },
];

const timeMap = [
  { keywords: ["밤", "어둠", "검은"], meaning: "무의식이 강하게 작동하는 시간대입니다." },
  { keywords: ["아침", "햇살", "빛"], meaning: "전환과 회복의 신호가 나타납니다." },
  { keywords: ["노을", "황혼", "저녁"], meaning: "마무리와 정리의 감각이 큽니다." },
];

const sampleDreams = [
  "어두운 골목을 걷다가 낯선 문을 열었더니 따뜻한 빛이 쏟아졌다.",
  "높은 산을 오르는데 갑자기 하늘로 떠올라 도시를 내려다보았다.",
  "바닷가에서 파도가 멈추고, 나는 고요한 수면 위에 서 있었다.",
  "촛불이 꺼지지 않는 방에서 낡은 거울이 나를 바라보았다.",
];

const pickMatches = (text, map) =>
  map.filter((item) => item.keywords.some((keyword) => text.includes(keyword)));

const pickOne = (list) => list[Math.floor(Math.random() * list.length)];

const buildInterpretation = (text) => {
  const trimmed = text.trim();
  const symbolHits = pickMatches(trimmed, symbolMap);
  const emotionHits = pickMatches(trimmed, emotionMap);
  const settingHits = pickMatches(trimmed, settingMap);
  const characterHits = pickMatches(trimmed, characterMap);
  const timeHits = pickMatches(trimmed, timeMap);

  if (!trimmed) {
    return `<p class="muted">꿈을 입력하면 해석을 만들 수 있어요.</p>`;
  }

  const sections = [];
  const detailChapters = [];
  const summaryChapters = [];
  const wordCount = trimmed.split(/\s+/).length;
  const intensity =
    wordCount >= 35 ? "이미지와 서사가 풍부합니다. 반복되는 장면을 중심으로 해석을 이어가세요." :
    wordCount >= 18 ? "핵심 장면이 보입니다. 감정의 전환 지점을 기록해 보세요." :
    "짧지만 선명한 인상이 있습니다. 가장 남는 장면을 한 문장으로 늘려 보세요.";

  if (symbolHits.length > 0) {
    const items = symbolHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>상징 해독</h4>
        <ul>${items}</ul>
      </div>
    `);
    detailChapters.push(`
      <div>
        <h4>상징의 심리</h4>
        <p>상징은 기억과 감정의 축약어입니다. 반복되는 기호는 현재 마음이 붙잡고 있는 질문을 드러냅니다.</p>
        <p class="muted">${pickOne(insightLines)}</p>
      </div>
    `);
  }

  if (emotionHits.length > 0) {
    const items = emotionHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>감정의 온도</h4>
        <ul>${items}</ul>
      </div>
    `);
    detailChapters.push(`
      <div>
        <h4>감정의 흐름</h4>
        <p>꿈 속 감정은 현실에서 표현되지 않은 감각의 여운일 수 있습니다. 꿈에서 감정이 바뀐 순간을 떠올리면 심리 전환의 실마리가 보입니다.</p>
        <p class="muted">${pickOne(integrationLines)}</p>
      </div>
    `);
  }

  if (settingHits.length > 0 || characterHits.length > 0 || timeHits.length > 0) {
    const contextItems = [
      ...settingHits.map((hit) => hit.meaning),
      ...characterHits.map((hit) => hit.meaning),
      ...timeHits.map((hit) => hit.meaning),
    ];
    if (contextItems.length > 0) {
      sections.push(`
        <div>
          <h4>배경의 메시지</h4>
          <ul>${contextItems.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      `);
    }
    detailChapters.push(`
      <div>
        <h4>관계와 무대</h4>
        <p>장소와 인물은 심리적 역할을 상징합니다. 낯선 사람은 새로운 자아, 익숙한 사람은 오래된 패턴일 가능성이 있습니다.</p>
        <p class="muted">${pickOne(insightLines)}</p>
      </div>
    `);
  }

  const themeSignals = [];
  if (symbolHits.length > 0) themeSignals.push("상징의 반복");
  if (emotionHits.length > 0) themeSignals.push("감정의 잔향");
  if (settingHits.length > 0) themeSignals.push("환경의 배경");
  if (characterHits.length > 0) themeSignals.push("관계의 구조");
  if (timeHits.length > 0) themeSignals.push("시간의 분위기");

  if (themeSignals.length > 0) {
    summaryChapters.push(`
      <div>
        <h4>심리 요약</h4>
        <p>이번 꿈은 ${themeSignals.join(" · ")}가 겹쳐 드러난 장면입니다. 여러 층의 신호가 동시에 나타난 만큼, 최근 마음의 집중도가 높아졌을 가능성이 있습니다.</p>
        <p class="muted">${pickOne(integrationLines)}</p>
      </div>
    `);
  }

  if (sections.length === 0) {
    return `
      <h4>몽문의 흐름</h4>
      <p>선명한 기호가 드러나지 않았습니다. 대신 분위기와 감정의 단서를 다시 떠올려 보세요.</p>
      <p class="muted">해석 포인트: 분위기와 감정의 단서를 중심으로 다시 정리해 보세요.</p>
      <p class="muted">${pickOne(closureLines)}</p>
    `;
  }

  return `
    ${sections.join("")}
    ${detailChapters.join("")}
    ${summaryChapters.join("")}
    <p class="muted">강도: ${intensity}</p>
    <p class="muted">해석 포인트: 꿈의 핵심 장면을 한 문장으로 요약해 보세요.</p>
    <p class="muted">${pickOne(closureLines)}</p>
  `;
};

dreamForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = dreamInput.value.trim();
  if (text) {
    const historyItems = loadHistory();
    historyItems.unshift({ text, createdAt: Date.now() });
    saveHistory(historyItems.slice(0, maxHistoryItems));
    renderHistory(historyItems.slice(0, maxHistoryItems));
  }
  dreamOutput.innerHTML = buildInterpretation(text);
});

sampleDreamButton.addEventListener("click", () => {
  const sample = sampleDreams[Math.floor(Math.random() * sampleDreams.length)];
  dreamInput.value = sample;
  dreamOutput.innerHTML = buildInterpretation(sample);
});

clearDreamButton.addEventListener("click", () => {
  dreamInput.value = "";
  dreamOutput.innerHTML = `<p class="muted">아직 해독이 없습니다. 꿈을 입력하면 여기에 표시됩니다.</p>`;
});

if (historyList) {
  historyList.addEventListener("click", (event) => {
    const target = event.target;
    const button = target instanceof HTMLElement ? target.closest(".history-item") : null;
    if (!button) {
      return;
    }
    const encoded = button.dataset.text || "";
    if (!encoded) {
      return;
    }
    const decoded = decodeURIComponent(encoded);
    dreamInput.value = decoded;
    dreamOutput.innerHTML = buildInterpretation(decoded);
  });
}

if (clearHistoryButton) {
  clearHistoryButton.addEventListener("click", () => {
    const confirmed = window.confirm("책을 지우겠습니까?");
    if (!confirmed) {
      return;
    }
    saveHistory([]);
    renderHistory([]);
  });
}

renderHistory(loadHistory());
