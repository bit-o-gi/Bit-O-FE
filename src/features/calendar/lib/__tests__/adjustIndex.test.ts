import { describe, it, expect } from 'vitest';
import { getAdjustedIndex } from '../adjustIndex';

// 테스트코드 문구들 한글로 바꿔줘
describe('getAdjustedIndex', () => {
  it('index가 3보다 작으면 그대로 반환', () => {
    expect(getAdjustedIndex(0, [0, 1, 2])).toBe(0);
    expect(getAdjustedIndex(1, [0, 1, 2])).toBe(1);
    expect(getAdjustedIndex(2, [0, 1, 2])).toBe(2);
  });

  it('lower indices가 없으면 그대로 반환', () => {
    expect(getAdjustedIndex(3, [0, 1, 2, 3])).toBe(3);
    expect(getAdjustedIndex(4, [0, 1, 2, 4])).toBe(4);
  });

  it('lower indices가 없으면 lower indices 중 첫번째 index로 재할당', () => {
    expect(getAdjustedIndex(3, [0, 3])).toBe(1);
    expect(getAdjustedIndex(3, [0, 1, 3])).toBe(2);
  });

  it('높은 index가 여러개 있으면 순서대로 재할당', () => {
    expect(getAdjustedIndex(3, [3, 4])).toBe(0);
    expect(getAdjustedIndex(4, [3, 4])).toBe(1);
  });

  it('lower indices가 일부 사용되면 lower indices 중 첫번째 index로 재할당', () => {
    expect(getAdjustedIndex(3, [1, 3])).toBe(0);
    expect(getAdjustedIndex(3, [0, 3])).toBe(1);
  });

  it('높은 index가 여러개 있으면 순서대로 재할당', () => {
    const allIndices = [0, 3, 4, 5];
    expect(getAdjustedIndex(3, allIndices)).toBe(1);
    expect(getAdjustedIndex(4, allIndices)).toBe(2);
  });
});
