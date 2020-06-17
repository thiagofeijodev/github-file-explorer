import React from 'react'
import { Layout, Skeleton } from 'antd'

import TreeList from 'components/TreeList'
import CodeViewer from 'components/CodeViewer'

import { StyledFullPage, StyledSider, StyledTabs, StyledTabPane } from './styledComponents'

const { Header, Content } = Layout;

const Composer = ({ service }) => {
  const [file, setFile] = React.useState(null)
  const [files, setFiles] = React.useState({})
  const [opens, setOpens] = React.useState([])
  const [activeKey, setActiveKey] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      const newOpens = opens.filter(o => o.key != targetKey)
      setOpens(newOpens)

      if (targetKey == activeKey) {
        if (newOpens.length) {
          setActiveKey(newOpens[0].key)
        } else {
          setActiveKey(null)
          setFile(null)
        }
      }
    }
  }

  const onOpenFile = node => {
    const index = opens.findIndex(open => open.sha === node.sha)
    if (index >= 0) return setActiveKey(index.toString())

    setOpens(
      origin => [...origin, node],
      setActiveKey(node.key)
    )
  }

  React.useEffect(() => {
    const open = opens.find(open => open.key === activeKey)
    if (!activeKey || !open) return setFile(null)

    const { sha } = open
    if(files[sha]) return setFile(files[sha])

    const load = async () => {
      setIsLoading(true)
      const raw = await service.loadFile(sha)

      setFiles(origin => ({
        ...origin,
        [sha]: raw
      }), setFile(raw))
      setIsLoading(false)
    }
    load()
  }, [activeKey])

  return (
    <StyledFullPage>
      <Header className="header">
      </Header>
      <Layout>
        <StyledSider width={200}>
          <TreeList service={service} onOpenFile={onOpenFile} />
        </StyledSider>
        <Layout>
          <Content className="site-layout-background">
            <StyledTabs
              hideAdd
              type="editable-card"
              activeKey={activeKey}
              onChange={setActiveKey}
              onEdit={onEdit}
            >
              {opens.map((pane, index) => (
                <StyledTabPane tab={pane.title} key={pane.key} closable={true} />
              ))}
            </StyledTabs>
            {isLoading ? <Skeleton /> : file ? <CodeViewer raw={file}/> : null}
          </Content>
        </Layout>
      </Layout>
    </StyledFullPage>
  );
}

export default Composer
