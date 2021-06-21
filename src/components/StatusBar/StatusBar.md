### Status Bar

```js
import { useState } from 'react';
const [progressBar, setProgressBar] = React.useState(50);
import StatusBar from './StatusBar';

<StatusBar value={progressBar}/>;

```