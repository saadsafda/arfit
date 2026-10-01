// src/components/CameraKitComponent.tsx

import React, { useEffect, useRef, useState } from "react";
import { bootstrapCameraKit, CameraKit, createMediaStreamSource, Transform2D } from "@snap/camera-kit";

interface CameraKitComponentProps {
    lensId: string;
}

const FIXED_WIDTH = 640;
const FIXED_HEIGHT = 480;
const apiToken = process.env.REACT_APP_CAMERA_KIT_API_TOKEN || "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQwMjcwOTI3LCJzdWIiOiJhYzBkYTlmYy0zOTEwLTQ3OTQtOWQxNi04M2Q5YTFjZTI5Yjd-U1RBR0lOR342MTc1Zjg3Yy0xODYyLTQwY2EtOWFlMi05M2MzZWZjYTdjMjkifQ.m8J0BZ8orqSb_NN_99xz3D31QTkWcLB2dGFKufL8HUs";

// Lenses may live in either group; the first group containing the lens wins.
const LENS_GROUP_IDS = (
    process.env.REACT_APP_CAMERA_KIT_LENS_GROUP_IDS ??
    "26ca79ed-d8e4-404f-af7f-027c6c98fa04,da397668-4e71-4116-ad9f-bb9c0f7dc687"
)
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

const loadLensFromGroups = async (cameraKit: CameraKit, lensId: string) => {
    let lastError: unknown;
    for (const groupId of LENS_GROUP_IDS) {
        try {
            return await cameraKit.lensRepository.loadLens(lensId, groupId);
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError;
};

const CameraKitComponent: React.FC<CameraKitComponentProps> = ({ lensId }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorDetail, setErrorDetail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let session: any;
        let stream: MediaStream | undefined;
        let disposed = false;
        setErrorMessage(null);
        setErrorDetail(null);
        setLoading(true);

        const runCameraKit = async () => {
            if (!canvasRef.current) return;

            canvasRef.current.width = FIXED_WIDTH;
            canvasRef.current.height = FIXED_HEIGHT;

            try {
                if (!lensId || lensId.includes("/")) {
                    throw new Error("This product does not have a Camera Kit Lens ID.");
                }
                const cameraKit = await bootstrapCameraKit({ apiToken });
                if (disposed) return;
                session = await cameraKit.createSession({ liveRenderTarget: canvasRef.current });
                if (disposed) return;

                session.events.addEventListener("error", (event: any) => {
                    if (event.detail.error.name === "LensExecutionError") {
                        console.error("Camera Kit lens execution failed:", event.detail.error);
                        if (!disposed) setErrorMessage("The lens could not start. Please try again later.");
                    }
                });

                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (disposed) return;
                const source = createMediaStreamSource(stream, { transform: Transform2D.MirrorX, cameraType: "user" });
                await session.setSource(source);

                const lens = await loadLensFromGroups(cameraKit, lensId);
                if (disposed) return;
                await session.applyLens(lens);
                await session.play();
                if (!disposed) setLoading(false);
            } catch (error) {
                console.error("Error initializing CameraKit:", error);
                if (!disposed) {
                    setLoading(false);
                    setErrorDetail(error instanceof Error ? `${error.name}: ${error.message}` : String(error));
                    setErrorMessage(
                        error instanceof DOMException && error.name === "NotAllowedError"
                            ? "Allow camera access to try this item on."
                            : "The lens could not load. Please try again later."
                    );
                }
            } finally {
                if (disposed) {
                    stream?.getTracks().forEach((track) => track.stop());
                    stream = undefined;
                    session?.destroy();
                    session = undefined;
                }
            }
        };

        void runCameraKit();

        return () => {
            disposed = true;
            stream?.getTracks().forEach((track) => track.stop());
            stream = undefined;
            session?.destroy();
            session = undefined;
        };
    }, [lensId]);

    return (
        <div className="relative w-full" style={{ maxWidth: FIXED_WIDTH, margin: "0 auto" }}>
            <canvas
                ref={canvasRef}
                style={{ display: "block", width: "100%", aspectRatio: `${FIXED_WIDTH} / ${FIXED_HEIGHT}` }}
            />
            {(loading || errorMessage) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white p-8 text-center" role="status">
                    <div className="flex flex-col items-center gap-2">
                        <span>{errorMessage ?? "Loading try on…"}</span>
                        {errorDetail && <span className="text-xs text-gray-400 break-all">{errorDetail}</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CameraKitComponent;
