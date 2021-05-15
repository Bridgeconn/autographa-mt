This component loads the list of languages.

It uses react-select and fetches the list of languages from the vachan-api

### Simple example

```js
import { useState } from 'react';
import LanguageSelect from './LanguageSelect';

const [sourceLanguage, setSourceLanguage] = useState('');
console.log(sourceLanguage);
<LanguageSelect onChange={setSourceLanguage} width={300} />;
```
