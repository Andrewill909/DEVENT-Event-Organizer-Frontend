import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import useInput from "../../../hooks/use-input";
import classes from "./EventForm.module.css";

const acceptedImageType = ["image/jpeg", "image/png"];
const isNotEmpty = (value) => value.trim() !== "";
const isNumber = (value) => /^-?\d+$/.test(value);
const isImage = (value) => acceptedImageType.includes(value["type"]);

const EventForm = () => {
  const authCtx = useContext(AuthContext);
  const {
    value: enteredTitle,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: enteredCategory,
    valueChangeHandler: categoryChangeHandler,
    reset: resetCategory,
  } = useInput(isNotEmpty);

  const {
    value: enteredPrice,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput(isNumber);

  const {
    value: enteredDescription,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);

  // const {
  //   value: enteredImage,
  //   hasError: imageHasError,
  //   valueChangeHandler: imageChangeHandler,
  //   inputBlurHandler: imageBlurHandler,
  //   reset: resetImage,
  // } = useInput(isImage);

  const {
    value: enteredCapacity,
    hasError: capacityHasError,
    valueChangeHandler: capacityChangeHandler,
    inputBlurHandler: capacityBlurHandler,
    reset: resetCapacity,
  } = useInput(isNumber);

  const {
    value: enteredStartTime,
    isValid: startTimeIsValid,
    hasError: startTimeHasError,
    valueChangeHandler: startTimeChangeHandler,
    inputBlurHandler: startTimeBlurHandler,
    reset: resetStartTime,
  } = useInput(isNotEmpty);

  const {
    value: enteredEndTime,
    isValid: endTimeIsValid,
    hasError: endTimeHasError,
    valueChangeHandler: endTimeChangeHandler,
    inputBlurHandler: endTimeBlurHandler,
    reset: resetEndTime,
  } = useInput(isNotEmpty);

  const [catArray, setCatArray] = useState([]);

  useEffect(() => {
    axios
      .get("http://159.223.89.189:5000/api/categories")
      .then((response) => setCatArray(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  const [selectedImages, setSelectedImage] = useState("https://fakeimg.pl/350x200/?text=Img");
  const [saveImage, setSaveImage] = useState(null);

  const imageChangeHandler = (event) => {
    console.log(event.target.files[0]);
    let uploaded = event.target.files[0];
    setSelectedImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

    // console.log(event.target.files);
    // if (event.target.files) {
    //   const imgArr = Array.from(event.target.files).map((file) =>
    //     URL.createObjectURL(file)
    //   );
    //   console.log(imgArr);

    //   setSelectedImage((prevImage) => prevImage.concat(imgArr));
    //   Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));    
    // }


  // const RenderPhotos = (source) => {
  //   return source.map((photo) => {
  //     return (
  //       <div className={classes.imgList}>
  //         <img src={photo} key={photo} className={classes.imgPreview} />
  //       </div>
  //     );
  //   });
  // };

  let formIsValid = false;

  if (
    titleIsValid &&
    descriptionIsValid &&
    priceIsValid &&
    startTimeIsValid &&
    endTimeIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      console.log("form not valid");
      return;
    }

    let enteredImage = new FormData();
    enteredImage.append("imagePath", saveImage);
  
    axios
      .post(
        "http://159.223.89.189:5000/api/events",
        {
          name: enteredTitle,
          description: enteredDescription,
          capacity: enteredCapacity,
          startTime: enteredStartTime,
          endTime: enteredEndTime,
          price: enteredPrice,
          enteredImage,
          category: enteredCategory,
        },
        {
          headers: {
            Authorization: authCtx.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });

    console.log(
      enteredTitle,
      enteredDescription,
      enteredCategory,
      enteredImage,
      enteredPrice
    );
    console.log("submitted");
    resetTitle();
    resetCategory();
    resetPrice();
    resetDescription();
    // resetImage();
    resetCapacity();
    resetStartTime();
    resetEndTime();
  };

  return (
    <section className={classes.auth}>
      <h1>Upload Event</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          {titleHasError && (
            <p className={classes["error-text"]}>Fill title!</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="category">Category</label>
          <select id="category" onChange={categoryChangeHandler}>
            {catArray.map((cat) => (
              <option key={cat["_id"]} value={cat["_id"]}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Ticket Price (Rp.)</label>
          <input
            type="text"
            id="price"
            value={enteredPrice}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
          />
          {priceHasError && (
            <p className={classes["error-text"]}>Fill number!</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          {descriptionHasError && (
            <p className={classes["error-text"]}>Fill description!</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Image</label>
          <input
            accept="image/*"
            type="file"
            id="image"
  
            // onBlur={imageBlurHandler}
            // onInput={imageInputHandler}
            onChange={imageChangeHandler}
            multiple
          />
          {/* {RenderPhotos(selectedImages)}; */}
          <img src={selectedImages}></img>
          {/* {imageHasError && (
            <p className={classes["error-text"]}>
              Image format must be jpg/jpeg/png!
            </p>
          )} */}
        </div>
        <div className={classes.control}>
          <label htmlFor="capacity">Max Capacity</label>
          <input
            type="text"
            pattern="[0-9]*"
            id="capacity"
            value={enteredCapacity}
            onChange={capacityChangeHandler}
            onBlur={capacityBlurHandler}
          />
          {capacityHasError && (
            <p className={classes["error-text"]}>Must be a number!</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            value={enteredStartTime}
            onChange={startTimeChangeHandler}
            onBlur={startTimeBlurHandler}
          />
          {startTimeHasError && (
            <p className={classes["error-text"]}>
              Enter a valid date and time!
            </p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="endTime">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            value={enteredEndTime}
            onChange={endTimeChangeHandler}
            onBlur={endTimeBlurHandler}
          />
          {endTimeHasError && (
            <p className={classes["error-text"]}>
              Enter a valid date and time!
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button disabled={!formIsValid}>Add Event</button>
        </div>
      </form>
    </section>
  );
};

export default EventForm;
