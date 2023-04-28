import React from "react";
import { Check } from "@mui/icons-material";
import { Step, StepConnector, StepIconProps, StepLabel, Stepper, stepConnectorClasses, styled } from "@mui/material";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#EC7D31",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#EC7D31",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#EC7D31",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#EC7D31",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#EC7D31",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#EC7D31",
    zIndex: 1,
    fontSize: 24,
  },
  "& .QontoStepIcon-circle": {
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

type Props = {
  steps: string[];
  activeStep: number;
};

export const CustomStep: React.FC<Props> = ({ steps, activeStep }) => {
  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon}>{<span style={{ color: "#2D6495", fontWeight: "bold", fontSize: "1rem" }}>{label}</span>}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
