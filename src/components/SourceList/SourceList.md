### Source List

This Select Component will list all the bible sources from the database. It uses react-select.

```js
import SoureList from './SourceList';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const [sourceCard, setSourceCard] = useState('');
const [selectSourceLanguage, setSelectSourceLanguage] = React.useState('');

useEffect(() => {
  setSourceCard(
    selectSourceLanguage ? (
      <Card style={{ width: 400, marginTop: 20 }}>
        <CardContent>
          <Typography variant='h5' component='h5' gutterBottom>
            {selectSourceLanguage.sourceName}
          </Typography>
          <Typography>
            Content Type : {selectSourceLanguage.contentType.contentType}
          </Typography>
          <Typography>Language : {selectSourceLanguage.language.language}</Typography>
          <Typography>License : {selectSourceLanguage.license.name}</Typography>
          <Typography>Version: {selectSourceLanguage.version.versionName}</Typography>
          <Typography>Year: {selectSourceLanguage.year}</Typography>
        </CardContent>
      </Card>
    ) : (
      ''
    )
  );
}, [selectSourceLanguage, setSourceCard]);
<>
  <SoureList
    onChange={setSelectSourceLanguage}
    width={300}
    value={selectSourceLanguage}
    componentName={'Select Source'}
  />
  <Button
    variant='contained'
    color='primary'
    onClick={() => setSelectSourceLanguage(null)}
    style={{ margin: '10px 0' }}
  >
    Clear
  </Button>
  {sourceCard}
</>;
```
