'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fixtures = require('./fixtures/estimate-fixtures.json');
const { calculateBounds, parseEstimateAnswer, scoreEstimate } = require('../server/estimate');

test('12 fixtures có khoảng ước lượng đúng theo công thức 10%', () => {
  assert.equal(fixtures.length, 12);
  for (const fixture of fixtures) {
    const { lower, upper } = calculateBounds(fixture.result);
    assert.equal(lower, Math.ceil(0.9 * fixture.result), fixture.id + ' lower');
    assert.equal(upper, Math.floor(1.1 * fixture.result), fixture.id + ' upper');
  }
});

test('F01 chấp nhận cả hai cận và từ chối giá trị ngoài khoảng', () => {
  const bounds = calculateBounds(48);
  assert.deepEqual(bounds, { lower: 44, upper: 52 });
  assert.equal(scoreEstimate(10, { ...bounds, exact: 48 }, { estimate: 44, exact: 48 }).estimateCorrect, true);
  assert.equal(scoreEstimate(10, { ...bounds, exact: 48 }, { estimate: 52, exact: 48 }).estimateCorrect, true);
  assert.equal(scoreEstimate(10, { ...bounds, exact: 48 }, { estimate: 43, exact: 48 }).estimateCorrect, false);
  assert.equal(scoreEstimate(10, { ...bounds, exact: 48 }, { estimate: 53, exact: 48 }).estimateCorrect, false);
});

test('chấm điểm 50/50 cho đủ bốn tổ hợp', () => {
  const answer = { lower: 44, upper: 52, exact: 48 };
  assert.equal(scoreEstimate(10, answer, { estimate: 48, exact: 48 }).earnedPoints, 10);
  assert.equal(scoreEstimate(10, answer, { estimate: 48, exact: 47 }).earnedPoints, 5);
  assert.equal(scoreEstimate(10, answer, { estimate: 43, exact: 48 }).earnedPoints, 5);
  assert.equal(scoreEstimate(10, answer, { estimate: 43, exact: 47 }).earnedPoints, 0);
});

test('từ chối dữ liệu thiếu, sai kiểu hoặc âm', () => {
  const answer = { lower: 44, upper: 52, exact: 48 };
  for (const submitted of [null, {}, { estimate: 'abc', exact: 48 }, { estimate: -1, exact: 48 }, { estimate: 48, exact: 1.5 }]) {
    assert.throws(() => scoreEstimate(10, answer, submitted));
  }
});

test('parse đáp án JSON yêu cầu đủ lower, upper, exact hợp lệ', () => {
  assert.deepEqual(parseEstimateAnswer('{"lower":44,"upper":52,"exact":48}'), { lower: 44, upper: 52, exact: 48 });
  assert.throws(() => parseEstimateAnswer('not-json'));
  assert.throws(() => parseEstimateAnswer('{"lower":60,"upper":52,"exact":48}'));
});
