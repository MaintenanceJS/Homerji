import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button,
    Modal,
    Glyphicon,
    glyphicon
} from "react-bootstrap";

class ContactUs extends React.Component {

  render() {
    return (
      <div className="row">
        <div></div>
        <img id="postcard" src="https://scontent.famm6-1.fna.fbcdn.net/v/t1.0-9/47400419_1068140440022765_5669654738241585152_n.jpg?_nc_cat=105&_nc_ht=scontent.famm6-1.fna&oh=aa42fc42ae33e049141d4f7941efd5e9&oe=5C99C0CA" alt="postcard" className="img-responsive move" />
        <div id="content" >
          <h1> Contact Us </h1>

          <form role="form">
            <div className="form-group">
              <label htmlFor="username" className="iconic user" > Name <span className="required">*</span></label>
              <input type="text" className="form-control" name="username" id="username" required="required" placeholder="Enter Your Name please.." />
            </div>
            <div className="form-group">
              <label htmlFor="usermail" className="iconic mail-alt"> E-Mail address <span className="required">*</span></label>
              <input type="email" className="form-control" name="usermail" id="usermail" placeholder="I promise I hate spam as much as you do" required="required" />
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="iconic quote-alt"> Subject </label>
              <input type="text" className="form-control" name="subject" id="subject" required="required" placeholder="What would you like to talk about?" />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="iconic comment"> Message </label>
              <textarea name="message" id="message" className="form-control" rows="3" placeholder="Don't be shy, live me a friendly message and I'll answer as soon as possible" required="required"></textarea>
            </div>
            <input type="submit" value=" ★  Send the mail !" />
          </form>
        </div>
      </div>
    )
  }
}
export default ContactUs;