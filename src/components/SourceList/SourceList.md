### Source Language Select

This Select Component will list all the source language from the database. It uses react-select.

```js
import SoureList from './SourceList';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const [sourceLanguage, setSourceLanguage] = useState('');
const [languageCard, setLanguageCard] = useState('');

useEffect(() => {
  setLanguageCard(
    sourceLanguage ? (
      <Card style={{ width: 400, marginTop: 20 }}>
        <CardContent>
          <Typography variant='h5' component='h5' gutterBottom>
            {sourceLanguage.sourceName}
          </Typography>
          <Typography>
            Language Id : {sourceLanguage.language.languageId}
          </Typography>
          <Typography>
            Language Code : {sourceLanguage.language.code}
          </Typography>
          <Typography>
            Script Direction: {sourceLanguage.language.scriptDirection}
          </Typography>
        </CardContent>
      </Card>
    ) : (
      ''
    )
  );
}, [sourceLanguage, setLanguageCard]);
<>
  <SoureList onChange={setSourceLanguage} width={300} value={sourceLanguage} />
  <Button
    variant='contained'
    color='primary'
    onClick={() => setSourceLanguage(null)}
    style={{ margin: '10px 0' }}
  >
    Clear
  </Button>
  {languageCard}
</>;
```
