import React from "react";

const splashScreen = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-secondary to-primary">
  <div className="hero-content flex-col lg:flex-row">
    <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Remarque - A Bullet Journal Application</h1>
      <p className="py-6">The perfect digital tool for everyday planning.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
  );
};

export default splashScreen;