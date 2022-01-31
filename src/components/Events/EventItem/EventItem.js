import { useEffect, useState } from "react";

import Card from "../../UI/Card";
import "./EventItem.css";

import axios from "axios";

const EventItem = () => {
  const [selectedProps, setSelectedProps] = useState([]);

  useEffect(() => {
    axios
      .get("http://159.223.89.189:5000/api/events")
      .then((response) => setSelectedProps(response.data.data))
      .catch((error) => console.log(error));
  }, [setSelectedProps]);

  console.log(selectedProps);

  return (
    <div>
      {selectedProps.map((props) => (
        <Card className="event-item" key={props["_id"]}>
          <li>
            <div className="event-item__description">
              <div className="card__body">
                <h2>{props.name}</h2>
                <h4>Category: {props.category.name}</h4>
                <h4>Ticket Price: Rp.{props.price}</h4>
                <h4>Quota: {props.capacity.max}</h4>
                <h4>{props.startTime}</h4>
                <p>{props.description}</p>
                <img alt="image not found" src={props.imagePath[0]}></img>
              </div>
            </div>
          </li>
        </Card>
      ))}
    </div>
  );
};

export default EventItem;
