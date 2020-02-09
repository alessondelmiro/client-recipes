import React from 'react';
import { 
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActionArea,
  Chip,
  makeStyles
} from '@material-ui/core';
import Footer from '../../components/Footer';
import EntryUtils from '../../utils/EntryUtils.js';
import fetch from 'isomorphic-unfetch';

const recipe = {id: 1, title: 'Cuscuz com leite', image: 'https://img.itdg.com.br/images/recipes/000/134/890/64027/64027_original.jpg', tags: ['bom', 'barato', 'nordeste'], description: 'Melhor comida ever Melhor comida ever Melhor comida ever Melhor comida ever Melhor comida ever', chef: 'Alesson'};

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    backgroundColor: '#fafafa',
    padding: '10px 0',
    [theme.breakpoints.down('sm')]: {
    },
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
  descriptionText: {
    padding: '10px 0',
  },
  root: {
    width: '100%'
  },
  media: {
    height: 480,
    [theme.breakpoints.down('sm')]: {
      height: 189,
      backgroundSize: 'contain'
    },
  },
  label: {
    fontWeight: 'bold'
  },
  chip: {
    textTransform: 'capitalize'
  }
}));

const Recipe = ({recipe}) => {
  const classes = useStyles();
  return (
    <Grid item container justify="center" direction="column" className={classes.container}>
      <Grid container alignItems="center" direction="column" className={classes.box}>
        <Grid item container direction="column" alignItems="center">
          <Card className={classes.root} >
            <CardActionArea>
              <CardMedia
              className={classes.media}
              image={recipe.image}
              title={recipe.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {recipe.title}
                </Typography>

                <Grid item container direction="row" spacing={1}>
                  <Grid item>
                    <Typography variant="h6" color="textSecondary" component="p" className={classes.label}>
                        Chef:
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography variant="h6" color="textSecondary" component="p">
                        {recipe.chef}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1}>
                  {recipe.tags.map((tag) => 
                    <Grid item>
                      <Chip className={classes.chip} label={tag} variant="outlined" />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>

          <Grid item container justify="flex-start" className={classes.descriptionText}>
            <Typography variant="p" component="p" gutterBottom>
              {recipe.description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
}

Recipe.getInitialProps = async (context) => {
  const headers = {'Authorization': 'Bearer 7ac531648a1b5e1dab6c18b0979f822a5aad0fe5f1109829b8a197eb2be4b84c'};
  
  const ent = await fetch(`https://cdn.contentful.com/spaces/kk2bw5ojx476/entries/${context.query.id}?locale=en-US`, { headers });
  const entry = await ent.json();
  
  const ast = await fetch(`https://cdn.contentful.com/spaces/kk2bw5ojx476/assets/${entry.fields.photo.sys.id}?locale=en-US`, { headers });
  const asset = await ast.json();
  
  const chf = await fetch(`https://cdn.contentful.com/spaces/kk2bw5ojx476/entries?sys.contentType.sys.id=chef`, { headers });
  const chefs = await chf.json();
  const chefsItems = chefs.items ? chefs.items : [];

  const tg = await fetch(`https://cdn.contentful.com/spaces/kk2bw5ojx476/entries?sys.contentType.sys.id=tag`, { headers });
  const tags = await tg.json();
  const tagsItems = tags.items ? tags.items : [];
  
  const { recipe } = EntryUtils.entryToRecipe(entry, chefsItems, tagsItems, asset);
  return {
    recipe
  };
  
};


export default Recipe;
