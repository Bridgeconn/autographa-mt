### Token Translation Updation

This component will help to update the token Translation

```js
import { useState, useEffect } from 'react';
import TokenTranslationUpdate from './TokenTranslationUpdate';

const [tokenDetail, setTokenDetail] = React.useState({
  "token": "of Jesus",
    "occurrences": [
      {
        "sentenceId": 61001001,
        "offset": [
          18,
          26
        ]
      },
      {
        "sentenceId": 61001002,
        "offset": [
          137,
          145
        ]
      },
      {
        "sentenceId": 61001003,
        "offset": [
          156,
          164
        ]
      },
      {
        "sentenceId": 61001007,
        "offset": [
          179,
          187
        ]
      },
      {
        "sentenceId": 61001013,
        "offset": [
          135,
          143
        ]
      },
      {
        "sentenceId": 61003021,
        "offset": [
          179,
          187
        ]
      }
    ],
    "translations": {}
});

const projectId = 100048;

<>
  <TokenTranslationUpdate tokenDetail={tokenDetail} projectId={projectId} />
</>;
```
