import React, { useState } from 'react';
import './App.css';

//import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';

let loadedStorageData = [];
const loadStorage = localStorage.getItem("newKey");
if (loadStorage) {
  loadedStorageData = JSON.parse(loadStorage);
}

 export default function App() {

  const [dog, setDog] = React.useState(["https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg"]);
  const [pets, setPets] = React.useState(loadedStorageData);
 

  async function loadData() {
    const url = "https://random.dog/woof.json";
    const response = await fetch(url);
    const data = await response.json();
  
    let imageSrc = [data["url"]];
    
    setDog(imageSrc);
    
  }
  
  function addDog() {
    const newOne = dog;
    const newTwo = [...pets, newOne];

    setPets(newTwo);
    
    const stringNewTwo = JSON.stringify(newTwo);

    localStorage.setItem("newKey", stringNewTwo);

    const addedToFavorites = document.getElementById("added");
    addedToFavorites.style.display='';
    setTimeout(function () {
      addedToFavorites.style.display='none';
  }, 1500);
    loadData()
 
  }
  
  function removeImage(itemToRemove) {
    let filteredItem = pets.filter(function (item) {
      return item !== itemToRemove;
    });
    
    setPets(filteredItem);
    const stringFilter = JSON.stringify(filteredItem);
    localStorage.setItem("newKey", stringFilter);
    
  }

 
  return (
    <div>
      <h1 className="myDog">myDog</h1>
      <div className="upperhalf">
        <img id="firstpic" src={dog}></img>
        <div style={{display:"none"}} id="added"><p>added to your favorites!</p></div>
      </div>
      <div className="buttonsclass">
        <button onClick={loadData}>go!</button>
        <button onClick={addDog}>stay!</button>
      </div>
      <div className="favorites">
        <h1 className="doghouse">favorites</h1>
        {pets.map(item => {
          return (
            <img id="gallery" src={item} onClick={function () {
              removeImage(item);
            }}></img>
          )
        })}  
      </div>
      
    </div>
  )
}

