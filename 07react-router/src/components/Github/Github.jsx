import React from "react";
import { useLoaderData } from "react-router";

const Github = () => {

const data = useLoaderData();

console.log("Github data:",data);


  return <div>
    <h1>THIS IS MY PROFILE BUDDIES </h1>

    I am following to {data.following}

  </div>;
};

export default Github;

export const fetchGitHubProfile = async () => {
  const response = await fetch(`https://api.github.com/users/yuvi-Apk`);
  const data = response.json();
  return data;
};
