import React, { useState } from 'react';
import { ApplicationBar, BibleDropDown, LanguageSelect } from 'autographa-mt';

import 'autographa-mt/dist/index.css';

const App = () => {
  const [sourceLanguage, setSourceLanguage] = useState('');
  console.log(sourceLanguage);
  return (
    <div>
      <ApplicationBar />
      <BibleDropDown />
      <LanguageSelect onChange={setSourceLanguage} width={300} />
    </div>
  );
};

export default App;
