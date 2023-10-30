import core from "@actions/core"
import github from "@actions/github"
import changes from "./changes.json"

const previousVersionComponents = changes[0].id.split(".")

const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);

const { context = {} } = github;