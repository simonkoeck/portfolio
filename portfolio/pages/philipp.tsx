import React from "react";
import Header from "../components/Header";
import { useQRCode } from "next-qrcode";

type Props = {};

export default function Philipp({}: Props) {
  const { Canvas } = useQRCode();
  const text = "Phillip stinkt 123";

  return (
    <div>
      <Header />
      <Canvas
        text={text}
        options={{
          type: "image/jpeg",
          quality: 0.3,
          level: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: "#010599FF",
            light: "#FFBF60FF",
          },
        }}
      />
    </div>
  );
}
