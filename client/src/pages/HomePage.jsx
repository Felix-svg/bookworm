import axios from "axios";

const HomePage = () => {
//   const logout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://127.0.0.1:5000/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       localStorage.removeItem("token");
//       // Redirect to login or home page
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

  return (
    <div>
      <h1 className="font-bold text-center text-4xl">Book~Worm</h1>
    </div>
  );
};

export default HomePage;
