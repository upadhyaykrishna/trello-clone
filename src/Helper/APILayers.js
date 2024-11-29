export async function fetchBoardList() {
  const localStorageData = JSON.parse(
    localStorage.getItem('data') || "[]"
  );
  return localStorageData;
}

export function updateLocalStorageBoards(boards) {
  localStorage.setItem('data', JSON.stringify(boards));
}