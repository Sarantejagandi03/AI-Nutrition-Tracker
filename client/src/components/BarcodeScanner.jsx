import { BrowserMultiFormatReader } from "@zxing/browser";
import { Camera, Keyboard, ScanLine, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const BarcodeScanner = ({ onDetected, busy }) => {
  const videoRef = useRef(null);
  const scannerControlsRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const [cameraError, setCameraError] = useState("");

  const stopScanner = () => {
    scannerControlsRef.current?.stop();
    scannerControlsRef.current = null;
    setIsScanning(false);
  };

  const startScanner = async () => {
    setCameraError("");
    setIsScanning(true);

    try {
      const reader = new BrowserMultiFormatReader();
      scannerControlsRef.current = await reader.decodeFromVideoDevice(undefined, videoRef.current, (scanResult) => {
        if (scanResult) {
          stopScanner();
          onDetected(scanResult.getText());
        }
      });
    } catch (scanError) {
      setCameraError(scanError.message || "Unable to open the camera");
      setIsScanning(false);
    }
  };

  const handleManualSubmit = (event) => {
    event.preventDefault();

    if (manualBarcode.trim()) {
      onDetected(manualBarcode.trim());
      setManualBarcode("");
    }
  };

  useEffect(() => {
    // Camera streams need an explicit cleanup when leaving the scanner page.
    return () => stopScanner();
  }, []);

  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-950">Barcode scanner</h2>
        <p className="text-sm text-slate-500">Scan a packaged food barcode or enter the number manually.</p>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-950">
           <video
           ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
              muted
             playsInline
              aria-label="Barcode camera preview"
              />
          {!isScanning ? (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <ScanLine className="mx-auto mb-3" size={42} />
                <p className="text-sm font-semibold">Camera preview</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {!isScanning ? (
              <button type="button" className="btn-primary" onClick={startScanner} disabled={busy}>
                <Camera size={17} />
                Start scan
              </button>
            ) : (
              <button type="button" className="btn-secondary" onClick={stopScanner}>
                <Square size={17} />
                Stop
              </button>
            )}
          </div>

          <form className="rounded-lg border border-slate-200 bg-slate-50 p-3" onSubmit={handleManualSubmit}>
            <label>
              <span className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Keyboard size={16} />
                Barcode number
              </span>
              <input
                className="field"
                value={manualBarcode}
                onChange={(event) => setManualBarcode(event.target.value)}
                placeholder="8901234567890"
              />
            </label>
            <button type="submit" className="btn-secondary mt-3 w-full" disabled={busy}>
              Save from barcode
            </button>
          </form>

          {cameraError ? <p className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">{cameraError}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
