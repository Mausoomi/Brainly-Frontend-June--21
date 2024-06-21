import * as React from "react";
import image1 from "../../Assets/Images/best value.png";
import image from "../../Assets/Images/plan-center-img.png";
import Heading from "../Heading";
import Button from "../Button";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cancel_Current_Plan } from "../../store/Actions/Authactions";

// Make payment function
const makePayment = async (title, Payprice, isFree, id, priceId) => {
  console.log("my Payment Click------", title, Payprice, isFree, id, priceId);

  console.log("my payment Click Free here ------", isFree);
  try {
    const stripe = await loadStripe(
      "pk_test_51PSzUZRtcNodwMW8Dz5nR2ARXZcQhK3vAzEqCzJUmIbot5CvdqEEtfED8JDCYSSNZjbJieU7odfE0oAboe7Lx9th00Q6RwWgUa"
    );

    // Set Payprice based on isFree flag
    if (!isFree) {
      Payprice = 0;
      title = "Free-Trial";
    }

    const body = {
      products: {
        title,
        Payprice,
        id,
        isFree,
        priceId,
      },
    };

    const headers = {
      "Content-Type": "application/json",
    };

    console.log(body);

    let response;

    if (!isFree) {
      response = await fetch("http://localhost:9000/api/Free-Payment", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
    } else {
      response = await fetch("http://localhost:9000/api/Payments", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
    }

    const session = await response.json();

    localStorage.setItem("SessionID", session.id);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  } catch (error) {
    console.error("Error making payment:", error);
  }
};

const PlanCard = ({
  title,
  subtitle,
  price,
  description,
  buttonText,
  isPopular,
  Payprice,
  id,
  btnFunc,
  isFree,
  isAuthenticated,
  navigate,
  priceId,
  ActivePlan,
}) => {
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleCancelConfirmation = () => {
    const formData = {
      Student_ID: user?._id,
      Session_ID: user?.PaymentsID[0]?.sessionID,
    };

    console.log(formData, "Cancel Model Popup");
    dispatch(Cancel_Current_Plan(formData));
    setShowCancelPopup(false);
  };

  return (
    <div
      className={`relative flex flex-col justify-end sm:px-4 px-8 py-8 my-auto w-full max-w-sm text-lg ${
        isPopular ? "plans-bg-center" : "bg-white"
      } rounded-2xl`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 z-20">
          <img
            loading="lazy"
            src={image1}
            alt="Best value"
            className="best-value"
          />
        </div>
      )}
      <div
        className={`self-center text-3xl font-bold font-Inter ${
          isPopular ? "text-white" : "text-black"
        }`}
      >
        {title}
      </div>
      <div
        className={`self-center mt-2 text-center text-sm font-poppins ${
          isPopular ? "text-white" : "text-black"
        }`}
      >
        {isFree ? "" : subtitle}
      </div>
      <div
        className={`text-3xl font-bold font-Inter py-8 ${
          isPopular ? "text-white" : "text-gray-800"
        }`}
      >
        {price}
      </div>
      <div
        className={`text-center font-normal font-Inter ${
          isPopular ? "text-white" : "text-gray-800"
        }`}
      >
        {description}
      </div>
      <div>
        {isPopular ? (
          isAuthenticated ? (
            <button
              onClick={() =>
                btnFunc
                  ? makePayment(title, Payprice, isFree, id, priceId)
                  : makePayment(title, Payprice, isFree, id, priceId)
              }
              className="justify-center items-center px-12 py-4 my-2 font-semibold text-center bg-white shadow-lg text-purple-600 rounded-full w-[100%]"
            >
              {title === ActivePlan ? "Active Plan" : buttonText}
            </button>
          ) : (
            <button
              onClick={() => navigate("/SignUpPage")}
              className="justify-center items-center px-12 py-4 my-2 font-semibold text-center bg-white shadow-lg text-purple-600 rounded-full w-[100%]"
            >
              {title === ActivePlan ? "Active Plan" : buttonText}
            </button>
          )
        ) : isAuthenticated ? (
          <div className="justify-center sm:self-start self-center m-2 font-semibold tracking-normal text-black rounded-[1000px]">
            <Button
              onClickFunction={() =>
                btnFunc
                  ? makePayment(title, Payprice, isFree, id, priceId)
                  : makePayment(title, Payprice, isFree, id, priceId)
              }
              btnText={title === ActivePlan ? "Active Plan" : buttonText}
            />
          </div>
        ) : (
          <div className="justify-center sm:self-start self-center m-2 font-semibold tracking-normal text-black rounded-[1000px]">
            <Button
              onClickFunction={() => navigate("/SignUpPage")}
              btnText={title === ActivePlan ? "Active Plan" : buttonText}
            />
          </div>
        )}
      </div>
      {btnFunc === true && title === ActivePlan ? (
        <div
          className={`text-center font-Inter font-normal ${
            isPopular ? "text-white" : "text-gray-800"
          }`}
        >
          <span>You are free to</span>{" "}
          <span
            onClick={() => setShowCancelPopup(true)}
            style={{ cursor: "pointer" }}
            className="font-medium text-red-600"
          >
            cancel any time
          </span>
        </div>
      ) : null}

      {isPopular && (
        <div className="self-center">
          <img
            loading="lazy"
            src={image}
            alt="Plan"
            className="plan-image self-center mt-4 ml-8 max-w-full shadow-sm aspect-[1.41] w-[168px]"
          />
        </div>
      )}
      {showCancelPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-black p-6 rounded-lg">
            <h2 className="text-xl text-white font-semibold mb-4">
              Cancel Subscription
            </h2>
            <p className="mb-4  text-white">
              Do you really want to cancel your subscription?
            </p>
            <div className="flex justify-end">
              <Button
                onClickFunction={() => setShowCancelPopup(false)}
                btnText="No"
              />
              <Button
                onClickFunction={handleCancelConfirmation}
                btnText="Yes"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Plan selection component
function SelectPlan() {
  const user = useSelector((state) => state.auth.user);
  console.log(user, "user at Select Plan");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [btnFunc, setBtnFunc] = useState(false);
  const [isFree, setIsFree] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(btnFunc);
    if (user?.buyPlan === true) {
      setBtnFunc(true);
    }
    if (user?.isFreePlan === true) {
      setIsFree(true);
    }
  }, [user]);

  const id = user ? user._id : null;

  const plans = [
    {
      title: "Monthly",
      subtitle: "10-days free Trial",
      price: "£1.00/month",
      description: "Take as a Monthly Payment of £1.00",
      buttonText: "Get started",
      Payprice: "1",
      isPopular: false,
      priceId: "price_1PTjylRtcNodwMW82aAExchc",
    },
    {
      title: "Yearly",
      subtitle: "10-days free Trial",
      price: "£12.00/12-months",
      description: "Take as a Yearly Payment of £12.00",
      buttonText: "Get started",
      Payprice: "12",
      isPopular: true,
      priceId: "price_1PTjh2RtcNodwMW8NABTRX8k",
    },
    {
      title: "Half-Yearly",
      subtitle: "10-days free Trial",
      price: "£6.00/06-months",
      description: "Take as a Half-Yearly Payment of £6.00",
      buttonText: "Get started",
      Payprice: "6",
      isPopular: false,
      priceId: "price_1PTk0SRtcNodwMW8QuvOVNh9",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="py-8">
        <Heading blueText="Select Your" whiteText="Perfect Plan" />
      </div>
      <section className="grid gap-7 md:grid-cols-3 p-6">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            {...plan}
            id={id}
            btnFunc={btnFunc}
            isFree={isFree}
            isAuthenticated={isAuthenticated}
            navigate={navigate}
            ActivePlan={user.Active_Plan}
          />
        ))}
      </section>
    </main>
  );
}

export default SelectPlan;
