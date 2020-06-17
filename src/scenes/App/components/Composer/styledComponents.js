import styled from 'styled-components'
import { Layout, Tabs } from 'antd'

export const StyledFullPage = styled(Layout)`
  height: 100vh;
`

export const StyledSider = styled(Layout.Sider)`
  overflow: auto;
  background-color: #ffffff !important;
`

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 0px !important;
  }
`

export const StyledTabPane = styled(Tabs.TabPane)`
  margin-bottom: 0px !important;
`
