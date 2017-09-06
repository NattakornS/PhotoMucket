import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import { bindActionCreators} from 'redux';
import {getSignUrl, uploadPhoto, uploadProgress} from '../actions/index';
import {Link} from 'react-router';
import {Row, Grid, Col, ProgressBar} from 'react-bootstrap';

import Dropzone from 'react-dropzone';

class PostIndex extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    // console.log('this would be mount when component render');
    // this.props.fetchPosts();
    this.props.uploadProgress(0);
  }
  progressFunc(progressEvent) {
    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    this.props.uploadProgress(percentCompleted);
  }

  onUploadClick(props) {
    var file = props[0];
    console.log("fileName : " + file.name);
    // console.log("fileType : "+this.props.file.type);
    this.props.getSignUrl("search", {
      fileName: file.name,
      fileType: file.type
    }).then((response) => {
      // console.log("Resp : "+JSON.parse(response.payload.data.body).input.signUrl);
      var {signUrl,fileName,bucket} = this.props.searchUpload;
      console.log("Props : " + signUrl);
      this.props.uploadPhoto(signUrl, file, this.progressFunc.bind(this)).then(() => {
        this.context.router.push('search');
      });
    });
  }

  renderPosts() {
    // console.log("rederPost : "+ this.props.posts);
    // this.props.posts === undefined ? console.log("this is undefined") : console.log(this.props.posts);

    // if (this.props.posts.PromiseValue === undefined ) {
    //   return(
    //     <li className="list-group-item" key="0">
    //       <span className="pull-xs-right">Undefined</span>
    //     </li>
    //   );
    // }else{
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"posts/" + post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      );
    });
    // }

  }

  renderUploadProgress() {
    if (this.props.uploadPercent === 0) {
      return (
        <div></div>
      );
    }
    return (<ProgressBar now={this.props.uploadPercent}/>);
  }

  render() {
    const overlayStyle = {
      position: 'center',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      textAlign: 'center'
    };
    return (
      <Grid>
        <Row>
          <Col sm={3} xs={2} md={4}></Col>
          <Col sm={6} xs={8} md={4}>
            <div style={overlayStyle}>
              <Dropzone onDrop={this.onUploadClick.bind(this)} size={100}>
                <img width={150} height={150} src={"../image/camera-icon.png"}/>
                {this.renderUploadProgress()}
              </Dropzone>
            </div>
          </Col>
          <Col sm={3} xs={2} md={4}></Col>
        </Row>
      </Grid>
    );
    // return (
    //   <div>
    //     <div className="text-xs-right">
    //       <Link to="/posts/new" className="btn btn-primary">
    //         Add a Post
    //       </Link>
    //     </div>
    //     <h3>Posts</h3>
    //     <ul className="list-group">
    //       {this.renderPosts()}
    //     </ul>
    //   </div>
    // );
  }
}

function mapStateToProps(state) {
  return {searchUpload: state.posts.searchUpload, uploadPercent: state.posts.uploadProgress};
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({fetchPosts},dispatch);
// }

// export default connect(null,mapDispatchToProps)(PostIndex);

// export default connect(null,{ fetchPosts : fetchPosts })(PostIndex);

export default connect(mapStateToProps, {getSignUrl, uploadPhoto, uploadProgress})(PostIndex);
