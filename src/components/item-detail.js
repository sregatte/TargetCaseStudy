import React, {Component} from 'react';
import {connect} from 'react-redux';

import ItemImages from './images';
import Ratings from './Ratings';
import Reviews from './Reviews';

class ItemDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      PrimaryImage: this.props.item.CatalogEntryView[0].Images[0].PrimaryImage[0],
      quantity: 1
    }
  }

  componentDidMount(){
    var AlternateImages = this.props.item.CatalogEntryView[0].Images[0].AlternateImages;
    AlternateImages.push(this.state.PrimaryImage);
    this.setState({AlternateImages: AlternateImages});
  }

  displayPromotions(){
    const promotions = this.props.item.CatalogEntryView[0].Promotions;
    return  promotions.map(promotion => {
      return (
        <h5 className="c-red" key={promotion.promotionIdentifier}>
          <span className="c-margin-right-10 c-margin-top-2 glyphicon glyphicon-tag"></span>
          {promotion.Description[0].shortDescription}
        </h5>
      )
    });
  }

  incrementQuantity(){
    console.log("Increment");
    var quantity = this.state.quantity;
    quantity++;
    this.setState({quantity});
  }

  decrementQuantity(){
    console.log("Decrement");
    var quantity = this.state.quantity;
    quantity--;
    if(quantity > 0){
      this.setState({quantity});
    }
  }

  displayProductHighlights() {
    const features = this.props.item.CatalogEntryView[0].ItemDescription[0].features;
    return  features.map(feature => {
      return (
        <li key={feature} dangerouslySetInnerHTML={{__html: feature}}></li>
      )
    })
  }

  changePrimaryImage(newImage){
      this.setState({PrimaryImage: newImage});
  }

  showAddToCart(){
    const purchasingChannelCode = Number(this.props.item.CatalogEntryView[0].purchasingChannelCode);
    if(purchasingChannelCode === 0 || purchasingChannelCode === 1) {
      return true;
    } else {
      return false;
    }
  }

  showPickUpInStore() {
    const purchasingChannelCode = Number(this.props.item.CatalogEntryView[0].purchasingChannelCode);
    if(purchasingChannelCode === 0 || purchasingChannelCode === 2) {
      return true;
    } else {
      return false;
    }
  }

  render(){
    //console.log("item is ", this.props.item);
    const CatalogEntryView = this.props.item.CatalogEntryView[0];
    const title = CatalogEntryView.title;
    const CustomerReview = CatalogEntryView.CustomerReview[0];
    const Images = CatalogEntryView.Images[0];
    const PrimaryImage = Images.PrimaryImage[0];

    const Offers = CatalogEntryView.Offers[0].OfferPrice[0];
    const ProReview =  CatalogEntryView.CustomerReview[0].Pro[0];
    const ConReview = CatalogEntryView.CustomerReview[0].Con[0];
    const consolidatedOverallRating = CatalogEntryView.CustomerReview[0].consolidatedOverallRating;
    const totalReviews = CatalogEntryView.CustomerReview[0].totalReviews;
    return (
      <div className="c-margin-top-50 c-padding-bottom-50">
      <div className="row">
        <div className="col-sm-6">
          <h2 className="c-grey c-weight-300 text-center">{title}</h2>
          <div className="row">
            <div className="col-sm-12">
              <img className="img-responsive center-block" src={this.state.PrimaryImage.image} />
            </div>
          </div>
          <div className="row">
              <div className="col-sm-12 text-center">
                <span className="c-block c-grey-glyphicon c-margin-top-20 c-font-30 glyphicon glyphicon-zoom-in"></span>
                <span><h4 className="c-block c-grey c-weight-300"> view larger</h4> </span>
              </div>
          </div>
          <div className="row c-margin-top-20">
            <ItemImages AlternateImages={this.state.AlternateImages} PrimaryImage={PrimaryImage} onChange={this.changePrimaryImage.bind(this)}/>
          </div>

          {/*<div className="row c-margin-top-20">
            <div className="col-sm-3">
              <span className="c-right c-grey-glyphicon c-font-30 c-margin-top-20 glyphicon glyphicon-chevron-left"></span>
            </div>
            <div className="col-sm-2">
              <img className="img-responsive center-block" src="http://target.scene7.com/is/image/Target/14263758_Alt01" />
            </div>
            <div className="col-sm-2 c-border-active">
              <img className="img-responsive center-block" src="http://target.scene7.com/is/image/Target/14263758_Alt02" />
            </div>
            <div className="col-sm-2">
              <img className="img-responsive center-block" src="http://target.scene7.com/is/image/Target/14263758_Alt03" />
            </div>
            <div className="col-sm-3">
              <span className="c-left c-grey-glyphicon c-font-30 c-margin-top-20 glyphicon glyphicon-chevron-right"></span>
            </div>
          </div> */}
          <div className="row c-margin-top-20 hidden-xs">
            <Ratings consolidatedOverallRating={consolidatedOverallRating} totalReviews={totalReviews}/>
          </div>
          <div className="row hidden-xs">
            <Reviews ProReview={ProReview} ConReview={ConReview}/>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="c-black c-weight-bold">
            <h2 className="c-block">{Offers.formattedPriceValue}</h2>
            <h6 className="c-block c-grey"> {Offers.priceQualifier}</h6>
          </div>
          <hr />
          {this.displayPromotions()}
          <hr />
          <div className="row">
            <div className="col-sm-6 panel panel-default c-height-40 c-margin-left-10">
              <div className="panel-body c-padding-5">
                <span className="c-grey c-left c-margin-top-5">quantity:</span>
                <span className="c-grey-glyphicon c-right c-margin-right-10 c-font-30 glyphicon glyphicon-plus-sign" onClick={this.incrementQuantity.bind(this)}></span>
                <span className="c-black c-right c-margin-right-10"><h4>{this.state.quantity}</h4></span>
                <span className="c-grey-glyphicon c-right c-margin-right-10 c-font-30 glyphicon glyphicon-minus-sign" onClick={this.decrementQuantity.bind(this)}></span>
              </div>
            </div>
            <div className="col-sm-6">
            </div>
          </div>
          <div className="row">
          {this.showPickUpInStore() ?
            <div className="col-xs-6 c-padding-5">
              <button className="c-width-100-p btn btn-lg hidden-sm hidden-xs c-black-bg"><span className="c-white">PICK UP IN STORE</span></button>
              <button className="c-width-100-p btn btn-md hidden-md hidden-lg c-black-bg"><span className="c-white c-font-12">PICK UP IN STORE</span></button>
              <h6 className="c-black text-center">find in a store</h6>
            </div> : null
          }
          {this.showAddToCart() ?
            <div className="col-xs-6 c-padding-5">
              <button className="c-width-100-p btn btn-lg hidden-sm hidden-xs c-red-bg" id="addToCartButton"><span className="c-white">ADD TO CART</span></button>
              <button className="c-width-100-p btn btn-md hidden-md hidden-lg c-red-bg"><span className="c-white c-font-12">ADD TO CART</span></button>
            </div> : null
          }
          </div>
          <div className="row">
            <div className="c-grey col-xs-4 col-sm-4 col-md-2 col-lg-2">
              <h3 className="c-grey text-center">returns</h3>
            </div>
            <div className="col-xs-8 col-sm-8 col-md-10 col-lg-10 c-border-left">
              <h6 className="c-grey">This item must be returned within 30 days of the ship date. See <span className="c-wight-bold">return policy</span> for details</h6>
              <h6 className="c-grey">Prices, promotions, styles and availability may vary by store and online</h6>
            </div>
          </div>
          <div className="row c-margin-top-20">
            <div className="col-xs-4">
              <button className="hidden-xs hidden-sm btn c-width-100-p c-grey-light-bg"><span className="black">ADD TO REGISTRY</span></button>
              <button className="hidden-md hidden-lg btn c-grey-light-bg"><span className="black c-font-10">ADD TO REGISTRY</span></button>
            </div>
            <div className="col-xs-4">
              <button className="hidden-xs hidden-sm btn c-width-100-p c-grey-light-bg"><span className="black">ADD TO LIST</span></button>
              <button className="hidden-md hidden-lg btn  c-grey-light-bg"><span className="black c-font-10">ADD TO LIST</span></button>
            </div>
            <div className="col-xs-4">
              <button className="hidden-xs hidden-sm btn c-width-100-p c-grey-light-bg"><span className="black">SHARE</span></button>
              <button className="hidden-md hidden-lg btn c-grey-light-bg"><span className="black c-font-10">SHARE</span></button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h2 className="black">product hightlights</h2>
              <ul className="c-padding-0 c-margin-left-20">
                {this.displayProductHighlights()}
              </ul>
            </div>
          </div>
          <div className="row hidden-sm hidden-md hidden-lg">
            <Ratings consolidatedOverallRating={consolidatedOverallRating} totalReviews={totalReviews}/>
          </div>
          <div className="row hidden-sm hidden-md hidden-lg">
            <Reviews ProReview={ProReview} ConReview={ConReview}/>
          </div>
        </div>

      </div>

      </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    item: state.item
  }
}


export default connect(mapStateToProps)(ItemDetail);
