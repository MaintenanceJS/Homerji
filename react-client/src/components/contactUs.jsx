import React from 'react';


class ContactUs extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <section id="contact">
        <div className="container">
          <h3 className="text-center text-uppercase">contact us</h3>
          <p className="text-center w-75 m-auto">askdalks asljdl aalu woepq ald [qwe aksjd [quw aslkdj asu qw asdjl we q-slkd qwp euaslkdj wque slkdj quw p;ald qwpoe adk; aspi ;we pqw;asldk apiwe qwk;asldj poir ;LSDF PAWE RLDKFJ ASLJD ;AK DQ DAPSDJ LASJD  A SDLA lkjd lsjd alsljd owq</p>
          <div className="row">
            <div className="col-lg-12 col-lg-6 col-lg-4 my-5">
              <div className="card border-1">
                <div className="card-body text-center">
                  <i className="fa fa-phone fa-5x mb-3" aria-hidden="true"></i>
                  <h4 className="text-uppercase mb-5">call us</h4>
                  <p>+962785523225,+962*******</p>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-lg-6 col-lg-4 my-5">
              <div className="card border-1">
                <div className="card-body text-center">
                  <i className="fa fa-map-marker fa-5x mb-3" aria-hidden="true"></i>
                  <h4 className="text-uppercase mb-10">office loaction</h4>
                  <address>Khalda, Al-zarkashi St., hacker haus </address>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-lg-6 col-lg-4 my-5">
              <div className="card border-1">
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
export default ContactUs;