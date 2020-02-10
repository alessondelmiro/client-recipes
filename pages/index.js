import React from 'react';
import { 
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActionArea,
  makeStyles
} from '@material-ui/core';
import Router from 'next/router';
import Footer from '../components/Footer';
import fetch from 'isomorphic-unfetch';
import EntryUtils from '../utils/EntryUtils.js';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    backgroundColor: '#fafafa',
    padding: '10px 0'
  },
  box: {
    backgroundColor: 'white',
    width: '75%',
    margin: '0 auto',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: 'grey',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
  list: {
    padding: '10px'
  },
  listItem: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
  root: {
    height: 235
  },
  media: {
    height: 140,
  },
  truncated: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

const Index = ({ recipes }) => {
  const classes = useStyles();
  return (
    <Grid item container justify="center" direction="column" className={classes.container}>
      <Grid container my={4} alignItems="center" direction="column" className={classes.box}>
        <Grid item container direction="column" alignItems="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Marley Spoon 
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            Recipes
          </Typography>
        </Grid>
        
        <Grid item container className={classes.list} alignItems="center" direction="row" spacing={2}>
          {recipes.map((recipe) => 
            <Grid item className={classes.listItem} >
              <Card className={classes.root} onClick={() => Router.push("/recipes/[id]", `/recipes/${recipe.id}`)}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={recipe.image}
                    title={recipe.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2"  className={classes.truncated}>
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.truncated}>
                      {recipe.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

            </Grid>
          )}
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
}

Index.getInitialProps = async () => {

  const nw = await fetch(' https://cdn.contentful.com/spaces/kk2bw5ojx476/entries?sys.contentType.sys.id=recipe', {
    headers: {
      'Authorization': 'Bearer 7ac531648a1b5e1dab6c18b0979f822a5aad0fe5f1109829b8a197eb2be4b84c'
    }
  });
  const entries = await nw.json();
  const assets = entries.includes && entries.includes.Asset ? entries.includes.Asset : [];
  let entriesItems = entries.items ? entries.items : [];
  entriesItems = EntryUtils.entriesToArray(entriesItems, assets);

  return {
    recipes: entriesItems.recipes
  };
  
};


export default Index;
