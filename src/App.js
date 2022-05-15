// import Add from 'pages/Add';
// import Delete from 'pages/Delete';
// import Read from 'pages/Read';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import Register from 'pages/Register';
// import ArrayMethods from 'pages/ArrayMethods';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Register />
      {/* <ArrayMethods /> */}

      <ToastContainer />
    </>
  );
}

export default App;