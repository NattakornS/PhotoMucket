var React = require('react');
var Dropzone = require('react-dropzone');
var axios = require('axios');
//https://cors-anywhere.herokuapp.com/
const ENDPOINT_TO_GET_SIGNED_URL = 'https://cors-anywhere.herokuapp.com/https://vwl1hxrqje.execute-api.us-east-1.amazonaws.com/dev/rekognition/signUrl';

exports = module.exports = React.createClass({
  _onDrop: function (files) {
    var file = files[0];

    axios.get(ENDPOINT_TO_GET_SIGNED_URL, {
      filename: file.name,
      filetype: file.type
    })
    .then(function (result) {
      console.log("result : ",result);
      // let body =JSON.parse(result.data.body);
      // console.log("body : ",body);
      var signedUrl = result.data.input.signUrl;
      console.log("signUrl :  ",signedUrl);
      // console.log("signedUrl :  ",result.data.body.input.signedUrl);
      var options = {
        headers: {
          'Content-Type': file.type
        }
      };
      console.log("Content-Type : ", file.type);
      return axios.put(signedUrl, file, options);
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
  },
  render: function () {
    return (
      <Dropzone onDrop={ this._onDrop } size={ 150 }>
        <div>
          Drop some files here!
        </div>
      </Dropzone>
    );
  }
});
