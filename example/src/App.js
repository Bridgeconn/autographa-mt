import React from 'react';
import { ApplicationBar, BibleDropDown } from 'autographa-mt';

import 'autographa-mt/dist/index.css';

const App = () => {
  return (
    <div>
      <ApplicationBar />
      <BibleDropDown />
    </div>
  );
};

export default App;
