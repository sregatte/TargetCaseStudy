import React, {Component} from 'react';

class ItemImages extends Component {

  constructor(props){
    super(props);
    console.log("AlternateImages is ", this.props.AlternateImages);
  }

  componentDidMount(){
    $("#carousel-prev").click((e) => {
      console.log(" in prev");
        $("#mycarousel").carousel('prev');
    });
    $("#carousel-next").click(function(){
      console.log(" in next");
        $("#mycarousel").carousel('next');
    });

    $('.carousel').on('slid.bs.carousel',  () => {
      var currentIndex = $('div.active').index();
      //console.log("current index is ", currentIndex);
      this.props.onChange(this.props.AlternateImages[currentIndex]);
    });
  }

  componentDidUpdate(){

  }

  renderImages(){
    if(!this.props.AlternateImages) {
      return null;
    }
    return this.props.AlternateImages.map(image => {
      return(
        <div className={"item " + ((this.props.PrimaryImage.image === image.image) ? 'active' : '')}  key={image.image}>
          <img className="img-responsive" src={image.image}></img>
        </div>
      )

    })
  }

  render() {
    return (
      <div id="mycarousel" className="carousel slide" >
        <div className="carousel-inner" role="listbox">
          {this.renderImages()}
          <a className="left carousel-control" role="button" id="carousel-prev">
            <span className="glyphicon glyphicon-chevron-left " aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" role="button" id="carousel-next" >
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    )
  }

}

export default ItemImages;
