import { DiJavascript1, DiReact, DiNodejs, DiMongodb, DiGit } from "react-icons/di";
import { SiExpress, SiPostman, SiCloudinary } from "react-icons/si";

const Skills = () => {
  return (
    <section id="skills" className="section" style={{ textAlign: 'center', paddingTop: 60 }}>
      <h1 style={{ fontSize: '2.6em', paddingBottom: '40px' }}>
        Professional <strong className="purple">Skillset</strong>
      </h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 25, paddingBottom: 50, maxWidth: 1000, margin: '0 auto' }}>
        <div className="tech-icons" style={{ width: 'calc(20% - 25px)', minWidth: 120 }}>
          <DiJavascript1 />
        </div>
        <div className="tech-icons" style={{ width: 'calc(20% - 25px)', minWidth: 120 }}>
          <DiNodejs />
        </div>
        <div className="tech-icons" style={{ width: 'calc(20% - 25px)', minWidth: 120 }}>
          <DiReact />
        </div>
        <div className="tech-icons" style={{ width: 'calc(20% - 25px)', minWidth: 120 }}>
          <DiMongodb />
        </div>
        <div className="tech-icons" style={{ width: 'calc(20% - 25px)', minWidth: 120 }}>
          <SiExpress />
        </div>
      </div>

      <h1 style={{ fontSize: '2.6em', paddingBottom: '40px', paddingTop: 30 }}>
        <strong className="purple">Tools</strong> I use
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 25, paddingBottom: 50, maxWidth: 1000, margin: '0 auto' }}>
        <div className="tech-icons" style={{ width: 'calc(20% - 25px)', minWidth: 120 }}>
          <DiGit />
        </div>
        <div className="tech-icons" style={{ width: 'calc(20% - 25px)', minWidth: 120 }}>
          <SiPostman />
        </div>
        <div className="tech-icons" style={{ width: 'calc(20% - 25px)', minWidth: 120 }}>
          <SiCloudinary />
        </div>
      </div>
    </section>
  );
};

export default Skills;
