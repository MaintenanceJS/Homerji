import React from 'react';



class Footer extends Component {
    render() {
  
      return (
    <div>
    
   <footer className="section footer-classic context-dark bg-image" style={{background: "black"}}>
          <div className="container">
            <div className="row row-30">
              <div className="col-md-4 col-xl-5">
                <div className="pr-xl-4"><a className="brand" href="index.html"><img className="brand-logo-light" src="images/agency/logo-inverse-140x37.png" alt="" width="140" height="37" srcset="images/agency/logo-retina-inverse-280x74.png 2x"/></a>
                  <p> You can easily find a contractor specialized in more than 10 services from our web application by scheduling an
                appointment that suits your time.</p>
               <b style={{ color: 'white' }}>★HomerG</b> lets you discover and compare contractors ratings from real customers.
              home maintenance and renovation is now easier than ever with HomerG.
                </div>
              </div>
              <div className="col-md-4">
                <h5>Contacts</h5>
                <dl className="contact-list">
                  <dt>Address:</dt>
                  <dd>19 Zarkashi Street @ Kemal Al Kilani
                      Amman, Jordan</dd>
                </dl>
                <dl className="contact-list">
                  <dt>email:</dt>
                  <dd><a href="mailto:#">admin@homarji.com</a></dd>
                </dl>
                <dl className="contact-list">
                  <dt>phones:</dt>
                  <dd><a href="tel:#">+962 6xxxxxxx</a>
                  </dd>
                </dl>
              </div>
              <div className="col-md-4 col-xl-3">
                <h5>Links</h5>
                <ul className="nav-list">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Projects</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contacts</a></li>
                  <li><a href="#">Pricing</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row no-gutters social-container">
            <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-facebook"></span><span>Facebook</span></a></div>
            <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-instagram"></span><span>instagram</span></a></div>
            <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-twitter"></span><span>twitter</span></a></div>
            <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-youtube-play"></span><span>google</span></a></div>
          </div>
        </footer> 
  
  </div>
          ) 
      }
    }
export default Footer;
      
      
      