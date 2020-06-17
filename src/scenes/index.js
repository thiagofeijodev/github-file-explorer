import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'

import App from 'scenes/App'
import Site from 'scenes/Site'
import GlobalStyles from './styles'

const Root = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Switch>
        <Route path="/ide" component={App} />
        <Route path="/" component={Site} />
      </Switch>
    </React.Fragment>
  )
}

export default withRouter(Root)
