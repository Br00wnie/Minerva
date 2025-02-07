export const logAction = (label, ...params) => {
  console.group(`${label}: ${new Date().toISOString()}`);
  params.forEach((param) => {
    console.log(param);
  });
  console.groupEnd();
};
