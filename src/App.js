import React,{useState,useEffect} from 'react';
import './App.css';
import InfoBox from './InfoBox';
import {MenuItem,FormControl,Select, Card, CardContent} from "@material-ui/core"
import Map from './Map';
import Table from './Table'
import {sortData,prettyPrintStat} from './util';
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css";



function App() {

  const [casesType,setCasesType]=useState("cases");
  const [mapCountries,setMapCountries]=useState([]);
  const [tableData,setTableData]=useState([]);
  const [countries,setCountries]=useState([]);
  const [countryInfo,setCountryInfo]=useState({});
  const [country,setCountry]=useState('worldwide');
  const [mapCenter,setMapCenter]=useState({lat:34.80746,lng:-40.4796});
  const [mapZoom,setMapZoom]=useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(res=>res.json())
    .then((data,err)=>{
      if(err) throw err;
      setCountryInfo(data);
    })

  }, []);

  useEffect(() => {
      const getCountries= async ()=>{
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response)=>response.json())
        .then((data)=>{
          
          const countires=data.map((country)=>(
            {
              name:country.country, // INDIA,UNITED STATE
              value:country.countryInfo.iso2
            }));

            setMapCountries(data);
            const newData=sortData(data);
            
            setTableData(newData); 
            setCountries(countires);
        });
      };
      getCountries();
  }, []);

  const onCountryChange= async (event)=>{
    const countryCode=event.target.value;
    setCountry(countryCode);

    const url= countryCode==="worldwide"? "https://disease.sh/v3/covid-19/all"
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      setMapZoom(4);
    })

  };
console.log("Table data",mapCountries);

  return (
    <div className="app">

      {/* app left start */}

      <div className="app__left">
      <div className="app__header">
          <h1>COVID 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {countries.map((country)=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}   
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox isRed active={casesType==='cases'} onClick={e=>setCasesType('cases')} title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox active={casesType==='recovered'} onClick={e=>setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
          <InfoBox isRed active={casesType==='deaths'} onClick={e=>setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
        </div>

        <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />

      </div>


      {/* app right start */}
      <Card className="app__right">
          <CardContent>
              <h3> Live Cases by Country</h3>
                <Table countires_props={tableData} />
              <h3>WorldWide new {casesType}</h3>
              <LineGraph casesType={casesType}/>
          </CardContent>
      </Card>     
    </div>
  );
}

export default App;
