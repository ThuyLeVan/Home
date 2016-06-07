var App= React.createClass({
  render: function(){
    return(
          <div id="myCarousel" className="carousel slide" data-ride="carousel"  data-interval="500" >
            <div className="carousel-inner">
              <div className="item active">
                <img src="public/images/slider/slider1.png" alt="Chania" />
              </div>
              <div className="item">
                <img src="public/images/slider/slider2.png" alt="Chania" />
              </div>
              <div className="item">
                <img src="public/images/slider/slider3.png" alt="Flower" />
              </div>
            </div>

            </div>
    )
  }
});


ReactDOM.render(
  <App />,
  document.getElementById('app')
)
