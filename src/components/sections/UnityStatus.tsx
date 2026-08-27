"use client";

import React from "react";

interface UnityStatusProps {
	label: string;
	/** 0–1 load progress, or null when there is nothing measurable to show yet. */
	progress?: number | null;
}

/**
 * Overlay shown inside the player frame while the module and the Unity build
 * are still coming down. Kept in its own module so the deferring wrapper can
 * render it without pulling react-unity-webgl into the initial bundle.
 */
export default function UnityStatus({ label, progress = null }: UnityStatusProps) {
	const pct = progress === null ? 0 : Math.round(progress * 100);

	return (
		<div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050508] text-white z-20">
			<p className="text-sm font-mono tracking-widest text-cyan-400 mb-2">
				{label}
				{progress !== null && ` ${pct}%`}
			</p>
			<div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
				<div
					className={`h-full bg-cyan-500 ${
						progress === null
							? "w-1/3 animate-pulse"
							: "transition-all duration-300 ease-out"
					}`}
					style={progress === null ? undefined : { width: `${pct}%` }}
				/>
			</div>
		</div>
	);
}
