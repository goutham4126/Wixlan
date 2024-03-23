"use client"
import { FaLocationCrosshairs } from "react-icons/fa6";
import React, { useEffect, useState } from 'react';
function Map() {
  const [userLocation, setUserLocation] = useState(null);
  const [startingLocation, setStartingLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleStartingLocationChange = (event) => {
    setStartingLocation(event.target.value);
  };

  const useCurrentLocation = () => {
    setStartingLocation(`${userLocation.latitude},${userLocation.longitude}`);
  };


  return (
    <div className="bg-orange-100 mt-[-20px] pt-1">
      {loading ? (
        <p>Loading...</p>
      ) : userLocation ? (
        <>
          <div className="m-2">
            <label>
              <span className="text-blue-950 font-bold">Starting location:</span>
              <br />
              <input
                type="text"
                className="text-slate-500 w-[60%] md:w-[40%] ring-1 ring-inset ring-slate-300 h-9 p-2 outline-none font-semibold rounded-md"
                value={startingLocation}
                onChange={handleStartingLocationChange}
              />
              <button className="ml-2" onClick={useCurrentLocation}>
              {/* <FaLocationDot /> */}
              <FaLocationCrosshairs />
              </button>
            </label>
          </div>
          <div className="m-2">
            <label>
              <span className="text-blue-950 font-bold">Enter destination:</span>
              <br />
              <input
                type="text"
                className="text-slate-500 w-[60%] md:w-[40%] h-9 p-2 outline-none ring-1 ring-inset ring-slate-300 rounded-md font-semibold"
                value={destination}
                onChange={handleDestinationChange}
              />
            </label>
          </div>
          <iframe
            width="100%"
            height="450"
            style={{ border: 0}}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={ 
              startingLocation && destination
                ? `https://www.google.com/maps/embed/v1/directions?key=AIzaSyCAYhOv9bpaK9lPFyTNxDoaeUbDXOUDvec&origin=${encodeURIComponent(
                    startingLocation
                  )}&destination=${encodeURIComponent(destination)}`
                : `https://www.google.com/maps/embed/v1/place?key=AIzaSyCAYhOv9bpaK9lPFyTNxDoaeUbDXOUDvec&q=${userLocation.latitude},${userLocation.longitude}`
            }
          ></iframe>
        </>
      ) : (
        <p>Error getting user location.</p>
      )}
    </div>
  );
}

export default Map;

