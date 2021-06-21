### Source List

This Select Component will list all the bible sources from the database. It uses react-select.

```js
import SoureList from './SourceList';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const [source, setSource] = useState(null);
const [sourceCard, setSourceCard] = useState('');

useEffect(() => {
  setSourceCard(
    source ? (
      <Card style={{ width: 400, marginTop: 20 }}>
        <CardContent>
          <Typography variant='h5' component='h5' gutterBottom>
            {source.sourceName}
          </Typography>
          <Typography>
            Content Type : {source.contentType.contentType}
          </Typography>
          <Typography>Language : {source.language.language}</Typography>
          <Typography>License : {source.license.name}</Typography>
          <Typography>Version: {source.version.versionName}</Typography>
          <Typography>Year: {source.year}</Typography>
        </CardContent>
      </Card>
    ) : (
      ''
    )
  );
}, [source, setSourceCard]);
<>
  <SoureList
    onChange={setSourceLanguage}
    width={300}
    value={sourceLanguage}
    componentName={'Select Source'}
  />
  <Button
    variant='contained'
    color='primary'
    onClick={() => setSource(null)}
    style={{ margin: '10px 0' }}
  >
    Clear
  </Button>
  {sourceCard}
</>;
```
