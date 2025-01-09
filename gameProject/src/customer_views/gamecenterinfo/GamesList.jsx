import React, { useEffect, useState } from "react";
import axios from "axios";

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [price, setPrice] = useState(0);
  const [customerDetails, setCustomerDetail] = useState([]);

  const centerUser = sessionStorage.getItem("centeruser");
  const customerFound = sessionStorage.getItem("customerFound");

  const fetchConsoles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/consoles/list/${centerUser}`);
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

      const response = await axios.get(`http://localhost:8080/customer/landpage3/${customerUsername}`);
      setCustomerDetail(response.data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const gamesFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/admingames/gameslist/${centerUser}`);
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
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

  const handlePlatformChange = (e) => {
    const platform = e.target.value;
    setSelectedPlatform(platform);
    const matchingConsole = consoles.find((console) => console.consoleName === platform);
    setPrice(matchingConsole ? matchingConsole.pricePerHour : "Not available");
  };

  const handleBook = () => {
    if (customerFound) {
      
    } else {
      console.error("Customer not found in session storage.");
    }
  };

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
                  <label htmlFor={`platform-select-${game.id}`} className="form-label">
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
                <button onClick={handleBook} className="btn btn-primary mt-auto">
                  Book Game
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesList;
