import { BACKEND_URL } from "../assets/Const";

export async function StripePayment(
  amount,
  initPaymentSheet,
  presentPaymentSheet,
  disabled,
  setDisabled
) {
  //1.- Create a payment intent
  const response = await fetch(BACKEND_URL + "/api/stripe/create_payment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currency: "clp",
      amount: Math.round(amount * 100),
    }),
  });
  if (response.error) {
    Alert.alert("something went wrong");
    return;
  }
  const { clientSecret } = await response.json();

  // 2.- Initialize the payment sheet
  const initResponse = await initPaymentSheet({
    merchantDisplayName: "Premium y Codigos",
    paymentIntentClientSecret: clientSecret,
    style: "alwaysDark",
    //   defaultBillingDetails: {
    //     name: name,
    //   },
  });

  if (initResponse.error) {
    console.log(initResponse.error);
    Alert.alert(
      `Error code: ${initResponse.error.code}`,
      initResponse.error.message
    );
    return;
  }
  //3.- Present the payment sheet from stripe
  const paymentResponse = await presentPaymentSheet();
  if (paymentResponse.error) {
    console.log(paymentResponse.error);
    setDisabled(false);
    Alert.alert(
      `Error code: ${paymentResponse.error.code}`,
      paymentResponse.error.message
    );
    return;
  }
}
