import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <section id="home" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 150 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', width: '100%', alignItems: 'center' }}>
        
        <div style={{ paddingLeft: '50px' }}>
          <h1 style={{ fontSize: '2.8rem', paddingBottom: 15 }}>
            Hi There! <span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
          </h1>

          <h1 style={{ fontSize: '3rem' }}>
            I'M <strong className="purple">PRASHANT KUMAR</strong>
          </h1>

          <div style={{ padding: '50px 0', fontSize: '2.5rem', color: 'var(--imp-text-color)', fontWeight: 600 }}>
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer",
                  "MERN Stack Engineer",
                  "Backend Architect",
                  "Open Source Contributor",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '50px' }}>
          {/* using a placeholder image for home-main.svg since we don't have the asset */}
          <img 
            src="https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/home-main.svg" 
            alt="home pic" 
            style={{ maxHeight: 450, width: '100%', objectFit: 'contain' }} 
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
