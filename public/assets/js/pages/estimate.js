'use strict';

const ESTIMATE_SET_ID = 'estimate-set-01';
let estimateQuestions = [];

function makeEstimateCard(question, index) {
  const card = document.createElement('article');
  card.className = 'rounded-3xl bg-surface-container-lowest p-5 shadow-sm';
  const heading = document.createElement('h2');
  heading.className = 'mb-4 text-lg font-extrabold text-primary';
  heading.textContent = 'Câu ' + (index + 1) + ': ' + question.prompt.replace(' = ?', '');
  card.appendChild(heading);

  for (const field of [
    { key: 'estimate', label: '1. Kết quả ước lượng của em' },
    { key: 'exact', label: '2. Kết quả tính chính xác' },
  ]) {
    const label = document.createElement('label');
    label.className = 'mb-2 mt-3 block font-bold';
    label.textContent = field.label;
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.step = '1';
    input.inputMode = 'numeric';
    input.required = true;
    input.dataset.questionId = question.id;
    input.dataset.answerPart = field.key;
    input.className = 'w-full rounded-xl border border-outline bg-surface-container-low px-4 py-3 text-lg';
    input.setAttribute('aria-label', field.label + ' cho ' + question.prompt);
    label.appendChild(input);
    card.appendChild(label);
  }
  return card;
}

async function loadEstimateQuestions() {
  const list = document.getElementById('estimate-list');
  const error = document.getElementById('load-error');
  try {
    const data = await window.MathAPI.get('/api/question-sets/' + ESTIMATE_SET_ID + '/questions');
    estimateQuestions = data.questions.filter(q => q.type === 'estimate');
    if (estimateQuestions.length !== 12) throw new Error('Bộ câu hỏi chưa có đủ 12 câu.');
    list.replaceChildren(...estimateQuestions.map(makeEstimateCard));
  } catch (err) {
    error.textContent = err.message || 'Không tải được câu hỏi.';
    error.classList.remove('hidden');
    list.replaceChildren();
  }
}

async function submitEstimateAnswers() {
  const resultBox = document.getElementById('estimate-result');
  const inputs = [...document.querySelectorAll('[data-question-id][data-answer-part]')];
  const answers = {};
  for (const question of estimateQuestions) answers[question.id] = {};
  for (const input of inputs) {
    if (input.value.trim() === '' || !/^[0-9]+$/.test(input.value.trim())) {
      input.focus();
      alert('Em hãy nhập đầy đủ hai đáp án là số nguyên không âm cho mỗi câu nhé!');
      return;
    }
    answers[input.dataset.questionId][input.dataset.answerPart] = Number(input.value);
  }
  try {
    const data = await window.MathAPI.post('/api/submissions', {
      setId: ESTIMATE_SET_ID,
      answers,
      durationSec: 0,
    });
    const summary = document.createElement('div');
    summary.className = 'space-y-2';
    const title = document.createElement('h2');
    title.className = 'text-2xl font-extrabold text-primary';
    title.textContent = 'Em đạt ' + data.scorePercent + '%';
    const detail = document.createElement('p');
    detail.textContent = 'Đúng hoàn toàn ' + data.correctCount + '/' + data.totalCount + ' câu. Điểm ước lượng và tính chính xác đã được cộng riêng theo tỷ lệ 50% – 50%.';
    const stars = document.createElement('p');
    stars.textContent = 'Số sao nhận thêm: ' + data.starsEarned + '. Tổng sao hiện tại: ' + data.totalStars + '.';
    const feedbackList = document.createElement('ul');
    feedbackList.className = 'mt-4 space-y-2';
    data.detail.forEach((item, index) => {
      const row = document.createElement('li');
      row.className = 'rounded-xl bg-surface-container-low p-3';
      if (item.estimateCorrect !== undefined) {
        row.textContent = 'Câu ' + (index + 1) + ': Ước lượng ' +
          (item.estimateCorrect ? 'hợp lý' : 'chưa hợp lý') + '; tính chính xác ' +
          (item.exactCorrect ? 'đúng' : 'chưa đúng') + '. Điểm: ' +
          item.earnedPoints + '/' + item.maxPoints +
          '. Khoảng hợp lý: ' + item.correctAnswer.lower + '–' + item.correctAnswer.upper +
          '; kết quả chính xác: ' + item.correctAnswer.exact + '.';
      } else {
        row.textContent = 'Câu ' + (index + 1) + ': ' + (item.correct ? 'Đúng' : 'Chưa đúng') + '.';
      }
      feedbackList.appendChild(row);
    });
    summary.append(title, detail, stars, feedbackList);
    resultBox.replaceChildren(summary);
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (err) {
    alert('Chưa nộp được bài: ' + (err.message || 'Lỗi không xác định.'));
  }
}

document.getElementById('submit-estimates')?.addEventListener('click', submitEstimateAnswers);
loadEstimateQuestions();
