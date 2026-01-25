import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const commentsRef = collection(db, "comments");

const dreamForm = document.querySelector("#dreamForm");
const dreamInput = document.querySelector("#dreamInput");
const dreamOutput = document.querySelector("#dreamOutput");
const sampleDreamButton = document.querySelector("#sampleDream");
const clearDreamButton = document.querySelector("#clearDream");
const commentToggle = document.querySelector("#commentToggle");
const commentPanel = document.querySelector("#commentPanel");
const commentForm = document.querySelector("#commentForm");
const commentName = document.querySelector("#commentName");
const commentText = document.querySelector("#commentText");
const commentList = document.querySelector("#commentList");

const symbolMap = [
  { keywords: ["물", "바다", "파도", "비"], meaning: "감정의 파도가 출렁입니다. 최근의 감정이 정리되길 바라는 마음이 드러납니다." },
  { keywords: ["길", "도로", "교차로", "갈림길"], meaning: "선택의 순간이 다가옵니다. 한 방향을 택하면 다른 가능성을 놓친다는 긴장감이 있습니다." },
  { keywords: ["날다", "비행", "하늘"], meaning: "자유를 향한 욕구가 커지고 있습니다. 동시에 책임도 함께 떠올립니다." },
  { keywords: ["집", "방", "문"], meaning: "내면의 안전지대가 주제가 됩니다. 새로운 공간은 아직 탐색하지 않은 마음의 방입니다." },
  { keywords: ["불", "빛", "등대"], meaning: "방향을 잡고 싶은 욕구가 강합니다. 당신의 기준이 더 분명해지고 있습니다." },
  { keywords: ["숲", "나무", "길 잃다"], meaning: "불확실한 환경 속에서 길을 찾고 있습니다. 감각을 믿으라는 신호일 수 있습니다." },
];

const prompts = [
  "꿈에서 가장 강렬했던 감정은 무엇이었나요?",
  "등장한 인물은 현재 삶의 어떤 관계를 닮았나요?",
  "꿈의 색감이나 분위기는 당신의 에너지와 맞닿아 있나요?",
  "그 장면은 당신이 숨기던 욕망을 비추고 있나요?",
  "이 상징을 깨웠을 때 어떤 행동을 해야 하나요?",
];

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

const buildInterpretation = (text) => {
  const trimmed = text.trim();
  const symbolHits = pickMatches(trimmed, symbolMap);
  const emotionHits = pickMatches(trimmed, emotionMap);
  const settingHits = pickMatches(trimmed, settingMap);
  const characterHits = pickMatches(trimmed, characterMap);
  const timeHits = pickMatches(trimmed, timeMap);
  const selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  if (!trimmed) {
    return `<p class="muted">꿈을 입력하면 해석을 만들 수 있어요.</p>`;
  }

  const sections = [];

  if (symbolHits.length > 0) {
    const items = symbolHits.map((hit) => `<li>${hit.meaning}</li>`).join("");
    sections.push(`
      <div>
        <h4>상징 해독</h4>
        <ul>${items}</ul>
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
  }

  if (sections.length === 0) {
    return `
      <h4>몽문의 흐름</h4>
      <p>선명한 기호가 드러나지 않았습니다. 대신 분위기와 감정의 단서를 다시 떠올려 보세요.</p>
      <p class="muted">질문: ${selectedPrompt}</p>
    `;
  }

  const wordCount = trimmed.split(/\s+/).length;
  const intensity =
    wordCount >= 35 ? "이미지와 서사가 풍부합니다. 반복되는 장면을 중심으로 해석을 이어가세요." :
    wordCount >= 18 ? "핵심 장면이 보입니다. 감정의 전환 지점을 기록해 보세요." :
    "짧지만 선명한 인상이 있습니다. 가장 남는 장면을 한 문장으로 늘려 보세요.";

  return `
    ${sections.join("")}
    <p class="muted">강도: ${intensity}</p>
    <p class="muted">질문: ${selectedPrompt}</p>
  `;
};

dreamForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = dreamInput.value.trim();
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

const commentModeKey = "dreamCommentMode";

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

const renderComments = (comments) => {
  if (comments.length === 0) {
    commentList.innerHTML = `<p class="muted">아직 댓글이 없습니다. 첫 번째 기록을 남겨보세요.</p>`;
    return;
  }

  commentList.innerHTML = comments
    .map(
      (comment) => `
        <div class="comment-item">
          <strong>${escapeHtml(comment.name)}</strong>
          <span>${escapeHtml(comment.text)}</span>
        </div>
      `
    )
    .join("");
};

const setCommentMode = (isOn) => {
  commentPanel.style.display = isOn ? "grid" : "none";
  commentToggle.setAttribute("aria-pressed", String(isOn));
  commentToggle.textContent = isOn ? "켜짐" : "꺼짐";
  localStorage.setItem(commentModeKey, isOn ? "on" : "off");
};

commentToggle.addEventListener("click", () => {
  const isOn = commentToggle.getAttribute("aria-pressed") !== "true";
  setCommentMode(isOn);
});

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = commentName.value.trim() || "익명";
  const text = commentText.value.trim();
  if (!text) {
    return;
  }
  addDoc(commentsRef, { name, text, createdAt: serverTimestamp() })
    .then(() => {
      commentText.value = "";
    })
    .catch((error) => {
      console.error("댓글 저장 실패:", error);
    });
});

const initialMode = localStorage.getItem(commentModeKey) !== "off";
setCommentMode(initialMode);

const subscribeComments = () => {
  const commentQuery = query(commentsRef, orderBy("createdAt", "desc"), limit(20));
  onSnapshot(
    commentQuery,
    (snapshot) => {
      const comments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name || "익명",
          text: data.text || "",
          createdAt: data.createdAt,
        };
      });
      renderComments(comments);
    },
    (error) => {
      console.error("댓글 불러오기 실패:", error);
      renderComments([]);
    }
  );
};

subscribeComments();
