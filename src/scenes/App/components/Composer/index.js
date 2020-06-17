import React from 'react'
import { Layout } from 'antd'

import TreeList from 'components/TreeList'
import CodeViewer from 'components/CodeViewer'
import safeExec from 'services/safeExec'

import { 
  StyledFullPage,
  StyledSider,
  StyledTabs,
  StyledTabPane,
  StyledSkeleton,
  StyledContent,
  StyledHeader,
  StyledContentCodeViewer as Content,
} from './styledComponents'

const Composer = ({ service }) => {
  const [file, setFile] = React.useState(null)
  const [files, setFiles] = React.useState({})
  const [openFiles, setOpenFiles] = React.useState([])
  const [activeTab, setActiveTab] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      const newOpenFiles = openFiles.filter(o => o.key != targetKey)
      setOpenFiles(newOpenFiles)

      if (targetKey === activeTab) {
        if (newOpenFiles.length) {
          setActiveTab(newOpenFiles[0].key)
        } else {
          setActiveTab(null)
          setFile(null)
        }
      }
    }
  }

  const onOpenFile = node => {
    const index = openFiles.findIndex(file => file.sha === node.sha)
    if (index >= 0) return setActiveTab(index.toString())

    setOpenFiles(
      origin => [...origin, node],
      setActiveTab(node.key)
    )
  }

  React.useEffect(() => {
    const open = openFiles.find(file => file.key === activeTab)
    if (!activeTab || !open) return setFile(null)

    const { sha, title } = open
    if(files[sha]) return setFile(files[sha])

    const load = async () => {
      setIsLoading(true)
      const raw = await service.loadFile(sha)
      const file = {
        name: title,
        raw: raw,
      }

      setFiles(origin => ({
        ...origin,
        [sha]: file
      }), setFile(file), setIsLoading(false))
    }

    safeExec(load.bind(this), () => setIsLoading(false))
  }, [activeTab])

  return (
    <StyledFullPage>
      <StyledHeader className="header">
      </StyledHeader>
      <Layout>
        <StyledSider width={200}>
          <TreeList service={service} onOpenFile={onOpenFile} />
        </StyledSider>
        <Layout>
          <StyledContent className="site-layout-background">
            <StyledTabs
              hideAdd
              type="editable-card"
              activeKey={activeTab}
              onChange={setActiveTab}
              onEdit={onEdit}
            >
              {openFiles.map((pane) => (
                <StyledTabPane tab={pane.title} key={pane.key} closable={true} />
              ))}
            </StyledTabs>
            {isLoading 
              ? <StyledSkeleton /> 
              : file 
                ? <Content><CodeViewer {...file} /></Content>
                : null}
          </StyledContent>
        </Layout>
      </Layout>
    </StyledFullPage>
  );
}

export default Composer
