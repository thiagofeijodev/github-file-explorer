import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Root from 'scenes';
import * as theme from 'assets/theme'

render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('app')
);
