import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/spinner";
import covidImage from '../assets/covid.jpg';
import { fetchCovidDataWorld } from "../features/covid/covidSlice";
import { useSpring, animated } from "react-spring";
import '../App.css';



const styles = {
  statsList: {
    background: ' -180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%',
    color : "black",
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    margin : '40px 10vw',
    opacity : "0.88",
    z_index : 100,   
  },
 
  listItem: {
    margin: '10px 0',
    padding: '5px 0',
    borderBottom: '1px solid #ddd',
  },
};

const WorldCovidData = () => {
  const dispatch = useDispatch();
  const { worldData, statusWorld, errorWorld } = useSelector((state) => state.covid);

  useEffect(() => {
    dispatch(fetchCovidDataWorld());
  }, [dispatch]);
  

  const shade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });


  if (statusWorld === 'loading') return <div className="spinner-container"><Spinner /></div>;
  if (errorWorld) return <p>Error fetching global data: {errorWorld}</p>;

  return (
    <animated.div style={shade} className="App">
     <h1><i class="fas fa-virus"></i> <b>Covid</b> Tracker</h1>

      <div style={{ display: "flex", flexDirection: "column" }}>

        <img className="img" src={covidImage} alt="Covid-19" />
        <div style={styles.statsList}>
          <p style={styles.listItem}>Country: {worldData.Country_text}</p>
          <p style={styles.listItem} >Active Cases: <span className="red">{worldData["Active Cases_text"]}</span></p>
          <p style={styles.listItem}>Last Update: {worldData["Last Update"]}</p>
          <p style={styles.listItem}>New Cases: <span className="red">{worldData["New Cases_text"]}</span></p>
          <p style={styles.listItem}>New Deaths: {worldData["New Deaths_text"]}</p>
          <p style={styles.listItem}>Total Cases: {worldData["Total Cases_text"]}</p>
          <p style={styles.listItem}>Total Deaths: <span className="red"> {worldData["Total Deaths_text"]}</span></p>
          <p style={styles.listItem}>Total Recovered: <span className="recovered"> {worldData["Total Recovered_text"]}</span></p>

        </div>

      </div>
     
      

      
    </animated.div>
  );
};

export default WorldCovidData;
