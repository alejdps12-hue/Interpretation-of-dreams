const dreamForm = document.querySelector("#dreamForm");
const dreamInput = document.querySelector("#dreamInput");
const dreamOutput = document.querySelector("#dreamOutput");
const sampleDreamButton = document.querySelector("#sampleDream");
const clearDreamButton = document.querySelector("#clearDream");

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

const sampleDreams = [
  "어두운 골목을 걷다가 낯선 문을 열었더니 따뜻한 빛이 쏟아졌다.",
  "높은 산을 오르는데 갑자기 하늘로 떠올라 도시를 내려다보았다.",
  "바닷가에서 파도가 멈추고, 나는 고요한 수면 위에 서 있었다.",
  "촛불이 꺼지지 않는 방에서 낡은 거울이 나를 바라보았다.",
];

const buildInterpretation = (text) => {
  const hits = symbolMap.filter((item) =>
    item.keywords.some((keyword) => text.includes(keyword))
  );
  const selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  if (!text.trim()) {
    return `<p class="muted">꿈을 입력하면 해석을 만들 수 있어요.</p>`;
  }

  if (hits.length === 0) {
    return `
      <h4>몽문의 흐름</h4>
      <p>선명한 기호가 드러나지 않았습니다. 대신 분위기와 감정에 집중해 보세요.</p>
      <p class="muted">질문: ${selectedPrompt}</p>
    `;
  }

  const meanings = hits.map((hit) => `<li>${hit.meaning}</li>`).join("");
  return `
    <h4>몽문의 신호</h4>
    <ul>${meanings}</ul>
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
