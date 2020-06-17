import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { StyledSyntaxHighlighter } from './styledComponents'

const SERVICE_EXTENSION = {
  "dart": "dart",
  "js": "javascript",
  "ts": "typescript",
  "swift": "swift",
  "py": "python",
  "pyc": "python",
  "pyo": "python",
  "pyd": "python",
  "php": "php",
  "rs": "rust",
  "rb": "ruby",
  "rbw": "ruby",
  "R": "r",
  "sh": "powershell",
  "csh": "powershell",
  "cpp": "cpp",
  "j": "java",
  "jav": "java",
  "java": "java",
  "yaml": "yaml",
  "yml": "yaml",
  "xml": "xml",
}

const EXP_EXTENSION = /(?:\.([^.]+))?$/

const CodeViewer = ({name, raw}) => {
  const codeString = raw || '(num) => num + 1';

  const ext = EXP_EXTENSION.exec(name)[1]
  const lang = ext && SERVICE_EXTENSION[ext] || 'javascript'

  return (
    <StyledSyntaxHighlighter 
      language={lang} 
      style={dark}>
      {codeString}
    </StyledSyntaxHighlighter>
  );
};

export default CodeViewer
