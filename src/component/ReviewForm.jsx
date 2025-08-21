import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function ReviewForm() {
  const { personalInfo, address } = useSelector((state) => state.form);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Review Your Information</Typography>
        <Typography><strong>Full Name:</strong> {personalInfo.fullName}</Typography>
        <Typography><strong>Email:</strong> {personalInfo.email}</Typography>
        <Typography><strong>Street:</strong> {address.street}</Typography>
        <Typography><strong>City:</strong> {address.city}</Typography>
        <Typography><strong>Zip:</strong> {address.zip}</Typography>
      </CardContent>
    </Card>
  );
}
