import React from 'react'
import { createStream } from '../../actions';
import { connect } from 'react-redux';
import StreamForm from './StreamForm'

class StreamCreate extends React.Component {
// destructuring the formProps which gives us an input object generated by the Field comp and sent back through the reduxForm function
  

    onSubmit = (formValues) => {
       this.props.createStream(formValues)
    }

    render() {
        return (
            <div>
                <h3>Create Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}


// redux form looks for Field names that match validate errors object names, and passes them into the renderInput function



export default connect(null, { createStream })(StreamCreate);