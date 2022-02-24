import React from 'react';
import { Flex, TextField,Button } from '@aws-amplify/ui-react';
import { useParams,useNavigate  } from 'react-router-dom';
import {Auth} from "aws-amplify"
import AWS from "aws-sdk";

const BUCKET = "fairview1"
function Editform() {
    let params = useParams();
    const navigate = useNavigate();
    const[formData,setFormData]=React.useState(null)
    const[fileData,setFileData]=React.useState(null)
    React.useEffect(()=>{
        (async () => {
          if(params.file_name){
            let data= await readS3File();
            let tempdata = JSON.parse(data.Body.toString('utf8'))
            if(tempdata){
                setFormData(tempdata)
            }
          }
          
        })()
      
    },[])

    const onChangeInput = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };
   
   
   
    
   
    const readS3File=async()=>{
        AWS.config.region = Auth.configure().region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: Auth.configure().identityPoolId,
        });
        let data = await new AWS.S3().getObject({ Bucket:  BUCKET, Key: params.file_name }).promise()
        return data
     
    }
    const deleteS3File=async()=>{
        AWS.config.region = Auth.configure().region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: Auth.configure().identityPoolId,
        });
        await new AWS.S3().deleteObject({ Bucket:  BUCKET, Key: params.file_name }, async function (err, result) {
            if (err) alert('File deletion failed');
            else{
                alert('File deleted to S3 - SUCCESS'); 
                navigate(-1)
                
            }  
        });
     
    }


    const downloadS3File=async()=>{


                let data=await readS3File()
                if(!data) return 
                let blob=new Blob([data.Body], {type: data.ContentType});
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = params.file_name;
                document.body.appendChild(link);
                link.dispatchEvent(
                  new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                  })
                );
                document.body.removeChild(link);
            
    }


    const onFileChange = event => {
        setFileData(event.target.files[0]);
      };



     const fileDataInfo = () => {
        if (fileData) {
           
          return (
            <div>
                <h2>File Details:</h2>
                <p>File Name: {fileData.name}</p>
                <p>File Type: {fileData.type}</p>
                <p>
                Last Modified:{" "}
                {fileData.lastModifiedDate.toDateString()}
              </p>
            </div>
          );
        } else {
          return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };
      

    const updateS3File=async()=>{
        const uploadParams = {
            ACL: 'public-read',
            Body: fileData,
            Bucket: BUCKET,
            Key: params.file_name
        };
        AWS.config.region = Auth.configure().region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: Auth.configure().identityPoolId,
        });
        await new AWS.S3().putObject(uploadParams, async function (err, result) {
            if (err) alert('File upload failed');
            else{
                let data= await readS3File();
                let tempdata = JSON.parse(data.Body.toString('utf8'))
                if(tempdata){
                    setFormData(tempdata)
                }
                alert('File sent to S3 - SUCCESS'); 
                setFileData(null)
                
            }  
        });
    }
   



  return (
    <div className='products'>
        {
            formData &&
            <Flex direction={'column'}  alignItems="flex-start">
            <TextField
                placeholder={`${Object.keys(formData)}`}
                width={600}
                descriptiveText={`Please enter valid ${Object.keys(formData)}`}
                value={`${formData[Object.keys(formData)]}`}
                name={`${Object.keys(formData)}`}
                onChange={onChangeInput}
                isReadOnly
            />
            <input type="file" onChange={onFileChange} />
            <div>{fileDataInfo()}</div>
              <Flex direction={'row'}  alignItems="flex-start">
                     <Button width={'100'}size="small" onClick={() => navigate(-1)}>Cancel</Button>
                     <Button width={'100'}size="small" onClick={() => downloadS3File()}>Download</Button>
                     <Button width={'100'}  disabled={!fileData}  size="small" onClick={() => updateS3File()}>Update</Button>
                     <Button width={'100'}    size="small" onClick={() => deleteS3File()}>Delete</Button>
            </Flex>
            </Flex>

        }
       
    </div>
  );
}

export default Editform;
