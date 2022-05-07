export const uniq = (array) => [...new Set(array)];

/**
 * @param {Date} d
 * @returns {string} "2021-07-04 01:16:01"
 */
export const formatDate = (d) => {
  const pad = (num) => num.toString().padStart(2, "0");
  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
};
