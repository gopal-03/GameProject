import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./CustomOverlay.css";
import CustomOverlay from "./CustomOverlay";

Modal.setAppElement("#root");

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [price, setPrice] = useState(0);
  const [customerDetails, setCustomerDetail] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [timeFrom, setTimeFrom] = useState("");
  const [playTime, setPlayTime] = useState(1); // Default play time is 1 hour

  const centerUser = sessionStorage.getItem("centeruser");
  const customerFound = sessionStorage.getItem("customerFound");

  const fetchConsoles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/consoles/list/${centerUser}`
      );
      setConsoles(response.data);
    } catch (error) {
      console.error("Error fetching consoles:", error);
    }
  };

  const fetchCustomer = async () => {
    try {
      const customerUsername = sessionStorage.getItem("customerUsername");
      if (!customerUsername) {
        console.error("Customer username not found in session storage.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/customer/landpage3/${customerUsername}`
      );
      setCustomerDetail(response.data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const gamesFetch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admingames/gameslist/${centerUser}`
      );
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handlePlatformChange = (e) => {
    const platform = e.target.value;
    setSelectedPlatform(platform);
    const matchingConsole = consoles.find(
      (console) => console.consoleName === platform
    );
    setPrice(matchingConsole ? matchingConsole.pricePerHour : "Not available");
  };

  const handleBook = (game) => {
    if (customerFound) {
      setSelectedGame(game);
      setModalIsOpen(true);
    } else {
      console.error("Customer not found in session storage.");
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedGame(null);
    setTimeFrom("");
    setPlayTime(1);
  };

  const handleSubmitBooking = async () => {
    try {
      const customerUsername = sessionStorage.getItem("customerUsername");
      if (!customerUsername || !selectedGame) {
        console.error("Missing customer or game details.");
        return;
      }

      const bookingDetails = {
        uname: customerDetails.username,
        mobileno: customerDetails.mobno,
        consoleName: selectedPlatform,
        gname: selectedGame.gameName,
        playTimeFrom: timeFrom,
        playTime,
        amountPayed: price * playTime,
        centerUsername: centerUser,
      };

      await axios.post(
        `http://localhost:8080/userbookingdetails/save/${selectedGame.id}/${customerUsername}`,
        bookingDetails
      );

      console.log("Game booked successfully.");
      handleModalClose();
    } catch (error) {
      console.error("Error booking game:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchConsoles();
      await fetchCustomer();
      await gamesFetch();
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Games List</h1>
      <div className="row">
        {games.map((game) => (
          <div className="col-md-4 col-sm-6 mb-4" key={game.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`data:${game.imageContentType};base64,${game.gameImage}`}
                alt={game.gameName}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{game.gameName}</h5>
                <div className="form-group mt-3">
                  <label
                    htmlFor={`platform-select-${game.id}`}
                    className="form-label"
                  >
                    <strong>Choose Platform:</strong>
                  </label>
                  <select
                    id={`platform-select-${game.id}`}
                    className="form-select"
                    value={selectedPlatform}
                    onChange={handlePlatformChange}
                  >
                    <option value="" disabled>
                      Select a platform
                    </option>
                    {game.platform.map((platform, index) => (
                      <option key={index} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-center">
                  <strong>Price:</strong> Rs.{price} per/hr
                </p>
                {game.membershipOffer && (
                  <p className="text-center text-success">
                    <strong>Membership Offer:</strong> {game.membershipOffer}
                  </p>
                )}
                <button
                  onClick={() => handleBook(game)}
                  className="btn btn-primary mt-auto"
                >
                  Book Game
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CustomOverlay isOpen={modalIsOpen} onClose={handleModalClose}>

        <h2 className="text-center">Choose Time Slot</h2>
            <div className="form-group">
              <label htmlFor="timeFrom">Play Time From :</label>
              <input
                type="datetime-local"
                id="timeFrom"
                className="form-control"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
              />
            </div>

        <div className="form-group mt-3">
          <label htmlFor="playTime">Total Play Time (hours):</label>
          <input
            type="number"
            id="playTime"
            className="form-control"
            min="1"
            value={playTime}
            onChange={(e) => setPlayTime(parseInt(e.target.value) || 1)}
          />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={handleModalClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmitBooking}>
            Confirm Booking
          </button>
        </div>
      </CustomOverlay>
      
    </div>
  );
};

export default GamesList;
