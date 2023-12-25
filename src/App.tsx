import './App.css';
import Slider from './components/Slider';

function App() {
  return (
    <div className='App'>
      <div style={{ width: 800, height: 200, margin: '0 auto' }}>
        <Slider config={{ slidesToShow: 1, gap: 5 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} style={{ height: '100%', width: '100%', backgroundColor: 'orange' }}>
              {index}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default App;
