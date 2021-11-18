import React from "react";
import WordsItem from "./WordsItem";

export default function Words(props) {
  const words = props.words;
  const items = words.map((w, i) => <WordsItem key={w.id} {...w} index={i} ></WordsItem>);
  return <div className="words-container">
      {items}
  </div>;
}
