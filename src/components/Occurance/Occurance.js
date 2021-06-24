import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LaunchIcon from '@material-ui/icons/Launch';
import TranslateIcon from '@material-ui/icons/Translate';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    Paper: {
        width: '300px',
        height: '300px',
        borderRadius: '15px'
    },
    root: {
        padding: '10px'
    },

    center: {
        textAlign: 'center'
    },
    right: {
        textAlign: 'right'
    },
    h1: {
        fontWeight: 'bold'
    },
    Checkbox: {
        padding: 0
    },
    span2: {
        fontSize: 12,
        marginLeft: '5px'
    },
    // OccuranceContainer: {
    //     width: '90%',
    //     height: '70%',
    // },
    OccuranceSroll: {
        marginTop: '10px',
        maxHeight: '250px',
        overflow: 'scroll',
        scrollbarWidth: 'none',
    },
    sentence: {
        textAlign: 'justify',
        fontSize: 13,
        marginBottom: '2px',
        lineHeight: 1
    },
    bookName: {
        fontWeight: 'bold',
        fontSize: 12,

    },
    iconSize: {
        fontSize: 15,
    },
    Divider: {
        marginTop: '4px'
    }


});



export default function Occurance(props) {
    const classes = useStyles(props);
    const [checked, setChecked] = React.useState(false);
    const [occurance, setOccurance] = React.useState(props.occurance);

    const handleCheckBox = (event) => {
        setChecked(event.target.checked);
    };

    const DisplayOccurance = () => {
        if (occurance.length > 0) {
            return (
                occurance.map((occ) => {
                    return (
                        <Grid container direction='row'>
                            <Grid item md={4} className={classes.bookName}>
                                {props.bookName}
                            </Grid>
                            <Grid item md={2} >
                                <LaunchIcon className={classes.iconSize} />
                            </Grid>
                            <Grid item md={1}>
                                <TranslateIcon className={classes.iconSize} />
                            </Grid>
                            <Grid item md={12} className={classes.sentence}>
                                {occ.sentence}
                                <Divider className={classes.Divider} />
                            </Grid>
                        </Grid>
                    )
                })
            );
        }
    }

    console.log(occurance)
    return (
        <Paper elevation={3} className={classes.Paper}>
            <Grid className={classes.root} container direction='row'>
                <Grid item md={4}>
                    <span className={classes.h1}>Occurances</span>
                </Grid>
                <Grid item md={3} className={classes.center}>
                    1/5
                </Grid>
                {/* <Grid item md={5} className={classes.right}>
                    <Checkbox
                        className={classes.Checkbox}
                        size="small"
                        checked={checked}
                        onChange={handleCheckBox}
                    />
                    <span className={classes.span2}>Hide Translated</span>
                </Grid> */}

                {/* occurances */}

                <Grid item md={12}>
                    <Grid className={classes.OccuranceSroll}>
                        {occurance &&
                            DisplayOccurance()
                        }
                    </Grid>

                </Grid>

            </Grid>
        </Paper>
    );
}