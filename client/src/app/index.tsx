import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScreenLayout } from "../components/design/ScreenLayout";
import { Button } from "../components/design/Button";


export default function HomePage() {
 

  return (
    <>
      <ScreenLayout>
        <Button title="Click me" variant="secondary" onPress={() => {
          console.log("Button clicked");
        }} />
      </ScreenLayout>
    </>
  );

}
