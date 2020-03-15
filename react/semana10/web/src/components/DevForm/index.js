import React, {useState, useEffect} from 'react';

function DevForm ({ onSubmit }) {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithubUserName] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          }
        );
      }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({
            github_username,techs,latitude,longitude
          });
        
        setGithubUserName('');
        setTechs('');
    };

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do github</label>
            <input name="github_username" 
                   id="github_username" 
                   value={github_username}
                   onChange={e => setGithubUserName(e.target.value)}
                   required></input>
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" 
                   id="techs" 
                   value={techs}
                   onChange={e => setTechs(e.target.value)}
                   required></input>
          </div>
  
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
              type="number" 
              name="latitude"
              id="latitude" 
              value={latitude} 
              onChange={e => setLatitude(e.target.value)}
              required>                
              </input>
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                value={longitude} 
                onChange={e => setLongitude(e.target.value)}
                required>
                </input>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
    );
};

export default DevForm;