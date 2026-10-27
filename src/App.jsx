import { useEffect, useRef, useState } from 'react';
import Cup from './Components/Cup/cup';
import './App.css';

const DEFAULT_FRONT = '/assets/default-front.svg';
const DEFAULT_BACK = '/assets/default-back.jpg';
const DEFAULT_OUTER = '#1d2433';
const DEFAULT_INNER = '#f3b61f';

const OUTER_PRESETS = ['#1d2433', '#51c3d2', '#e4572e', '#f3b61f', '#76b041', '#8e6cef', '#f4f1ea'];
const INNER_PRESETS = ['#f3b61f', '#ffffff', '#1d2433', '#51c3d2', '#e4572e', '#76b041'];

function ColorField({ label, value, presets, onChange }) {
  return (
    <div className="field">
      <div className="field-head">
        <span className="field-label">{label}</span>
        <span className="field-value">{value.toUpperCase()}</span>
      </div>
      <div className="swatches">
        {presets.map((color) => (
          <button
            key={color}
            type="button"
            className={`swatch ${color.toLowerCase() === value.toLowerCase() ? 'is-active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={`${label} ${color}`}
          />
        ))}
        <label className="swatch swatch-custom" title="Custom color">
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
          <span>+</span>
        </label>
      </div>
    </div>
  );
}

function ImageField({ label, image, hidden, onUpload, onToggle }) {
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) onUpload(file);
  };

  return (
    <div className="image-field">
      <label
        className={`dropzone ${dragging ? 'is-dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
      >
        <img src={image} alt={`${label} print`} className={hidden ? 'is-dimmed' : ''} />
        <div className="dropzone-text">
          <strong>{label} print</strong>
          <span>Click or drop an image</span>
        </div>
        <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
      </label>
      <label className="toggle" title={hidden ? `Show ${label.toLowerCase()} print` : `Hide ${label.toLowerCase()} print`}>
        <input type="checkbox" checked={!hidden} onChange={onToggle} />
        <span className="toggle-track"><span className="toggle-thumb" /></span>
      </label>
    </div>
  );
}

function App() {
  const [frontImage, setFrontImage] = useState(DEFAULT_FRONT);
  const [backImage, setBackImage] = useState(DEFAULT_BACK);
  const [hideFrontImage, setHideFrontImage] = useState(false);
  const [hideBackImage, setHideBackImage] = useState(false);
  const [outercolor, setOuterColor] = useState(DEFAULT_OUTER);
  const [innercolor, setInnerColor] = useState(DEFAULT_INNER);
  const [autoRotate, setAutoRotate] = useState(false);
  const controlsRef = useRef(null);

  // Free uploaded image blobs when they are replaced
  useEffect(() => () => { if (frontImage.startsWith('blob:')) URL.revokeObjectURL(frontImage); }, [frontImage]);
  useEffect(() => () => { if (backImage.startsWith('blob:')) URL.revokeObjectURL(backImage); }, [backImage]);

  const resetDesign = () => {
    setFrontImage(DEFAULT_FRONT);
    setBackImage(DEFAULT_BACK);
    setHideFrontImage(false);
    setHideBackImage(false);
    setOuterColor(DEFAULT_OUTER);
    setInnerColor(DEFAULT_INNER);
  };

  const resetView = () => controlsRef.current?.reset();

  const downloadSnapshot = () => {
    const canvas = document.querySelector('.stage canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-3d-cup.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" style={{ backgroundColor: outercolor }} />
          <span className="brand-name">Mug Studio</span>
        </div>
        <span className="topbar-hint">Drag to rotate · Scroll to zoom</span>
      </header>

      <main className="workspace">
        <section className="stage">
          <Cup
            ref={controlsRef}
            frontImage={frontImage}
            backImage={backImage}
            hideFrontImage={hideFrontImage}
            hideBackImage={hideBackImage}
            outercolor={outercolor}
            innercolor={innercolor}
            autoRotate={autoRotate}
          />
          <div className="stage-toolbar">
            <button type="button" className={`tool ${autoRotate ? 'is-active' : ''}`} onClick={() => setAutoRotate(!autoRotate)}>
              {autoRotate ? 'Stop rotation' : 'Auto rotate'}
            </button>
            <button type="button" className="tool" onClick={resetView}>Reset view</button>
          </div>
        </section>

        <aside className="panel">
          <div className="panel-intro">
            <h1>Design your mug</h1>
            <p>Pick colors and add your own artwork to see it in 3D.</p>
          </div>

          <div className="card">
            <h2 className="card-title">Colors</h2>
            <ColorField label="Outer" value={outercolor} presets={OUTER_PRESETS} onChange={setOuterColor} />
            <ColorField label="Inner" value={innercolor} presets={INNER_PRESETS} onChange={setInnerColor} />
          </div>

          <div className="card">
            <h2 className="card-title">Artwork</h2>
            <ImageField
              label="Front"
              image={frontImage}
              hidden={hideFrontImage}
              onUpload={(file) => setFrontImage(URL.createObjectURL(file))}
              onToggle={() => setHideFrontImage(!hideFrontImage)}
            />
            <ImageField
              label="Back"
              image={backImage}
              hidden={hideBackImage}
              onUpload={(file) => setBackImage(URL.createObjectURL(file))}
              onToggle={() => setHideBackImage(!hideBackImage)}
            />
          </div>

          <div className="panel-actions">
            <button type="button" className="btn btn-ghost" onClick={resetDesign}>Reset</button>
            <button type="button" className="btn btn-primary" onClick={downloadSnapshot}>Download PNG</button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
