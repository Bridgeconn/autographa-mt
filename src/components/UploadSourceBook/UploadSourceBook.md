### Upload Book To Source

This component helps to upload bible books to a source

```js
import Box from '@material-ui/core/Box';
import UploadSourceBook from './UploadSourceBook';
import SourceList from '../SourceList';

const [source, setSource] = React.useState(null);
<Box display='flex'>
  <SourceList
    onChange={setSource}
    width={300}
    value={source}
    componentName={'Select Source'}
  />
  <UploadSourceBook source={source} />
</Box>;
```
