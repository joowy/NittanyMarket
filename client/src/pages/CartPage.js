import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Payment } from "components/cart/Payment";
import { ReviewPurchase } from "components/cart/ReviewPurchase";
import React from "react";
import { useSelector } from "react-redux";

const steps = ["Review order", "Payment details"];

function getStepContent(step, data, cost) {
  switch (step) {
    case 0:
      return <ReviewPurchase data={data} cost={cost} />;
    case 1:
      return <Payment />;
    default:
      throw new Error("Unknown step");
  }
}

export const CartPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { data, total: cost } = useSelector((state) => state.cart);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 1) {
      handlePaceOrder();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePaceOrder = () => {};

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {data?.length > 0 ? (
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, data, cost)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <div>Cart Is Empty </div>
        )}
      </Paper>
    </Container>
  );
};
