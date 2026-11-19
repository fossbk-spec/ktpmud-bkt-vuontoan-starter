'use strict';

function parseNonNegativeInteger(value) {
  if (typeof value === 'number') {
    return Number.isSafeInteger(value) && value >= 0 ? value : null;
  }
  if (typeof value === 'string' && /^[0-9]+$/.test(value.trim())) {
    const parsed = Number(value.trim());
    return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null;
  }
  return null;
}

function calculateBounds(result) {
  const exact = parseNonNegativeInteger(result);
  if (exact === null || exact > Math.floor(Number.MAX_SAFE_INTEGER / 11)) {
    throw new TypeError('Kết quả phép tính phải là số nguyên không âm hợp lệ.');
  }
  return {
    lower: Math.ceil((9 * exact) / 10),
    upper: Math.floor((11 * exact) / 10),
  };
}

function parseEstimateAnswer(raw) {
  let parsed;
  try {
    parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    throw new TypeError('Dữ liệu đáp án ước lượng trong cơ sở dữ liệu không hợp lệ.');
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new TypeError('Dữ liệu đáp án ước lượng trong cơ sở dữ liệu không hợp lệ.');
  }
  const lower = parseNonNegativeInteger(parsed.lower);
  const upper = parseNonNegativeInteger(parsed.upper);
  const exact = parseNonNegativeInteger(parsed.exact);
  if (lower === null || upper === null || exact === null || lower > upper) {
    throw new TypeError('Dữ liệu đáp án ước lượng trong cơ sở dữ liệu không hợp lệ.');
  }
  return { lower, upper, exact };
}

function scoreEstimate(points, answer, submitted) {
  const estimate = parseNonNegativeInteger(submitted && submitted.estimate);
  const exact = parseNonNegativeInteger(submitted && submitted.exact);
  if (estimate === null || exact === null) {
    throw new TypeError('Mỗi câu ước lượng cần có hai đáp án là số nguyên không âm.');
  }
  const estimateCorrect = estimate >= answer.lower && estimate <= answer.upper;
  const exactCorrect = exact === answer.exact;
  const earnedPoints = points * ((estimateCorrect ? 0.5 : 0) + (exactCorrect ? 0.5 : 0));
  return {
    estimate,
    exact,
    estimateCorrect,
    exactCorrect,
    correct: estimateCorrect && exactCorrect,
    earnedPoints,
    maxPoints: points,
  };
}

module.exports = { parseNonNegativeInteger, calculateBounds, parseEstimateAnswer, scoreEstimate };
