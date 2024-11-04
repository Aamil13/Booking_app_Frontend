export function pagination(totalPages: number) {
  let paginatedNumber = [];
  for (let i = 1; i <= totalPages; i++) {
    paginatedNumber.push(i.toString());
  }
  return paginatedNumber;
}
