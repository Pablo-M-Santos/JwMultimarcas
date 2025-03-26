import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "./Carrosel.css";

const Carrosel = () => {
  return (
    <div style={{ width: "100vw", margin: "0", padding: "0" }}>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
            alt="Image One"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
        {/* <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
            alt="Image Two"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </Carousel.Item> */}
      </Carousel>
    </div>
  );
};

export default Carrosel;
