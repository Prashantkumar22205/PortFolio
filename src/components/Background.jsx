/** Animated gradient-orb background + subtle grid — no external deps */
const Background = () => (
  <>
    <div className="bg-canvas" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
    <div className="bg-grid" aria-hidden="true" />
  </>
);

export default Background;
