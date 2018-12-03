import React from 'react';


class Footer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <section id="contact">
        <div className="container">
          <h3 className="text-center text-uppercase">contact us</h3>
          <p className="text-center w-75 m-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum purus at sem ornare sodales. Morbi leo nulla, pharetra vel felis nec, ullamcorper condimentum quam.</p>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i className="fa fa-phone fa-5x mb-3" aria-hidden="true"></i>
                  <h4 className="text-uppercase mb-5">call us</h4>
                  <p>+962785523225,+962*******</p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i className="fa fa-map-marker fa-5x mb-3" aria-hidden="true"></i>
                  <h4 className="text-uppercase mb-5">office loaction</h4>
                  <address>Khalda, Al-zarkashi St., hacker haus </address>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i className="fa fa-globe fa-5x mb-3" aria-hidden="true"></i>
                  <h4 className="text-uppercase mb-5">email</h4>
                  <p>MaintanceJS@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}
export default Footer;