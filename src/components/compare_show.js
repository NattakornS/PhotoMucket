import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserData,getAnalysisFace} from '../actions/index';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';
import { ReactRpg } from 'react-rpg';


class CompareShow extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    // this.props.fetchPost(this.props.params.id);
    console.log("renderImageComp");
    console.log(this.props.searchUpload.imageUrl);
    let {imageUrl,bucket,key} = this.props.searchUpload;
    this.props.getUserData({"imageUrl": this.props.searchUpload.imageUrl, "bucket": this.props.searchUpload.bucket, "key": this.props.searchUpload.key});
    this.props.getAnalysisFace({"imageUrl": this.props.searchUpload.imageUrl, "bucket": this.props.searchUpload.bucket, "key": this.props.searchUpload.key});
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id).then(() => {
      this.context.router.push('/');
    });
  }
  renderFaceDetail(){
    if (!this.props.faceAnalysisData) {
      return(<div></div>);
    }
    let smile = this.props.faceAnalysisData.smile.value?'#smile':' ';
    let eyeglasses = this.props.faceAnalysisData.eyeglasses.value?'#eyeglasses':'';
    let sunglasses = this.props.faceAnalysisData.sunglasses.value?'#sunglasses':'';
    let beard = this.props.faceAnalysisData.beard.value?'#beard':'';
    let mustache = this.props.faceAnalysisData.mustache.value?'#mustache':'';
    let eyesOpen = this.props.faceAnalysisData.eyesOpen.value?'#eyes open':'#eye close';
    let mouthOpen = this.props.faceAnalysisData.mouthOpen.value?'#mouth open ,':'';
    let gender = '#'+this.props.faceAnalysisData.gender.value;
    let emotions = this.props.faceAnalysisData.emotions.map((obj)=>{
        return '#'+obj.type;
    });
    console.log("emotions : "+emotions);
    return(<h4>Face analysis : {gender}{smile}{eyeglasses}{sunglasses}{beard}{mustache}{eyesOpen}{emotions}</h4>);
  }
  renderUserData(){

    if (this.props.searchData) {
      if (this.props.searchData.length > 0) {
        try{
          let searchDataParse=JSON.parse(this.props.searchData[0]);
          return(
            <div>
              <h4>First name : {searchDataParse.firstname}</h4>
              <h4>Last name : {searchDataParse.surename}</h4>
              <h4>Phone : {searchDataParse.phone}</h4>
              <h4>Email : {searchDataParse.email}</h4>
            </div>
          );
        } catch(e) {
            console.log("parse error : ",e);
        }
      }
      return(
        <div>
          <h4>Image Not Match</h4>
        </div>
      );
    }
    return(
      <div>Loading</div>
    );
  }

  render() {
    if (!this.props.searchUpload || !this.props.searchData || !this.props.searchProfilesData) {
      return (
        <div>
          Loading
        </div>
      );
    }

    console.log("lenght : "+this.props.searchData.length);
    console.log("searchData : ",this.props.searchData);
    console.log("Profiles : ",this.props.searchProfilesData);
    console.log("Enrolled : " ,this.props.searchUpload.imageUrl);


    let imageUrls=[];
    if (this.props.searchProfilesData.length > 0) {
      this.props.searchProfilesData.map((profile)=>{
        imageUrls.push({url:profile});
      });
    }
    console.log(imageUrls);
    return (

      <div>
        <Link to="/">Back To index</Link>
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <th>Enrolled Guest</th>
              <th>Cammera</th>
            </tr>
            <tr>
              <td key="entrolled">
                <ReactRpg imagesArray={[{url:this.props.searchUpload.imageUrl}]} columns={[ 1, 1, 0 ]} padding={20} />
              </td>
              <td key="camera">
                <ReactRpg imagesArray={imageUrls} columns={[ 1, 2, 0 ]} padding={20} />
              </td>
            </tr>
          </tbody>
        </Table>
        <div>
          {this.renderUserData()}
          {this.renderFaceDetail()}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    searchUpload: state.posts.searchUpload,
    searchData: state.posts.searchData,
    searchProfilesData: state.posts.searchProfilesData,
    faceAnalysisData: state.posts.faceAnalysisData
  };
}
export default connect(mapStateToProps, {getUserData,getAnalysisFace})(CompareShow);
