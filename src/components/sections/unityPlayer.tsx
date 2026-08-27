"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import UnityStatus from "./UnityStatus";

/**
 * Loaded only once the section is near the viewport. ssr: false keeps the
 * WebGL player out of the server render, and the dynamic boundary keeps
 * react-unity-webgl out of the initial page chunk.
 */
const UnityGame = dynamic(() => import("./UnityGame"), {
	ssr: false,
	loading: () => <UnityStatus label="LOADING ENGINE MODULE..." />,
});

export default function UnityPlayer() {
	const sectionRef = useRef<HTMLElement>(null);
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;

		// No observer support: fall back to loading immediately rather than
		// never. Deferred by a tick so this isn't a synchronous setState in an
		// effect body.
		if (typeof IntersectionObserver === "undefined") {
			const timer = setTimeout(() => setShouldLoad(true), 0);
			return () => clearTimeout(timer);
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setShouldLoad(true);
					observer.disconnect();
				}
			},
			// Start the download well before the frame is on screen so a normal
			// scroll arrives at a player that is already loading.
			{ rootMargin: "600px 0px" }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="w-full py-12 flex flex-col items-center justify-center"
		>
			<div className="relative w-full max-w-[960px] aspect-video rounded-xl overflow-hidden border border-cyan-500/20 bg-black/50 shadow-2xl">
				{shouldLoad ? (
					<UnityGame />
				) : (
					<UnityStatus label="ENGINE STANDBY" progress={0} />
				)}
			</div>
		</section>
	);
}
