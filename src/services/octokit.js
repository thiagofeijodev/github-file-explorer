import { Octokit } from '@octokit/rest';

class OctokitWrapper {

  defaultBranch = 'master'

  key = 'title'

  constructor({ params = {} }) {
    this.octokit = new Octokit({ auth: '98b9006761edbfd1b1fa9939c2ab624e4eebc7a5' })
    this.params = params
  }

  async getRoot() {
    const treeList = this.params.tree_sha || this.defaultBranch
    const tree = await this.getFromSha(treeList)
    return tree
  }

  async getFromSha(tree_sha, key = '') {
    const { data }  = await this.octokit.git.getTree({
      ...this.params,
      tree_sha
    })

    return data
      .tree
      .map(this.mapTree(key).bind(this))
      .sort(this.sortTree.bind(this))
  }

  async loadFile(sha) {
    const {owner, repo} = this.params

    const { data } = await this.octokit.git.getBlob({
      owner,
      repo,
      file_sha: sha
    })

    try {
      return decodeURIComponent(escape(window.atob( data.content )))
    } catch (err) {
      return 'can not load'
    }
  }

  mapTree = key => (data, index) => {
    return {
      [this.key]: data.path,
      sha: data.sha,
      key: `${key}${index}`,
      isLeaf: data.type === "blob",
    }
  }

  sortTree(a, b) {
    const prev = a[this.key].toString().toLowerCase()
    const next = b[this.key].toString().toLowerCase()

    if (!a.isLeaf && !b.isLeaf) {
      return prev > next ? 1 : 0
    }

    if (a.isLeaf && b.isLeaf) {
      return prev > next ? 1 : 0
    }

    if (a.isLeaf && !b.isLeaf) {
      return 1
    }

    if (!a.isLeaf && b.isLeaf) {
      return -1
    }

    return 0
  }

}

export default OctokitWrapper
