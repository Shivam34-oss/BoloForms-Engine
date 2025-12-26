import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import axios from "axios";

export default function Page() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSigning, setIsSigning] = useState(false);
  const containerRef = useRef(null);
  const nodeRef = useRef(null); 

  const signDocument = async () => {
    if (!containerRef.current) return;
    setIsSigning(true);

    // Responsive Logic: Container ki current width/height
    const { offsetWidth, offsetHeight } = containerRef.current;
    
    //  i am using Percentage position 
    const xPercent = (position.x / offsetWidth) * 100;
    const yPercent = (position.y / offsetHeight) * 100;

    try {
      const response = await axios.post("http://localhost:5000/sign-pdf", {
        xPercent,
        yPercent,
        signatureImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==", 
      });

      alert(`Success!\nOriginal Hash: ${response.data.beforeHash}\nSigned Hash: ${response.data.hash}`);
    } catch (error) {
      console.error("Signing Error Details:" , error)
      alert("Error: Server Not Connected ");
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-extrabold mb-8 text-blue-700">BoloForms Signature Engine</h1>
      
      {/* Responsive A4 Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[600px] aspect-[1/1.41] bg-white shadow-2xl border-2 border-gray-200 overflow-hidden rounded-md"
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 select-none">
          <p className="text-center p-4">Resume Preview Area (A4 Ratio)</p>
        </div>

        <Draggable 
          nodeRef={nodeRef} 
          bounds="parent" 
          onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
        >
          <div 
            ref={nodeRef} 
            className="absolute w-[20%] h-[10%] border-2 border-dashed border-blue-500 bg-blue-100/60 flex items-center justify-center cursor-move z-50 rounded"
          >
            <span className="text-[10px] md:text-sm text-blue-700 font-bold">Sign Here</span>
          </div>
        </Draggable>
      </div>

      <button
        onClick={signDocument}
        className="mt-10 px-12 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 shadow-lg transform active:scale-95 transition-all"
      >
        {isSigning ? "Processing PDF..." : "Generate Signed Document"}
      </button>
 </div>
);
}
