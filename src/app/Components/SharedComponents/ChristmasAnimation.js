"use client";

import { useEffect } from "react";
import styles from "../../Components/ChristmasAnimation.module.css"; // Create this CSS module

export default function ChristmasAnimation() {
  useEffect(() => {
    const emojis = ["❄️", "🎄", "🎅", "🦌", "🎁", "🌟"];
    const container = document.createElement("div");
    container.className = styles.container;

    for (let i = 0; i < 50; i++) {
      const emoji = document.createElement("div");
      emoji.className = styles.emoji;
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.animationDuration = `${5 + Math.random() * 10}s`;
      emoji.style.fontSize = `${10 + Math.random() * 20}px`;
      emoji.style.opacity = `${Math.random()}`;
      container.appendChild(emoji);
    }

    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return null;
}