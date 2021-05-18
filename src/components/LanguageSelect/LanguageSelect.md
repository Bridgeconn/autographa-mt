### Language Select Dropdown

This component loads the list of languages.
It uses react-select and fetches the list of languages from the vachan-api v2

```js
import { useState, useEffect } from 'react';
import LanguageSelect from './LanguageSelect';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const [sourceLanguage, setSourceLanguage] = useState('');
const [languageCard, setLanguageCard] = useState('');
useEffect(() => {
  setLanguageCard(
    sourceLanguage ? (
      <Card style={{ width: 400, marginTop: 20 }}>
        <CardContent>
          <Typography variant='h5' component='h5' gutterBottom>
            {sourceLanguage.language}
          </Typography>
          <Typography>Language Id : {sourceLanguage.languageId}</Typography>
          <Typography>Language Code : {sourceLanguage.code}</Typography>
          <Typography>
            Script Direction: {sourceLanguage.scriptDirection}
          </Typography>
        </CardContent>
      </Card>
    ) : (
      ''
    )
  );
}, [sourceLanguage, setLanguageCard]);
<>
  <LanguageSelect onChange={setSourceLanguage} width={300} />
  {languageCard}
</>;
```
