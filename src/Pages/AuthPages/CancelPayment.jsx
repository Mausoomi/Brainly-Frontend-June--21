import React from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CancelPayment() {
  const navigate = useNavigate();

  return (
    <div>
      {" "}
      <div className="flex items-center justify-center">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-rose-400 p-2 flex items-center justify-center mx-auto mb-3.5">
              <MdCancel className='class="w-8 h-8 text-rose-900 dark:text-rose-400"' />
            </div>

            <p className="mb-4 text-lg font-extrabold  text-gray-900 dark:text-white">
              Payment Failed
            </p>

            <button
              onClick={() => navigate("/")}
              data-modal-toggle="successModal"
              type="button"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelPayment;
