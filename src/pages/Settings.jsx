import React from "react";
import { Button, Input } from "antd";

import {
  LS_KEY_GITHUB_OWNER,
  LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN,
  LS_KEY_GITHUB_REPO_NAME,
  LS_KEY_GITHUB_REPO_PATH,
} from "../constants";
import { reloadDbsSchemaAsync } from "./helpers";
import { dbs } from "../dbs";

/**
 * To save online db tables schema in the local db, then pages could load faster
 */
export default class Settings extends React.Component {
  state = {
    owner: "",
    repo: "",
    personalToken: "",
    path: "",
  };

  componentDidMount() {
    this.setState({
      owner: localStorage.getItem(LS_KEY_GITHUB_OWNER),
      repo: localStorage.getItem(LS_KEY_GITHUB_REPO_NAME),
      personalToken: localStorage.getItem(LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN),
      path: localStorage.getItem(LS_KEY_GITHUB_REPO_PATH),
    });
  }

  handleSavePath = () => {
    localStorage.setItem(LS_KEY_GITHUB_OWNER, this.state.owner);
    localStorage.setItem(LS_KEY_GITHUB_REPO_NAME, this.state.repo);
    localStorage.setItem(
      LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN,
      this.state.personalToken
    );
    localStorage.setItem(LS_KEY_GITHUB_REPO_PATH, this.state.path);
  };

  handleChange = (key) => (event) =>
    this.setState({ [key]: event.target.value });

  handleLoadDbs = () => {
    reloadDbsSchemaAsync();
  };

  renderDbActions = () => {
    if (!localStorage.getItem(LS_KEY_GITHUB_REPO_PATH)) {
      return null;
    }
    return (
      <div>
        Load dbs schema from github to local db{" "}
        <Button onClick={this.handleLoadDbs}>Load DBs</Button>
      </div>
    );
  };

  render() {
    if (dbs) return this.props.children;

    return (
      <div>
        Settings
        <div>
          Owner:{" "}
          <Input
            placeholder="e.g. user_name"
            value={this.state.owner}
            onChange={this.handleChange("owner")}
          />{" "}
          <br />
          Personal token:{" "}
          <Input
            placeholder="e.g. 123"
            value={this.state.personalToken}
            onChange={this.handleChange("personalToken")}
          />{" "}
          <br />
          Repo:{" "}
          <Input
            placeholder="e.g. repo_name"
            value={this.state.repo}
            onChange={this.handleChange("repo")}
          />{" "}
          <br />
          Path:{" "}
          <Input
            placeholder="e.g. dbs_path"
            value={this.state.path}
            onChange={this.handleChange("path")}
          />{" "}
          (A path in a github repo)
          <br />
          <Button onClick={this.handleSavePath}>Save</Button>
        </div>
        {this.renderDbActions()}
      </div>
    );
  }
}
