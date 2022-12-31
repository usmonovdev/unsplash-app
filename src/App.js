import React, { useState } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './App.css';

const App = () => {

  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const ACCESS_KEY = "Fl7wuu1k9PFE0O5iSdj2NUhgwc4ovhTP4AttDt_-Uhk"; // unsplash access key

  const getValue = (event) => {
    setImage(event.target.value)
  }

  const getImages = () => {
    const urlApi = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + ACCESS_KEY;
    axios.get(urlApi).then((response) => {
      setResult(response.data.results)
      console.log(response)
    })
  }

  return (
    <>
    <div className='box'>
      <div className="formSection">
        <h1 className="title">Image Search APP</h1>
        <div>
          <input
            type="text" 
            name="image" 
            placeholder="Type to Search" 
            onChange={getValue}
          />
          <button onClick={getImages} type="submit">Search</button>
        </div>
      </div>

      <div className="result">
        {result.map((image, id) => (
          <div className="card" key={image.id}>
            <LazyLoadImage
              className="resultImage"
              src={image.urls.small}
              effect="blur"
              delayTime="300"
            />
            <div className='info'>
              <img src={image.user.profile_image.small} alt={image.user.alt_description}/>
              <div>
                <p className="username">{image.user.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default App;
