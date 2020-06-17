import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { StyledSyntaxHighlighter } from './styledComponents'

const CodeViewer = ({raw}) => {
  const codeString = raw || '(num) => num + 1';

  return (
    <StyledSyntaxHighlighter language="javascript" style={dark}>
      {codeString}
    </StyledSyntaxHighlighter>
  );
};

export default CodeViewer
