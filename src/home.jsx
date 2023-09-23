import React from "react";
import Sign from "./components/sign";
import Unipass from "./components/unipass";
import Notification from "./components/notification";

export default function Home(){

    return (
      <div>
        <Notification />
        <Sign />
        <Unipass />
      </div>
    );
}
