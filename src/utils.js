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

export const getPrimaryKey = (columns) => {
  const foundCol = columns.find((col) => col.primary);
  if (foundCol) {
    return foundCol.id;
  }

  console.warn('Primary key not found in columns, fallback to "id"!');
  return "id";
};

export const getTablePrimaryKey = (tables, tableName) => {
  const foundTable = tables.find((table) => table.name === tableName);
  if (!foundTable) {
    console.warn(
      'reference table not found, fallback to use "id" as primaryKey'
    );
    return "id";
  }

  return getPrimaryKey(foundTable.columns);
};
