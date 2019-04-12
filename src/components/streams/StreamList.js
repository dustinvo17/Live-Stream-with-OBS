import React from 'react'
import {fetchStreams} from '../../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../../history'
class StreamList extends React.Component{
    componentDidMount(){
        this.props.fetchStreams()
    }
    renderAdmin(stream){
        if (stream.userId === this.props.currentUserid){
            return (
                <div className="right floated content" onClick={(e)=>{e.stopPropagation()}}>
                    <Link to={`/streams/edit/${stream.id}`}className="ui button primary">
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            )

            
        }
    }
    
    renderList(){
        return this.props.streams.map(stream => {
            return <div onClick={()=>history.push(`/streams/${stream.id}`)}className="item" key={stream.id}>
                {this.renderAdmin(stream)}
                <i className="large middle aligned icon camera"/>
                <div className="content">
                    <Link className="header" to={`/streams/${stream.id}`}>{stream.title}</Link>
                    <div className="description">{stream.description}</div>
                </div>

            </div>
        })
    }

    createStreamPermission(){
        if(this.props.loginStatus){
            return (
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }
    render(){
        
        return (
            <div>
                <h2>Streams</h2>
            <div className="ui celled list">{this.renderList()}</div>
            {this.createStreamPermission()}
            </div>
        )
    }
}
const  mapStateToProps = (state, ownProps) => {
    return {
        streams: Object.values(state.streams),
        currentUserid:state.auth.userId,
        loginStatus: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps,{fetchStreams})(StreamList)