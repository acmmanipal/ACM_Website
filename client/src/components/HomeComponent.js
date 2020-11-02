import React, { useEffect, useState, useRef,lazy,Suspense } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";

const Board=lazy(()=>import('../subcomponents/BoardComponent'));
const Domain=lazy(()=>import('../subcomponents/DomainComponent'));

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
      <div id="about" className="container about-us">
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
      <Suspense fallback={<div className="white-text">Loading......</div>}>
        <Domain />
      </Suspense>
      <Suspense fallback={<div className="white-text">Loading......</div>}>
        <Board />
      </Suspense>
  
    </>
  );
}

export default Home;
