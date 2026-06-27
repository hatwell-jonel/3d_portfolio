"use client";

import { useEffect, useState } from "react";
import { Joyride, EVENTS, type Step } from "react-joyride";

function useCSSColors() {
  const [colors, setColors] = useState({
    bg: "#1e1e2e",
    accent: "#ff6b6b",
    ink: "#e2e8f0",
    muted: "#64748b",
  });

  useEffect(() => {
    function read() {
      const el = document.documentElement;
      const style = getComputedStyle(el);
      setColors({
        bg: style.getPropertyValue("--chat-card").trim() || "#1e1e2e",
        accent: style.getPropertyValue("--chat-accent").trim() || "#ff6b6b",
        ink: style.getPropertyValue("--chat-ink").trim() || "#e2e8f0",
        muted: style.getPropertyValue("--chat-muted").trim() || "#64748b",
      });
    }

    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return colors;
}

const STEPS: Step[] = [
  {
    target: () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      return document.querySelector(isDesktop ? "[data-tour=\"sidebar-desktop\"]" : "[data-tour=\"sidebar-mobile\"]");
    },
    title: "Navigation",
    content: "Browse through Jonel's portfolio sections — Profile, Experience, Tech Stack, Projects, and Certificates. Click any section to jump right to it.",
    placement: "right",
  },
  {
    target: "#composer-input",
    title: "Chat with Jonel",
    content: "Ask me anything! Type a question about my projects, skills, or experience and hit Enter to get an AI-powered response.",
    placement: "top",
  },
  {
    target: "[data-tour=\"theme-toggle\"]",
    title: "Theme Switcher",
    content: "Toggle between dark and light mode to suit your preference.",
    placement: "bottom",
  },
  {
    target: "main header",
    spotlightTarget: "#thread-scroll",
    spotlightPadding: { top: 0, bottom: 80, left: 0, right: 0 },
    title: "Main Content",
    content: "This is the main inbox area — browse my portfolio sections and chat history here. Scroll through to learn more about me!",
    placement: "bottom",
  },
];

export default function Tour({ active, onFinish }: { active: boolean; onFinish: () => void }) {
  const colors = useCSSColors();

  return (
    <Joyride
      steps={STEPS}
      run={active}
      continuous
      scrollToFirstStep
      options={{
        arrowColor: colors.bg,
        backgroundColor: colors.bg,
        primaryColor: colors.accent,
        textColor: colors.ink,
        overlayColor: "rgba(0, 0, 0, 0.6)",
        spotlightRadius: 8,
        width: 360,
        zIndex: 200,
        skipBeacon: true,
        showProgress: true,
      }}
      styles={{
        tooltipContent: {
          fontSize: "14px",
          lineHeight: "1.5",
          padding: "12px 16px 0",
        },
        tooltipTitle: {
          fontSize: "16px",
          fontWeight: 600,
          padding: "16px 16px 0",
          color: colors.accent,
        },
        buttonSkip: {
          color: colors.muted,
          fontSize: "13px",
        },
        buttonPrimary: {
          backgroundColor: colors.accent,
          color: "#fff",
          fontSize: "13px",
          borderRadius: "6px",
          padding: "6px 14px",
        },
        buttonBack: {
          color: colors.ink,
          fontSize: "13px",
        },
      }}
      locale={{
        skip: "Skip tour",
        next: "Next",
        last: "Done",
      }}
      onEvent={(data) => {
        if (data.type === EVENTS.TOUR_END) {
          onFinish();
        }
      }}
    />
  );
}
