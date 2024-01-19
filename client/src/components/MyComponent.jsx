import '../scss/App.scss';
import React from 'react';
import {Navigate} from 'react-router-dom'


const MyComponent = () => {
  return (
    <Navigate to="/login" />
  )
}

export default MyComponent


// const MyComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/video')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Dữ liệu từ server:</h1>
//       <ul>
//         {data.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyComponent;
