"use client";

import Cal from "@calcom/embed-react";

export function Booker({ calUsername }: { calUsername: string }) {
  return (
    <Cal
      namespace="profile"
      calLink={calUsername}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ theme: "light", align: "left" }}
    />
  );
}
