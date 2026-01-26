const dreamForm = document.querySelector("#dreamForm");
const dreamInput = document.querySelector("#dreamInput");
const dreamOutput = document.querySelector("#dreamOutput");
const sampleDreamButton = document.querySelector("#sampleDream");
const clearDreamButton = document.querySelector("#clearDream");
const historyList = document.querySelector("#historyList");
const clearHistoryButton = document.querySelector("#clearHistory");
const startBookButton = document.querySelector("#startBook");
const bookIntro = document.querySelector(".book-intro");

if (bookIntro) {
  document.body.classList.add("intro-active");
}

if (startBookButton && bookIntro) {
  startBookButton.addEventListener("click", () => {
    if (document.body.classList.contains("intro-opening")) {
      return;
    }
    document.body.classList.add("intro-opening");
    window.setTimeout(() => {
      document.body.classList.add("intro-complete");
      document.body.classList.remove("intro-active");
      bookIntro.setAttribute("aria-hidden", "true");
    }, 850);
  });
}

const animalSummaryLine = "동물의 꿈은 지금 당신의 본능과 에너지 상태를 보여줍니다.";

const animalSummaryKeywords = [
  "동물", "동물들", "동물 꿈", "동물 새끼", "아기 동물", "새끼 동물", "동물에 물리다",
  "개", "강아지", "고양이", "뱀", "곰", "토끼", "햄스터", "새", "참새", "원숭이",
  "쥐", "흰 쥐", "검은 쥐", "늑대", "개구리", "여우", "고릴라", "부엉이",
  "사자", "악어", "호랑이", "말", "돼지", "잉꼬", "환상 동물", "상상의 동물", "실재하지 않는 동물",
];

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
  { keywords: ["동물", "동물 꿈"], meaning: "기회가 다가오고 능력을 발휘할 시기가 왔음을 암시합니다." },
  { keywords: ["동물 많이", "많은 동물", "동물들"], meaning: "긍정 감정은 활력과 생명력 상승, 부정 감정은 스트레스와 감정 과부하를 뜻합니다." },
  { keywords: ["동물 새끼", "아기 동물", "새끼 동물"], meaning: "새로운 시작과 변화의 조짐입니다. 연애는 새 인연, 일은 새 역할·기회로 이어질 수 있습니다." },
  { keywords: ["동물 물리다", "동물에 물리다", "물렸다"], meaning: "변화에 대한 결의가 커지고 있습니다. 진짜 원하는 것을 찾으려는 단계입니다." },
  { keywords: ["동물 기르다", "동물을 키우다", "기르다"], meaning: "평온한 일상과 정신적 안정이 유지됩니다. 기르지 않는 동물일수록 심리적 여유를 상징합니다." },
  { keywords: ["동물 먹다", "먹었다", "먹는 꿈"], meaning: "잠재 능력을 흡수하는 흐름입니다. 기회를 잡을 준비가 되어 있습니다." },
  { keywords: ["개", "강아지"], meaning: "운 상승의 흐름입니다." },
  { keywords: ["흰 개", "갈색 개"], meaning: "기회와 행운이 찾아옵니다." },
  { keywords: ["검은 개"], meaning: "피로 누적과 컨디션 저하를 암시합니다. 휴식이 필요합니다." },
  { keywords: ["고양이", "냥이"], meaning: "인간관계, 특히 여성 관계의 긴장과 경쟁심이 드러날 수 있습니다." },
  { keywords: ["검은 고양이"], meaning: "행운의 상징입니다." },
  { keywords: ["뱀"], meaning: "행복과 재물운이 상승합니다. 연애·일이 원만해지고 뜻밖의 수입도 기대됩니다." },
  { keywords: ["곰"], meaning: "모성과 보호의 상징입니다. 계획이 안정적으로 진행될 수 있습니다." },
  { keywords: ["토끼"], meaning: "행운이 다가옵니다. 적극적으로 행동할수록 기회가 커집니다." },
  { keywords: ["햄스터"], meaning: "소소하지만 확실한 행복의 흐름입니다. 연애 성과나 수입 기회가 있을 수 있습니다." },
  { keywords: ["새", "새들"], meaning: "차분하고 긍정적인 상태에서 도전을 이어갈 수 있습니다." },
  { keywords: ["참새"], meaning: "작고 따뜻한 행운이 찾아옵니다." },
  { keywords: ["원숭이"], meaning: "거짓말, 말장난, 분쟁 등 인간관계 트러블을 암시합니다." },
  { keywords: ["쥐"], meaning: "흰 쥐는 연애·금전운 상승, 검은 쥐는 적·배신·라이벌을 뜻합니다." },
  { keywords: ["흰 쥐", "하얀 쥐"], meaning: "연애와 금전운이 상승하는 흐름입니다." },
  { keywords: ["검은 쥐", "검정 쥐"], meaning: "적이나 배신의 가능성을 경계하세요." },
  { keywords: ["늑대"], meaning: "위험 경고의 신호입니다. 범죄나 위험한 제안에 주의하세요." },
  { keywords: ["개구리"], meaning: "노력의 결실이 드러나고 성과가 이어질 수 있습니다." },
  { keywords: ["큰 개구리"], meaning: "금전운 상승과 뜻밖의 수입을 암시합니다." },
  { keywords: ["여우"], meaning: "속임이나 인간관계 트러블의 징조입니다. 주변을 신중히 살피세요." },
  { keywords: ["고릴라"], meaning: "긍정 감정이면 관계 확대, 부정 감정이면 대인 스트레스를 뜻합니다." },
  { keywords: ["부엉이"], meaning: "지식욕과 자기 통제력이 상승합니다. 냉정함과 확신이 강해집니다." },
  { keywords: ["사자"], meaning: "긍정은 경쟁 승리와 출세, 부정은 오만과 대인 문제를 암시합니다." },
  { keywords: ["악어"], meaning: "사건·사고 경고입니다. 많을수록 고민이 증가하며 긴장 해소가 필요합니다." },
  { keywords: ["호랑이"], meaning: "에너지와 도전 정신이 상승합니다. 감정 과열을 경계하세요." },
  { keywords: ["말", "말꿈"], meaning: "정신·체력 에너지가 상승하는 신호입니다." },
  { keywords: ["돼지", "돼지꿈"], meaning: "재물운 상승을 뜻합니다. 돼지가 너무 많으면 스트레스 누적을 의미합니다." },
  { keywords: ["잉꼬"], meaning: "인간관계 스트레스를 상징합니다." },
  { keywords: ["환상 동물", "상상의 동물", "실재하지 않는 동물"], meaning: "잠재 재능과 새로운 도전의 신호입니다. 변화에 대한 기대 또는 두려움이 드러날 수 있습니다." },
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

const summaryToneLines = [
  "여러 신호가 동시에 겹친 만큼, 지금은 마음의 우선순위를 재정리할 시기일 수 있습니다.",
  "꿈의 층위가 넓게 퍼져 있어, 작은 단서들이 하나의 메시지로 모이고 있습니다.",
  "서로 다른 상징이 연결된 만큼, 현실의 상황도 복합적인 판단을 요구합니다.",
  "해석의 갈래가 많다는 것은 선택지가 늘었음을 뜻할 수 있습니다.",
  "주제가 다양할수록 핵심 감정 하나를 먼저 붙잡는 것이 도움이 됩니다.",
  "서사와 기호가 동시에 움직여, 마음의 긴장과 욕구가 함께 드러납니다.",
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
const learnedKeywordsKey = "dreamLearnedKeywords";
const maxHistoryItems = 12;
const maxLearnedKeywords = 30;

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

const loadLearnedKeywords = () => {
  try {
    const raw = localStorage.getItem(learnedKeywordsKey);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("학습 키워드 불러오기 실패:", error);
    return {};
  }
};

const saveLearnedKeywords = (data) => {
  localStorage.setItem(learnedKeywordsKey, JSON.stringify(data));
};

const updateLearnedKeywords = (text) => {
  const tokens = text
    .toLowerCase()
    .replace(/[^0-9a-zA-Z가-힣\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 2);
  if (!tokens.length) {
    return;
  }
  const learned = loadLearnedKeywords();
  tokens.forEach((token) => {
    learned[token] = (learned[token] || 0) + 1;
  });
  const sorted = Object.entries(learned)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 200);
  saveLearnedKeywords(Object.fromEntries(sorted));
};

const getTopLearnedKeywords = (limit = 6) => {
  const learned = loadLearnedKeywords();
  return Object.entries(learned)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
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
  { keywords: ["피하다", "피했", "피했다", "피했어", "피함"], meaning: "문제를 정면으로 마주하기보다 거리를 두려는 반응입니다." },
];

const bodyMap = [
  { keywords: ["이빨", "이가", "치아", "이가 빠지다", "이가 흔들리다"], meaning: "자존감과 말의 표현에 대한 불안이 나타납니다." },
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

const primarySymbolMap = [
  {
    keywords: ["똥", "대변", "배설물"],
    meaning: "불필요한 감정과 스트레스를 비워내려는 흐름이 나타납니다.",
    priority: 1,
  },
  {
    keywords: ["피", "출혈"],
    meaning: "에너지 소모와 감정적 고갈이 드러나는 강한 신호입니다.",
    priority: 1,
  },
  {
    keywords: ["죽음", "사망", "장례", "부고"],
    meaning: "끝과 시작의 전환이 강하게 드러나는 상징입니다.",
    priority: 1,
  },
  {
    keywords: ["불", "화재"],
    meaning: "격렬한 감정과 변화를 예고하는 상징입니다.",
    priority: 1,
  },
  {
    keywords: ["물", "바다", "강", "호수"],
    meaning: "감정의 깊이가 드러나고 내면의 흐름이 강조됩니다.",
    priority: 1,
  },
  {
    keywords: ["시험", "시험지", "평가"],
    meaning: "평가와 준비에 대한 부담이 핵심 주제로 나타납니다.",
    priority: 1,
  },
  {
    keywords: ["추락", "떨어지다", "낙하"],
    meaning: "통제력 상실과 실패에 대한 두려움이 강조됩니다.",
    priority: 1,
  },
  {
    keywords: ["쫓기다", "추격", "도망"],
    meaning: "압박과 회피가 동시에 작동하는 강한 신호입니다.",
    priority: 1,
  },
  {
    keywords: ["집", "집이 무너지다", "붕괴"],
    meaning: "심리적 안정 기반이 흔들리고 있다는 상징입니다.",
    priority: 1,
  },
  {
    keywords: ["이빨", "치아", "이가 빠지다", "이가 흔들리다"],
    meaning: "자존감과 표현에 대한 민감성이 드러나는 상징입니다.",
    priority: 2,
  },
  {
    keywords: ["눈", "시야", "보이지 않다"],
    meaning: "현실을 바라보는 관점이 흐려졌다는 신호일 수 있습니다.",
    priority: 2,
  },
  {
    keywords: ["머리", "두통"],
    meaning: "생각과 판단의 과부하가 반영될 수 있습니다.",
    priority: 2,
  },
  {
    keywords: ["길", "갈림길"],
    meaning: "선택과 방향에 대한 고민이 드러납니다.",
    priority: 2,
  },
  {
    keywords: ["숲", "미로", "헤매다"],
    meaning: "혼란과 무의식의 신호가 강해진 상태입니다.",
    priority: 2,
  },
];

const secondaryActionMap = [
  { keywords: ["나오다", "나온다", "배출", "토하다"], meaning: "감정과 스트레스가 밖으로 빠져나가는 과정입니다." },
  { keywords: ["쌓이다", "가득", "넘치다"], meaning: "부담이 누적되어 정리 필요성이 커졌습니다." },
  { keywords: ["숨기다", "가리다"], meaning: "감정을 억누르고 보호하려는 흐름이 나타납니다." },
  { keywords: ["닦다", "씻다", "치우다"], meaning: "정리와 회복 욕구가 강하게 나타납니다." },
  { keywords: ["떨어지다", "흘리다"], meaning: "통제력 상실에 대한 긴장이 반영됩니다." },
  { keywords: ["삼키다", "먹다"], meaning: "감정을 안으로 눌러 담는 경향이 나타납니다." },
  { keywords: ["싸우다", "부딪히다", "다투다"], meaning: "갈등을 드러내고 싶은 충동이 강해졌습니다." },
  { keywords: ["도망치다", "피하다", "피했", "피했다", "피했어", "피함"], meaning: "책임과 감정을 피하려는 방어가 강합니다." },
  { keywords: ["잡히다", "붙잡히다"], meaning: "압박을 피하지 못한 상태가 반영됩니다." },
  { keywords: ["잃어버리다", "놓치다"], meaning: "중요한 것을 잃을까 하는 불안이 큽니다." },
  { keywords: ["찾다", "발견"], meaning: "해답이나 돌파구를 찾으려는 흐름입니다." },
  { keywords: ["닫다", "잠그다"], meaning: "관계나 감정을 닫고 보호하려는 의지가 있습니다." },
];

const tertiaryToneMap = [
  { keywords: ["더럽다", "불쾌", "혐오"], meaning: "감정적으로 거부감이 커진 상태입니다." },
  { keywords: ["후련", "시원", "가볍다"], meaning: "해소와 정리의 긍정적 신호가 나타납니다." },
  { keywords: ["창피", "부끄", "수치"], meaning: "평판이나 이미지에 대한 걱정이 반영됩니다." },
  { keywords: ["불안", "초조", "긴장"], meaning: "결과에 대한 불안이 높아져 있습니다." },
  { keywords: ["공포", "두려움"], meaning: "회피하고 싶은 문제의 압력이 커졌습니다." },
  { keywords: ["안도", "편안", "평온"], meaning: "안정감과 회복의 흐름이 뚜렷해졌습니다." },
  { keywords: ["분노", "격분"], meaning: "억눌린 분노가 표면으로 올라오고 있습니다." },
  { keywords: ["슬픔", "허전"], meaning: "상실감이 남아 있는 상태입니다." },
];

const sampleDreams = [
  "어두운 골목을 걷다가 낯선 문을 열었더니 따뜻한 빛이 쏟아졌다.",
  "높은 산을 오르는데 갑자기 하늘로 떠올라 도시를 내려다보았다.",
  "바닷가에서 파도가 멈추고, 나는 고요한 수면 위에 서 있었다.",
  "촛불이 꺼지지 않는 방에서 낡은 거울이 나를 바라보았다.",
];

const particleKeywords = new Set(["이", "가", "은", "는", "을", "를", "에", "에서", "으로", "로", "과", "와", "도", "의"]);

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^0-9a-zA-Z가-힣\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const matchesKeyword = (text, keyword, tokens) => {
  if (keyword.length <= 1) {
    return tokens.some(
      (token) => token === keyword || (token.startsWith(keyword) && particleKeywords.has(token.slice(1)))
    );
  }
  return text.includes(keyword);
};

const pickMatches = (text, map) => {
  const tokens = tokenize(text);
  return map.filter((item) => item.keywords.some((keyword) => matchesKeyword(text, keyword, tokens)));
};

const cleanKeywordList = (keywords) =>
  keywords.filter((keyword) => !particleKeywords.has(keyword));

const listMatchedKeywords = (text, map) => {
  const tokens = tokenize(text);
  const hits = map.flatMap((item) =>
    item.keywords.filter((keyword) => matchesKeyword(text, keyword, tokens))
  );
  const unique = [...new Set(hits)];
  return cleanKeywordList(unique).slice(0, 6);
};

const stripIgaKeyword = (keywords) => keywords.filter((keyword) => keyword !== "이가");

const keywordInsightMap = new Map([
  ["물", [
    "감정의 깊이와 흐름을 상징합니다.",
    "마음속 에너지가 움직이며 정리가 필요함을 뜻합니다.",
  ]],
  ["바다", [
    "무의식의 넓이와 감정의 파도를 뜻합니다.",
    "감정의 규모가 커져 관점을 넓혀야 함을 시사합니다.",
  ]],
  ["파도", [
    "감정의 기복과 변화가 큰 시기입니다.",
    "다가오는 사건에 대한 파동이 마음에 나타납니다.",
  ]],
  ["비", [
    "정화 혹은 우울의 흐름을 나타냅니다.",
    "마음을 씻어내는 과정이나 피로감의 신호입니다.",
  ]],
  ["길", [
    "선택과 방향성을 상징합니다.",
    "현재의 목표로 향하는 경로를 점검하라는 뜻입니다.",
  ]],
  ["갈림길", [
    "중요한 결정을 앞둔 상황을 뜻합니다.",
    "두 가치 사이의 균형을 묻는 상징입니다.",
  ]],
  ["숲", [
    "무의식과 혼란, 내면 탐색을 의미합니다.",
    "숨겨진 욕구나 감정을 발견하는 장소입니다.",
  ]],
  ["미로", [
    "복잡한 문제나 방향 상실을 나타냅니다.",
    "해답을 찾기 위한 탐색이 계속되는 상태입니다.",
  ]],
  ["쫓기다", [
    "압박과 회피 심리가 동시에 작동합니다.",
    "해결되지 않은 책임이 따라붙는 신호입니다.",
  ]],
  ["도망", [
    "부담을 피하고 싶은 마음이 반영됩니다.",
    "현실의 대면을 미루는 심리를 나타냅니다.",
  ]],
  ["추락", [
    "통제 상실과 실패 두려움을 뜻합니다.",
    "기대가 흔들리는 순간을 경고합니다.",
  ]],
  ["시험", [
    "평가와 준비 부족에 대한 불안을 나타냅니다.",
    "성과 검증에 대한 긴장이 드러납니다.",
  ]],
  ["이", [
    "자기 이미지와 표현에 대한 걱정을 의미합니다.",
    "말실수나 평판에 대한 부담이 반영됩니다.",
  ]],
  ["치아", [
    "자존감과 말실수에 대한 불안이 드러납니다.",
    "자기 이미지의 균열을 의식하는 상태입니다.",
  ]],
  ["싸우다", [
    "갈등을 표출하고 싶은 욕구를 뜻합니다.",
    "내적 긴장과 대립이 커졌음을 나타냅니다.",
  ]],
  ["죽음", [
    "끝과 시작의 전환을 상징합니다.",
    "정리와 새로운 단계의 문턱을 뜻합니다.",
  ]],
  ["집", [
    "내면의 안전 기반과 자아를 의미합니다.",
    "정서적 안식처를 점검하라는 신호입니다.",
  ]],
  ["방", [
    "개인적 영역과 심리적 공간을 뜻합니다.",
    "드러내지 않은 감정이 숨어 있는 영역입니다.",
  ]],
  ["문", [
    "새로운 단계로의 진입을 상징합니다.",
    "관계나 상황의 경계가 열리는 순간입니다.",
  ]],
  ["불", [
    "분노와 열정, 급격한 변화를 나타냅니다.",
    "에너지의 폭발과 재정비가 필요함을 뜻합니다.",
  ]],
  ["빛", [
    "깨달음과 회복의 신호입니다.",
    "상황을 명확히 보고자 하는 마음이 드러납니다.",
  ]],
  ["낯선", [
    "억압된 자아나 새로운 면모가 드러납니다.",
    "익숙하지 않은 선택을 시도하려는 흐름입니다.",
  ]],
  ["유명인", [
    "이상적 자아와 목표 욕구가 반영됩니다.",
    "인정 욕구와 성취에 대한 열망이 드러납니다.",
  ]],
  ["과거", [
    "미해결 감정과 기억이 떠오릅니다.",
    "정리되지 않은 주제를 다시 살피라는 뜻입니다.",
  ]],
  ["아이", [
    "순수함 혹은 내면의 상처를 뜻합니다.",
    "보호받고 싶은 마음이 드러납니다.",
  ]],
  ["늦다", [
    "시간 압박과 불안을 나타냅니다.",
    "기대치와 현실 사이의 간격을 의식합니다.",
  ]],
  ["반복", [
    "루틴 피로 혹은 변화 필요의 신호입니다.",
    "같은 패턴을 끊고 싶다는 마음이 반영됩니다.",
  ]],
  ["미래", [
    "기대와 불안이 함께 작동합니다.",
    "계획과 불확실성이 동시에 존재합니다.",
  ]],
  ["멈춤", [
    "정체감이나 번아웃을 의미합니다.",
    "속도를 늦추고 회복하라는 신호입니다.",
  ]],
  ["바람", [
    "변화의 징후가 나타납니다.",
    "환경의 흐름이 바뀌는 전환점입니다.",
  ]],
  ["어둠", [
    "불안과 미지의 감정을 상징합니다.",
    "모호한 상황을 직시해야 함을 뜻합니다.",
  ]],
  ["눈", [
    "감정 억제와 냉각된 상태를 뜻합니다.",
    "거리 두기나 보호 본능이 강해졌습니다.",
  ]],
  ["지진", [
    "구조적 변화와 불안정함을 의미합니다.",
    "삶의 기반이 재정렬되는 시기일 수 있습니다.",
  ]],
]);

const buildKeywordInsights = (keywords) => {
  const unique = [...new Set(keywords)];
  const lines = unique
    .map((keyword) => {
      const meaning = keywordInsightMap.get(keyword);
      if (!meaning) {
        return null;
      }
      const text = Array.isArray(meaning) ? pickOne(meaning) : meaning;
      return `${keyword}: ${text}`;
    })
    .filter(Boolean)
    .slice(0, 6);
  return lines;
};

const pickTopPrimarySymbol = (text) => {
  const tokens = tokenize(text);
  const matches = primarySymbolMap.filter((item) =>
    item.keywords.some((keyword) => matchesKeyword(text, keyword, tokens))
  );
  if (matches.length === 0) {
    return null;
  }
  matches.sort((a, b) => a.priority - b.priority);
  return matches[0];
};

const pickFirstMatch = (text, map) => {
  const tokens = tokenize(text);
  return map.find((item) => item.keywords.some((keyword) => matchesKeyword(text, keyword, tokens)));
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

const buildSummaryFocus = (signals) => {
  const focus = [];
  if (signals.includes("상징의 반복")) focus.push("상징의 의미를 다시 정리해보세요.");
  if (signals.includes("감정의 잔향")) focus.push("감정의 강도가 높았던 장면을 중심으로 읽어보세요.");
  if (signals.includes("환경의 배경")) focus.push("장소의 분위기와 현실 상황을 연결해보세요.");
  if (signals.includes("관계의 구조")) focus.push("꿈에 나온 인물과의 관계 거리를 점검해보세요.");
  if (signals.includes("시간의 분위기")) focus.push("시간 흐름이 멈추거나 빨라진 지점을 확인해보세요.");
  if (signals.includes("행동의 패턴")) focus.push("반복된 행동이 있다면 그 이유를 추적해보세요.");
  if (signals.includes("몸의 신호")) focus.push("신체 변화는 심리 피로의 신호일 수 있습니다.");
  if (signals.includes("자연의 징후")) focus.push("자연 요소는 감정의 상태를 비춥니다.");
  return pickMany(focus, 2);
};

const buildInterpretation = (text) => {
  const trimmed = text.trim();
  const tokens = tokenize(trimmed);
  const hasAnimalSummary = animalSummaryKeywords.some((keyword) => matchesKeyword(trimmed, keyword, tokens));
  const symbolHits = pickMatches(trimmed, symbolMap);
  const emotionHits = pickMatches(trimmed, emotionMap);
  const settingHits = pickMatches(trimmed, settingMap);
  const characterHits = pickMatches(trimmed, characterMap);
  const timeHits = pickMatches(trimmed, timeMap);
  const actionHits = pickMatches(trimmed, actionMap);
  const bodyHits = pickMatches(trimmed, bodyMap);
  const environmentHits = pickMatches(trimmed, environmentMap);
  const primarySymbol = pickTopPrimarySymbol(trimmed);
  const primarySymbolOnly = primarySymbol ? [primarySymbol] : symbolHits;
  const symbolKeywords = listMatchedKeywords(trimmed, primarySymbolOnly);
  const emotionKeywords = listMatchedKeywords(trimmed, emotionMap);
  const settingKeywords = listMatchedKeywords(trimmed, settingMap);
  const characterKeywords = listMatchedKeywords(trimmed, characterMap);
  const timeKeywords = listMatchedKeywords(trimmed, timeMap);
  const actionKeywords = listMatchedKeywords(trimmed, actionMap);
  const bodyKeywords = listMatchedKeywords(trimmed, bodyMap);
  const environmentKeywords = listMatchedKeywords(trimmed, environmentMap);
  const displaySymbolKeywords = stripIgaKeyword(symbolKeywords);
  const displayEmotionKeywords = stripIgaKeyword(emotionKeywords);
  const displaySettingKeywords = stripIgaKeyword(settingKeywords);
  const displayCharacterKeywords = stripIgaKeyword(characterKeywords);
  const displayTimeKeywords = stripIgaKeyword(timeKeywords);
  const displayActionKeywords = stripIgaKeyword(actionKeywords);
  const displayBodyKeywords = stripIgaKeyword(bodyKeywords);
  const displayEnvironmentKeywords = stripIgaKeyword(environmentKeywords);
  const keywordInsights = buildKeywordInsights([
    ...displaySymbolKeywords,
    ...displayEmotionKeywords,
    ...displaySettingKeywords,
    ...displayCharacterKeywords,
    ...displayTimeKeywords,
    ...displayActionKeywords,
    ...displayBodyKeywords,
    ...displayEnvironmentKeywords,
  ]);
  const secondaryAction = pickFirstMatch(trimmed, secondaryActionMap);
  const tertiaryTone = pickFirstMatch(trimmed, tertiaryToneMap);
  const compositeKeywords = cleanKeywordList([
    primarySymbol?.keywords?.find((keyword) => matchesKeyword(trimmed, keyword, tokens)),
    secondaryAction?.keywords?.find((keyword) => matchesKeyword(trimmed, keyword, tokens)),
    tertiaryTone?.keywords?.find((keyword) => matchesKeyword(trimmed, keyword, tokens)),
  ].filter(Boolean));

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

  if (primarySymbolOnly.length > 0) {
    const items = primarySymbolOnly.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>상징 해독</h4>
        <ul>${items}</ul>
        ${hasAnimalSummary ? `<p class="muted">${animalSummaryLine}</p>` : ""}
        ${displaySymbolKeywords.length ? `<p class="muted">키워드: ${displaySymbolKeywords.join(", ")}</p>` : ""}
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
        ${displayEmotionKeywords.length ? `<p class="muted">키워드: ${displayEmotionKeywords.join(", ")}</p>` : ""}
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
      const contextKeywords = stripIgaKeyword([
        ...settingKeywords,
        ...characterKeywords,
        ...timeKeywords,
      ]);
      sections.push(`
        <div>
          <h4>배경의 메시지</h4>
          <ul>${contextItems.map((item) => `<li>${item}</li>`).join("")}</ul>
          ${contextKeywords.length ? `<p class="muted">키워드: ${contextKeywords.slice(0, 6).join(", ")}</p>` : ""}
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
    const focusLines = buildSummaryFocus(themeSignals);
    summaryChapters.push(`
      <div>
        <h4>심리 요약</h4>
        <p>이번 꿈은 ${themeSignals.join(" · ")}가 겹쳐 드러난 장면입니다. ${pickMany(summaryToneLines, 1)[0]}</p>
        ${focusLines.map((line) => `<p class="muted">${line}</p>`).join("")}
        ${pickMany(integrationLines, 1).map((line) => `<p class="muted">${line}</p>`).join("")}
      </div>
    `);
  }

  if (actionHits.length > 0) {
    const items = actionHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>행동의 의미</h4>
        <ul>${items}</ul>
        ${displayActionKeywords.length ? `<p class="muted">키워드: ${displayActionKeywords.join(", ")}</p>` : ""}
      </div>
    `);
  }

  if (!primarySymbol || primarySymbol.priority > 1) {
    if (bodyHits.length > 0) {
    const items = bodyHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>몸의 신호</h4>
        <ul>${items}</ul>
        ${displayBodyKeywords.length ? `<p class="muted">키워드: ${displayBodyKeywords.join(", ")}</p>` : ""}
      </div>
    `);
    }
  }

  if (!primarySymbol || primarySymbol.priority > 1) {
    if (environmentHits.length > 0) {
    const items = environmentHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>자연의 징후</h4>
        <ul>${items}</ul>
        ${displayEnvironmentKeywords.length ? `<p class="muted">키워드: ${displayEnvironmentKeywords.join(", ")}</p>` : ""}
      </div>
    `);
    }
  }

  ritualChapters.push(`
    <div>
      <h4>꿈의 의식</h4>
      ${pickMany(ritualLines, 2).map((line) => `<p class="muted">${line}</p>`).join("")}
    </div>
  `);

  if (primarySymbol) {
    const compositeLines = [];
    compositeLines.push(primarySymbol.meaning);
    if (secondaryAction) {
      compositeLines.push(secondaryAction.meaning);
    }
    if (tertiaryTone) {
      compositeLines.push(tertiaryTone.meaning);
    }
    const displayCompositeKeywords = stripIgaKeyword(compositeKeywords);
    sections.unshift(`
      <div>
        <h4>복합 키워드 해석</h4>
        <p>${compositeLines.join(" ")}</p>
        ${displayCompositeKeywords.length ? `<p class="muted">키워드: ${displayCompositeKeywords.join(", ")}</p>` : ""}
      </div>
    `);
  }

  if (keywordInsights.length > 0) {
    summaryChapters.push(`
      <div>
        <h4>키워드 해석</h4>
        <ul>${keywordInsights.map((line) => `<li>${line}</li>`).join("")}</ul>
      </div>
    `);
  }

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
    updateLearnedKeywords(text);
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

const initExtendedFilters = () => {
  const extendedSection = document.querySelector("#extended");
  if (!extendedSection) {
    return;
  }
  const modal = document.querySelector("#extendedModal");
  if (!modal) {
    return;
  }
  const filterButtons = [...modal.querySelectorAll("[data-filter]")];
  const symbolCards = [...modal.querySelectorAll(".symbol-grid article")];
  if (!filterButtons.length || !symbolCards.length) {
    return;
  }

  const applyFilter = (filter) => {
    symbolCards.forEach((card) => {
      const raw = card.dataset.category || "";
      const categories = raw.split(",").map((item) => item.trim()).filter(Boolean);
      const matches = filter === "전체" || categories.includes(filter);
      card.classList.toggle("is-hidden", !matches);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "전체";
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      applyFilter(filter);
    });
  });

  applyFilter("전체");
};

const initExtendedModal = () => {
  const modal = document.querySelector("#extendedModal");
  const openButton = document.querySelector("#openExtended");
  if (!modal || !openButton) {
    return;
  }
  const closeButtons = [...modal.querySelectorAll(".modal-close, .modal-backdrop")];

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const firstFilter = modal.querySelector(".filter-button");
    if (firstFilter instanceof HTMLElement) {
      firstFilter.focus();
    }
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openButton.addEventListener("click", openModal);
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
};

renderHistory(loadHistory());
initExtendedFilters();
initExtendedModal();
