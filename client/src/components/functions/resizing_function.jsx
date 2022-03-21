import React, { createRef, Component } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import images from '../../images/download.jpg'

export default class Demo extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      image: props.url !== undefined ? props.url : images,
      preview: "",
      size: props.size,
      
    };
  }

 
  render() {
    const cropperRef = React.createRef();
    
    const onCrop = (value) => {
      let imageElement: any = cropperRef?.current;
      let cropper: any = imageElement?.cropper;
     // Place your base64 url here.
     cropper.options.aspectRatio=this.props.size
     this.setState({ image: cropper.getCroppedCanvas().toDataURL(),preview:cropper.getCroppedCanvas().toDataURL()})

    };
    return (
      <div className="modal " id="exampleModalCenter" tabIndex="1" data-backdrop='static' role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{this.props.title ?? ''}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
        
              <Cropper
                src={this.props.url}
                style={{ height: '100%', width: "100%", margin: "auto" }}
                // Cropper.js options
                guides={false}
                crop={value => onCrop(value)}

                ref={cropperRef}
                cropBoxResizable={true}
                dragMode='none'
                responsive={true}
                viewMode={1}
                zoomable={true}
                zoomOnTouch={true}
                
              />
           
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal"  >Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.handle_close(this.state.image, this.state.preview, this.props.index)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

