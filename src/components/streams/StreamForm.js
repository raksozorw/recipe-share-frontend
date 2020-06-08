import React from 'react'
import PhotoUpload from './PhotoUpload'
import { Field, reduxForm, FieldArray } from 'redux-form';
import renderIngredient from './RenderIngredient'
import renderMethod from './RenderMethods'




class StreamForm extends React.Component {
// destructuring the formProps which gives us an input object generated by the Field comp and sent back through the reduxForm function
   
    
    renderInput({ input, label, meta, type }) { 
        return (
           
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off" type={type}/>
                <br></br>
                {meta.touched && <div className="ui error message">{meta.error}</div>}
                </div>
        )
    };
    renderFileName = ({input, label}) => { 
        return <div>
           
        </div>
    };

    // renderMultipleInputs ({input, label, meta}) { 
    //     return (
    //         <div className="field">
    //             <input {...input} autoComplete="off"/>
    //             <br></br>
    //             </div>
    //     )
    // };


    // renderIngredient = ({ fields },{ input, meta, error }) => {
    
        
    //     if (this) {
    //         return <div className="field">
    //             <label>Enter Ingredients</label>
    //             <ul>
           
    //                 {fields.map((ingredient, index) =>
    //                     <li key={index}>
    //                         <div className="ui grid">
    //                             <div className="ten wide column">
    //                                 <Field name={ingredient} component={this.renderMultipleInputs} label="Ingredients"></Field>
    //                             </div>
                                
    //                             <div className="two wide column">
    //                         <button className="ui button negative"
    //                             type="button"
    //                             title="Remove Ingredient"
    //                                     onClick={() => fields.remove(index)}>Remove</button>
    //                                 </div>
    //                             </div>

    //                     </li>
    //                 )}
    //                 {error && <li className="error">{error}</li>}
    //             </ul>
    //             <button className="ui button green" type="button" onClick={() => fields.push()}>Add New Ingredient</button>
    //         </div>
    //     } else {
    //         return <div>Error</div>
    //     }
    // }

    // renderMethod = ({ fields },{ input, label, error }) => {
  
        
    //     if (this) {
    //         return <div className="field container">
    //             <label>Enter Method</label>
    //             <ol>
           
    //                 {fields.map((method, index) =>
    //                     <li key={index}>
    //                         <div className="ui container grid">
    //                             <div className="ten wide column">
    //                                 <Field name={method} component={this.renderMultipleInputs} label="Method"></Field>
    //                             </div>
    //                             <div className="two wide column">
    //                         <button className="ui button negative"
    //                             type="button"
    //                             title="Remove Step"
    //                                     onClick={() => fields.remove(index)}>Remove</button>
    //                                 </div>
    //                             </div>

    //                     </li>
    //                 )}
    //                 {error && <li className="error">{error}</li>}
    //             </ol>
    //             <button className="ui button green" type="button" onClick={() => fields.push()}>Add New Method</button>
    //         </div>
    //     } else {
    //         return <div>Error</div>
    //     }
    // }

    onSubmit = (formValues) => {
        this.props.onSubmit({ ...formValues, fileName:this.props.photo })
        console.log({ ...formValues, fileName:this.props.photo })
    }

    render() {
        return <div className="ui container">
            
            <PhotoUpload />
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                {/* handle submit is provided by redux form, we then pass in our own handler function... they call prevent default */}
                
                <Field type="text" name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <FieldArray name="ingredients" component={renderIngredient} label="Enter Ingredients" />
                <FieldArray name="methods" component={renderMethod} label="Enter Method" validate={this.validate} /> 

                <button className="ui button primary fluid">Submit</button>
            </form>
        </div>
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
    errors.title = "Please enter a title."
    } 
    if (!formValues.description) {
        errors.description = "Please enter a description."
    }
    if (!formValues.ingredients) {
        errors.ingredients = "Please enter at least one ingredient."
    }
    if (!formValues.methods) {
        errors.methods = { _error: "Please enter at least one step." }
    }

    return errors 
};
// redux form looks for Field names that match validate errors object names, and passes them into the renderInput function

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);

