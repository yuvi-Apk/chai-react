import React from "react";
import { useLocation } from "react-router";
import { Container } from "@/components";

// Temporary page for routes whose UI isn't built yet (login, signup, posts...)
const ComingSoon = () => {
  const { pathname } = useLocation();

  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-bold text-white">{pathname}</h1>
      <p className="mt-3 text-zinc-400">This page is coming soon.</p>
    </Container>
  );
};

export default ComingSoon;
