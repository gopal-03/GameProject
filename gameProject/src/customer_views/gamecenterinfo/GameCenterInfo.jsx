import React from "react";
import { useNavigate } from "react-router-dom";

const GameCenterInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Game Center Details</h1>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate(`/customer/homepage/gamecenters/gamecenterinfo/games`)}
          >
            View Games
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate(`/customer/homepage/gamecenters/gamecenterinfo/consoles`)}
          >
            View Console Details
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate(`/customer/homepage/gamecenters/gamecenterinfo/memberships`)}
          >
            View Membership Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCenterInfo;
