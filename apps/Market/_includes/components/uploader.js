import { useState } from "react";
import { useContext } from "react";

import BundlrClientCtx from "@contexts/bundlrClientCtx";

export default function Uploader(){
  const {bundlrClient, setBundlrClient} = useContext(BundlrClientCtx);

  // image OR audio
  const [fileType, setFileType] = useState("image");
  const [solTxAddr, setSolTxAddr]   = useState(props?.solAddr);

  const [fileSelection, setFileSelection] = useState("");

  const setFile = () => {
      var fileInputEl = document.createElement("input");
      fileInputEl.type = "file";
      fileInputEl.accept = `${fileType}/*`;
      fileInputEl.style.display = "none";
      document.body.appendChild(fileInputEl);
      fileInputEl.addEventListener("input", function (e) {
        setFileSelection(e.target.files[0]);
        document.body.removeChild(fileInputEl);
      });
      fileInputEl.click();
  };

  const uploadFile = () => {
    bundlrClient.uploadFile(fileSelection, fileType, solTxAddr);
  }
}