import React, { useEffect, useState, useRef } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";
import M from "materialize-css";

function autoplay() {
  if (document.getElementById("slider")) {
    M.Carousel.getInstance(document.getElementById("slider")).next();
    setTimeout(autoplay, 5000);
  }
}

function Home(props) {
  const [vantaEffect, setVantaEffect] = useState(0);

  const myRef = useRef(0);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3ff3ff,
          backgroundColor: 0x0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const elems = document.querySelectorAll(".carousel");
    M.Carousel.init(elems, { duration: 1000, padding: 200 });
    autoplay();
  });

  return (
    <>
      <div className="launch-image" ref={myRef}>
        <div className="launch-caption">
          <div className="row">
            <img src={"/assets/images/logo.png"} className="launch-logo" />
          </div>
          <div className="row  motto">Experience Computing</div>
        </div>
      </div>
      <div className="container about-us">
        <h2>About Us</h2>
        <h6>
          ACM Manipal is the official student chapter of the Association for
          Computing Machinery (ACM) for Manipal University. ACM is the world's
          largest scientific and educational computing society. ACM ICPC (also
          referred to as the “Olympics of Programming Competitions”), and the
          A.M. Turing Awards, are two of ACM’s most prominent events. ACM
          Manipal, is very different from any other technical club on campus
          because we have a flat hierarchy in place. That means that our Core
          Committee consists of students from all years across all branches. We
          believe that age cannot be considered a factor to determine one’s
          competency.
        </h6>
        <div className="row miss-vis">
          <div className="col s12 m6 mission">
            <img
              className="responsive-img circle "
              src="assets/images/mission.jpg"
            />
            <h3>The Mission</h3>
            <p>
              To create a thriving Computer Science culture at MIT Manipal by
              sharing of knowledge and ideas, and promoting and nurturing the
              interest and curiosity of students in relevant fields. ACM
              welcomes any person who is passionate enough to pursue excellence
              in any field of Computer Science, irrespective of their year,
              branch or CGPA.
            </p>
          </div>
          <div className="col s12 m6 vision">
            <img
              className="responsive-img circle"
              src="assets/images/vision.jpg"
            />
            <h3>The Vision</h3>
            <p>
              Our founding members saw a huge scope for improvement in the
              computer science culture at MIT Manipal. Lack of opportunity,
              information and motivation needed to be eliminated, for MIT to
              have a thriving culture in the science of computing. To rejuvenate
              the community, ACM Manipal was set up.
            </p>
          </div>
        </div>
      </div>
      <div className="domain">
        <div className="container">
          <h2>Domains</h2>
          <div className="row">
            <div className="col s12 m6 l4">
              <div class="card">
                <div class="card-image">
                  <img src="assets/images/comp.jpg" />
                  <span class="card-title">Competitive Coding</span>
                </div>
                <div class="card-content">
                  <p>
                    Our founding members saw a huge scope for improvement in the
                    computer science culture at MIT Manipal. Lack of
                    opportunity, information and motivation needed to be
                    eliminated, for MIT to have a thriving culture in the
                    science of computing. To rejuvenate the community, ACM
                    Manipal was set up.
                  </p>
                </div>
              </div>
            </div>
            <div className="col s12 m6 l4">
              <div class="card">
                <div class="card-image">
                  <img src="assets/images/webdev.jpg" />
                  <span class="card-title">Web Dev</span>
                </div>
                <div class="card-content">
                  <p>
                    Our founding members saw a huge scope for improvement in the
                    computer science culture at MIT Manipal. Lack of
                    opportunity, information and motivation needed to be
                    eliminated, for MIT to have a thriving culture in the
                    science of computing. To rejuvenate the community, ACM
                    Manipal was set up.
                  </p>
                </div>
              </div>
            </div>
            <div className="col s12 m6 l4">
              <div class="card">
                <div class="card-image">
                  <img src="assets/images/ai.jpg" />
                  <span class="card-title">Artificial Intelligence</span>
                </div>
                <div class="card-content">
                  <p>
                    Our founding members saw a huge scope for improvement in the
                    computer science culture at MIT Manipal. Lack of
                    opportunity, information and motivation needed to be
                    eliminated, for MIT to have a thriving culture in the
                    science of computing. To rejuvenate the community, ACM
                    Manipal was set up.
                  </p>
                </div>
              </div>
            </div>
            <div className="col s12 m6 l4">
              <div class="card">
                <div class="card-image">
                  <img src="assets/images/research.jpg" />
                  <span class="card-title">Research</span>
                </div>
                <div class="card-content">
                  <p>
                    Our founding members saw a huge scope for improvement in the
                    computer science culture at MIT Manipal. Lack of
                    opportunity, information and motivation needed to be
                    eliminated, for MIT to have a thriving culture in the
                    science of computing. To rejuvenate the community, ACM
                    Manipal was set up.
                  </p>
                </div>
              </div>
            </div>
            <div className="col s12 m6 l4">
              <div class="card">
                <div class="card-image">
                  <img src="assets/images/appdev.jpg" />
                  <span class="card-title">Mobile App Dev</span>
                </div>
                <div class="card-content">
                  <p>
                    Our founding members saw a huge scope for improvement in the
                    computer science culture at MIT Manipal. Lack of
                    opportunity, information and motivation needed to be
                    eliminated, for MIT to have a thriving culture in the
                    science of computing. To rejuvenate the community, ACM
                    Manipal was set up.
                  </p>
                </div>
              </div>
            </div>
            <div className="col s12 m6 l4">
              <div class="card">
                <div class="card-image" style={{ backgroundColor: "#0a0a0a" }}>
                  <img src="assets/images/open.jpg" />
                  <span class="card-title">Open Source</span>
                </div>
                <div class="card-content">
                  <p>
                    Our founding members saw a huge scope for improvement in the
                    computer science culture at MIT Manipal. Lack of
                    opportunity, information and motivation needed to be
                    eliminated, for MIT to have a thriving culture in the
                    science of computing. To rejuvenate the community, ACM
                    Manipal was set up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="board">
        <div className="container">
          <h2>Meet The Board</h2>
          <div className="row">
            <div className="col s12" id="prod-car">
              <div id="slider" className="carousel">
                <div className="card carousel-item">
                  <div className="card-image ">
                    <img
                      classname="responsive-img"
                      src={"/assets/images/utkarsh.png"}
                    />
                    <span className="card-title">Utkarsh Bajaj</span>
                  </div>

                  <div class="card-content">
                    <h4>Chairperson</h4>
                    <p>
                      Our founding members saw a huge scope for improvement in
                      the computer science culture at MIT Manipal. Lack of
                      opportunity, information and motivation needed to be
                      eliminated, for MIT to have a thriving culture in the
                      science of computing. To rejuvenate the community, ACM
                      Manipal was set up.
                    </p>
                    <br></br>
                    <p>
                      <center>
                        <span>
                          <i class="fab fa-2x fa-linkedin"></i>{" "}
                        </span>
                        <span>
                          <i class="fab fa-2x fa-github"> </i>
                        </span>{" "}
                        <span>
                          <i class="fab fa-2x fa-medium"></i>
                        </span>
                      </center>
                    </p>
                  </div>
                </div>
                <div className="card carousel-item">
                  <div className="card-image ">
                    <img
                      classname="responsive-img"
                      src={"/assets/images/leander.jpg"}
                    />
                    <span className="card-title">Leander Maben</span>
                  </div>
                  <div class="card-content">
                    <h4>Vice Chairperson</h4>
                    <p>
                      Our founding members saw a huge scope for improvement in
                      the computer science culture at MIT Manipal. Lack of
                      opportunity, information and motivation needed to be
                      eliminated, for MIT to have a thriving culture in the
                      science of computing. To rejuvenate the community, ACM
                      Manipal was set up.
                    </p>
                    <br></br>
                    <p>
                      <center>
                        <span>
                          <i class="fab fa-2x fa-linkedin"></i>{" "}
                        </span>
                        <span>
                          <i class="fab fa-2x fa-github"> </i>
                        </span>{" "}
                        <span>
                          <i class="fab fa-2x fa-medium"></i>
                        </span>
                      </center>
                    </p>
                  </div>
                </div>
                <div className="card carousel-item">
                  <div className="card-image ">
                    <img
                      classname="responsive-img"
                      src={"/assets/images/shruti.jpg"}
                    />
                    <span className="card-title">Shruti Verma</span>
                  </div>
                  <div class="card-content">
                    <h4>General Secretary</h4>
                    <p>
                      Our founding members saw a huge scope for improvement in
                      the computer science culture at MIT Manipal. Lack of
                      opportunity, information and motivation needed to be
                      eliminated, for MIT to have a thriving culture in the
                      science of computing. To rejuvenate the community, ACM
                      Manipal was set up.
                    </p>
                    <br></br>
                    <p>
                      <center>
                        <span>
                          <i class="fab fa-2x fa-linkedin"></i>{" "}
                        </span>
                        <span>
                          <i class="fab fa-2x fa-github"> </i>
                        </span>{" "}
                        <span>
                          <i class="fab fa-2x fa-medium"></i>
                        </span>
                      </center>
                    </p>
                  </div>
                </div>
                <div className="card carousel-item">
                  <div className="card-image ">
                    <img
                      classname="responsive-img"
                      src={"/assets/images/baidya.jpg"}
                    />
                    <span className="card-title">Baidyanath Kundu</span>
                  </div>
                  <div class="card-content">
                    <h4>Technical Head</h4>
                    <p>
                      Our founding members saw a huge scope for improvement in
                      the computer science culture at MIT Manipal. Lack of
                      opportunity, information and motivation needed to be
                      eliminated, for MIT to have a thriving culture in the
                      science of computing. To rejuvenate the community, ACM
                      Manipal was set up.
                    </p>
                    <br></br>
                    <p>
                      <center>
                        <span>
                          <i class="fab fa-2x fa-linkedin"></i>{" "}
                        </span>
                        <span>
                          <i class="fab fa-2x fa-github"> </i>
                        </span>{" "}
                        <span>
                          <i class="fab fa-2x fa-medium"></i>
                        </span>
                      </center>
                    </p>
                  </div>
                </div>
                <div className="card carousel-item">
                  <div className="card-image ">
                    <img
                      classname="responsive-img"
                      src={"/assets/images/garima.jpg"}
                    />
                    <span className="card-title">Garima Singh</span>
                  </div>
                  <div class="card-content">
                    <h4>Membership Chairperson</h4>
                    <p>
                      Our founding members saw a huge scope for improvement in
                      the computer science culture at MIT Manipal. Lack of
                      opportunity, information and motivation needed to be
                      eliminated, for MIT to have a thriving culture in the
                      science of computing. To rejuvenate the community, ACM
                      Manipal was set up.
                    </p>
                    <br></br>
                    <p>
                      <center>
                        <span>
                          <i class="fab fa-2x fa-linkedin"></i>{" "}
                        </span>
                        <span>
                          <i class="fab fa-2x fa-github"> </i>
                        </span>{" "}
                        <span>
                          <i class="fab fa-2x fa-medium"></i>
                        </span>
                      </center>
                    </p>
                  </div>
                </div>
                <div className="card carousel-item">
                  <div className="card-image ">
                    <img
                      classname="responsive-img"
                      src={"/assets/images/saksham.jpg"}
                    />
                    <span className="card-title">Saksham Mehta</span>
                  </div>
                  <div class="card-content">
                    <h4>Treasurer</h4>
                    <p>
                      Our founding members saw a huge scope for improvement in
                      the computer science culture at MIT Manipal. Lack of
                      opportunity, information and motivation needed to be
                      eliminated, for MIT to have a thriving culture in the
                      science of computing. To rejuvenate the community, ACM
                      Manipal was set up.
                    </p>
                    <br></br>
                    <p>
                      <center>
                        <span>
                          <i class="fab fa-2x fa-linkedin"></i>{" "}
                        </span>
                        <span>
                          <i class="fab fa-2x fa-github"> </i>
                        </span>{" "}
                        <span>
                          <i class="fab fa-2x fa-medium"></i>
                        </span>
                      </center>
                    </p>
                  </div>
                </div>
                <div className="card carousel-item">
                  <div className="card-image ">
                    <img
                      classname="responsive-img"
                      src={"/assets/images/ishika.jpg"}
                    />
                    <span className="card-title">Ishika Gupta</span>
                  </div>
                  <div class="card-content">
                    <h4>Social Media and Graphics Head</h4>
                    <p>
                      Our founding members saw a huge scope for improvement in
                      the computer science culture at MIT Manipal. Lack of
                      opportunity, information and motivation needed to be
                      eliminated, for MIT to have a thriving culture in the
                      science of computing. To rejuvenate the community, ACM
                      Manipal was set up.
                    </p>
                    <br></br>
                    <p>
                      <center>
                        <span>
                          <i class="fab fa-2x fa-linkedin"></i>{" "}
                        </span>
                        <span>
                          <i class="fab fa-2x fa-github"> </i>
                        </span>{" "}
                        <span>
                          <i class="fab fa-2x fa-medium"></i>
                        </span>
                      </center>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
