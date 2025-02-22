import React from "react";

export function Card({ children }) {
  return <div className="bg-white p-4 shadow rounded">{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
