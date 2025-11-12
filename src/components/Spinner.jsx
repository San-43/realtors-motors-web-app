import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Spinner() {
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div>
        <DotLottieReact
          src="https://lottie.host/f31e05bc-35ba-4fae-aaff-a5d2d927723d/7i6V3QJafi.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
