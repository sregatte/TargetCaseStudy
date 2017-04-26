import React, {Component} from 'react';

class Ratings extends Component  {

  constructor(props){
    super(props);
  }

  renderStars(){
    let stars = [];
    console.log("rating is ", this.props.consolidatedOverallRating);
    const rating = Number(this.props.consolidatedOverallRating);
    for(var i=0; i<rating; i++){
      stars.push(<span className="c-red c-font-glyphicon glyphicon glyphicon-star" key={i}></span>);
    }

    while(i < 5){
      stars.push(<span className="c-grey-glyphicon c-font-glyphicon glyphicon glyphicon-star" key={i}></span>)
      i++;
    }

    return stars;
  }

  render() {
    return (
        <div className="col-sm-12">
          {this.renderStars()}
          <span className="c-black s-font-reviews"> overall </span>
          <span className="c-black c-right c-margin-top-10 s-font-reviews"> view all {this.props.totalReviews} reviews </span>
        </div>
    )
  }

}

export default Ratings;
