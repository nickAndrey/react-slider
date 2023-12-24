import './App.css';
import Slider from './components/Slider';

const images: { id: string; src: string }[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1682695795798-1b31ea040caf?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    src: 'https://plus.unsplash.com/premium_photo-1675098654728-ad113d7db26e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1703342181521-bae93c2a4ce9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1702494091893-eed2b4f6b4d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1701676639172-421b5e0b148b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function App() {
  return (
    <div className='App'>
      <div style={{ width: 800, height: 200, margin: '0 auto' }}>
        <Slider config={{ slidesToShow: 2, gap: 5 }}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.id}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default App;
