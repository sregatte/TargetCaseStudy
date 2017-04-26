import React, {Component} from 'react';

class Reviews extends Component   {

  constructor(props){
    super(props);
  }

  renderStars(rating){
    let stars = [];
    for(var i=0; i<rating; i++){
      stars.push(<span className="c-red c-font-15 glyphicon glyphicon-star" key={i}></span>);
    }

    while(i < 5){
      stars.push(<span className="c-grey-glyphicon c-font-15 glyphicon glyphicon-star" key={i}></span>)
      i++;
    }

    return stars;
  }

  render(){
    const ProReview = this.props.ProReview;
    const ConReview = this.props.ConReview;
    if(!ProReview || !ConReview) {
      return null;
    }

    return (
      <div className="row c-margin-top-20 c-grey-light-bg">
        <div className="col-xs-12">
          <div className="col-xs-6">
            <h4 className="c-black">PRO</h4>
            <h6 className="c-grey">most helpful 4-5 star review</h6>
          </div>
          <div className="col-xs-6">
            <h4 className="c-black">CON</h4>
            <h6 className="c-grey">most helpful 1-2 star review</h6>
          </div>
          <div className="col-xs-12">
            <hr />
          </div>
          <div className="col-xs-6">
            {this.renderStars(ProReview.overallRating)}
            <h4 className="c-black"> {ProReview.title}</h4>
            <h6 className="c-grey"> {ProReview.review}</h6>
            <h6 className="c-grey"><a href="#">{ProReview.screenName}</a>{new Date(ProReview.datePosted).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</h6>
          </div>
          <div className="col-xs-6">
            {this.renderStars(ConReview.overallRating)}
            <h4 className="c-black">{ConReview.title}</h4>
            <h6 className="c-grey"> {ConReview.review}</h6>
            <h6 className="c-grey"><a href="#">{ConReview.screenName}</a> {new Date(ConReview.datePosted).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</h6>
          </div>

        </div>
      </div>
    )

  }

}

export default Reviews;
