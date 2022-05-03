export default function ImageChunker(event, uploadFuncCallback, exportType){
    var image = new Image();
    image.onload = function(){
        let totalChunks = (image.width/50) * (image.height/50);
        let currChunk = 0;
        for(var x = 0; x < image.width/50; ++x) {
            for(var y = 0; y < image.height/50; ++y) {
                var canvas = document.createElement('canvas');
                canvas.width = 50;
                canvas.height = 50;
                var context = canvas.getContext('2d');
                context.drawImage(
                    image,
                    x * 50,
                    y * 50,
                    50,
                    50,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                
                var fileReader = new FileReader()

                fileReader.onload  = function(){
                    uploadFuncCallback(fileReader.result, (++currChunk) == totalChunks);
                }

                canvas.toBlob(fileReader.readAsArrayBuffer.bind(fileReader), exportType)
            }
        }
    };
    image.src = event.target.result;
}