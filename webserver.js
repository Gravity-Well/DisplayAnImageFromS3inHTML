const express=require('express');
const app=express();
const PORT=3200;

const AWS = require('aws-sdk');


app.get('/',(req,res)=>{

 
   
    AWS.config.update({
        accessKeyId: "",
        secretAccessKey: ""
      });

      let s3 = new AWS.S3();

    
      async function getImage(){
          const data =  s3.getObject(
            {
                Bucket: '',
                Key: ""
              }
            
          ).promise();
          return data;
        }

          getImage()
          .then((img)=>{
              let startHTML="<html><body></body>";
              let endHTML="</body></html>";
              let html=startHTML + "<img src='data:image/png;base64," + encode(img.Body) + "'" + "/>" + endHTML;
            res.send(html)
          }).catch((e)=>{
            res.send(e)
          })
     

        function encode(data)
        {
            let buf = Buffer.from(data);
            let base64 = buf.toString('base64');
            return base64
        }


})
app.listen(PORT,()=>{
    console.log(`Web Server running on port ${PORT}`);
});