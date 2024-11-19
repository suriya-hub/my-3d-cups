import { useState } from 'react';
import Cup from './Components/Cup/cup';
import './App.css';

function App() {
  const [frontImage, setFrontImage] = useState('../public/assets/michael-dam.jpg');
  const [backImage, setBackImage] = useState('../public/assets/michael-dam.jpg');
  const [hideFrontImage, setHideFrontImage] = useState(false);
  const [hideBackImage, setHideBackImage] = useState(false);
  const [outercolor, setOuterColor] = useState('#51c3d2');
  const [innercolor, setInnerColor] = useState('#ffffff');


  const handleOuterColorChange = (event) => {
    setOuterColor(event.target.value);
  };
  const handleInnerColorChange = (event) => {
    setInnerColor(event.target.value);
  };

  const handleFrontImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFrontImage(imageUrl);
    }
  };

  const handleBackImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackImage(imageUrl);
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>3D Cup</h1>
        <div style={{ padding: '20px' }}>
          <h3>Pick a Color</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
            <div>
              <div>Outer color</div>
              <input
                type="color"
                value={outercolor}
                onChange={handleOuterColorChange}
                style={{ padding: '10px', border: 'none', cursor: 'pointer', backgroundColor: outercolor }}
              />
            </div>
            <div>
              <div>Inner color</div>
              <input
                type="color"
                value={innercolor}
                onChange={handleInnerColorChange}
                style={{ padding: '10px', border: 'none', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
        <div>
          <h3>Choose a Image</h3>
          <div style={{ marginBottom: '20px' }}>
            <label>
              Front
              <input
                type="file"
                accept="image/*"
                onChange={handleFrontImageUpload}
              />
            </label>
            <button onClick={() => setHideFrontImage(!hideFrontImage)}>{hideFrontImage ? 'Show' : 'Hide'}</button>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>
              Back
              <input
                type="file"
                accept="image/*"
                onChange={handleBackImageUpload}
              />
            </label>
            <button onClick={() => setHideBackImage(!hideBackImage)}>{hideBackImage ? 'Show' : 'Hide'}</button>
          </div>
        </div>


        <Cup
          frontImage={frontImage}
          backImage={backImage}
          hideFrontImage={hideFrontImage}
          hideBackImage={hideBackImage}
          outercolor={outercolor}
          innercolor={innercolor} />
      </div>
    </>
  );
}

export default App;

