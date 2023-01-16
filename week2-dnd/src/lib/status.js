export const shiftStatusName = (status) => {
  let statusName;
  if (status === '할 일') statusName = 'todo';
  else if (status === '진행 중') statusName = 'proceeding';
  else statusName = 'done';

  return statusName;
};
