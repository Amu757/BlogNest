import "./footer.css"
function Footer() {
  return (
    <section className="footer-container">
      <div className="top">
        <div className="logo-container">
          <a className="logo" href="#">
            <img src="/Blog Logo.png" alt="" />
          </a>

          <p>Stay in the loop and sign up for the </p>
          <p> new products</p>
          <input className="emailinput" type="text" placeholder="Enter your email" />
        </div>
        <div ></div>
        <div>
          <ul>
            <li className="title">Company</li>
            <li>Home</li>
            <li>About</li>
            <li>Solutions</li>
            <li>Team</li>
            <li>Career</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="title">Documentation</li>
            <li>Help Center</li>
            <li>Contact</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="title">Social</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Youtube</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
        <hr />
      <div className="bottom">
        <a href="">
          &copy; Copyright 2024. All Rights Reserved by Aman Waghmare.
        </a>
        <a href="">Privacy Policy</a>
      </div>
    </section>
  );
}

export default Footer;
