import { message } from "antd";

import { LS_KEY_GITHUB_REPO_PATH, LS_KEY_DBS_SCHEMA } from "../constants";
import { getDbTablesSchemaAsync } from "../githubDb";
import { getFile } from "../github";

const _loadDbsSchemaAsync = async (path) => {
  // Get all db names in root dir
  const files = await getFile(path);

  const dbsSchema = {
    /**
     * key must be:
     * - Top Nav title name
     * - Folder name in https://github.com/{user_name}/{repo_name}/tree/main/{path}
     */
    // dbName: []
  };

  await Promise.all(
    files
      .map(({ name }) => name)
      .map((dbName) =>
        getDbTablesSchemaAsync(dbName).then((tables) => {
          dbsSchema[dbName] = tables;
        })
      )
  );

  return dbsSchema;
};

export const reloadDbsSchemaAsync = async () => {
  const path = localStorage.getItem(LS_KEY_GITHUB_REPO_PATH);
  if (!path) {
    message.error("Repo path not found in localStorage!");
    return;
  }

  message.info("Start loading DBs schema...");
  const dbsSchema = await _loadDbsSchemaAsync(path);
  localStorage.setItem(LS_KEY_DBS_SCHEMA, JSON.stringify(dbsSchema));
  message.info("Finish loading DBs schema!");
};
