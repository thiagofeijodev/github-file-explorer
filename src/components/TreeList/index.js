import React, { useState } from 'react'
import { Tree } from 'antd'
import updateTreeData from 'services/antdUpdateTree'

const TreeList = ({ service, onOpenFile }) => {
  const [treeData, setTreeData] = useState([])
  const [expandedKeys, setExpandedKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  const onSelect = (selectedKeys, info) => {
    if (info.node.isLeaf) {
      return onOpenFile(info.node)
    }
    
    if (expandedKeys.find(key => selectedKeys.includes(key))) {
      setExpandedKeys(origin => 
        origin.filter(key => !selectedKeys.includes(key)))
    } else {
      setExpandedKeys(origin => [...origin, ...selectedKeys], 
        setSelectedKeys([]))
    }
  };

  function onLoadData({sha, key, children}) {
    return new Promise(async resolve => {
      if (children) return resolve()

      const data = await service.getFromSha(sha, `${key}-`)
      setTreeData(origin => updateTreeData(origin, key, data), resolve())
    })
  }

  React.useEffect(() => {
    (async function load() {
      const tree = await service.getRoot()
      setTreeData(tree)
    })()
  }, [])

  return (
    <Tree
      showLine
      expandedKeys={expandedKeys}
      onExpand={setExpandedKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      loadData={onLoadData}
      treeData={treeData}
    />
  )
}

export default TreeList
