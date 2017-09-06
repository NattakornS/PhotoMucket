import React, { Component,PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { getSignUrl,uploadPhoto,postUserData,uploadProgress } from '../actions/index';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import {Row, Grid, Col, ProgressBar} from 'react-bootstrap';
import { ReactRpg } from 'react-rpg';

class Register extends Component{

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount(){
    this.props.uploadProgress(0);
  }

  onSubmit(props) {
    // console.log(this.props.postUserData(props));
    let {bucket,key,imagUrl} =this.props.registerUpload;
    let newProps={
    	"firstName":props.firstName,
    	"sureName":props.sureName,
    	"nickName":props.nickName,
    	"email":props.email,
    	"birthDay":props.birthDay,
    	"phone":props.phone,
    	"description":props.description,
    	"imageUrl":this.props.registerUpload.imageUrl,
    	"bucket":this.props.registerUpload.bucket,
    	"key":this.props.registerUpload.key,
    	"fileName":this.props.registerUpload.fileName
    };
    console.log(newProps);
    this.props.postUserData(newProps)
      .then(() => {
        //blog post has been create, navigate user to index
        //we navigate by calling this.context.router.push
        this.context.router.push('/');
      });
  }
  progressFunc(progressEvent) {
      var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      console.log(percentCompleted);
      this.props.uploadProgress(percentCompleted);
  }
  renderUploadProgress() {
    console.log("upload progress : ",this.props.uploadPercent);
    if (this.props.uploadPercent === 0) {
      return (
        <div></div>
      );
    }
    return (<ProgressBar now={this.props.uploadPercent}/>);
  }
  onUploadClick(props){
    var file = props[0];
    console.log("fileName : "+file.name);
    // console.log("fileType : "+this.props.file.type);
    this.props.getSignUrl("register",{
        fileName: file.name,
        fileType: file.type
      }).then((response)=>{
      // console.log("Resp : "+JSON.parse(response.payload.data.body).input.signUrl);
      var { signUrl } = this.props.registerUpload;
      console.log("Props : "+signUrl);
      this.props.uploadPhoto(signUrl,file,this.progressFunc.bind(this)).then(()=>{
        console.log("Upload Register Finish");
      });
    });
  }
  renderImg(){
      if (this.props.registerUpload && this.props.uploadPercent === 100) {
        console.log("register Image : ",this.props.registerUpload.imageUrl);
        return(
          <ReactRpg imagesArray={[{url:this.props.registerUpload.imageUrl}]} columns={[ 1, 1, 0 ]} padding={20} />
        );
      }
      return <div>Upload</div>;
  }

  render(){
    const { fields: { firstName, sureName, email, description,nickName,birthDay,phone  },handleSubmit } = this.props;
    //const title = this.props.title;
    const dropzoneStyle = {
      position: 'center',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      textAlign: 'center'
    };
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className="form-group" style={dropzoneStyle}>
          <Dropzone onDrop={this.onUploadClick.bind(this)} size={100}>
            {this.renderImg()}
            {this.renderUploadProgress()}
          </Dropzone>
        </div>
        <div className={`form-group ${firstName.touched && firstName.invalid ? 'has-danger' : ''}`}>
          <label>Name</label>
          <input type="text" className="form-control" {...firstName}/>
          <div className="text-help">
            {firstName.touched ? firstName.error : ''}
          </div>
        </div>
        <div className={`form-group ${sureName.touched && sureName.invalid ? 'has-danger' : ''}`}>
          <label>Sure Name</label>
          <input type="text" className="form-control" {...sureName}/>
          <div className="text-help">
            {sureName.touched ? sureName.error : ''}
          </div>
        </div>
        <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
          <label>Email</label>
          <input type="text" className="form-control" {...email}/>
          <div className="text-help">
            {email.touched ? email.error : ''}
          </div>
        </div>
        <div className={`form-group`}>
          <label>Nick name</label>
          <input type="text" className="form-control" {...nickName}/>
        </div>
        <div className={`form-group`}>
          <label>Birth Day</label>
          <input type="text" className="form-control" {...birthDay}/>
        </div>
        <div className={`form-group`}>
          <label>Phone</label>
          <input type="text" className="form-control" {...phone}/>
        </div>
        <div className={`form-group`}>
          <label>description</label>
          <textarea type="text" className="form-control" {...description}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}
function validate(values){
  const errors = {};
  if(!values.firstName) {
    errors.firstName = 'Enter a first name';
  }
  if(!values.sureName) {
    errors.sureName = 'Enter sure name';
  }
  if(!values.email) {
    errors.email = 'Enter email';
  }
  return errors;
}

function mapStateToProps(state){
  return {registerUpload: state.posts.registerUpload,uploadPercent: state.posts.uploadProgress};
}

//connect: first argument is mapstateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd ismapSttaeToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'registerForm',
  fields: ['firstName','sureName','email','description','nickName','birthDay','phone'],
  validate
},mapStateToProps,{getSignUrl,uploadPhoto,postUserData,uploadProgress})(Register);

// user types something in .... record it on application state
// state === {
//   form: {
//     PostsNewForm: {
//       title: '......',
//       categories: '......',
//       description: '.......'
//     }
//   }
// }
