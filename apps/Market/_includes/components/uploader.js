export default function Uploader(){
    const handleFileClick = () => {
        var fileInputEl = document.createElement("input");
        fileInputEl.type = "file";
        fileInputEl.accept = "image/*";
        fileInputEl.style.display = "none";
        document.body.appendChild(fileInputEl);
        fileInputEl.addEventListener("input", function (e) {
          handleUpload(e);
          document.body.removeChild(fileInputEl);
        });
        fileInputEl.click();
      };
    
      const handleUpload = async (evt) => {
        let files = evt.target.files;
        let reader = new FileReader();
        if (files && files.length > 0) {
          reader.onload = function () {
            if (reader.result) {
              setImg(Buffer.from(reader.result));
            }
          };
          reader.readAsArrayBuffer(files[0]);
        }
      };
}