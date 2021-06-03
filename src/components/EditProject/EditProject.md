### Edit Project Page

This component will help to Edit the created Project

```js
import EditProject from './EditProject';

const [projectData, setProjectData] = React.useState({
  projectId: 100000,
  projectName: 'Mission Agape',
  sourceLanguage: {
    languageId: 100037,
    language: 'English',
    code: 'en',
    scriptDirection: 'left-to-right',
    metaData: {
      region: 'United Kingdom, Europe',
      'alternate-names': [
        'Anglit',
        'Kiingereza',
        'Gustavia English',
        'Samaná English',
        'Saint Lucian English',
        'Noongar',
        'Noonga',
        'Newcastle Northumber',
        'Neo-Nyungar (Noogar)',
        'Glaswegian',
        'Brummy',
        'Birmingham (Brummie)',
        'Bay Islands English',
        'Australian Standard English',
        'Aboriginal English',
        'African American Vernacular English (AAVE)',
      ],
      'suppress-script': 'Latn',
      'is-gateway-language': true,
    },
  },
  targetLanguage: {
    languageId: 100057,
    language: 'Hindi',
    code: 'hi',
    scriptDirection: 'left-to-right',
    metaData: {
      region: 'India, Asia',
      'alternate-names': [
        'Khadi Boli',
        'Khari Boli',
        'Dakhini',
        'Hindi-Urdu',
        'Khariboli',
      ],
      'suppress-script': 'Deva',
      'is-gateway-language': true,
    },
  },
  documentFormat: 'usfm',
  users: [
    {
      project_id: 100000,
      userId: 10101,
      userRole: 'owner',
      metaData: null,
      active: true,
    },
  ],
  metaData: {
    books: [],
    useDataForLearning: true,
  },
  active: true,
});

<>
  <EditProject projectData={projectData} />
</>;
```
