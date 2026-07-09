// src/components/CameraKitComponent.tsx

import React, { useEffect, useRef } from "react";
import { bootstrapCameraKit, createMediaStreamSource, Transform2D } from "@snap/camera-kit";

interface CameraKitComponentProps {
    lensId: string;
    // Add any additional props if needed.
}

const FIXED_WIDTH = 640;
const FIXED_HEIGHT = 480;
const apiToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQwMjcwOTI3LCJzdWIiOiJhYzBkYTlmYy0zOTEwLTQ3OTQtOWQxNi04M2Q5YTFjZTI5Yjd-U1RBR0lOR342MTc1Zjg3Yy0xODYyLTQwY2EtOWFlMi05M2MzZWZjYTdjMjkifQ.m8J0BZ8orqSb_NN_99xz3D31QTkWcLB2dGFKufL8HUs";

const CameraKitComponent: React.FC<CameraKitComponentProps> = ({ lensId }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initializedRef = useRef(false);

    useEffect(() => {


        let session: any;

        if (initializedRef.current) return;
        initializedRef.current = true;

        const runCameraKit = async () => {
            if (!canvasRef.current) return;

            canvasRef.current.width = FIXED_WIDTH;
            canvasRef.current.height = FIXED_HEIGHT;

            try {
                const cameraKit = await bootstrapCameraKit({ apiToken });
                session = await cameraKit.createSession({ liveRenderTarget: canvasRef.current });

                session.events.addEventListener("error", (event: any) => {
                    if (event.detail.error.name === "LensExecutionError") {
                        console.log("The current Lens encountered an error and was removed.", event.detail.error);
                    }
                });

                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const source = createMediaStreamSource(stream, { transform: Transform2D.MirrorX, cameraType: "user" });
                await session.setSource(source);

                // Use the passed lensId here
                const lens = await cameraKit.lensRepository.loadLens(
                    lensId, 
                    // "4b2ad39f-b45f-48ce-8938-9284db52cbe0",
                    "da397668-4e71-4116-ad9f-bb9c0f7dc687" // or use another prop if needed
                );
                await session.applyLens(lens);
                await session.play();
                console.log("Lens rendering has started!");
            } catch (error) {
                console.error("Error initializing CameraKit:", error);
            }
        };

        runCameraKit();

        return () => {
            if (session && typeof session.destroy === "function") {
                session.destroy();
                console.log("CameraKit session destroyed on unmount.");
            }
        };
    }, [lensId]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: `${FIXED_WIDTH}px`,
                height: `${FIXED_HEIGHT}px`,
                margin: "0 auto",
            }}
        />
    );
};

export default CameraKitComponent;
