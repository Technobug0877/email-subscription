import { Modal } from "@material-ui/core";
import { useEffect, useState } from "react";
const App = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const subscribe = async () => {
      let params = {
        email: email,
      };
      let response = await fetch("http://localhost:8000/subscribe", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMessage(data.message);
          setOpenModal(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (loading) {
      subscribe();
      setLoading(false);
    }
  }, [loading]);

  const handleClose = () => {
    setOpenModal(false);
  };
  const onChange = (event) => {
    setEmail(event.target.value);
    setHasError(false);
  };
  const buttonClicked = (event) => {
    if (email === "") {
      setHasError(true);
      return;
    }
    setLoading(true);
  };
  return (
    <div className="App m-0 h-100 w-100 bg-white h-screen w-screen dark:bg-gray-500">
      <div className="flex flex-col max-w-4xl md:w-3/4 w-full h-56 md:h-56 bg-white rounded-lg shadow-lg overflow-hidden md:flex-row absolute top-1/2 left-1/2 -transform-50-50">
        <div className="md:flex items-center justify-center md:w-1/2 relative md:bg-gray-700 py-2">
          <div className="text-gray-700 text-2xl font-bold md:text-gray-100 flex justify-center items-center">
            Subscribe to our Newsletter.
          </div>
        </div>
        <div className="flex items-center flex-col justify-center pb-6 md:py-0 md:w-1/2 flex-grow md:border-b-8 border-gray-700 px-2">
          <div className="flex flex-col rounded-lg overflow-hidden w-3/4 justify-center sm:flex-row">
            <input
              type="text"
              className="py-3 px-4 bg-gray-200 flex-grow text-gray-800 border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />
            <button
              className="py-3 px-4 bg-gray-700 text-gray-100 font-semibold uppercase hover:bg-gray-600"
              onClick={buttonClicked}>
              Subscribe
            </button>
          </div>
          {hasError && (
            <div className="flex w-3/4 justify-flex-start text-red-900 ml-2">
              Please Enter correct value
            </div>
          )}
        </div>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
      )}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className="text-white-900 dark:text-white bg-gray-800 absolute h-48 w-96 top-1/2 left-1/2 -transform-50-50 flex items-center justify-center">
          {message}
        </div>
      </Modal>
    </div>
  );
};

export default App;
