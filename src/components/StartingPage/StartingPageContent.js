import { Link } from "react-router-dom";

import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  return (
    <div>
      <div className={classes.starting}>
        <h1>Welcome to DEVENT</h1>
        <h2>Discover events, competitions, and many more!</h2>
      </div>
      <div className={classes.link}>
        <Link to="/auth">
          <button type="button">Get Started!</button>
        </Link>
      </div>
    </div>
  );
};

export default StartingPageContent;
