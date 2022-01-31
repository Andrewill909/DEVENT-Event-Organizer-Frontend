import { useContext } from "react";
import StartingPageContent from "../components/StartingPage/StartingPageContent";
import EventList from "../components/Events/EventList/EventList"
import AuthContext from "../store/auth-context";

const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "IT Security Fundamentals",
    price: "free",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh posuere, imperdiet lorem a, bibendum erat. Aliquam eu egestas neque, eu sagittis sem. Nulla porta odio diam, sed fermentum est hendrerit eu.",
    imagePath: "/poster1.png",
    capacity: {
      max: 1000,
      current: 0,
    },
    organizer: "UNUSIA",
    startTime: new Date(2021, 7, 11, 10),
    endTime: new Date(2021, 7, 11, 12),
  },
  {
    id: "e2",
    title: "Pengembangan Aplikasi Android Menggunakan Appinventor",
    price: "free",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh posuere, imperdiet lorem a, bibendum erat. Aliquam eu egestas neque, eu sagittis sem. Nulla porta odio diam, sed fermentum est hendrerit eu.",
    imagePath: "/poster2.png",
    capacity: {
      max: 200,
      current: 0,
    },
    organizer: "Darmajaya",
    startTime: new Date(2021, 4, 25, 9),
    endTime: new Date(2021, 4, 25, 11),
  },
  {
    id: "e3",
    title:
      "Emerging Trends and Recent Innovations In Information Systems Technology 2021",
    price: "free",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh posuere, imperdiet lorem a, bibendum erat. Aliquam eu egestas neque, eu sagittis sem. Nulla porta odio diam, sed fermentum est hendrerit eu.",
    imagePath: "/poster3.png",
    capacity: {
      max: 1000,
      current: 0,
    },
    organizer: "BINUS",
    startTime: new Date(2021, 2, 25, 14),
    endTime: new Date(2021, 2, 25, 16),
  },
];

const HomePage = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      {!authCtx.isLoggedIn && <StartingPageContent />}
      {authCtx.isLoggedIn && <EventList />}
    </div>
  );
};

export default HomePage;
