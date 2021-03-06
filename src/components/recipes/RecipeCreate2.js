import React, { useState, useEffect } from "react";
import { createRecipe, fetchRecipe, deleteRecipe } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import RecipeForm from "./RecipeForm";
import { useParams } from "react-router";

const RecipeCreate2 = () => {
  // destructuring the formProps which gives us an input object generated by the Field comp and sent back through the reduxForm function
  let { id } = useParams();

  const [active, setActive] = useState(false);

  const recipe = useSelector((state) => state.recipes[id]);
  const photo = useSelector((state) => state.recipes.photo);

  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(createRecipe(formValues));
    dispatch(deleteRecipe(id));
  };

  return (
    <div
      className='create'
      onMouseOver={() => {
        dispatch(fetchRecipe(id));
        setActive(true);
      }}
    >
      <h1>Edit Recipe</h1>
      {!active && <div className='filler'></div>}
      <div className='container'>
        <button
          onClick={() => {
            dispatch(fetchRecipe(id));
            console.log(recipe);
            setActive(true);
          }}
        >
          Change Recipe
        </button>
      </div>
      <div>
        {active && recipe && (
          <div className='container'>
            <RecipeForm
              initialValues={{
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients,
                methods: recipe.methods,
              }}
              photo={photo}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// redux form looks for Field names that match validate errors object names, and passes them into the renderInput function

export default RecipeCreate2;
