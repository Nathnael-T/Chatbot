import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-[#0F1D22] px-4 py-3">
      <span className="h-2 w-2 rounded-full bg-[#00AFB5] animate-[pulse_1.4s_ease-in-out_infinite]" />
      <span className="h-2 w-2 rounded-full bg-[#00AFB5] [animation:pulse_1.4s_ease-in-out_200ms_infinite]" />
      <span className="h-2 w-2 rounded-full bg-[#00AFB5] [animation:pulse_1.4s_ease-in-out_400ms_infinite]" />
    </div>
  );
}
