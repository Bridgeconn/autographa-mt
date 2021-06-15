### Token Translation Updation

This component will help to update the token Translation

```js
import { useState, useEffect } from 'react';
import TokenTranslationUpdate from './TokenTranslationUpdate';

const [tokenDetail, setTokenDetail] = React.useState({
  token: 'સત્યમાં',
  occurrences: [
    {
      sentenceId: 65001004,
      offset: [12, 19],
    },
    {
      sentenceId: 65001003,
      offset: [34, 41],
    },
    {
      sentenceId: 65001001,
      offset: [13, 20],
    },
  ],
  translations: {},
});

const projectId = 100000;

<>
  <TokenTranslationUpdate tokenDetail={tokenDetail} projectId={projectId} />
</>;
```
