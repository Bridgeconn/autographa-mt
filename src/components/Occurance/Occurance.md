### Occurance Panel

This component will help to display the occurances of selected Tokens

```js
import React, { useState } from 'react';
import Occurance from './Occurance';
import TokenEdit from '../TokenEdit/TokenEdit';
import Grid from '@material-ui/core/Grid';

const [tokenDetail, setTokenDetail] = React.useState({
  token: 'which',
  occurrences: [
    {
      sentenceId: 63001001,
      offset: [5, 10],
    },
    {
      sentenceId: 63001001,
      offset: [35, 40],
    },
    {
      sentenceId: 63001001,
      offset: [56, 61],
    },
    {
      sentenceId: 63001001,
      offset: [90, 95],
    },
    {
      sentenceId: 63001002,
      offset: [106, 111],
    },
    {
      sentenceId: 63001003,
      offset: [5, 10],
    },
    {
      sentenceId: 63001005,
      offset: [25, 30],
    },
    {
      sentenceId: 63002007,
      offset: [70, 75],
    },
    {
      sentenceId: 63002007,
      offset: [135, 140],
    },
    {
      sentenceId: 63002008,
      offset: [43, 48],
    },
    {
      sentenceId: 63002024,
      offset: [33, 38],
    },
    {
      sentenceId: 63002024,
      offset: [81, 86],
    },
    {
      sentenceId: 63002027,
      offset: [18, 23],
    },
    {
      sentenceId: 63003024,
      offset: [125, 130],
    },
    {
      sentenceId: 63005009,
      offset: [96, 101],
    },
    {
      sentenceId: 63005016,
      offset: [37, 42],
    },
    {
      sentenceId: 65001010,
      offset: [48, 53],
    },
    {
      sentenceId: 65001011,
      offset: [25, 30],
    },
    {
      sentenceId: 65001011,
      offset: [49, 54],
    },
  ],
  translations: {},
});

const projectId = 100001;
const [onChangeSelector, setOnChangeSelector] = useState(1);
// ToDo: Add Token panel to demo to change token selected

<>
  <TokenEdit
    tokenDetail={tokenDetail}
    projectId={projectId}
    onChangeSelector={setOnChangeSelector}
  />
  <Grid style={{ marginLeft: '45px', marginTop: '10px' }}>
    <Occurance
      currentOccurance={onChangeSelector}
      tokenDetail={tokenDetail}
      projectId={projectId}
    />
  </Grid>
</>;
```
