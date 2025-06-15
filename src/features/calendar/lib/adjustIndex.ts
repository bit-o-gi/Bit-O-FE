/**
 * @param index 
 * @param allIndices // 일정의 index 배열 ex) [0, 1, 2]
 * @returns 
 */
export const getAdjustedIndex = (index: number, allIndices: number[]): number => {
  // index가 3보다 작으면 그대로 반환
  if (index < 3) return index;

  // allIndices에서 3보다 작은 index를 필터링
  const usedIndices = allIndices.filter(idx => idx < 3);

  // allIndices에서 3보다 큰 index를 필터링하고 정렬
  const highIndices = allIndices
    .filter(idx => idx >= 3)
    .sort((a, b) => a - b);

  // highIndices에서 현재 index의 위치 찾기
  const highIndexPosition = highIndices.indexOf(index);

  // availableIndices (0,1,2)에서 사용되지 않은 index 찾기
  const availableIndices = [0, 1, 2].filter(idx => !usedIndices.includes(idx));

  // availableIndices가 있고 highIndexPosition이 -1이 아니면
  if (availableIndices.length > 0 && highIndexPosition !== -1) {
    // availableIndices의 순서대로 할당
    if (highIndexPosition < availableIndices.length) {
      return availableIndices[highIndexPosition];
    }
  }

  // 할당이 불가능하면 원본 index 반환
  return index;
};
