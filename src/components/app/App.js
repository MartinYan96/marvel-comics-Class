import './App.scss';
import Header from '../header/Header';
import RandomCharPerson from '../randomCharPerson/randomCharPerson';
import CharContent from '../charContent/charContent';
import vision from '../../resources/img/vision.png'
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <Header />
      <ErrorBoundary>
        <RandomCharPerson />
      </ErrorBoundary>
      <ErrorBoundary>
        <CharContent />
      </ErrorBoundary>
      <img className='visionImg' src={vision} alt="vision" />
    </div>
  );
}

export default App;
