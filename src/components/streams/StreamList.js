import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    };


    renderAdmin(stream) {
        return stream.userId === this.props.currentUserId && (
            <div className="right floated content">
                <Link to={`streams/edit/${stream.id}`} className='ui button primary'>
                    Edit
               </Link>
                <Link to={`streams/delete/${stream.id}`} className="ui button negative">
                    Delete
                </Link> 

            </div>
        )
    };

    renderCreate() {
        return this.props.isSignedIn && <div style={{textAlign: 'right'}}>
            <Link to="/streams/new" className="ui button primary">
                Create Stream
            </Link>
            </div>
    };

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                     <div>{this.renderAdmin(stream)}</div>
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header"> {stream.title} </Link>
                        
                        <div className="description">
                            {stream.description}
                        </div>
                       
                    </div>
                </div>
        )
    })
    };

    render() {
      
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                    {this.renderCreate()}
                    </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    } 
};

// object.values turns JS object into an array

export default connect(mapStateToProps, { fetchStreams })(StreamList);