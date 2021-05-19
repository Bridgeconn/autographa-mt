import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import LanguageSelect from '../LanguageSelect/LanguageSelect.js';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function CreateProject() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [useDataForLearning, setUseDataForLearning] = useState(false);



  const [all_languages, setAll_languages] = useState([]);
  const [selectedsources, setSelectedSources] = useState('');
  const [selectedlanguage, setSelectedlanguage] = useState('');
  const [responseStatus, setResponseStatus] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [opensuccess, setopensuccess] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };

  const handlePostClose = () => {
    setopensuccess(false);
  };

  const getLanguages = () => {
    axios
      .get('http://206.189.131.230/v2/languages')
      .then((response) => {
        setAll_languages(response.data);
      })
      .catch((error) => {
        console.error('Something went wrong!', error);
      });
  };

  useEffect(() => {
    getLanguages();
  }, []);

  const onClick = () => {
    if (JSON.stringify(selectedlanguage) === JSON.stringify(selectedsources)) {
      setOpen(true);
    } else {
      const data = {
        projectName: name,
        sourceLanguageCode: !selectedsources ? '' : selectedsources.code,
        targetLanguageCode: !selectedlanguage ? '' : selectedlanguage.code,
        useDataForLearning: useDataForLearning,
        stopwords: {
          prepositions: [
            'कोई',
            'यह',
            'इस',
            'इसे',
            'उस',
            'कई',
            'इसी',
            'अभी',
            'जैसे'
          ],
          postpositions: [
            'के',
            'का',
            'में',
            'की',
            'है',
            'और',
            'से',
            'हैं',
            'को',
            'पर'
          ]
        },
        punctuations: [
          ',',
          '"',
          '!',
          '.',
          ':',
          ';',
          '\n',
          '\\',
          '“',
          '”',
          '“',
          '*',
          '।',
          '?',
          ';',
          "'",
          '’',
          '(',
          ')',
          '‘',
          '—'
        ],
        active: true
      };

      axios
        .post('http://206.189.131.230/v2/autographa/projects', data)
        .then((response) => {
          setResponseStatus([response.data.message, 'success']);
        })
        .catch((error) => {
          setResponseStatus([error.response.data.error, 'error']);
        });
      setopensuccess(true);
    }
  };

  const clearState = () => {
    setName('');
    setSelectedlanguage('');
    setUseDataForLearning(false);
    setSelectedSources('');
  };

  const languageData = [];
  if (all_languages != null) {
    Object.values(all_languages).map((lang) => {
      languageData.push({
        label: lang.language,
        value: lang.languageId,
        code: lang.code
      });
    });
  }

  const canBeSubmitted = () => {
    return (
      name.length > 0 &&
      selectedsources instanceof Object &&
      selectedlanguage instanceof Object
    );
    // }
  };

  const isEnabled = canBeSubmitted();
  return (
    <Grid container direction="row" spacing={1}>

      <Grid item md={5} sm={12}  container justify="flex-start" alignItems="center" style={{paddingLeft:'80px'}}>
        <span style={{ fontSize: '16px' }}>Name</span>
      </Grid>
      <Grid item md={7} sm={12} container justify="flex-start" alignItems="flex-start">
        <form  noValidate autoComplete='off'>
          <TextField
            id='outlined-size-small'
            variant='outlined'
            size='small'
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ style: { padding: '8px' } }}
          />
        </form>
      </Grid>


      <Grid item md={5} sm={12}  container justify="flex-start" alignItems="center" style={{paddingLeft:'80px'}}>
        <span style={{ fontSize: '16px' }}>Source Language</span>
      </Grid>
      <Grid item md={7} sm={12} container justify="flex-start" alignItems="flex-start">
        <LanguageSelect onChange={setSourceLanguage} width={212} />
      </Grid>


      <Grid item md={5} sm={12}  container justify="flex-start" alignItems="center" style={{paddingLeft:'80px'}}>
        <span style={{ fontSize: '16px' }}>Target Language</span>
      </Grid>
      <Grid item md={7} sm={12} container justify="flex-start" alignItems="flex-start">
        <LanguageSelect onChange={setTargetLanguage} width={212} />
      </Grid>



      <Grid item md={12} sm={12}  container justify="space-evenly" alignItems="center" style={{paddingLeft:'80px', paddingRight:'190px', marginTop:'15px'}}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
              Advanced Options
            </span>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container item sm={12}>
              <Grid item sm={12}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {' '}
                  Stop Words
                </span>
              </Grid>
              <Grid item sm={12} style={{ paddingLeft: '12px', fontSize: '14px', marginTop: '6px'}}>
                <span> Pre Position - pre1, pre2, pre3...</span>
              </Grid>
              <Grid item sm={12} style={{ paddingLeft: '12px', fontSize: '14px' }}>
                <span> Post Position - post1, post2, post3...</span>
              </Grid>
              <Grid item sm={12} style={{ marginTop: '6px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {' '}
                  Punctuations
                </span>
              </Grid>
              <Grid item sm={12} style={{ paddingLeft: '12px', fontSize: '14px', marginTop: '6px'}}>
                <span> [. , ; ' [ {} - @ ^ *</span>
              </Grid>
            </Grid>
          </AccordionDetails>
            </Accordion>
      </Grid>



      <Grid item md={5} sm={6}  container justify="flex-start" alignItems="center" style={{paddingLeft:'80px', marginTop:'15px'}}>
        <span style={{ fontSize: '14px' }}>Use Data For Learning</span>
      </Grid>
      <Grid item md={7} sm={8}  container justify="flex-start" alignItems="center" style={{marginTop:'15px'}}>
        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} onChange={(e) => setUseDataForLearning(e.target.checked)}/>
      </Grid>
    


      <Grid item md={3} sm={4}  container justify="flex-end" alignItems="center" style={{paddingLeft:'80px', marginTop:'20px', marginBottom:'20px'}}>
        <Button size='small' disabled={!isEnabled} variant='contained' color='primary' onClick={onClick}>
          Save
        </Button>
      </Grid>
      <Grid item md={3} sm={4}  container justify="flex-start" alignItems="center" style={{paddingLeft:'20px', marginTop:'20px', marginBottom:'20px'}}>
      <Button size='small' variant='contained' color='secondary' onClick={clearState}>
        Cancel
        </Button>
      </Grid>
      <Grid item md={6} sm={4} container justify="flex-start" alignItems="flex-start"></Grid>


      
    </Grid>
  );
}
