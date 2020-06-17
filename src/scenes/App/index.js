import React from 'react'
import { Redirect } from 'react-router-dom'
import { parse } from 'query-string'

import Composer from './components/Composer'
import Octokit from 'services/octokit'

function App() {
  let params = parse(document.location.search, { arrayFormat: 'bracket' })
  if (!params.owner || !params.repo) {
    return (
      <Redirect to="/" />
    )
  }

  const octokit = new Octokit({ params })
  return (
    <Composer service={octokit} />
  );
}

export default App
