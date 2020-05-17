import { Ingredients } from '../shared/ingredients.model';

export class RecipesModel {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredients[];

    constructor(name, desc, imagePath, ing) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ing;
    }
}