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
  { keywords: ["숲", "나무", "길 잃다", "미로", "헤매다"], meaning: "불확실한 환경 속에서 길을 찾고 있습니다. 감각을 믿으라는 신호일 수 있습니다." },
  { keywords: ["쫓기다", "추격", "도망", "도망치다", "피하다"], meaning: "압박과 책임을 피하고 싶은 마음이 꿈에서 추격으로 나타납니다. 미뤄둔 일이나 관계의 긴장이 작동하는 신호입니다." },
  { keywords: ["떨어지다", "추락", "낙하", "떨어짐"], meaning: "통제력 상실에 대한 두려움이 반영됩니다. 평가나 실패에 대한 부담이 커진 상태일 수 있습니다." },
  { keywords: ["시험", "시험지", "시간 부족", "준비 안 됨"], meaning: "중요한 결정을 앞두거나 타인의 평가를 의식할 때 자주 나타납니다. 준비감에 대한 불안이 깔려 있습니다." },
  { keywords: ["이", "이가 빠지다", "치아", "이가 흔들리다"], meaning: "자기 이미지나 말실수에 대한 불안, 혹은 건강과 노화에 대한 무의식적 걱정이 비춰질 수 있습니다." },
  { keywords: ["싸우다", "말다툼", "다투다", "폭력", "충돌"], meaning: "억눌린 분노나 표현되지 않은 감정이 터지는 방식으로 나타날 수 있습니다." },
  { keywords: ["죽다", "사망", "장례", "부고"], meaning: "끝과 시작의 상징입니다. 관계나 삶의 국면이 정리되고 새 단계로 넘어가는 신호일 수 있습니다." },
  { keywords: ["물에 빠지다", "잠기다", "익사", "침수"], meaning: "감정에 압도당한 상태를 보여줍니다. 감정 조절의 피로가 누적된 흐름일 수 있습니다." },
  { keywords: ["무너지다", "붕괴", "무너짐", "집이 무너지다"], meaning: "심리적 안정감이 흔들리는 신호입니다. 가족, 자아 정체성, 안전 기반에 대한 불안을 담고 있습니다." },
];

const insightLines = [
  "꿈의 서사는 무의식이 균형을 회복하려는 신호입니다.",
  "상징이 선명할수록 마음의 핵심 주제가 분명해집니다.",
  "감정의 강도는 현재의 피로와 갈망을 비추는 거울입니다.",
  "장소의 질감은 내적 안전감의 수준을 반영합니다.",
  "인물의 역할은 내면에서 맡은 태도와 역할을 드러냅니다.",
  "꿈은 작은 의식처럼, 지금의 마음을 조용히 정돈합니다.",
  "상징은 현재의 마음을 빚는 재료를 조용히 드러냅니다.",
  "꿈은 마음의 균열과 회복 지점을 함께 비춥니다.",
  "장면이 선명할수록 내면의 메시지가 농축됩니다.",
  "반복되는 표상은 삶의 리듬을 점검하라는 신호일 수 있습니다.",
];

const integrationLines = [
  "해석은 정답이 아니라 마음을 돌보는 과정에 가깝습니다.",
  "하나의 상징에 여러 의미가 겹치며, 그 겹침이 핵심입니다.",
  "불편한 장면일수록 중요한 감정이 숨어 있는 경우가 많습니다.",
  "꿈의 흐름은 미뤄둔 결정과 엮여 나타나기도 합니다.",
  "감정이 바뀌는 순간이 심리 전환의 중심이 됩니다.",
  "꿈은 내면의 언어로 현재의 흐름을 알려줍니다.",
  "꿈은 감정의 결을 정리해 다음 선택을 준비하게 합니다.",
  "장면이 바뀌는 지점이 심리적 전환의 문턱입니다.",
  "무서운 장면은 회피하던 주제를 직면하라는 신호일 수 있습니다.",
  "가벼운 장면은 회복의 방향을 알려주는 경우가 있습니다.",
];

const closureLines = [
  "오늘의 해석은 감정을 정돈하는 작은 의식입니다.",
  "반복되는 장면은 마음의 메시지를 더 강하게 비춥니다.",
  "해석을 짧게 요약하면 핵심이 또렷해집니다.",
  "짧은 문장으로 정리해두면 흐름이 이어집니다.",
  "지금의 해석은 다음 선택을 위한 조용한 안내입니다.",
  "기록을 남기는 순간부터 해석은 더 깊어집니다.",
  "꿈은 스스로를 이해하려는 내면의 안내문입니다.",
  "오늘의 해석은 내일의 선택을 부드럽게 준비합니다.",
];

const ritualLines = [
  "잠들기 전 한 문장으로 꿈의 장면을 봉인해 보세요.",
  "꿈의 감정을 한 단어로 이름 붙이면 흐름이 잔잔해집니다.",
  "반복되는 장면을 노트에 적어두면 메시지가 선명해집니다.",
  "꿈이 멈춘 지점에서 다시 한 걸음 이어가 보세요.",
  "낯선 인물의 표정을 떠올리면 내면의 목소리가 들립니다.",
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
        <div class="history-item" data-index="${index}">
          <button class="history-main" type="button" data-text="${encodeURIComponent(item.text)}">
            <span class="history-snippet">${escapeHtml(snippet)}</span>
            <span class="history-meta">${formatTimestamp(item.createdAt)}</span>
          </button>
          <button class="history-delete" type="button" data-index="${index}">삭제</button>
        </div>
      `;
    })
    .join("");
};

const emotionMap = [
  { keywords: ["불안", "두려움", "무서", "떨림", "공포", "위협", "압박"], meaning: "불확실한 미래와 결과에 대한 경계심이 커져 있습니다." },
  { keywords: ["공포", "공황"], meaning: "회피 중인 문제나 마주하기 어려운 감정이 꿈에 드러납니다." },
  { keywords: ["분노", "화", "짜증", "폭발", "격분"], meaning: "억눌린 감정이 표면으로 올라오고 있습니다." },
  { keywords: ["슬픔", "눈물", "그리움", "허전", "우울"], meaning: "상실감이나 관계의 균열에 대한 감정이 반영됩니다." },
  { keywords: ["혼란", "혼동", "어지러움"], meaning: "선택과 정보가 과해져 판단이 흐려지는 상태일 수 있습니다." },
  { keywords: ["죄책감", "후회"], meaning: "과거 행동에 대한 미련과 정서적 부담이 남아 있을 수 있습니다." },
  { keywords: ["외로움", "고립", "쓸쓸"], meaning: "정서적 단절이나 공감의 부족이 드러나는 신호입니다." },
  { keywords: ["안정감", "평온", "안정", "고요", "차분", "편안"], meaning: "현재 삶에 대한 만족감과 회복의 흐름이 이어집니다." },
];

const settingMap = [
  { keywords: ["집", "방", "문", "집이 무너지다", "붕괴"], meaning: "자아와 심리적 안정의 상태가 드러납니다." },
  { keywords: ["학교", "시험", "수업"], meaning: "평가, 성장, 준비 과제가 떠오릅니다." },
  { keywords: ["회사", "직장", "사무실"], meaning: "책임, 성과, 역할에 대한 압박이 반영됩니다." },
  { keywords: ["병원", "응급실"], meaning: "회복 욕구와 돌봄에 대한 신호입니다." },
  { keywords: ["길", "도로", "교차로", "갈림길"], meaning: "인생의 방향성과 선택의 주제가 강조됩니다." },
  { keywords: ["숲", "나무"], meaning: "무의식과 혼란, 직관의 신호가 나타납니다." },
  { keywords: ["바다", "호수", "강", "물"], meaning: "감정의 깊이를 비추는 배경입니다." },
  { keywords: ["산", "정상"], meaning: "목표와 도전, 성취 욕구가 드러납니다." },
  { keywords: ["지하", "지하실", "지하철"], meaning: "억눌린 감정과 숨겨진 기억이 부각됩니다." },
  { keywords: ["옥상", "고층", "절벽"], meaning: "한계와 위험, 긴장감이 드러납니다." },
  { keywords: ["도시", "건물", "거리", "골목"], meaning: "사회적 역할과 관계가 주제입니다." },
];

const characterMap = [
  { keywords: ["가족", "엄마", "아빠", "부모", "형", "누나", "동생"], meaning: "정체성과 근본적 안정에 대한 감정이 투영됩니다." },
  { keywords: ["연인", "파트너", "애인"], meaning: "애착과 불안, 욕망의 균형이 드러납니다." },
  { keywords: ["친구", "동료"], meaning: "사회적 관계와 비교심리가 반영됩니다." },
  { keywords: ["모르는", "낯선", "陌生", "낯선 사람"], meaning: "억압된 자아나 새로운 면모가 드러납니다." },
  { keywords: ["유명인", "연예인", "스타"], meaning: "이상적 자아나 욕망의 투영이 나타납니다." },
  { keywords: ["과거", "옛날", "예전 사람"], meaning: "미해결 감정과 기억이 떠오를 수 있습니다." },
  { keywords: ["아이", "어린아이", "유년"], meaning: "순수함 혹은 상처받은 내면을 상징합니다." },
];

const timeMap = [
  { keywords: ["늦다", "지각", "시간 부족"], meaning: "압박감과 불안이 높아진 상태일 수 있습니다." },
  { keywords: ["반복", "같은 날", "되풀이"], meaning: "루틴에 갇혀 있거나 변화가 필요한 흐름입니다." },
  { keywords: ["과거", "옛날", "예전"], meaning: "미련이나 미해결 감정이 떠오릅니다." },
  { keywords: ["미래", "앞날"], meaning: "기대 혹은 불안이 동시에 작동합니다." },
  { keywords: ["멈춤", "정지", "시간이 멈춤"], meaning: "정체감이나 방향성 부족이 드러납니다." },
  { keywords: ["빠르게", "빠른 전개", "순식간"], meaning: "감정 과부하 상태일 수 있습니다." },
  { keywords: ["밤", "어둠", "검은"], meaning: "무의식이 강하게 작동하는 시간대입니다." },
  { keywords: ["아침", "햇살", "빛"], meaning: "전환과 회복의 신호가 나타납니다." },
  { keywords: ["노을", "황혼", "저녁"], meaning: "마무리와 정리의 감각이 큽니다." },
];

const actionMap = [
  { keywords: ["도망", "도망치다", "도망침", "추격", "쫓기다"], meaning: "책임을 회피하거나 결정을 미루는 심리가 반영됩니다." },
  { keywords: ["숨다", "숨음"], meaning: "감정을 억제하거나 자기 방어가 강해진 상태일 수 있습니다." },
  { keywords: ["싸우다", "말다툼", "충돌", "격투"], meaning: "갈등을 표출하고 싶은 욕구가 드러납니다." },
  { keywords: ["추락", "떨어지다", "낙하"], meaning: "실패에 대한 두려움과 통제 상실의 감각이 있습니다." },
  { keywords: ["상승", "떠오르다", "올라가다"], meaning: "성취 욕구와 자신감 상승이 반영됩니다." },
  { keywords: ["반복", "되풀이"], meaning: "강박이나 루틴에 갇힌 흐름을 의미합니다." },
  { keywords: ["멈춤", "멈추다"], meaning: "번아웃이나 의욕 상실의 신호일 수 있습니다." },
];

const bodyMap = [
  { keywords: ["이가 빠지다", "치아", "이가 흔들리다", "이"], meaning: "자존감과 말의 표현에 대한 불안이 나타납니다." },
  { keywords: ["눈이 안 보임", "시야 없음", "보이지 않다"], meaning: "현실을 회피하거나 확신이 부족한 상태일 수 있습니다." },
  { keywords: ["목소리 안 나옴", "말이 안 나옴", "소리가 안 나옴"], meaning: "표현 억제와 의사소통의 부담이 반영됩니다." },
  { keywords: ["다리가 안 움직임", "움직이지 않다"], meaning: "무력감이나 추진력 저하가 드러납니다." },
  { keywords: ["피", "출혈"], meaning: "에너지 소모와 감정적 고갈이 나타날 수 있습니다." },
  { keywords: ["상처", "부상"], meaning: "감정적 트라우마나 취약한 부분이 드러납니다." },
  { keywords: ["병", "아프다", "질병"], meaning: "스트레스 누적과 회복 욕구를 시사합니다." },
];

const environmentMap = [
  { keywords: ["물", "바다", "강", "호수"], meaning: "감정의 상태가 깊고 넓게 반영됩니다." },
  { keywords: ["불", "화재"], meaning: "분노 또는 강한 열정이 나타납니다." },
  { keywords: ["비"], meaning: "정화 혹은 우울의 흐름을 의미합니다." },
  { keywords: ["눈", "눈발"], meaning: "감정 억제와 냉각된 상태를 시사합니다." },
  { keywords: ["바람"], meaning: "변화의 징후가 나타납니다." },
  { keywords: ["어둠", "암흑"], meaning: "불안이나 무지를 상징합니다." },
  { keywords: ["빛", "햇살"], meaning: "깨달음과 회복의 흐름이 드러납니다." },
  { keywords: ["지진", "흔들림"], meaning: "삶의 구조적 변화가 진행 중일 수 있습니다." },
];

const sampleDreams = [
  "어두운 골목을 걷다가 낯선 문을 열었더니 따뜻한 빛이 쏟아졌다.",
  "높은 산을 오르는데 갑자기 하늘로 떠올라 도시를 내려다보았다.",
  "바닷가에서 파도가 멈추고, 나는 고요한 수면 위에 서 있었다.",
  "촛불이 꺼지지 않는 방에서 낡은 거울이 나를 바라보았다.",
];

const pickMatches = (text, map) =>
  map.filter((item) => item.keywords.some((keyword) => text.includes(keyword)));

const listMatchedKeywords = (text, map) => {
  const hits = map.flatMap((item) => item.keywords.filter((keyword) => text.includes(keyword)));
  const unique = [...new Set(hits)];
  return unique.slice(0, 6);
};

const pickOne = (list) => list[Math.floor(Math.random() * list.length)];
const pickMany = (list, count) => {
  const pool = [...list];
  const picked = [];
  while (pool.length > 0 && picked.length < count) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
};

const buildInterpretation = (text) => {
  const trimmed = text.trim();
  const symbolHits = pickMatches(trimmed, symbolMap);
  const emotionHits = pickMatches(trimmed, emotionMap);
  const settingHits = pickMatches(trimmed, settingMap);
  const characterHits = pickMatches(trimmed, characterMap);
  const timeHits = pickMatches(trimmed, timeMap);
  const actionHits = pickMatches(trimmed, actionMap);
  const bodyHits = pickMatches(trimmed, bodyMap);
  const environmentHits = pickMatches(trimmed, environmentMap);
  const symbolKeywords = listMatchedKeywords(trimmed, symbolMap);
  const emotionKeywords = listMatchedKeywords(trimmed, emotionMap);
  const settingKeywords = listMatchedKeywords(trimmed, settingMap);
  const characterKeywords = listMatchedKeywords(trimmed, characterMap);
  const timeKeywords = listMatchedKeywords(trimmed, timeMap);
  const actionKeywords = listMatchedKeywords(trimmed, actionMap);
  const bodyKeywords = listMatchedKeywords(trimmed, bodyMap);
  const environmentKeywords = listMatchedKeywords(trimmed, environmentMap);

  if (!trimmed) {
    return `<p class="muted">꿈을 입력하면 해석을 만들 수 있어요.</p>`;
  }

  const sections = [];
  const detailChapters = [];
  const summaryChapters = [];
  const ritualChapters = [];
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
        ${symbolKeywords.length ? `<p class="muted">키워드: ${symbolKeywords.join(", ")}</p>` : ""}
      </div>
    `);
    detailChapters.push(`
      <div>
        <h4>상징의 심리</h4>
        <p>상징은 기억과 감정의 축약어입니다. 반복되는 기호는 마음 깊은 곳의 질문을 드러냅니다.</p>
        ${pickMany(insightLines, 2).map((line) => `<p class="muted">${line}</p>`).join("")}
      </div>
    `);
  }

  if (emotionHits.length > 0) {
    const items = emotionHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>감정의 온도</h4>
        <ul>${items}</ul>
        ${emotionKeywords.length ? `<p class="muted">키워드: ${emotionKeywords.join(", ")}</p>` : ""}
      </div>
    `);
    detailChapters.push(`
      <div>
        <h4>감정의 흐름</h4>
        <p>꿈 속 감정은 현실에서 표현되지 않은 감각의 여운일 수 있습니다. 감정이 바뀌는 순간은 전환의 경계입니다.</p>
        ${pickMany(integrationLines, 2).map((line) => `<p class="muted">${line}</p>`).join("")}
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
          ${
            settingKeywords.length || characterKeywords.length || timeKeywords.length
              ? `<p class="muted">키워드: ${[...settingKeywords, ...characterKeywords, ...timeKeywords].slice(0, 6).join(", ")}</p>`
              : ""
          }
        </div>
      `);
    }
    detailChapters.push(`
      <div>
        <h4>관계와 무대</h4>
        <p>장소와 인물은 심리적 역할을 상징합니다. 낯선 인물은 잠든 자아의 얼굴, 익숙한 인물은 반복되는 패턴일 수 있습니다.</p>
        ${pickMany(insightLines, 2).map((line) => `<p class="muted">${line}</p>`).join("")}
      </div>
    `);
  }

  const themeSignals = [];
  if (symbolHits.length > 0) themeSignals.push("상징의 반복");
  if (emotionHits.length > 0) themeSignals.push("감정의 잔향");
  if (settingHits.length > 0) themeSignals.push("환경의 배경");
  if (characterHits.length > 0) themeSignals.push("관계의 구조");
  if (timeHits.length > 0) themeSignals.push("시간의 분위기");
  if (actionHits.length > 0) themeSignals.push("행동의 패턴");
  if (bodyHits.length > 0) themeSignals.push("몸의 신호");
  if (environmentHits.length > 0) themeSignals.push("자연의 징후");

  if (themeSignals.length > 0) {
    summaryChapters.push(`
      <div>
        <h4>심리 요약</h4>
        <p>이번 꿈은 ${themeSignals.join(" · ")}가 겹쳐 드러난 장면입니다. 여러 층의 신호가 동시에 나타난 만큼, 내면의 흐름이 더 선명해졌을 수 있습니다.</p>
        ${pickMany(integrationLines, 2).map((line) => `<p class="muted">${line}</p>`).join("")}
      </div>
    `);
  }

  if (actionHits.length > 0) {
    const items = actionHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>행동의 의미</h4>
        <ul>${items}</ul>
        ${actionKeywords.length ? `<p class="muted">키워드: ${actionKeywords.join(", ")}</p>` : ""}
      </div>
    `);
  }

  if (bodyHits.length > 0) {
    const items = bodyHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>몸의 신호</h4>
        <ul>${items}</ul>
        ${bodyKeywords.length ? `<p class="muted">키워드: ${bodyKeywords.join(", ")}</p>` : ""}
      </div>
    `);
  }

  if (environmentHits.length > 0) {
    const items = environmentHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>자연의 징후</h4>
        <ul>${items}</ul>
        ${environmentKeywords.length ? `<p class="muted">키워드: ${environmentKeywords.join(", ")}</p>` : ""}
      </div>
    `);
  }

  ritualChapters.push(`
    <div>
      <h4>꿈의 의식</h4>
      ${pickMany(ritualLines, 2).map((line) => `<p class="muted">${line}</p>`).join("")}
    </div>
  `);

  if (sections.length === 0) {
    return `
      <h4>몽문의 흐름</h4>
      <p>선명한 기호가 드러나지 않았습니다. 대신 분위기와 감정의 단서를 다시 떠올려 보세요.</p>
      <p class="muted">해석 포인트: 분위기와 감정의 단서를 중심으로 정리하면 의미가 또렷해집니다.</p>
      ${pickMany(closureLines, 2).map((line) => `<p class="muted">${line}</p>`).join("")}
      ${ritualChapters.join("")}
    `;
  }

  return `
    ${sections.join("")}
    ${detailChapters.join("")}
    ${summaryChapters.join("")}
    <p class="muted">강도: ${intensity}</p>
    <p class="muted">해석 포인트: 핵심 장면을 한 문장으로 요약하면 메시지가 또렷해집니다.</p>
    ${pickMany(closureLines, 2).map((line) => `<p class="muted">${line}</p>`).join("")}
    ${ritualChapters.join("")}
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
    const deleteButton = target instanceof HTMLElement ? target.closest(".history-delete") : null;
    if (deleteButton) {
      const index = Number(deleteButton.dataset.index);
      if (Number.isNaN(index)) {
        return;
      }
      const historyItems = loadHistory();
      historyItems.splice(index, 1);
      saveHistory(historyItems);
      renderHistory(historyItems);
      return;
    }

    const mainButton = target instanceof HTMLElement ? target.closest(".history-main") : null;
    if (!mainButton) {
      return;
    }
    const encoded = mainButton.dataset.text || "";
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
