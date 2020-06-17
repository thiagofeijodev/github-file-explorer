import styled from 'styled-components'
import { Layout, Tabs, Skeleton} from 'antd'

export const StyledFullPage = styled(Layout)`
  height: 100vh;
`

export const StyledSider = styled(Layout.Sider)`
  overflow: auto;
  background-color: #ffffff !important;
`

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    background-color: #eff2f5 !important;
    margin-bottom: 0px !important;
  }
`

export const StyledContent = Layout.Content

export const StyledHeader = Layout.Header

export const StyledContentCodeViewer = styled.div`
  transform: translateY(40px);
  height: calc(100% - 40px) !important;
`

export const StyledTabPane = styled(Tabs.TabPane)`
  margin-bottom: 0px !important;
`

export const StyledSkeleton = () => 
  [1, 2, 3, 4, 5].map(v => <Skeleton key={v}/>)
