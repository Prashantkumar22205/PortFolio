import Tilt from 'react-parallax-tilt';

const About = () => {
  return (
    <section id="about" className="section" style={{ paddingTop: 80, paddingBottom: 100 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
        
        <div style={{ paddingLeft: '50px', paddingRight: '20px' }}>
          <h1 style={{ fontSize: '2.6em', paddingBottom: '20px' }}>
            LET ME <span className="purple"> INTRODUCE </span> MYSELF
          </h1>
          <p style={{ fontSize: '1.2em', lineHeight: 1.8, paddingTop: '20px', color: 'var(--text-color)' }}>
            I fell in love with programming and I have at least learnt something, I think… 🤷‍♂️
            <br />
            <br />I am fluent in classics like
            <i>
              <b className="purple"> Javascript and Node.js. </b>
            </i>
            <br />
            <br />
            My field of Interest's are building new &nbsp;
            <i>
              <b className="purple">Web Technologies and Products </b>
            </i>
            <br />
            <br />
            Currently studying B.Tech at <b className="purple">ABES Engineering College, Ghaziabad</b>. Whenever possible, I also apply my passion for developing products with <b className="purple">Node.js</b> and
            <i>
              <b className="purple"> Modern Javascript Library and Frameworks</b>
            </i>
            &nbsp; like
            <i>
              <b className="purple"> React.js</b>
            </i>
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tilt>
            <img 
              src="https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/avatar.svg" 
              alt="avatar" 
              style={{ maxHeight: 350, borderRadius: '50%' }} 
            />
          </Tilt>
        </div>

      </div>
    </section>
  );
};

export default About;
