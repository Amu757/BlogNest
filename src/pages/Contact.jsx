import "./pages.css";

function Contact() {
  return (
    <div className="background">
    <div className=" contact-container">
      <div className="inner-container">
        <div className="upperpart">
          <div className="topcontaint">
            <img src="/myimage.png" alt="img" />
            <div className="intro">
              <h2>Aman Waghmare</h2>
              <p>Full Stack Web Developer</p>
            </div>
          </div>
        </div>
        <div className="lowerpart">
          <div>
            <p> +91 705 888 3563</p>
            <p>Dharmpeth, Nagpur</p>
          </div>
          <div>
            <a href="github.com/amu007/portfolio" className="link">
              myPortfolioSite
            </a>
            <a href="amanwaghmare311@gmail.com" className="link">
              amanwaghmare311@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Contact;
