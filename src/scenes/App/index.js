import React from 'react'
import { Redirect } from 'react-router-dom'
import { parse } from 'query-string'

import TreeList from 'components/TreeList'
import CodeViewer from 'components/CodeViewer'
import Octokit from 'services/octokit'

function App() {
  let params = parse(document.location.search, { arrayFormat: 'bracket' })

  if (!params.owner || !params.repo) {
    return (
      <Redirect to="/" />
    )
  }

  const octokit = new Octokit({ params })
  console.log('octokit');

  return (
    <div className="App">
      <TreeList />
      <CodeViewer />
    </div>
  );
}

export default App;
