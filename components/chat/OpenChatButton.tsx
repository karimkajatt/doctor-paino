"use client";

import { OPEN_CHAT_EVENT } from "./ChatWidget";

export default function OpenChatButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="btn btn-primary"
      onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
    >
      {children}
    </button>
  );
}
