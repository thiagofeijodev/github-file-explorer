import { Octokit } from '@octokit/rest';

class OctokitWrapper {

  defaultBranch = 'master'

  constructor({ TreeList, onLoadNode, params = {} }) {
    this.octokit = new Octokit()
    this.tree = TreeList
    this.onLoadNode = onLoadNode
    this.params = params

    const treeList = params.tree_sha || this.defaultBranch
    this.getFromSha(treeList)
  }

  async getFromSha(tree_sha) {
    const { data }  = await this.octokit.git.getTree({
      ...this.params,
      tree_sha
    })

    console.log(data);
    
  }

  mapTree(data) {
    const defaultNode = {
      name: data.path,
      sha: data.sha,
    }

    if (data.type === "blob")
      return defaultNode

    return {
        ...defaultNode,
        loading: true,
        children: []
    }
  }

  sortTree(a, b) {
    const prev = a.name.toString().toLowerCase()
    const next = b.name.toString().toLowerCase()

    if (!a.children && !b.children) {
      return prev > next ? 1 : 0
    }

    if (a.children && b.children) {
      return prev > next ? 1 : 0
    }

    if (a.children && !b.children) {
      return -1
    }

    if (!a.children && b.children) {
      return 1
    }

    return 0
  }

  /*
  async loadTreeList(urlParams, node) {
    const { data }  = await this.octokit.git.getTree(urlParams)

    const treeListData = data.tree.map(this.mapTree).sort(this.sortTree)

    if (node.children) {
      node.loading = false
      node.children.push(...treeListData)
      this.context.setState(() => ({ treeListData: this.treeListData }));
    } else {
      node.push(...treeListData)
      this.context.setState(() => ({ treeListData: this.treeListData }));
    }
  }

  async loadFile(params, node) {
    const {tabs} = this.context.state;

    params.file_sha = node.sha
    delete params.tree_sha

    const { data } = await this.octokit.git.getBlob(params)

    const rawFile = decodeURIComponent(escape(window.atob( data.content )));
    
    tabs.push({content: rawFile, name: node.name})
    this.context.setState(() => ({tab: <TabsView tabs={[...tabs]}/>, tabs: tabs}));
  }
    
  onToggle(node, toggled) {
    if (node.children) {
      node.toggled = toggled;
      this.loadTreeList(this.getParams(node.sha), node)
    } else {
      this.loadFile(this.getParams(), node)
    }
  }
  */

}

export default OctokitWrapper
