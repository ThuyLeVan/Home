class App extends React.Component{

  constructor(){
    super();
    this.state = { data:[] }
  }

  componentDidMount() {
    let config_file="data/config.json";
    this.serverRequest = $.get(config_file, function (_data) {
      this.setState({
          data:_data
        })
    }.bind(this));
  }

  render(){
    return (
      <div>
        <Header {...this.state.data.Header} />
        <Slider {...this.state.data.Slider} />
        <Project {...this.state} />
        <Footer {...this.state} />
      </div>
    )
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  componentDidUpdate() {
    $('.multi-item-carousel .item').each(function(){
      var next = $(this).next();
      if (!next.length) {  next = $(this).siblings(':first')}
      next.children(':first-child').clone().appendTo($(this))
      if (next.next().length>0) {
         next.next().children(':first-child').clone().appendTo($(this))
      }
      else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this))
      }
    })
  }
}

// start function sortByNum
const Sort = (obj) =>{
	var _obj=[];
	Object.keys(obj).map( (index) =>{ _obj.push(obj[index]) });
	return _obj.sort( (a,b) => { return (a.num > b.num) ? 1 : ((b.num > a.num) ? -1 : 0) } )
}
// end function sortByNum

// start header
const Header =(props) => {
    if(props.Menu){
      var _menus=Sort(props.Menu);
      return(
          <header>
            <nav className="navbar navbar-default navbar-fixed-top">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Logo src_logo={props.Logo.src_logo} alt_logo={props.Logo.alt_logo} />
                </div>
                <div className="collapse navbar-collapse navbar-right">
                  <ul className="nav navbar-nav ">
                    <li><a href="#"><img src="public/images/ico/person.png" className="img-circle" /></a></li>
                    <li className="menu"><a href="#">My Portal</a></li>
                    <li className="dropdown menu">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span className="glyphicon glyphicon-menu-hamburger lager"></span></a>
                        <ul className="dropdown-menu">
                          {_menus.map((val,index) => {
                              return <Menu link={val.link} text={val.text} key={index} />
                          })}
                        </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
        )
    }
    else {
      return null;
    }
}
const Logo = (props) => {
  return(
    <a className="navbar-brand" href="#"><img src={props.src_logo} alt={props.alt_logo} /></a>
  )
}
const Menu = (props) => {
 return(
   <li><a href={props.link}>{props.text}</a></li>
 )
}
// end header

// start Slider
const Slider = (props) => {
    if(props.hasOwnProperty(0)){
      var _sliders=Sort(props);
      return(
        <section id="slider">
            <div id="home-carousel" className="carousel slide" data-ride="carousel" data-interval="100">
              <div className="carousel-inner">
                {_sliders.map((val,index) => {
                    return <SliderItem key={index} image={val.image} index={index} text={val.text}/>
                })}
              </div>
            </div>
        </section>
        )
    }
    else {
      return null;
    }
}
const SliderItem = (props) => {
  return(
    <div className={props.index ==0 ? "item active" :"item"} style={{backgroundImage:"url("+props.image+")"}} >
      <div className="carousel-caption">
        <div className="row">
          <div className="col-sm-7">
            <p><span dangerouslySetInnerHTML={{__html: props.text}} /></p>
          </div>
        </div>
      </div>
    </div>
  )
}
// end Slider

// start project
const Project = (props) => {
  if(props.data.Project !=undefined){
    var _projects=Sort(props.data.Project);
    return(
      <section id="project">
        <div className="carousel slide multi-item-carousel" id="theCarousel" data-interval="100" >
          <div className="container">
            <div className="section-header">
   	          <h2 className="section-title text-center">COMPANY PROJECTS</h2>
   	        </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="carousel-inner" >
                  {_projects.map((val,index) => {
                    return <ProjectItem key={index} index={index} image={val.image} description={val.description} name={val.name}/>
                  })}
                </div>
              </div>
            </div>
            <BtnControls />
          </div>
        </div>
      </section>
    )
  }else {
    return null;
  }
}
const ProjectItem = (props) => {
  return(
    <div className={props.index == 0 ? "item active" :"item"}>
      <div className="col-xs-4">
        <div className="boder">
          <div className="project-img">
            <img src={props.image} className="img-responsive fix_img"/>
            <span className="tooltiptext" dangerouslySetInnerHTML={{__html: props.description}} />
          </div>
          <div className="project-info">
            <h3>{props.name}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
const BtnControls = () => {
  return(
    <div>
      <a className="left carousel-control" href="#theCarousel" data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
      <a className="right carousel-control" href="#theCarousel" data-slide="next"><i className="glyphicon glyphicon-chevron-right "></i></a>
    </div>
  )
}
// end project

// start footer
const Footer = (props) => {
  return(
    <footer id="footer">
        <div className="about">
          <div className="container">
              <div className="row">
                <Information {...props.data.Footer} />
                <Maps {...props.data.Footer} />
              </div>
          </div>
      </div>
        <div className="footer-bottom">
          <div className="container">
              <div className="row">
                  <div className="col-sm-6">
                       &copy; 2016 Company Name. Designed by <a target="_blank" href="http://thuylevan.github.io/">Thuy Le Van</a>
                  </div>
                  <div className="col-sm-6">
                    <Social />
                  </div>
              </div>
          </div>
      </div>
    </footer>
  )
}
const Information = (props) => {
  return(
    <div className="col-sm-6">
        <h3 className="column-title1">Company Information</h3>
        <p>{props.info}</p>
        <ul className="fixul">
            <li className="icon-info"><i className="fa fa-map-marker red"></i>{props.adress}</li>
            <li className="icon-info"><i className="fa fa-mobile green"></i>{props.phone}</li>
            <li className="icon-info"><i className="fa fa-envelope-o yellow"></i>{props.email}</li>
            <li className="icon-info"><i className="fa fa-globe gre"></i>{props.website}</li>
        </ul>
    </div>
  )
}
const Maps = (props) => {
  return(
    <div className="col-sm-6">
        <h3 className="column-title1">Maps</h3>
        <div className="embed-responsive embed-responsive-16by9 box-shadowmap">
            <iframe src={props.url_map} allowFullScreen />
        </div>
    </div>
  )
}
const Social = () => {
  return(
      <ul className="social-icons">
        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
        <li><a href="#"><i className="fa fa-github"></i></a></li>
     </ul>
  )
}
// end footer
ReactDOM.render(
	<App />,
	document.getElementById('app')
)
