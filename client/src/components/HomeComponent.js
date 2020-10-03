import React, { useEffect, useState, useRef } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";
import M from "materialize-css";
import BoardMemberCard from "./BoardMemberCard";
import board from "../static/board-members.json";

function autoplay() {
  if (document.getElementById("slider")) {
    M.Carousel.getInstance(document.getElementById("slider")).next();
    setTimeout(autoplay, 5000);
  }
}

function Home(props) {
  const [vantaEffect, setVantaEffect] = useState(0);
  const [boardmembers] = useState(board);

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
              <div className="card">
                <div className="card-image">
                  <img src="assets/images/comp.jpg" />
                  <span className="card-title">Competitive Coding</span>
                </div>
                <div className="card-content">
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
              <div className="card">
                <div className="card-image">
                  <img src="assets/images/webdev.jpg" />
                  <span className="card-title">Web Dev</span>
                </div>
                <div className="card-content">

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
              <div className="card">
                <div className="card-image">
                  <img src="assets/images/ai.jpg" />
                  <span className="card-title">Artificial Intelligence</span>
                </div>
                <div className="card-content">
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
              <div className="card">
                <div className="card-image">
                  <img src="assets/images/research.jpg" />
                  <span className="card-title">Research</span>
                </div>
                <div className="card-content">
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
              <div className="card">
                <div className="card-image">
                  <img src="assets/images/appdev.jpg" />
                  <span className="card-title">Mobile App Dev</span>
                </div>
                <div className="card-content">
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
              <div className="card">
                <div
                  className="card-image"
                  style={{ backgroundColor: "#0a0a0a" }}
                >
                  <img src="assets/images/open.jpg" />
                  <span className="card-title">Open Source</span>
                </div>
                <div className="card-content">
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
                <>
                  {boardmembers.map( (boardmember) => (
                    <BoardMemberCard key={boardmember.position + boardmember.name} {...boardmember}/>
                  ))}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
