"use client";

import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import UnityStatus from "./UnityStatus";

/**
 * The actual WebGL player. This module pulls in react-unity-webgl and starts
 * fetching the ~66 MB build as soon as it mounts, so it is only ever imported
 * lazily by unityPlayer.tsx once the section approaches the viewport.
 */
export default function UnityGame() {
	const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
		loaderUrl: "/unity-build/Build/web3.loader.js",
		dataUrl: "/unity-build/Build/web3.data",
		frameworkUrl: "/unity-build/Build/web3.framework.js",
		codeUrl: "/unity-build/Build/web3.wasm",
	});

	return (
		<>
			{!isLoaded && (
				<UnityStatus
					label="INITIALIZING ENGINE..."
					progress={loadingProgression}
				/>
			)}
			<Unity
				unityProvider={unityProvider}
				className="w-full h-full object-cover"
			/>
		</>
	);
}
