import './App.css';
import MyHighchartPieWithInput from './Chart';
import { Button } from 'buttonspackages';

function App() {
  return (
    <>
      <div>
        <MyHighchartPieWithInput />
        <Button label='button' onClick={() => alert('Button clicked!')} />
      </div>
    </>
  );
}

export default App;
