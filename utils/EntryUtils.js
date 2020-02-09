var EntryUtils = (function(){

  return {
    entriesToArray: function (entries, assets) {
      let recipes = [];
      for (const entry of entries) {
        const recipe = {id: entry.sys.id, title: entry.fields.title, photo: entry.fields.photo, image: '', tags: ['teste'], description: entry.fields.description}
        recipes = recipes.concat(recipe);
        for (const recipe of recipes) {
          for (const asset of assets) {
            if (recipe.photo.sys.id === asset.sys.id) {
              recipe.image = asset.fields.file.url.replace('//', 'http://');
            }
          }
        }
      }

      return {
        recipes
      }
    },

    entryToRecipe: function (entry, chefs, tags, asset) {
      const recipe = {id: entry.sys.id, title: entry.fields.title, image: asset.fields.file.url.replace('//', 'http://'), tags: [], description: entry.fields.description, tags: []};

      if (entry.fields.chef) {
        for (const chef of chefs) {
          if (entry.fields.chef.sys.id === chef.sys.id) {
            recipe.chef = chef.fields.name;
          }
        }
      } else {
        recipe.chef = chefs[chefs.length - 1].fields.name;
      }

      if (entry.fields.tags && entry.fields.tags.length > 0) {
        for (const entryTag of entry.fields.tags) {
          for (const tag of tags) {
            if (entryTag.sys.id === tag.sys.id) {
              recipe.tags = recipe.tags.concat(tag.fields.name);
            }
          }
        }
      }

      return {
        recipe
      }
    }
  }

}())

module.exports = EntryUtils;