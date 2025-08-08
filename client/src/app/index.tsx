import React, { useEffect, useState } from "react";

import { ScreenLayout } from "../components/design/ScreenLayout";
import { RegisterForm } from "@components/functional/forms/RegisterForm";

export default function HomePage() {
  return (
    <>
      <ScreenLayout scrollable={false}>
        <RegisterForm />
      </ScreenLayout>
    </>
  );
}
