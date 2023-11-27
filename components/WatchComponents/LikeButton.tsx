// "use client";

// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { FiHeart } from "react-icons/fi";

// const LikeButton: React.FC = () => {
//   // const session = useSession();

//   // useEffect(() => {
//   //   if (session.status === "authenticated") {
//   //     if (session.data.user && session.data.user.email) {
//   //       const email = session.data.user.email;
//   //       axios.get("/api/user/liked", {
//   //         params: { email: email },
//   //       });
//   //     }
//   //   }
//   // }, []);

//   return (
//     <button className="absolute z-10 top-4 right-4 bg-base-200 p-2 overflow-hidden rounded-lg hover:scale-110 transition-all">
//       <FiHeart size={24} />
//     </button>
//   );
// };

// export default LikeButton;
